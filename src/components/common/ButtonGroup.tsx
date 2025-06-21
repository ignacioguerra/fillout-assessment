import { useEffect, useState } from 'react'

function Button({ children, isActive = false }: { children: React.ReactNode, isActive: boolean }) {
  // const [ isActive, setIsActive ] = useState(initialIsActive)
  const [ baseClass, setBaseClass ] = useState("")

  useEffect(() => {
    setBaseClass(isActive ? "bg-white border-gray-100 shadow-xs" : "bg-gray-300/15 tborder-transparent")
  }, [isActive])

  return (
    <button className={`group text-sm border-1 rounded-lg px-2.5 py-1.5 cursor-pointer transition-all duration-200
      ${baseClass} 
      hover:bg-gray-300/35 
      focus-visible:bg-white focus-visible:border-secondary focus-visible:shadow-sm focus-visible:outline-0
      active:bg-white active:border-gray-100 active:shadow-xs active:duration-initial
    `}>
      <span className="text-gray-500">
        {children}
      </span>
    </button>
  )
}

export default Button
