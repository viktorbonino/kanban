import { selector } from 'recoil'
import SectionsAtom, { ISection } from './atoms/sections'
import TasksAtom, { ITask } from './atoms/tasks'

export interface IData extends ISection {
  tasks: ITask[]
}

export const dataSelector = selector<IData[]>({
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

