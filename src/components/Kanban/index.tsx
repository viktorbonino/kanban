import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { PlusIcon } from '@heroicons/react/solid'
import StyledKanban from 'ui/Kanban'
import Button from 'ui/Button'
import Column from 'components/Column'
import Cards from 'components/Cards'
import { dataSelector } from 'state/selectors'
import TasksAtom, { ITask } from 'state/atoms/tasks'
import SectionsAtom from 'state/atoms/sections'
import useModal from 'hooks/useModal'

const Kanban = () => {
  const [scrollSnap, setScrollSnap] = useState<boolean>(true)
  const data = useRecoilValue(dataSelector)
  const setTasks = useSetRecoilState(TasksAtom)
  const setSections = useSetRecoilState(SectionsAtom)

  const { openModal, EModalContent } = useModal()

  const onDragEnd = (result: DropResult) => {
    setScrollSnap(true)

    if (!result.destination) return

    const { source, destination, type } = result

    if(type === 'CARD') {
      if (source.droppableId !== destination.droppableId) {
        
        setTasks(oldTasks => {
          let sourceTasks = oldTasks.filter(task => task.sectionId === source.droppableId)
          let destinationTasks = oldTasks.filter(task => task.sectionId === destination.droppableId)
          const otherTasks = oldTasks.filter(task => 
            task.sectionId !== source.droppableId && task.sectionId !== destination.droppableId
          )

          const taskToMove: ITask = { ...sourceTasks[source.index], sectionId: destination.droppableId }

          sourceTasks.splice(source.index, 1)
          sourceTasks = sourceTasks.map((task, index) => ({ ...task, order: index }))

          destinationTasks.splice(destination.index, 0, taskToMove)
          destinationTasks = destinationTasks.map((task, index) => ({ ...task, order: index }))

          return [...sourceTasks, ...destinationTasks, ...otherTasks]
        })

      } else if(source.index !== destination.index) {

        setTasks(oldTasks => {
          const sourceTasks = oldTasks.filter(task => task.sectionId === source.droppableId)
          const otherTasks = oldTasks.filter(task => task.sectionId !== source.droppableId)
          const moveTask: ITask = sourceTasks[source.index]

          sourceTasks.splice(source.index, 1)
          sourceTasks.splice(destination.index, 0, moveTask)

          const newTasks = sourceTasks.map((task, index) => ({ ...task, order: index }))

          return [...newTasks, ...otherTasks]
        })

      }
    } else if (type === 'COLUMN' && source.index !== destination.index && destination.index !== 0) {
      setSections(oldSections => {
        const sectionToMove = oldSections[source.index]

        let newSections = oldSections.filter(section => section.order !== source.index)
        newSections.splice(destination.index, 0, sectionToMove)
        newSections = newSections.map((section, index) => ({ ...section, order: index }))
        
        return newSections
      })
    }
  }

  return (
    <DragDropContext onDragStart={() => setScrollSnap(false)} onDragEnd={onDragEnd}>
      <Droppable
        key="kanban"
        droppableId="kanban"
        direction="horizontal"
        type="COLUMN"
      >
        {(provided) => (
          <StyledKanban
            ref={provided.innerRef}
            {...provided.droppableProps}
            scrollSnap={scrollSnap}
          >
            {
              data.map((section, index) => (
                <Draggable
                  key={section.id}
                  draggableId={section.id}
                  index={index}
                  isDragDisabled={index === 0 ? true : false}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      css={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? '0.7' : '1',
                      }}
                    >
                      <Droppable
                        key={section.id}
                        droppableId={section.id}
                        type="CARD"
                      >
                        {(provided) => (
                          <Column
                            section={section}
                            provided={provided}
                          >
                            <Cards 
                              tasks={section.tasks} 
                              provided={provided} 
                            />
                          </Column>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <Button 
                css={{ height: '3.5rem', width: '3.5rem'}}
                onClick={() => openModal({
                  title: 'Add Section',
                  content: EModalContent.AddSection
                })}
              >
                <PlusIcon css={{ width: '2rem' }} />
              </Button>
          </StyledKanban>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Kanban