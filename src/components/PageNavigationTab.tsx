import Button from './common/Button'
import type { PageItem } from '../types/pages'
import ButtonGroup from './common/ButtonGroup'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import PageSettings from './PageSettings'
import PageNavigationAddButton from './PageNavigationAddButton'

type PageNavigationTabProps = {
  page: PageItem
  isDragging?: boolean
  withAddAfterButton?:boolean
  onSelect?: (pageId: string) => void
  onAddAfter?: (pageId: string) => void
  onDeletePage?: (pageId: string) => void
}    

type ReactEvent = React.PointerEvent | React.MouseEvent | React.KeyboardEvent

function PageNavigationTab({ page, onSelect, isDragging, withAddAfterButton, onAddAfter, onDeletePage }: PageNavigationTabProps) {
  const [ isMenuVisible, setIsMenuVisible ] = useState(false)

  useEffect(() => {
    setIsMenuVisible(false)
  },[page])

  const stop = (e: ReactEvent) => {
    e.stopPropagation()
  }
  const prevent = (e: React.PointerEvent) => {
    e.preventDefault();
  }
  const handlePageButtonClick = () => {
    onSelect?.(page.id)
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if(!page.selected) stop(e)
  }
  const handleSettingsButtonClick = (e: React.MouseEvent) => {
    setIsMenuVisible(!isMenuVisible)
    stop(e)
  }
  const handleMenuBlur = (e: React.FocusEvent) => {
    const parent = e.currentTarget
    if (!parent.contains(e.relatedTarget)) {
      setIsMenuVisible(false)
    }
    e.preventDefault()
  }
  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMenuVisible(false)
    }
    stop(e)
  }
  const handleAddAfterClick = () => {
    onAddAfter?.(page.id)
  }

  return (
    <div className="relative flex">
      <ButtonGroup>
        <Button 
          PrependIcon={page.icon} 
          variant={(page.selected || isDragging) ? 'default' : 'tonal'}
          onClick={handlePageButtonClick}
          onKeyDown={handleKeyDown}
        >
          {page.title}
        </Button>
        <>{page.selected && (
          <Button
            onClick={handleSettingsButtonClick}
            onPointerDown={prevent}
            onKeyDown={stop}
          >
            <span className="text-gray-300 text-base"><BiDotsVerticalRounded /></span>
            <span className="sr-only">Page settings</span>
          </Button>
        )}</>
      </ButtonGroup>
      { isMenuVisible &&
        <div className="absolute left-0 bottom-full -translate-y-2 select-none"
          onPointerDown={stop}
          onMouseDown={stop}
          onKeyDown={handleMenuKeyDown}
          onBlur={handleMenuBlur}
        >
          <div className="motion-safe:animate-popover">
            <PageSettings onDelete={() => onDeletePage?.(page.id)} />
          </div>
        </div>
      }
      { withAddAfterButton && <PageNavigationAddButton pageTitle={page.title} onClick={handleAddAfterClick}/> }
    </div>
  )
}

export default PageNavigationTab
