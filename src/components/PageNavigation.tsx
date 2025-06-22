import Button from './common/Button'
import { IoAdd } from "react-icons/io5";
import type { PageList } from '../types/pages';
import SortableContainer from './common/SortableContainer';
import ButtonGroup from './common/ButtonGroup';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useState } from 'react';

function PageNavigation(
  { pageList, onPageSelected, onSort, onAddPage }: { 
    pageList: PageList;
    onPageSelected?: (pageId: string) => void;
    onSort?: (pageList: PageList) => void;
    onAddPage?: (index?: number) => void;
  }) {
  const [ draggingPageId, setDraggingPageId ] = useState<string|null>(null)
  
  const handleDragStart = (pageId: string) => {
    setDraggingPageId(pageId)
  }

  const handleDragEnd = () => {
    setDraggingPageId(null)
  }

  const handlePageButtonClick = (pageId: string) => {
    onPageSelected?.(pageId)
  }

  const handleAddPageButtonClick = () => {
    onAddPage?.()
  }

  const handleSort = (pageList: PageList) => {
    onSort?.(pageList)
  }

  return (
    <div className="flex items-center gap-5 relative">
      <div className="absolute border-t-1 border-gray-200 border-dashed top-1/2 left-0 right-0" />
      <div className="flex items-center gap-5 relative z-2">
        <SortableContainer items={pageList} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onSort={handleSort}>
          {(page, { overlay } = { overlay: false }) => (
            <div className={`
              ${(page.id === draggingPageId && !overlay) ? 'opacity-0' : ''}
              ${(page.id === draggingPageId && overlay) ? 'shadow-lg' : ''}
            `}>
              <ButtonGroup>
                <Button 
                  PrependIcon={page.icon} 
                  variant={(page.selected || page.id === draggingPageId) ? 'default' : 'tonal'}
                  onClick={() => handlePageButtonClick(page.id)}
                >
                  {page.title}
                </Button>
                <>{page.selected && (
                  <Button>
                    <BiDotsVerticalRounded />
                  </Button>
                )}</>
              </ButtonGroup>
            </div>
          )}
        </SortableContainer>
      </div>
      <div className="relative z-1">
        <Button onClick={handleAddPageButtonClick}>
          <span className="flex items-center gap-1.5">
            <IoAdd className="text-lg" /> Add page
          </span>
        </Button>
      </div>
    </div>
  )
}

export default PageNavigation
