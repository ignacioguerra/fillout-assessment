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

  const createPage = () => {
    return {
      id: uuidv4(),
      title: 'Other',
      selected: true,
      icon: IoDocumentTextOutline
    }
  }

  const handleAddPage = (index?: number) => {
    const newPage = createPage()

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

  const handleDeletePage = (pageId: string) => {
    setPageList(prevList => {
      const pageIndex = prevList.findIndex(page => page.id === pageId)
      if (pageIndex === -1 || !prevList[pageIndex].selected) {
        return prevList
      }
      const newList = prevList.filter(page => page.id !== pageId)
      const newSelectedIndex = pageIndex > 1 ? pageIndex - 1 : 0
      if(newList.length === 0) {
        newList.push(createPage())
      }
      return newList.map((page, idx) => ({
        ...page,
        selected: idx === newSelectedIndex
      }))
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
            onDeletePage={handleDeletePage}
          />
        </div>
      </div>
    </>
  )
}

export default App
