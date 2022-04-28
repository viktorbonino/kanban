import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const Page404 = () => {
  const { t } = useTranslation()

  return(
    <div css={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      color: 'white',
      paddingTop: '5rem',
      gap: '1rem'
    }}>
      <ExclamationCircleIcon css={{ width: '10rem' }} />
      <h1 css={{ fontSize: '4rem' }}>{t('error404')}</h1>
      <Link to='/' css={{ fontSize: '2rem', color: 'white' }}>{t('error404Return')}</Link>
    </div>
  )
}

export default Page404