import Button from './common/Button'
import type { PageItem } from '../types/pages';
import ButtonGroup from './common/ButtonGroup';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useState } from 'react';
import PageNavigationTabSettings from './PageNavigationTabSettings'

type PageNavigationProps = {
  page: PageItem;
  isDragging?: boolean;
  onSelect?: (pageId: string) => void;
};

type ReactEvent = React.PointerEvent | React.MouseEvent | React.KeyboardEvent;

function PageNavigation({ page, onSelect, isDragging }: PageNavigationProps) {
  const [ isMenuVisible, setIsMenuVisible ] = useState(false)

  // useEffect(() => {
  //   const closeMenu = () => setIsMenuVisible(false)
  //   window.addEventListener('pointerdown', closeMenu)
  //   return () => {
  //     window.removeEventListener('pointerdown', closeMenu)
  //   };
  // }, [isMenuVisible])

  const stop = (e: ReactEvent) => {
    e.stopPropagation()
  }
  const openMenu =  () => {
    setIsMenuVisible(true)
  }
  const closeMenu = () => {
    setIsMenuVisible(false)
  }
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  const handlePageButtonClick = () => {
    onSelect?.(page.id)
  }

  const hanldeKeyDown = (e: React.KeyboardEvent) => {
    if(!page.selected) stop(e)
  }

  const handleSettingsButtonClick = (e: React.MouseEvent) => {
    toggleMenu()
    stop(e)
  }

  const handleSettingsButtonKeyDown = (e: React.KeyboardEvent) => {
    console.log("Add")
    stop(e)
  }

  const handleMenuBlur = (e: React.FocusEvent) => {
    const parent = e.currentTarget
    if (!parent.contains(e.relatedTarget)) {
      closeMenu()
    }
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
          <Button onClick={handleSettingsButtonClick} onKeyDown={handleSettingsButtonKeyDown}>
            <span className="text-gray-300 text-base"><BiDotsVerticalRounded /></span>
            <span className="sr-only">Page options</span>
          </Button>
        )}</>
      </ButtonGroup>
      {/* <div onMouseDown={stop}>
      <Button>
        +
      </Button>
      </div> */}
      { isMenuVisible &&
        <div className="absolute left-0 bottom-full -translate-y-2"
          onPointerDown={stop}
          onKeyDown={stop}
          onBlur={handleMenuBlur}
        >
          <PageNavigationTabSettings />
        </div>
      }
    </div>
  )
}

export default PageNavigation
