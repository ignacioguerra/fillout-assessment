import Button from './components/common/Button'
import { IoAdd, IoDocumentTextOutline } from "react-icons/io5";

function App() {

  return (
    <>
      <div className="flex flex-col gap-5 p-5 min-h-[100vh]">
        <div className="flex-1 bg-gray-100/50 rounded-2xl">
          
        </div>
        <div className="flex justify-start">
          <div className="flex gap-5 relative">
            <div className="absolute border-t-1 border-gray-200 border-dashed top-1/2 left-0 right-0"></div>
            <div className="flex gap-5 relative">
              <Button PrependIcon={IoDocumentTextOutline}>Info</Button>
              <Button PrependIcon={IoDocumentTextOutline} variant='tonal'>Info</Button>
              <Button PrependIcon={IoDocumentTextOutline} variant='tonal'>Info</Button>
              <Button PrependIcon={IoDocumentTextOutline} variant='tonal'>Info</Button>
            </div>
            <div className="relative">
              <Button>
                <span className="flex items-center gap-1.5">
                  <IoAdd className="text-lg" /> Add page
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
