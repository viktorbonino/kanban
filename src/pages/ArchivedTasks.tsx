import { useRecoilValue, useSetRecoilState  } from 'recoil'
import { ArrowLeftIcon, TrashIcon, CheckIcon } from '@heroicons/react/solid'
import { archivedTasksSelector } from 'state/selectors'
import tasksAtom, { ITask } from 'state/atoms/tasks'
import { useTranslation } from 'react-i18next'
import Button from 'ui/Button'
import LinkButton from 'ui/LinkButton'
import Card from 'ui/Card'
import Header from 'ui/Header'

const ArchivedTasks = () => {
  const archivedTasks = useRecoilValue(archivedTasksSelector)
  const setTasks = useSetRecoilState(tasksAtom)

  const { t } = useTranslation()

  const deleteTask = (taskId: string) => {
    setTasks(oldTasks => {
    let newTasks = [...oldTasks.filter(t => t.id !== taskId)]
    newTasks = newTasks.map((task, i) => ({ ...task, order: i }))
    return newTasks
    })
  }

  const restoreTask = (task: ITask) => {
    setTasks(oldTasks => {
      let noStatusTasks = oldTasks.filter(t => t.sectionId === 'noStatus')
      let otherTasks = oldTasks.filter(t => t.id !== task.id)
      return [...otherTasks, { ...task, sectionId: 'noStatus', order: noStatusTasks.length, isArchived: false }]
    })
  }

  return (
    <div css={{ display: 'flex', flexDirection: 'column'}}>
      <Header>
        <LinkButton to='/'>
          <ArrowLeftIcon css={{ width: '1.5rem' }} />
        </LinkButton>
        <h1 css={{ display: 'flex', fontSize: '30px', marginLeft: 'auto', marginRight: 'auto' }}>{t('archivedTasks')}</h1>
        
      </Header>
      <div css={{ display: 'flex', flexDirection: 'column', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        {archivedTasks.map((task, index) => (
          <Card key={index}>
            {task.title}
            <div css={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              <Button onClick={() => deleteTask(task.id)}>
                <TrashIcon css={{ width: '1rem' }} />
              </Button>
              <Button onClick={() => restoreTask(task)}>
                <CheckIcon css={{ width: '1rem' }} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
        
      </div>
  )
}

export default ArchivedTasks