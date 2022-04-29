import styled from '@emotion/styled'

interface StyledKanbanProps {
  scrollSnap: boolean
}
const StyledKanban = styled.div<StyledKanbanProps>(props => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  overflow: 'auto',
  width: '100%',
  flexGrow: 1,
  padding: '2rem',
  scrollSnapType: props.scrollSnap ? 'x mandatory' : 'none',
  scrollPaddingRight: '4.5rem',
  '@media (min-width: 1024px)': {
    gap: '1.5rem',
    scrollSnapType: 'none'
  },
}))

export default StyledKanban