import styled from '@emotion/styled'

interface ModalContentProps {
  sidebar?: boolean
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.primary};
  padding: 1rem 2rem 1rem 2rem;
  gap: 2rem;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  font-size: 1.3rem;
  @media (min-width: 768px) {
    width: 45%;
    borderRadius: 10px;
    height: auto;
  }
`

export default ModalContent