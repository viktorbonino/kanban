import styled from '@emotion/styled'

const TextArea = styled.textarea`
  border-radius: 10px;
  padding: 0.75rem;
  border: none;
  width: 100%;
  &:focus{
    outline-color: ${props => props.theme.colors.secondary};
  }
  &::placeholder {
    font-size: 1rem;
  }
`

export default TextArea