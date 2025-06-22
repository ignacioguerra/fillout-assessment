import Button from './common/Button'
import { IoAdd } from "react-icons/io5";
import type { PageList } from '../types/pages';
import SortableContainer from './common/SortableContainer';


function PageNavigation(
  { pageList, onPageSelected, onSort }: { 
    pageList: PageList;
    onPageSelected?: (pageId: string) => void;
    onSort?: (pageList: PageList) => void;
  }) {

  const handleOnDragStart = (pageId: string) => {
    onPageSelected?.(pageId)
  }

  return (
    <div className="flex items-center gap-5 relative">
      <div className="absolute border-t-1 border-gray-200 border-dashed top-1/2 left-0 right-0"></div>
      <div className="flex gap-5 relative">
        <SortableContainer items={pageList} onDragStart={handleOnDragStart} onSort={onSort}>
          {(page) => (
            <Button 
              PrependIcon={page.icon} 
              variant={page.selected ? 'default' : 'tonal'}
            >
              {page.title}
            </Button>
          )}
        </SortableContainer>
      </div>
      <div className="relative">
        <Button>
          <span className="flex items-center gap-1.5">
            <IoAdd className="text-lg" /> Add page
          </span>
        </Button>
      </div>
    </div>
  )
}

export default PageNavigation
