import styled from '@emotion/styled'

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 10px;
  
`

export const CardLink = styled.a`
  color: ${props => props.theme.text.primary};
  &: hover {
    color: ${props => props.theme.text.secondary};
    cursor: pointer;
    text-decoration: underline;
  }
`

export default StyledCard