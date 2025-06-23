import { closestCenter, DndContext, DragOverlay, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import {arrayMove, horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates} from '@dnd-kit/sortable'
import { useState, type ReactNode, useEffect } from 'react'
import SortableItem from './SortableItem'
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers'

type SortableItem = {
  id: string
}

type SortableGroupProps<T extends SortableItem> = {
  items: T[]
  children: (item: T, settings?: { isOverlay?:boolean }) => ReactNode
  onDragStart?: (itemId: string) => void
  onDragEnd?: () => void
  onSort?: (newItems: T[]) => void
}

function SortableGroup<T extends SortableItem>({ items, children, onDragStart, onDragEnd, onSort }:SortableGroupProps<T>) {
  const [sortableItems, setSortableItems] = useState([...items])
  const [activeItem, setActiveItem] = useState<T | null>(null)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    setSortableItems([...items])
  }, [items])

  function handleDragEnd(event: DragEndEvent) {
    setActiveItem(null)
    const {active, over} = event
    if (over?.id && active.id !== over.id) {
      const oldIndex = sortableItems.findIndex((item: SortableItem) => item.id === active.id)
      const newIndex = sortableItems.findIndex((item: SortableItem) => item.id === over.id)
      onSort?.(arrayMove(sortableItems, oldIndex, newIndex))
    }
    onDragEnd?.()
  }

  function handleDragStart(event: DragStartEvent) {
    const draggedItemId = event.active.id as string
    const activeItem = items.find(item => item.id === draggedItemId)
    setActiveItem(activeItem??null)
    onDragStart?.(draggedItemId)
  }

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToHorizontalAxis,restrictToParentElement]}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext items={sortableItems} strategy={horizontalListSortingStrategy}>
        {sortableItems.map(item => (
          <SortableItem key={item.id} id={item.id}>
            {children(item)}
          </SortableItem>
        ))}
      </SortableContext>
      <DragOverlay>
        {activeItem && children(activeItem, { isOverlay: true })}
      </DragOverlay>
    </DndContext>
  )
}

export default SortableGroup
