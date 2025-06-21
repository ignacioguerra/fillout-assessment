import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

function PageNavigationSortableItem({ children, id }: { children: React.ReactNode, id: string }) {
  const {setNodeRef, attributes, listeners, transform,
    transition, } = useSortable({
    id: id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export default PageNavigationSortableItem
