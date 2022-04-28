import { useEffect, useState } from 'react'
import { PlusIcon, ArchiveIcon, MoonIcon, SunIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { useTranslation } from 'react-i18next'
import themeAtom from 'state/atoms/theme'
import LinkButton from 'ui/LinkButton'
import Header from 'ui/Header'
import Button from 'ui/Button'
import Kanban from 'components/Kanban'
import Modal from 'components/Modal'
import AddSection from 'components/AddSection'
import AddTask from 'components/AddTask'
import CardDetails from 'components/CardDetails'
import useModal from 'hooks/useModal'

const KanbanPage = () => {
  const { modal, EModalContent } = useModal()
  const [theme, setTheme] = useRecoilState(themeAtom)
  const { t, i18n } = useTranslation()

  return (
    <div css={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', justifyContent: 'space-between' }}>
      <Header>
        <LinkButton to='/archivedTasks'>
          <ArchiveIcon css={{ width: '1.5rem' }} /> {t('archivedTasks')}
        </LinkButton>
        <Button 
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'it' : 'en')}
        >
          {i18n.language.toUpperCase()}
        </Button>
        <Button 
          onClick={() => setTheme(!theme)}
        >
          {theme ? <MoonIcon css={{ width: '1.5rem' }} /> : <SunIcon css={{ width: '1.5rem' }} />}
        </Button>
      </Header>
      <Kanban />
      <Modal>
        {modal.content === EModalContent.AddSection && <AddSection />}
        {modal.content === EModalContent.AddTask && <AddTask />}
        {modal.content === EModalContent.ViewTask && <CardDetails />}
      </Modal>
    </div>
  )
}

export default KanbanPage