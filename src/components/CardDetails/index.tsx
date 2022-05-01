import { useState } from 'react'
import tasksAtom, { getTask } from 'state/atoms/tasks'
import sectionsAtom from 'state/atoms/sections'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import useModal from 'hooks/useModal'
import Button from 'ui/Button'
import TextField from 'ui/TextField'
import TextArea from 'ui/TextArea'
import Select from 'ui/Select'
import { PencilIcon, CheckIcon, XIcon, ArchiveIcon, TrashIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'

interface AddTaskData {
  taskTitle: string
  taskDescription: string
  archiveTask: boolean
}

const CardDetails = () => {
  const setTasks = useSetRecoilState(tasksAtom)
  const { modal, closeModal } = useModal()
  const task = useRecoilValue(getTask(modal.taskId))
  const sections = useRecoilValue(sectionsAtom)

  const [isEditTitle, setIsEditTitle] = useState<boolean>(false)
  const [isEditDescription, setIsEditDescription] = useState<boolean>(false)

  const { t } = useTranslation()

  const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm<AddTaskData>({
    defaultValues: {
      taskTitle: task?.title,
      taskDescription: task?.description,
      archiveTask: false,
    }
  })

  const editTask: SubmitHandler<AddTaskData> = (data) => {
    setTasks(oldTasks => {
      if(task) {
        let newTasks = [...oldTasks]
        newTasks[newTasks.findIndex(t => t.id === task.id)] = {
          ...task,
          title: data.taskTitle,
          description: data.taskDescription,
          isArchived: data.archiveTask
        }
        return newTasks
      }
      else return oldTasks
    })
  }

  const editTaskSection = (sectionId: string) => setTasks(oldTasks => {
    let sourceSectionTasks = oldTasks.filter(t => t.sectionId === task?.sectionId)
    let targetSectionTasks = oldTasks.filter(t => t.sectionId === sectionId)
    let otherSections = oldTasks.filter(t => t.sectionId !== sectionId && t.sectionId !== task?.sectionId)

    if(task) {
      sourceSectionTasks.splice(task?.order, 1)

      sourceSectionTasks.map((t, i) => ({ ...t, order: i }))
      targetSectionTasks.push({ ...task, sectionId, order: targetSectionTasks.length })
    }

    return [...otherSections, ...sourceSectionTasks, ...targetSectionTasks]
  })

  const deleteTask = () => {
    setTasks(oldTasks => {
      let newTasks = [...oldTasks.filter(t => t.id !== task?.id)]
      newTasks = newTasks.map((task, i) => ({ ...task, order: i }))
      return newTasks
    })
    closeModal()
  }

  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div css={{ display: 'flex', flexDirection: 'row', placeItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        
        {isEditTitle ? 
          <TextField
            {...register('taskTitle', { required: true })}
            autoFocus
            css={{ width: '100%' }}
          /> : <p css={{ fontSize: '1.5rem'}}>{task?.title}</p>
        }
        {isEditTitle ? 
          <div css={{ display: 'flex', flexDirection: 'row' }}>
            <Button 
              onClick={() => {
                setIsEditTitle(false)
                resetField('taskTitle')
              }}
            >
              <XIcon css={{ width: '1.5rem' }} />
            </Button>
            <Button 
              onClick={() => {
                handleSubmit(editTask)()
                setIsEditTitle(false)
              }}
            >
              <CheckIcon css={{ width: '1.5rem' }} />
            </Button>
          </div>
          :
          <Button onClick={() => setIsEditTitle(true)}><PencilIcon css={{ width: '1.5rem' }} /></Button>
        }
      </div>

      <p css={{ fontSize: '1.1rem' }}>
        {`${t('opened')} ${task && new Date(task.createdAt).toLocaleDateString(undefined, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric' 
          })}
        `}
      </p>

      <div css={{ display: 'flex', flexDirection: 'row', placeItems: 'center', justifyContent: 'space-between' }}>
        <p css={{ fontSize: '1.5rem', fontWeight: 700, overflowY: 'auto' }}>{t('taskDescription')}</p>
        {isEditDescription ? 
          <div css={{ display: 'flex', flexDirection: 'row' }}>
            <Button 
              onClick={() => {
                resetField('taskDescription')
                setIsEditDescription(false)
              }}
            >
              <XIcon css={{ width: '1.5rem' }} />
            </Button>
            <Button 
              onClick={() => {
                handleSubmit(editTask)()
                setIsEditDescription(false)
              }}
            >
              <CheckIcon css={{ width: '1.5rem' }} />
            </Button>
          </div> :
          <Button onClick={() => setIsEditDescription(true)}><PencilIcon css={{ width: '1.5rem' }} /></Button>
        }
      </div>

      {isEditDescription ?
        <TextArea
          {...register('taskDescription')}
          placeholder={t('taskDescription')}
          rows={6}
        />
        : 
        <div css={{ overflowY: 'auto'}}><p css={{ whiteSpace: 'pre-line', wordWrap: 'break-word', fontSize: '1rem' }}>
          {task?.description !== '' ? task?.description : t('noDescription')}
        </p></div>
      }

      <p css={{ fontSize: '1.5rem', fontWeight: 700 }}>{t('status')}</p>
      <Select value={task?.sectionId} onChange={(e) => {
          editTaskSection(e.target.value)
        }}
      >
        {sections.map(section => <option css={{ borderRadius: '10px' }} value={section.id} key={section.id}>{t(section.title)}</option>)}
      </Select>
      
      <div css={{ display: 'flex', flexDirection: 'row', gap: '1rem', paddingTop: '4rem', paddingBottom: '2rem', width: '100%' }}>
        <Button onClick={() => {
          setValue('archiveTask', true)
          handleSubmit(editTask)()
          closeModal()
        }} css={{ width: '100%' }}>
          <ArchiveIcon css={{ width: '1.5rem' }} />
          {t('archiveTask')}
        </Button>
        <Button onClick={deleteTask} css={{ width: '100%' }}>
          <TrashIcon css={{ width: '1.5rem' }} />
          {t('deleteTask')}
        </Button>
      </div>
    </div>
  )
}

export default CardDetails