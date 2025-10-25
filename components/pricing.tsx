"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check, Star, Zap, Crown, Building2, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useEffect, useRef, useState } from "react"
import { Session } from "next-auth"
import { useRouter } from "next/navigation"

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
  }[],
  session:Session | null
}

const planIcons = {
  Free: Star,
  Professional: Zap,
  Enterprise: Building2,
  Premium: Crown,
  Ultimate: Sparkles,
}

export default function PricingPlans({ getPlan ,session}: adminPlanPros) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [openInfo, setOpenInfo] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [isPaused, setIsPaused] = useState(false)

  const handlePlanClick = (plan: any) => {
    setSelectedPlan(plan)
    setOpenInfo(true)
  }

  const handleBuynow=(name:string,id:string)=>{
    if(session){
      window.open(`/payment/${id}`)
      // logic for buy now
    }else{
      router.push(`/sign-up?buyid=${name}`);
    }
  }

  const orderedPlans = [...getPlan]
  const popularIndex = orderedPlans.findIndex((p) => p.popular)

  if (popularIndex !== -1) {
    const [popularPlan] = orderedPlans.splice(popularIndex, 1)
    orderedPlans.splice(1, 0, popularPlan)
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    if (window.innerWidth > 768) return

    const cardWidth = container.scrollWidth / getPlan.length
    let index = 0

    let interval: NodeJS.Timeout

    const startAutoScroll = () => {
      interval = setInterval(() => {
        if (isPaused || !container) return
        index = (index + 1) % getPlan.length
        container.scrollTo({
          left: cardWidth * index,
          behavior: "smooth",
        })
      }, 2000)
    }

    startAutoScroll()

    const pauseScroll = () => setIsPaused(true)
    const resumeScroll = () => setIsPaused(false)

    container.addEventListener("mouseenter", pauseScroll)
    container.addEventListener("mouseleave", resumeScroll)
    container.addEventListener("touchstart", pauseScroll)
    container.addEventListener("touchend", resumeScroll)

    return () => {
      clearInterval(interval)
      container.removeEventListener("mouseenter", pauseScroll)
      container.removeEventListener("mouseleave", resumeScroll)
      container.removeEventListener("touchstart", pauseScroll)
      container.removeEventListener("touchend", resumeScroll)
    }
  }, [getPlan.length, isPaused])

  return (
    <section className="w-full py-16" id="pricing-plan">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto px-4 py-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Simple and Affordable <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-muted-foreground">
            Start making Amazing Experience with our flexible pricing options
          </p>
        </div>
        <div className="relative">
          <div
            ref={scrollRef}
            className={cn(
              "flex gap-4 pt-12 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide",
              "pl-4 pr-12", // Show peek of next card
              "lg:px-0",
            )}
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {orderedPlans.map((plan) => (
              <Card
                key={plan.id}
                className={cn(
                  "relative flex flex-col border text-card-foreground flex-shrink-0",
                  "w-[calc(100vw-6rem)] snap-center", // Reduced width to show peek
                  "lg:w-[calc(25%-0.75rem)] lg:min-w-[280px]",
                  plan.popular && "border-primary shadow-primary/20",
                )}
              >
                {plan.popular && (
                  <Badge
                    className="absolute -top-3 right-3 rounded-sm px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground"
                    variant="default"
                  >
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="cursor-pointer" onClick={() => setOpenInfo(true)}>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <img src={plan.logo || "/logo.png"} className="size-20 mx-auto" />
                </CardHeader>

                <CardContent className="flex flex-col gap-4 px-6 pb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">₹</span>
                    <span className="text-5xl font-bold tracking-tight">{plan.price.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">{plan.description}</p>
                  <Button
                    className={cn(
                      "w-full mt-4",
                      plan.popular && "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                    onClick={() => handlePlanClick(plan)}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>

                <CardFooter className="flex-1 flex flex-col items-baseline px-6 pb-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Features</h4>
                  <ul className="grid gap-2 text-left w-full">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardFooter>
              </Card>
            ))}
          </div>
          {getPlan.length > 4 && (
            <div className="hidden lg:flex justify-center mt-4 gap-2">
              <div className="text-sm text-muted-foreground">Scroll to see more plans →</div>
            </div>
          )}
          {getPlan.length > 1 && (
            <div className="flex lg:hidden justify-center mt-4 gap-2">
              <div className="text-sm text-muted-foreground font-medium animate-pulse">
                ← Swipe to see all {getPlan.length} plans →
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={openInfo} onOpenChange={setOpenInfo}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-6">
          <DialogHeader className="pb-4 border-b border-border">
            <DialogTitle className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                {selectedPlan && (
                  <>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {selectedPlan?.name} Plan
                    </span>
                  </>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>
            <div className="space-y-6 py-4">
              {selectedPlan && (
                <>
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                    <div className="text-4xl font-bold text-foreground mb-2">₹{selectedPlan.price.toLocaleString()}</div>
                    <p className="text-muted-foreground">{selectedPlan.description}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground text-left">Complete Feature List</h3>
                    <div className="grid gap-3">
                      {selectedPlan.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-secondary dark:bg-slate-800 rounded-lg">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground text-left">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          <div className="flex gap-3 pt-6 border-t justify-center border-border">
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              size="lg"
              onClick={()=>handleBuynow(selectedPlan?.name, selectedPlan?.id)}
            >
              Buy Now
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