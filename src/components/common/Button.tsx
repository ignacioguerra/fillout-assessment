import type { IconType } from 'react-icons'

type ButtonProps = {
  children?: React.ReactNode
  variant?: 'tonal' | 'default'
  PrependIcon?: IconType
  onClick?: (e: React.MouseEvent) => void
  onPointerDown?: (e: React.PointerEvent) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
}

function Button({ children, variant = 'default', PrependIcon, onClick, onKeyDown, onPointerDown }: ButtonProps) {

  return (
    <button className={`group bg-white rounded-lg cursor-pointer outline-0
      overflow-hidden shadow-xs
      border-1 border-gray-100 active:border-gray-100  focus-visible:border-secondary
      [.variant-tonal]:not-active:not-focus-visible:border-gray-300/15
      focus-visible:ring-secondary/25 focus-visible:ring-2
      [.variant-tonal]:not-active:not-focus-visible:shadow-none
      variant-${variant}
      group-not-empty/button-group:not-last:border-r-0 group-not-empty/button-group:not-first:border-l-0
      group-not-empty/button-group:not-last:rounded-r-none group-not-empty/button-group:not-first:rounded-l-none
    `}
    onClick={onClick}
    onKeyDown={onKeyDown}
    onPointerDown={onPointerDown}
    >
      <span className="flex items-center rounded-lg gap-1.5 pl-2.5 pr-2.5 py-1.25 transition-colors duration-200 h-full w-full
        bg-white hover:bg-gray-50 group-focus-visible:bg-white active:bg-white
        group-[.variant-tonal]:group-not-active:group-not-focus-visible:bg-gray-300/15
        group-[.variant-tonal]:group-not-active:group-not-focus-visible:group-hover:bg-gray-300/35
        group-active:duration-initial
        group-not-empty/button-group:group-not-last:rounded-r-none group-not-empty/button-group:group-not-first:rounded-l-none
        group-not-empty/button-group:group-not-last:pr-1 group-not-empty/button-group:group-not-first:pl-1
      ">
        {PrependIcon && <span className="text-xl text-primary transition-colors duration-200
          group-[.variant-tonal]:group-not-active:group-not-focus-visible:text-gray-400
        ">
          <PrependIcon />
        </span>}
        <span className="block text-sm text-black transition-colors duration-200 truncate
          group-[.variant-tonal]:group-not-active:group-not-focus-visible:text-gray-500
        ">
          {children}
        </span>
      </span>
    </button>
  )
}

export default Button
