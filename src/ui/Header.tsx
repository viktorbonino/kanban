import styled from '@emotion/styled'

const Header = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.primary};
  flex-direction: row;
  justify-content: space-between;
  align-items: right;
  place-items: center;
  height: 5rem;
  gap: 1rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
  @media (min-width: 768px) {
    justify-content: right;
  }
`

export default Header