import { atom, selectorFamily } from 'recoil'

export interface ITask {
  sectionId: string
  id: string
  title: string
  description?: string
  order: number
  createdAt: string,
  isArchived: boolean,
}

const tasksAtom = atom<ITask[]>({
  key: 'Tasks',
  default: [],
  effects: [
    ({setSelf, onSet}) => {
      const savedValue = localStorage.getItem('Tasks')

      if (savedValue != undefined) {
        setSelf(JSON.parse(savedValue));
      }
    
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem('Tasks')
          : localStorage.setItem('Tasks', JSON.stringify(newValue));
      })
    }
  ]
})

export const getTask = selectorFamily({
  key: 'getTask',
  get: (id: string) => ({ get }) => {
    const tasks = get(tasksAtom)
    return tasks.find(task => task.id === id)
  },
})

export default tasksAtom