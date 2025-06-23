import type { IconType } from 'react-icons'

export type PageItem = {
  id: string
  title: string
  selected: boolean
  icon: IconType
}

export type PageList = PageItem[]
