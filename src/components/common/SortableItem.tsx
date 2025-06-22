import { useSortable } from "@dnd-kit/sortable";
import {CSS, type Transform} from '@dnd-kit/utilities';

function SortableItem({ children, id }: { children: React.ReactNode, id: string }) {
  const {
    setNodeRef,
    listeners,
    transform,
    transition, 
  } = useSortable({
    id: id,
  });
  const style = {
    transform: CSS.Translate.toString({...transform, y: 0} as Transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners}>
      {children}
    </div>
  )
}

export default SortableItem
