import { useSortable } from "@dnd-kit/sortable"
import {CSS} from '@dnd-kit/utilities'

type SortableItemProps = {
  children?: React.ReactNode,
  id: string
}

function SortableItem({ children, id }:SortableItemProps) {
  const {
    setNodeRef,
    listeners,
    transform,
    transition, 
  } = useSortable({
    id: id,
    transition: {
      duration: 350,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }
  return (
    <div ref={setNodeRef} style={style} {...listeners}>
      {children}
    </div>
  )
}

export default SortableItem
