import Button from './common/Button'
import { IoAdd } from "react-icons/io5";
import type { PageList } from '../types/pages';
import SortableContainer from './common/SortableContainer';


function PageNavigation(
  { pageList, onPageSelected, onSort, onAddPage }: { 
    pageList: PageList;
    onPageSelected?: (pageId: string) => void;
    onSort?: (pageList: PageList) => void;
    onAddPage?: (index?: number) => void;
  }) {

  const handleOnDragStart = (pageId: string) => {
    onPageSelected?.(pageId)
  }

  const handleOnAddPageButtonClick = () => {
    onAddPage?.()
  }

  return (
    <div className="flex items-center gap-5 relative overflow-auto">
      <div className="absolute border-t-1 border-gray-200 border-dashed top-1/2 left-0 right-0"></div>
      <div className="flex items-center gap-5 relative z-2">
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
      <div className="relative z-1">
        <Button onClick={handleOnAddPageButtonClick}>
          <span className="flex items-center gap-1.5">
            <IoAdd className="text-lg" /> Add page
          </span>
        </Button>
      </div>
    </div>
  )
}

export default PageNavigation
