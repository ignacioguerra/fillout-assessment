import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import PageNavigation from './components/PageNavigation'
import type { PageList } from './types/pages'
import { IoCheckmarkCircleOutline, IoDocumentTextOutline, IoInformationCircleOutline } from 'react-icons/io5'

function App() {
  const [pageList, setPageList] = useState<PageList>([
    { id: uuidv4(), title: 'Info', selected: true, icon: IoInformationCircleOutline },
    { id: uuidv4(), title: 'Details', selected: false, icon: IoDocumentTextOutline },
    { id: uuidv4(), title: 'Other', selected: false, icon: IoDocumentTextOutline },
    { id: uuidv4(), title: 'Ending', selected: false, icon: IoCheckmarkCircleOutline },
  ])

  const handlePageSelected = (pageId: string) => {
    setPageList(prevList => 
      prevList.map(page => ({
        ...page,
        selected: page.id === pageId
      }))
    )
  }

  const handleSort = (newPageList: PageList) => {
    setPageList(newPageList)
  }

  const getDefaultPageTitle = () => {
    let newTitle = 'New Page'
    const newPagesCount = pageList.filter(page => page.title.startsWith(newTitle)).length
    if(newPagesCount > 0) {
      newTitle = `${newTitle} (${newPagesCount})`
    }
    return newTitle
  }

  const handleAddPage = (index?: number) => {
    const newPage = {
      id: uuidv4(),
      title: getDefaultPageTitle(),
      selected: true,
      icon: IoDocumentTextOutline
    }

    setPageList(prevList => {
      const newList = prevList.map(page => ({
        ...page,
        selected: false
      }))
      if (index !== undefined) {
        newList.splice(index+1, 0, newPage)
      } else {
        newList.push(newPage)
      }
      return newList
    })
  }

  return (
    <>
      <div className="flex flex-col gap-5 p-5 min-h-[100vh]">
        <div className="flex-1 bg-[#16213a] rounded-2xl text-white flex items-center justify-center font-bold text-4xl">
          {pageList.find(page => page.selected)?.title}
        </div>
        <div className="flex justify-start">
          <PageNavigation pageList={pageList}
            onPageSelected={handlePageSelected}
            onSort={handleSort}
            onAddPage={handleAddPage}
          />
        </div>
      </div>
    </>
  )
}

export default App
