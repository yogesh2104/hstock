'use client'

import { useDialogStore } from "@/hook/use-alert-dialog-store"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEffect } from "react"

export const WelcomeDialog = () => {
  const { isAlertOpen, checkAndShowAlert, closeAlert } = useDialogStore()

  useEffect(() => {
    checkAndShowAlert()
  }, [checkAndShowAlert])

  return (
    <Dialog open={isAlertOpen} onOpenChange={closeAlert}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to our website!</DialogTitle>
          <DialogDescription>
            This dialog will show once every day. We're glad to have you here!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
