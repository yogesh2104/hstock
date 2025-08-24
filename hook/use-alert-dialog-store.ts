// hook/use-alert-dialog-store.ts
import { create } from 'zustand'
import Cookies from 'js-cookie'

interface AlertState {
  isAlertOpen: boolean
  checkAndShowAlert: () => void
  closeAlert: () => void
}

export const useDialogStore = create<AlertState>((set) => ({
  isAlertOpen: false,
  
  checkAndShowAlert: () => {
    const lastShown = Cookies.get('welcomeDialogShown')
    const today = new Date().toDateString()

    // If no cookie or cookie is not today → show dialog & set cookie
    if (!lastShown || lastShown !== today) {
      Cookies.set('welcomeDialogShown', today, { expires: 1 }) // expires in 1 day
      set({ isAlertOpen: true })
    }
  },

  closeAlert: () => set({ isAlertOpen: false }),
}))
