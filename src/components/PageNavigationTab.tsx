import Button from './common/Button'
import type { PageItem } from '../types/pages';
import ButtonGroup from './common/ButtonGroup';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useRef, useState } from 'react';
import PageNavigationTabSettings from './PageNavigationTabSettings'

type PageNavigationProps = {
  page: PageItem;
  isDragging?: boolean;
  onSelect?: (pageId: string) => void;
};

type ReactEvent = React.PointerEvent | React.MouseEvent | React.KeyboardEvent;

function PageNavigation({ page, onSelect, isDragging }: PageNavigationProps) {
  const [ isMenuVisible, setIsMenuVisible ] = useState(false)
  const nextIsMenuVisible = useRef(!isMenuVisible)

  const stop = (e: ReactEvent) => {
    e.stopPropagation()
  }
  const handlePageButtonClick = () => {
    onSelect?.(page.id)
  }
  const hanldeKeyDown = (e: React.KeyboardEvent) => {
    if(!page.selected) stop(e)
  }
  const handleSettingsPointerDown = (e: React.PointerEvent) => {
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
    stop(e);
  }

  return (
    <div className="relative">
      <ButtonGroup>
        <Button 
          PrependIcon={page.icon} 
          variant={(page.selected || isDragging) ? 'default' : 'tonal'}
          onClick={handlePageButtonClick}
          onKeyDown={hanldeKeyDown}
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
      {/* <div onMouseDown={stop}>
      <Button>
        +
      </Button>
      </div> */}
      { isMenuVisible &&
        <div className="absolute left-0 bottom-full -translate-y-2 select-none"
          onPointerDown={stop}
          onKeyDown={handleMenuKeyDown}
          onBlur={handleMenuBlur}
        >
          <div className="motion-safe:animate-fade">
            <PageNavigationTabSettings />
          </div>
        </div>
      }
    </div>
  )
}

export default PageNavigation
