import { Draggable,DroppableProvided } from 'react-beautiful-dnd'
import { ITask } from 'state/atoms/tasks'
import Card from './Card'


const Cards = ({ tasks, provided } : { tasks: ITask[], provided: DroppableProvided }) => {

  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {
        tasks.map((task: ITask, index: number) => (
          <Draggable
            key={task.id}
            draggableId={task.id}
            index={index}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                css={{
                  ...provided.draggableProps.style,
                  opacity: snapshot.isDragging ? '0.7' : '1'
                }}
              >
                <Card task={task} />
              </div>
            )}
          </Draggable>
        ))
      }
      {provided.placeholder}
    </div>
  )
}

export default Cards