import styled from '@emotion/styled'

const TextField = styled.input`
  border-radius: 10px;
  padding: 0.85rem;
  border: none;
  width: 100%;
  &:focus{
    outline-color: ${props => props.theme.colors.secondary};
  }
  &::placeholder {
    font-size: 1rem;
  }
`

export default TextField