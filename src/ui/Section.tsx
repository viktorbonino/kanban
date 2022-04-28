import styled from '@emotion/styled'

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 77vw;
  height: 100%;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.text.primary};
  border-radius: 10px;
  padding: 1rem;
  gap: 1rem;
  scroll-snap-align: center;
  @media (min-width: 768px) {
    width: 50vw;
  }
  @media (min-width: 1280px) {
    width: 28vw;
  }
  @media (min-width: 1536px) {
    width: 20vw;
  }
`
export const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  place-items: center;
  font-size: 1.2rem;
  font-weight: 700;
  min-height: 4rem;
  gap: 1rem;
`

export default StyledSection