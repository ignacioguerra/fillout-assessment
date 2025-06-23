import { IoFlag } from 'react-icons/io5'
import { useEffect, useRef } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import { LuClipboard, LuPenLine } from 'react-icons/lu'
import { PiCopyBold } from 'react-icons/pi'

type PageSettingsProps = {
  onDelete?: () => void
}   

function PageSettings({ onDelete }: PageSettingsProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus()
    }
  }, [])

  const items = [
    {
      id: 'set-first',
      label: 'Set as first page',
      action: () => console.log('Set as first page clicked'),
      icon: <IoFlag className="text-secondary" />,
    },
    {
      id: 'rename',
      label: 'Rename',
      action: () => console.log('Rename clicked'),
      icon: <LuPenLine className="text-gray-300" />
    },
    {
      id: 'copy',
      label: 'Copy',
      action: () => console.log('Copy clicked'),
      icon: <LuClipboard className="text-gray-300" />
    },
    {
      id: 'duplicate',
      label: 'Duplicate',
      action: () => console.log('Duplicate clicked'),
      icon: <PiCopyBold className="text-gray-300" />
    },
  ]

  return (
    <section
      className="flex flex-col min-w-60 bg-white border-1 border-gray-100 rounded-xl overflow-clip shadow-xs outline-0"
      ref={containerRef}
      tabIndex={0}
    >
      <header className="px-3 py-2 bg-gray-50 border-b-1 border-gray-100 font-medium">
        <h3>Settings</h3>
      </header>
      <div className="p-1 py-1.5 flex flex-col border-b-1 border-gray-100">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className="flex items-center gap-2.5 px-2 py-2 text-left hover:bg-gray-50 rounded cursor-pointer"
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="px-1 py-1.5 flex flex-col">
        <button
          className="flex items-center gap-2.5 px-2 py-2 text-left hover:bg-gray-50 rounded cursor-pointer text-danger"
          onClick={onDelete}
        >
          <HiOutlineTrash />
          <span className="text-sm">Delete</span>
        </button>
      </div>
    </section>
  )
}

export default PageSettings
