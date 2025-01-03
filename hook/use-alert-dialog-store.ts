import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AlertState {
  isAlertOpen: boolean
  showAlert: () => void
  closeAlert: () => void
}

export const useDialogStore = create<AlertState>()(
  persist(
    (set) => ({
      isAlertOpen: false,
      showAlert: () =>  set({ isAlertOpen: true }),
      closeAlert: () => set({ isAlertOpen: false }),
    }),
    {
      name: 'dialog-storage',
    }
  )
)