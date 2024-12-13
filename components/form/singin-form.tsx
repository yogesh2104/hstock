"use client"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { login } from "@/app/action/signin-action"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { resetPassword } from "@/app/action/reset-password"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import Link from "next/link"

const SignInForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [openForgotDialog, setOpenForgotDialog] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (formData: FormData) => {
        try {
            setIsLoading(true)
            const email = formData.get("email") as string
            const password = formData.get("password") as string

            if (!email || !password) {
                toast.error("Please enter your email and password.")
                return
            }

            startTransition(() => {
                (async () => {
                    try {
                        const da = await login(formData);
                        if (da?.error) {
                            toast.error(da?.error);
                            router.refresh();
                        } else {
                            toast.success("Login Successful");
                            router.push("/");
                        }
                    } catch (error: any) {
                        router.refresh();
                    }
                })();
            });
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }
      
    const onSubmit = (formData: FormData) => {  
        const email = formData.get("reset-email") as string
        startTransition(() => {
            // Uncomment and implement reset password logic
            resetPassword({ email }).then((data:any) => {
              if (data?.success) {
                setOpenForgotDialog(false)
                toast.success("Password reset link sent. Please check your email.")
              } else {
                toast.error(data?.error)
              }
            })
        })
    }
    
    return (
        <div className="max-w-md mx-auto dark:bg-card border  dark:shadow-2xl rounded-xl overflow-hidden p-8 space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="text-muted-foreground">Sign in to continue to your account</p>
            </div>

            <form 
                onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    handleSubmit(formData);
                }} 
                className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 ">
                        Email
                    </Label>
                    <div className="relative">
                        <Input 
                            id="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            className="pl-10 py-2 transition-all duration-300"
                        />
                        <Mail className="absolute size-4 left-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="password" className="flex items-center gap-2">
                            Password
                        </Label>
                        <div onClick={()=>setOpenForgotDialog(true)} className="text-primary hover:underline cursor-pointer text-sm">Forgot password?</div>
                    </div>
                    <div className="relative">
                        <Input 
                            id="password" 
                            placeholder="Enter your password" 
                            name="password" 
                            type={showPassword ? 'text' : 'password'}
                            className="pl-10 pr-12 py-2  transition-all duration-300"
                        />
                        <Lock className="absolute size-4 left-3 top-1/2 -translate-y-1/2" />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-1/2 border-l rounded-none -translate-y-1/2 hover:bg-transparent"
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-500" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-500" />
                            )}
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary transition-colors duration-300 ease-in-out"
                        disabled={isPending}
                    >
                        {isPending ? "Logging in..." : "Sign In"}
                    </Button>

                    {/* <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-card text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <Button 
                        variant="secondary" 
                        className="w-full flex items-center justify-center gap-2 transition-colors duration-300"
                    >
                        Sign in with Google
                    </Button> */}

                    <div className="mt-4 text-center text-sm ">Create an account?{" "}<Link href="/sign-up" className="underline">Sign Up</Link></div>
                </div>
            </form>

            <Dialog open={openForgotDialog} onOpenChange={setOpenForgotDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        onSubmit(new FormData(e.currentTarget))
                    }}>
                        <DialogHeader>
                            <DialogTitle className="text-2xl">Forgot Password</DialogTitle>
                            <DialogDescription>
                            Forgot your password? Don’t worry, it happens! 
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid items-center gap-2">
                                <Label htmlFor="reset-email" className="text-left">Email</Label>
                                <Input 
                                    id="reset-email" 
                                    name="reset-email" 
                                    placeholder="you@example.com" 
                                    className=" transition-all duration-300" 
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button 
                                disabled={isPending} 
                                type="submit" 
                                className="w-full bg-primary hover:bg-primary"
                            >
                                {isPending ? "Sending Link..." : "Send Reset Link"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SignInForm



