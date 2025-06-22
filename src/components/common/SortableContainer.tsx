import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import {arrayMove, horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates} from '@dnd-kit/sortable';
import { useState, type ReactNode, useEffect } from 'react';
import SortableItem from './SortableItem';

type SortableItem = {
  id: string;
}

function SortableContainer<T extends SortableItem>(
  { items, children, onDragStart, onSort }: { 
    items: T[], 
    children: (item: T) => ReactNode,
    onDragStart?: (itemId: string) => void,
    onSort?: (newItems: T[]) => void
  }
) {
  const [sortableItems, setSortableItems] = useState([...items]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setSortableItems([...items]);
  }, [items]);

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    if (over?.id && active.id !== over.id) {
      const oldIndex = sortableItems.findIndex((item: SortableItem) => item.id === active.id);
      const newIndex = sortableItems.findIndex((item: SortableItem) => item.id === over.id);
      onSort?.(arrayMove(sortableItems, oldIndex, newIndex));
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const draggedItemId = event.active.id as string;
    onDragStart?.(draggedItemId);
  }

  return (
    <DndContext
      sensors={sensors}
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
    </DndContext>
  )
}

export default SortableContainer
