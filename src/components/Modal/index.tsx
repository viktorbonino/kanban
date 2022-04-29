import ReactModal from 'react-modal'
import { XIcon } from '@heroicons/react/solid'
import Button from 'ui/Button'
import ModalContent from 'ui/ModalContent'
import useModal from 'hooks/useModal'

const Modal = ({ children }: { children: React.ReactNode }) => {
  const { modal, closeModal } = useModal()

  return (
    <ReactModal
      isOpen={modal.isOpen}
      ariaHideApp={false}
      css={theme => ({
        display: 'flex',
        minHeight: '100%',
        width: '100vw',
        backgroundColor: theme.colors.primary,
        '@media (min-width: 768px)': {
          backgroundColor: 'inherit',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }
      })}
      style={{ overlay: { background: 'rgba(0,0,0,0.4)', overflowX: 'hidden', }}}
      onRequestClose={() => closeModal()}
    >
      <ModalContent>
        <div
          css={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            placeItems: 'center',
            fontSize: '1.5rem'
          }}
        >
          {modal.title}
          <Button onClick={() => closeModal()}>
            <XIcon css={{ width: '1.5rem' }} />
          </Button>
        </div>
      
        {children}
      </ModalContent>
    </ReactModal>
  )
}

export default Modal