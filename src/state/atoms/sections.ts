import { atom} from 'recoil'
export interface ISection {
  id: string
  title: string
  order: number
  immutable?: boolean
}

const sectionsAtom = atom<ISection[]>({
  key: 'Sections',
  default: [
    {
      id: 'noStatus',
      title: 'No status',
      order: 0,
      immutable: true,
    },
    {
      id: 'eadf064d-daba-41d6-add1-9cb74ff645f5',
      title: 'To do',
      order: 1,
    },
    {
      id: 'af0a831f-8235-4e08-93d4-f5aaf408e156',
      title: 'In progress',
      order: 2,
    },
    {
      id: '43db1996-435e-4358-a628-901c466f8390',
      title: 'Completed',
      order: 3,
    },
  ],
  effects: [
    ({setSelf, onSet}) => {
      const savedValue = localStorage.getItem('Sections')
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
    
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem('Sections')
          : localStorage.setItem('Sections', JSON.stringify(newValue));
      })
    }
  ]
})

export default sectionsAtom