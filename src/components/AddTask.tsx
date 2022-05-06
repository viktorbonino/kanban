import { useSetRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import Button from 'ui/Button' 
import TextField from 'ui/TextField'
import TextArea from 'ui/TextArea'
import Form from 'ui/Form'
import TasksAtom from 'state/atoms/tasks'
import useModal from 'hooks/useModal'
import { useTranslation } from 'react-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'

interface AddTaskData {
  taskName: string
  taskDescription: string
}

const AddCard = () => {
  const setTasks = useSetRecoilState(TasksAtom)
  const { modal, closeModal } = useModal()
  const { t } = useTranslation()

  const { register, handleSubmit, formState: { errors } } = useForm<AddTaskData>()

  const addTask: SubmitHandler<AddTaskData> = (data) => {
    setTasks(oldTasks => [
      ...oldTasks, 
      { 
        sectionId : modal.sectionId, 
        id: uuidv4(), 
        title: data.taskName,
        description: data.taskDescription,
        order: oldTasks.filter(task => task.sectionId === modal.sectionId).length,
        createdAt: new Date().toISOString(),
        isArchived: false
      }
    ])
    closeModal()
  }
  
  return (
    <Form onSubmit={handleSubmit(addTask)}>
      {errors.taskName && <p>{t('taskError')}</p>}
      <TextField
        type='text'
        placeholder={t('addTask')}
        autoFocus
        {...register('taskName',{ required: true })}
      />
      <TextArea
        placeholder={t('taskDescription')}
        rows={3}
        {...register('taskDescription')}
      />
      <Button>{t('add')}</Button>
    </Form>
  )
}

export default AddCard