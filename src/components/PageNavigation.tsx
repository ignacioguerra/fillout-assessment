import Button from './common/Button'
import { IoAdd } from "react-icons/io5";
import type { PageList } from '../types/pages';
import PageNavigationSortable from './PageNavigationSortable';

function PageNavigation({ pageList }: { pageList: PageList }) {



  return (
    <div className="flex items-center gap-5 relative">
      <div className="absolute border-t-1 border-gray-200 border-dashed top-1/2 left-0 right-0"></div>
      <div className="flex gap-5 relative">
        <PageNavigationSortable pageList={pageList} />
      </div>
      <div className="relative">
        <Button>
          <span className="flex items-center gap-1.5">
            <IoAdd className="text-lg" /> Add page
          </span>
        </Button>
      </div>
    </div>
  )
}

export default PageNavigation
