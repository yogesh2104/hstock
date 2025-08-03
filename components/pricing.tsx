// "use client"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { Check } from 'lucide-react'
// import { Badge } from "@/components/ui/badge"
// import { cn } from "@/lib/utils"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { useState } from "react"
// import HStockFeatures from "./HStockFeatures"

// type adminPlanPros = {
//   getPlan: {
//     id: string,
//     name: string,
//     logo: string,
//     price: Number,
//     description: string,
//     buttonText: string,
//     popular: boolean,
//     features: string[]
//   }[]
// }

// export default function PricingPlans({getPlan}:adminPlanPros) {
//   const [openInfo,setOpenInfo] = useState(false) 
//   return (
//     <section className="w-full py-12">
//       <div className="container mx-auto px-4">
//         <div className="text-center mx-auto px-4 py-5">
//           <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-black via-blue-300 to-blue-400 bg-clip-text text-transparent leading-tight" >
//             Simple and Affordable <br />
//             <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//               Pricing Plans
//             </span>
//           </h2>
//           <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Start making Amazing Experience 
//           </p>
//         </div>
//         <div className="grid gap-6 pt-12 lg:grid-cols-3 lg:gap-8">
//           {getPlan.map((plan) => (
//             <Card
//               key={plan.name}
//               className={cn(
//                 "relative flex flex-col border",
//                 "dark:bg-zinc-900",
//                 plan.popular && "border-primary dark:shadow-lg"
//               )}
//             >
//               {plan.popular && (
//                 <Badge
//                   className="absolute -top-2 right-4 rounded-sm px-3"
//                   variant="secondary"
//                 >
//                   Most Popular
//                 </Badge>
//               )}
//               <CardHeader className="cursor-pointer" onClick={()=>setOpenInfo(true)}>
//                 <h3 className="text-lg font-semibold">{plan.name}</h3>
//                 <img src={plan.logo} className="size-20 mx-auto"/>
//               </CardHeader>
//               <CardContent className="flex flex-col gap-4">
//                 <div className="flex items-baseline gap-1">
//                   <span className="text-4xl font-bold">₹</span>
//                   <span className="text-5xl font-bold tracking-tight">
//                     {plan.price.toFixed(2)}
//                   </span>
//                 </div>
//                 <p className="text-sm text-muted-foreground">{plan.description}</p>
//                 <Button
//                   className={cn(
//                     "w-full",
//                     plan.popular &&
//                       "bg-primary text-primary-foreground hover:bg-primary/90"
//                   )}
//                   variant={plan.popular ? "default" : "outline"}
//                 >
//                   {plan.buttonText}
//                 </Button>
//               </CardContent>
//               <CardFooter className="flex-1">
//                 <div className="flex flex-col gap-4">
//                   <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
//                     Features
//                   </h4>
//                   <ul className="grid gap-2">
//                     {plan.features.map((feature) => (
//                       <li key={feature} className="flex items-center gap-2 text-sm">
//                         <Check className="h-4 w-4 text-primary" />
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>



//       <Dialog open={openInfo} onOpenChange={setOpenInfo}>
//         <DialogContent className="max-w-xl">
//           <DialogTitle>
//       <p className="text-2xl font-bold text-center">Explore Features</p>

//           </DialogTitle>
//           <DialogHeader>
//             <HStockFeatures/>
//             <div className="text-center">
//               <Button
//                   className={cn(
//                     "w-20 bg-primary text-primary-foreground hover:bg-primary/90"
//                   )}
//                   variant={"default"}
//                   >
//                     Buy Now
//               </Button>
//             </div>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>

//     </section>
//   )
// }


"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check, Star, Zap, Crown, Building2, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
// import { ScrollArea } from "@/components/ui/scroll-area"

type adminPlanPros = {
  getPlan: {
    id: string
    name: string
    logo: string
    price: number
    description: string
    buttonText: string
    popular: boolean
    features: string[]
  }[]
}

const planIcons = {
  Free: Star,
  Professional: Zap,
  Enterprise: Building2,
  Premium: Crown,
  Ultimate: Sparkles,
}

export default function PricingPlans({ getPlan }: adminPlanPros) {
  const [openInfo, setOpenInfo] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)

  const handlePlanClick = (plan: any) => {
    setSelectedPlan(plan)
    setOpenInfo(true)
  }

  return (
    <section className="w-full py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-300 tracking-wide uppercase">Pricing</span>
        </div>
        <div className="text-center mx-auto px-4 py-8">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight dark:from-white dark:via-blue-400 dark:to-indigo-400">
            Simple and Affordable <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Start making Amazing Experience with our flexible pricing options
          </p>
        </div>

        <div className="relative pt-12">
          <div className="grid gap-6 pt-12 lg:grid-cols-3 lg:gap-8">
            {getPlan.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative flex flex-col border bg-secondary",
                  "dark:bg-zinc-900",
                  plan.popular && "border-primary dark:shadow-lg"
                )}
              >
                {plan.popular && (
                  <Badge
                    className="absolute -top-2 right-4 rounded-sm px-3"
                    variant="secondary"
                  >
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="cursor-pointer" onClick={()=>setOpenInfo(true)}>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <img src={plan.logo} className="size-20 mx-auto"/>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">₹</span>
                    <span className="text-5xl font-bold tracking-tight">
                      {plan.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <Button
                    className={cn(
                      "w-full",
                      plan.popular &&
                        "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                    onClick={()=>handlePlanClick(plan)}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
                <CardFooter className="flex-1">
                  <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Features
                    </h4>
                    <ul className="grid gap-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {getPlan.map((_, index) => (
              <div key={index} className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
            ))}
          </div>
        </div>
      </div>

      <Dialog open={openInfo} onOpenChange={setOpenInfo}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                {selectedPlan && (
                  <>
                    {(() => {
                      const IconComponent = planIcons[selectedPlan.name as keyof typeof planIcons] || Star
                      return <IconComponent className="h-8 w-8 text-blue-600" />
                    })()}
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {selectedPlan?.name} Plan
                    </span>
                  </>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {selectedPlan && (
              <>
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                    ₹{selectedPlan.price.toLocaleString()}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{selectedPlan.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Complete Feature List</h3>
                  <div className="grid gap-3">
                    {selectedPlan.features.map((feature: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                      >
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-3 pt-6 border-t">
            <Button
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              size="lg"
            >
              Get Started Now
            </Button>
            <Button variant="outline" size="lg" onClick={() => setOpenInfo(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}