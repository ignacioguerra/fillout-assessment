import { IoAdd } from 'react-icons/io5'

type PageNavigationAddButtonProps = {
  pageTitle: string,
  onClick?: (e: React.MouseEvent) => void
}

function PageNavigationAddButton({ pageTitle, onClick }: PageNavigationAddButtonProps) {

  return (
    <div className="group relative w-5 hover:w-10 has-focus-visible:w-10 transition-all duration-200 overflow-clip">
      <button className="absolute inset-0 m-auto w-4 h-4 transition-all duration-200
        flex justify-center items-center rounded-full shadow-xs cursor-pointer outline-0
        bg-white hover:bg-gray-50 focus-visible:bg-white active:bg-white
        border-1 border-gray-100 active:border-gray-100  focus-visible:border-secondary     
        scale-0 group-hover:scale-100 focus-visible:scale-100"
        onClick={onClick}
        onMouseDown={(e) => e.preventDefault()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <IoAdd /> <span className="sr-only">Add page after {pageTitle}</span>
      </button>
    </div>
  )
}

export default PageNavigationAddButton
