import { useSetRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import Button from 'ui/Button'
import TextField from 'ui/TextField'
import Form from 'ui/Form'
import SectionsAtom from 'state/atoms/sections'
import useModal from 'hooks/useModal'
import { useTranslation } from 'react-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'

interface AddSectionData {
  sectionName: string
}

const AddSection = () => {
  const setSections = useSetRecoilState(SectionsAtom)

  const { closeModal } = useModal()
  const { t } = useTranslation()

  const { register, handleSubmit, formState: { errors } } = useForm<AddSectionData>()

  const addSection: SubmitHandler<AddSectionData> = (data) => {
    setSections(oldSections => [...oldSections, { id: uuidv4(), title: data.sectionName, order: oldSections.length }])
    closeModal()
  }

  return (
    <Form onSubmit={handleSubmit(addSection)}>
      {errors.sectionName && <p>{t('sectionError')}</p>}
      <TextField 
        type="text" 
        {...register('sectionName', { required: true })}
        placeholder={t('sectionName')}
        autoFocus
      />
      <Button>{t('add')}</Button>
    </Form>
  )
}

export default AddSection