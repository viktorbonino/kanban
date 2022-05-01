import { DroppableProvided } from 'react-beautiful-dnd'
import { useSetRecoilState } from 'recoil'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'
import Button from 'ui/Button'
import Section, { SectionTitle } from 'ui/Section'
import TextField from 'ui/TextField'
import TasksNumber from 'ui/TasksNumber'
import useModal from 'hooks/useModal'
import SectionsAtom from 'state/atoms/sections'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IData } from 'state/selectors'

interface Section {

}
const Column = ({ children, section, provided }: { children: React.ReactElement, section: IData, provided: DroppableProvided }) => {
  const [isEdit, setIsEdit] = useState(false)

  const setSections = useSetRecoilState(SectionsAtom)

  const { openModal, EModalContent } = useModal()

  const { t } = useTranslation()

  const { register, handleSubmit, resetField, formState: { errors } } = useForm<{ columnName: string }>({
    defaultValues: {
      columnName: section.title
    }
  })

  const editSection: SubmitHandler<{ columnName: string }> = ({ columnName}) => {
    setSections(oldSections => {
      const sectionToEdit = oldSections.find(s => s.id === section.id)
      const newSections = oldSections.filter(s => s.id !== section.id)
      sectionToEdit && newSections.splice(sectionToEdit.order, 0, { ...sectionToEdit, title: columnName })
      return newSections
    })
    setIsEdit(false)
  }
  const deleteSection = () => setSections(oldSections => {
    if(section.immutable) return oldSections
    return oldSections.filter(s => s.id !== section.id).map((s, index) => ({ ...s, order: index }))
  })

  return (
    <Section
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      {errors.columnName && <p>{t('sectionError')}</p>}
      <SectionTitle>
        <div css={{ display: 'flex', flexDirection: 'row', gap: '1rem', placeItems: 'center' }}>
          {isEdit ?
            <form onSubmit={handleSubmit(editSection)} id={section.title}>
              <TextField
                {...register('columnName', { required: true })}
                onKeyPress={(e) => {
                  if(e.key === 'Escape') {
                    setIsEdit(false)
                    resetField('columnName')
                  }
                }}
                onBlur={() => {
                  setIsEdit(false)
                  resetField('columnName')
                }}
                autoFocus
              /> 
            </form> : t(section.title)
          }
          {section.tasks.length > 0 && !isEdit && 
            <TasksNumber>
              {section.tasks.length}
            </TasksNumber>
          }
        </div>
        <div css={{ display: 'flex', flexDirection: 'row' }}>
          {!section.immutable && 
            <Button onClick={() => {
              setIsEdit(!isEdit)
              if(isEdit) handleSubmit(editSection)()
            }}
            >
              <PencilIcon css={{ width: '1.5rem' }} />
            </Button>
          }

          {section.tasks.length === 0 && !section.immutable && !isEdit &&
            <Button onClick={() => deleteSection()}>
              <TrashIcon css={{ width: '1.5rem' }} />
            </Button>
          }
        </div>
      </SectionTitle>

      {children}

      <Button onClick={() => openModal({ content: EModalContent.AddTask, title: t('addTask'), sectionId: section.id })}>
        <PlusIcon css={{ width: '1.5rem' }} />
      </Button>
    </Section>
  )
}

export default Column