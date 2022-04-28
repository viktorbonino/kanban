import { atom } from 'recoil'

export enum EModalContent {
  AddSection = 'AddSection',
  AddTask = 'AddTask',
  EditSection = 'EditSection',
  ViewTask = 'ViewTask',
  None = '',
}
export interface IModal {
  isOpen: boolean
  title: string
  content: EModalContent
  sectionId: string
  taskId: string
}

const modalAtom = atom<IModal>({
  key: 'Modal',
  default: {
    isOpen: false,
    title: '',
    content: EModalContent.None,
    sectionId: '',
    taskId: ''
  },
})

export default modalAtom