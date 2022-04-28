import { selector } from 'recoil'
import SectionsAtom from './atoms/sections'
import TasksAtom from './atoms/tasks'

export const dataSelector = selector({
  key: 'getData',
  get: ({ get }) => {
    const sections = get(SectionsAtom)
    const tasks = get(TasksAtom)
    
    return sections.map(section => ({
      ...section,
      tasks: tasks.filter(task => task.sectionId === section.id && !task.isArchived),
    }))
  },
})

export const archivedTasksSelector = selector({
  key: 'getArchivedTasks',
  get: ({ get }) => {
    const tasks = get(TasksAtom)

    return tasks.filter(task => task.isArchived)
  },
})

