import styled from '@emotion/styled'

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  background-color: ${props => props.theme.colors.primary};
  border: none;
  color: ${props => props.theme.text.primary};
  padding: 1em;
  border-radius: 10px;
  font-family: 'Lato', sans-serif;
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.tertiary};
  }
`

export default Button