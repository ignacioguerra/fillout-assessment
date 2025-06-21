import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import {arrayMove, horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates} from '@dnd-kit/sortable';
import { useState } from 'react';
import PageNavigationSortableItem from './PageNavigationSortableItem';
import Button from './common/Button';
import type { PageItem, PageList } from '../types/pages';

function PageNavigationSortable({ pageList }: { pageList: PageList }) {
  const [items, setItems] = useState([...pageList]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    
    if (over?.id && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item: PageItem) => item.id === active.id);
        const newIndex = items.findIndex((item: PageItem) => item.id === over.id);
        console.log(oldIndex, newIndex)
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        {items.map(page => <>
          <PageNavigationSortableItem key={page.id} id={page.id}>
            <Button PrependIcon={page.icon} variant={page.selected ? 'default' : 'tonal'}>
              {page.title}
            </Button>
          </PageNavigationSortableItem>
        </>)}
      </SortableContext>
    </DndContext>
  )
}

export default PageNavigationSortable
