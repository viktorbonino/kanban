import { useRecoilState } from 'recoil'
import ModalAtom, { EModalContent, IModal } from 'state/atoms/modal'

const useModal = () => {
  const [modal, setModal] = useRecoilState(ModalAtom)

  const openModal = (newModal: Partial<IModal>) => setModal(
    oldModal => ({ ...oldModal, isOpen: true, ...newModal })
  )

  const closeModal = () => setModal({ 
    isOpen: false, 
    title: '', 
    content: EModalContent.None, 
    sectionId: '',
    taskId: ''
  })

  return { modal, openModal, closeModal, EModalContent }
}

export default useModal