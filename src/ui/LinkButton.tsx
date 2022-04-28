import { Link } from 'react-router-dom'

const LinkButton = ({ children, to }: { children: React.ReactNode, to: string }) => {
  return (
    <Link 
      to={to}
      css={theme => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontSize: '1rem',
        fontWeight: 700,
        backgroundColor: theme.colors.primary,
        border: 'none',
        color: theme.text.primary,
        padding: '1em',
        textDecoration: 'none',
        borderRadius: '10px',
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: theme.colors.tertiary,
        }
      })}
    >
      {children}
    </Link>
  )
}

export default LinkButton