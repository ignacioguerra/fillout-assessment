import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import PageNavigation from './components/PageNavigation';
import type { PageList } from './types/pages';
import { IoCheckmarkCircleOutline, IoDocumentTextOutline, IoInformationCircleOutline } from 'react-icons/io5';

function App() {
  const [pageList, setPageList] = useState<PageList>([
    { id: uuidv4(), title: 'Info', selected: true, icon: IoInformationCircleOutline },
    { id: uuidv4(), title: 'Details', selected: false, icon: IoDocumentTextOutline },
    { id: uuidv4(), title: 'Other', selected: false, icon: IoDocumentTextOutline },
    { id: uuidv4(), title: 'Ending', selected: false, icon: IoCheckmarkCircleOutline },
  ]);

  const handlePageSelected = (pageId: string) => {
    setPageList(prevList => 
      prevList.map(page => ({
        ...page,
        selected: page.id === pageId
      }))
    );
  };

  const handleOnSort = (newPageList: PageList) => {
    setPageList(newPageList)
  }

  return (
    <>
      <div className="flex flex-col gap-5 p-5 min-h-[100vh]">
        <div className="flex-1 bg-gray-100/50 rounded-2xl" />
        <div className="flex justify-start">
          <PageNavigation pageList={pageList}
            onPageSelected={handlePageSelected}
            onSort={handleOnSort}
          />
        </div>
      </div>
    </>
  )
}

export default App
