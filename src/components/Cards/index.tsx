import { Draggable } from 'react-beautiful-dnd'
import Card from './Card'


const Cards = ({ tasks, provided } : { tasks: any, provided: any }) => {

  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {
        tasks.map((task: any, index: number) => (
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
                <Card
                  task={task}
                />
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