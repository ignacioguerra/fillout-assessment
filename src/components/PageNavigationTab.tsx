import Button from './common/Button'
import type { PageItem } from '../types/pages'
import ButtonGroup from './common/ButtonGroup'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useRef, useState } from 'react'
import PageSettings from './PageSettings'
import PageNavigationAddButton from './PageNavigationAddButton'

type PageNavigationTabProps = {
  page: PageItem
  isDragging?: boolean
  withAddAfterButton?:boolean
  onSelect?: (pageId: string) => void
  onAddAfter?: (pageId: string) => void
}    

type ReactEvent = React.PointerEvent | React.MouseEvent | React.KeyboardEvent

function PageNavigationTab({ page, onSelect, isDragging, withAddAfterButton, onAddAfter }: PageNavigationTabProps) {
  const [ isMenuVisible, setIsMenuVisible ] = useState(false)
  // We use nextIsMenuVisible to avoid immediately reopening the menu when the settings button
  // is clicked right after the menu was closed by a blur event. This helps prevent unwanted
  // toggling due to the sequence of pointer and blur events in React.
  const nextIsMenuVisible = useRef(!isMenuVisible)

  const stop = (e: ReactEvent) => {
    e.stopPropagation()
  }
  const handlePageButtonClick = () => {
    onSelect?.(page.id)
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if(!page.selected) stop(e)
  }
  const handleSettingsPointerDown = () => {
    nextIsMenuVisible.current = !isMenuVisible
  }
  const handleSettingsButtonClick = (e: React.MouseEvent) => {
    if(nextIsMenuVisible.current !== isMenuVisible) {
      setIsMenuVisible(nextIsMenuVisible.current)
    }
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
            onPointerDown={handleSettingsPointerDown}
            onClick={handleSettingsButtonClick}
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
            <PageSettings />
          </div>
        </div>
      }
      { withAddAfterButton && <PageNavigationAddButton pageTitle={page.title} onClick={handleAddAfterClick}/> }
    </div>
  )
}

export default PageNavigationTab
