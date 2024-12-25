import { create } from 'zustand'

type Store = {
  isOpen: boolean
  setIsOpen: (val:boolean) => void
}

export const useUseSideBar = create<Store>()((set) => ({
    isOpen: false,
  setIsOpen: (val) => set(() => ({ isOpen: val })),
}))