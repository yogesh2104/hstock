'use client'

import { useDialogStore } from "@/hook/use-alert-dialog-store"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { useEffect } from "react"


export const WelcomeDialog = () => {
    const { isAlertOpen, showAlert, closeAlert } = useDialogStore()

    useEffect(()=>{
        showAlert()
    },[])
    return (
        <Dialog open={isAlertOpen} onOpenChange={closeAlert}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Welcome to our website!</DialogTitle>
                <DialogDescription>
                This dialog will show once every 12 hours. We're glad to have you here!
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

