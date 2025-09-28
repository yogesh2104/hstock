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
import { siteConfig } from "@/config/site-config"

export const WelcomeDialog = () => {
  const { isAlertOpen, checkAndShowAlert, closeAlert } = useDialogStore()

  useEffect(() => {
    checkAndShowAlert()
  }, [checkAndShowAlert])

  return (
    <Dialog open={isAlertOpen} onOpenChange={closeAlert}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{siteConfig?.welcomeTitle}</DialogTitle>
          <DialogDescription>
            {siteConfig?.welcomeMessage}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
