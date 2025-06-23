import Button from './common/Button'
import { IoAdd } from "react-icons/io5";
import type { PageList } from '../types/pages';
import SortableContainer from './common/SortableContainer';
import { useState } from 'react';
import PageNavigationTab from './PageNavigationTab'

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

  const handlePageSelect = (pageId: string) => {
    onPageSelected?.(pageId)
  }

  const handleAddAfter = (pageId: string) => {
    const index = pageList.findIndex(page => page.id === pageId);
    onAddPage?.(index)
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
      <div className="flex items-center relative z-2">
        <SortableContainer items={pageList} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onSort={handleSort}>
          {(page, { isOverlay } = { isOverlay: false }) => {
            const isDragging = page.id === draggingPageId
            const isShadow = isDragging && !isOverlay
            return (
              <div className={`
                ${isShadow ? 'opacity-0' : ''}
                ${isOverlay ? 'motion-safe:animate-drag' : 'motion-safe:animate-fade'}
              `}>
                <PageNavigationTab
                  page={page}
                  isDragging={isDragging}
                  onSelect={handlePageSelect}
                  onAddAfter={handleAddAfter}
                  withAddAfterButton={page.id !== pageList[pageList.length - 1].id}
                />
              </div>
            )
          }}
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
