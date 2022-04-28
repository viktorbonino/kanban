import React from 'react'
import StyledCard, { CardLink } from 'ui/Card'
import { ITask } from 'state/atoms/tasks'
import useModal from 'hooks/useModal'
import { useTranslation } from 'react-i18next'

const Card = ({ task }: { task: ITask }) => {

  const { openModal, EModalContent } = useModal()
  const { t } = useTranslation()

  return(
    <StyledCard>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }} 
      >
        <CardLink onClick={() => openModal({
          content: EModalContent.ViewTask, 
          title: t('taskDetails'), 
          taskId: task.id
        })}>
          {task.title}
        </CardLink>
      </div>
    </StyledCard>
  )
}

export default React.memo(Card)