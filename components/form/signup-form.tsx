// "use client"

// import { Label } from "../ui/label"
// import { Input } from "../ui/input"
// import { Button } from "../ui/button"
// import { toast } from "sonner"
// import { useRouter } from "next/navigation"
// import { signUp } from "@/app/action/singup-action"
// import { useState } from "react"
// import { User, Mail, Lock } from "lucide-react"
// import Link from "next/link"

// const SignUpForm = () => {
//     const router = useRouter()
//     const [isLoading, setIsLoading] = useState(false)

//     async function handleSubmit(formData: FormData) {
//         setIsLoading(true)
//         const password = formData.get("password") as string
//         const confirmPassword = formData.get("confirmPassword") as string

//         if (password === confirmPassword) {
//             try {
//                 const result = await signUp(formData)
                
//                 if (result.error) {
//                     toast.error(result.error)
//                     setIsLoading(false)
//                     return
//                 }
                
//                 if (result.success) {
//                     toast.success("Account created successfully!")
//                     router.push("/sign-in")
//                 }
//             } catch (error) {
//                 toast.error("An unexpected error occurred. Please try again.")
//                 setIsLoading(false)
//             }
//         } else {
//             setIsLoading(false)
//             toast.error("Passwords do not match.")
//         }
//     }

//     return (
//         <div className="max-w-md mx-auto dark:bg-card border dark:shadow-2xl rounded-xl overflow-hidden p-8 space-y-6">
//             <div className="text-center">
//                 <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
//                 <p className="text-muted-foreground">Sign up to get started</p>
//             </div>

//             <form onSubmit={(event) => {
//                     event.preventDefault();
//                     const formData = new FormData(event.currentTarget);
//                     handleSubmit(formData);
//                 }} className="space-y-4">
//                 <div className="grid grid-cols-1 gap-4">
//                     <div className="space-y-2">
//                         <Label htmlFor="fname" className="flex items-center gap-2 "> First Name</Label>
//                         <div className="relative">
//                             <Input 
//                                 id="fname"
//                                 name="fname"
//                                 type="text"
//                                 placeholder="First Name"
//                                 required
//                                 className="pl-10 py-2  transition-all duration-300"
//                             />
//                             <User className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                         </div>
//                     </div>

//                     <div className="space-y-2">
//                         <Label htmlFor="lname" className="flex items-center gap-2 ">Last Name</Label>
//                         <div className="relative">
//                             <Input 
//                                 id="lname"
//                                 name="lname"
//                                 type="text"
//                                 placeholder="Last Name"
//                                 className="pl-10 py-2  transition-all duration-300"
//                             />
//                             <User className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="space-y-2">
//                     <Label htmlFor="email" className="flex items-center gap-2 ">Email</Label>
//                     <div className="relative">
//                         <Input 
//                             id="email"
//                             name="email"
//                             type="email"
//                             placeholder="Enter your email"
//                             required
//                             className="pl-10 py-2  transition-all duration-300"
//                         />
//                         <Mail className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                     </div>
//                 </div>

//                 <div className="space-y-2">
//                     <Label htmlFor="password" className="flex items-center gap-2 ">Password</Label>
//                     <div className="relative">
//                         <Input 
//                             id="password"
//                             name="password"
//                             type="password"
//                             placeholder="Choose your password"
//                             className="pl-10 py-2  transition-all duration-300"
//                         />
//                         <Lock className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                     </div>
//                 </div>

//                 <div className="space-y-2">
//                     <Label htmlFor="confirmPassword" className="flex items-center gap-2 ">Confirm Password</Label>
//                     <div className="relative">
//                         <Input 
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             type="password"
//                             placeholder="Confirm your password"
//                             className="pl-10 py-2  transition-all duration-300"
//                         />
//                         <Lock className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                     </div>
//                 </div>

//                 <div className="space-y-4">
//                     <Button 
//                         type="submit" 
//                         className="w-full bg-primary hover:bg-primary transition-colors duration-300 ease-in-out"
//                         disabled={isLoading}
//                     >
//                         {isLoading ? "Creating Account..." : "Create an Account"}
//                     </Button>

//                     {/* <div className="relative my-4">
//                         <div className="absolute inset-0 flex items-center">
//                             <div className="w-full border-t border-gray-300"></div>
//                         </div>
//                         <div className="relative flex justify-center text-sm">
//                             <span className="px-2 bg-card text-gray-500">Or sign up with</span>
//                         </div>
//                     </div> */}

//                     {/* <Button 
//                         variant="secondary" 
//                         className="w-full flex items-center justify-center gap-2 transition-colors duration-300"
//                     >
//                         Sign up with Google
//                     </Button> */}
//                     <div className="mt-4 text-center text-sm">Already have an account?{" "}<Link href="/sign-in" className="underline">Sign in</Link></div>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default SignUpForm






"use client"

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUp } from "@/app/action/singup-action";
import { useState } from "react";
import { User, Mail, Phone, MapPin, Lock, EyeOff, Eye, Building2 } from "lucide-react";
import Link from "next/link";
import { z } from "zod";

const signUpSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    companyName:z.string().optional(),
    mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
    address1: z.string().min(1, "Address line 1 is required"),
    address2: z.string().optional(),
    country: z.string(),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    pinCode: z.string().length(6, "Pin code must be 6 digits"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


const SignUpForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);

        const data = Object.fromEntries(formData.entries());

        // Validate using Zod schema
        const parsedData = signUpSchema.safeParse(data);

        if (!parsedData.success) {
            toast.error(parsedData.error.errors[0]?.message || "Validation failed");
            setIsLoading(false);
            return;
        }
        
        try {
            const result = await signUp(formData);

            if (result.error) {
                toast.error(result.error);
                setIsLoading(false);
                return;
            }

            if (result.success) {
                toast.success("Account created successfully!");
                router.push("/sign-in");
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto dark:bg-card border dark:shadow-2xl rounded-xl overflow-hidden p-8 space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
                <p className="text-muted-foreground">Sign up to get started</p>
            </div>

            <form 
                onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    handleSubmit(formData);
                }}
                className="space-y-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                            <Input 
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Enter Your Full Name"
                                required
                                className="pl-10 py-2 transition-all duration-300"
                            />
                            <User className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name (if applicable)</Label>
                        <div className="relative">
                            <Input 
                                id="companyName"
                                name="companyName"
                                type="text"
                                placeholder="Company Name"
                                className="pl-10 py-2 transition-all duration-300"
                            />
                            <Building2 className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <Input 
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter Email address"
                                required
                                className="pl-10 py-2 transition-all duration-300"
                            />
                            <Mail className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mobileNumber">Mobile Number</Label>
                        <div className="relative">
                            <Input 
                                id="mobileNumber"
                                name="mobileNumber"
                                type="tel"
                                placeholder="Mobile Number"
                                required
                                className="pl-10 py-2 transition-all duration-300"
                            />
                            <Phone className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                   
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input 
                                id="password"
                                name="password"
                                placeholder="Choose your password"
                                required
                                type={showPassword ? 'text' : 'password'}
                                className="pl-10 py-2 transition-all duration-300"
                            />
                            <Lock className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                            <Input 
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                required
                                type={showPassword ? 'text' : 'password'}
                                className="pl-10 py-2 transition-all duration-300"
                            />
                            <Lock className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="address1">Address Line 1</Label>
                        <Input 
                            id="address1"
                            name="address1"
                            type="text"
                            placeholder="Enter Address"
                            required
                            className="py-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                        <Input 
                            id="address2"
                            name="address2"
                            type="text"
                            placeholder="Enter Address 2"
                            className="py-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">

                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input 
                            id="country"
                            name="country"
                            type="text"
                            placeholder="Enter Country Name"
                            required
                            className="py-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                            id="state"
                            name="state"
                            type="text"
                            placeholder="Enter State Name"
                            required
                            className="py-2"
                        />
                    </div>
                </div>
                    
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                            id="city"
                            name="city"
                            type="text"
                            placeholder="Enter City Name"
                            required
                            className="py-2"
                        />
                    </div>

                    <div className="space-y-2">
                        
                        <Label htmlFor="pinCode">Pin Code</Label>
                        <Input 
                            id="pinCode"
                            name="pinCode"
                            type="text"
                            placeholder="Enter Pin Code"
                            required
                            className="py-2"
                        />
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

                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="underline">Sign in</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
