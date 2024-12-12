"use client"

import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUp } from "@/app/action/singup-action"
import { useState } from "react"
import { User, Mail, Lock } from "lucide-react"
import Link from "next/link"

const SignUpForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        const password = formData.get("password") as string
        const confirmPassword = formData.get("confirmPassword") as string

        if (password === confirmPassword) {
            try {
                const result = await signUp(formData)
                
                if (result.error) {
                    toast.error(result.error)
                    setIsLoading(false)
                    return
                }
                
                if (result.success) {
                    toast.success("Account created successfully!")
                    router.push("/sign-in")
                }
            } catch (error) {
                toast.error("An unexpected error occurred. Please try again.")
                setIsLoading(false)
            }
        } else {
            setIsLoading(false)
            toast.error("Passwords do not match.")
        }
    }

    return (
        <div className="max-w-md mx-auto dark:bg-card border dark:shadow-2xl rounded-xl overflow-hidden p-8 space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
                <p className="text-muted-foreground">Sign up to get started</p>
            </div>

            <form onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    handleSubmit(formData);
                }} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fname" className="flex items-center gap-2 "> First Name</Label>
                        <div className="relative">
                            <Input 
                                id="fname"
                                name="fname"
                                type="text"
                                placeholder="First Name"
                                required
                                className="pl-10 py-2  transition-all duration-300"
                            />
                            <User className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lname" className="flex items-center gap-2 ">Last Name</Label>
                        <div className="relative">
                            <Input 
                                id="lname"
                                name="lname"
                                type="text"
                                placeholder="Last Name"
                                className="pl-10 py-2  transition-all duration-300"
                            />
                            <User className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 ">Email</Label>
                    <div className="relative">
                        <Input 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="pl-10 py-2  transition-all duration-300"
                        />
                        <Mail className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-2 ">Password</Label>
                    <div className="relative">
                        <Input 
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Choose your password"
                            className="pl-10 py-2  transition-all duration-300"
                        />
                        <Lock className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center gap-2 ">Confirm Password</Label>
                    <div className="relative">
                        <Input 
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className="pl-10 py-2  transition-all duration-300"
                        />
                        <Lock className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="space-y-4">
                    <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary transition-colors duration-300 ease-in-out"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Account..." : "Create an Account"}
                    </Button>

                    {/* <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-card text-gray-500">Or sign up with</span>
                        </div>
                    </div> */}

                    {/* <Button 
                        variant="secondary" 
                        className="w-full flex items-center justify-center gap-2 transition-colors duration-300"
                    >
                        Sign up with Google
                    </Button> */}
                    <div className="mt-4 text-center text-sm">Already have an account?{" "}<Link href="/sign-in" className="underline">Sign in</Link></div>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm