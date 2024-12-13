"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { siteConfig } from '@/config/site-config';

export default function PricingPlans() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Simple and Affordable Pricing Plans
          </h1>
          <p className="max-w-[600px] text-gray-500 dark:text-gray-400 text-sm md:text-xl/relaxed">
            Start making Amazing Experience 
          </p>
        </div>
        <div className="grid gap-6 pt-12 lg:grid-cols-3 lg:gap-8">
          {siteConfig.pricingData.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative flex flex-col border",
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
              <CardHeader>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">₹</span>
                  <span className="text-5xl font-bold tracking-tight">
                    {plan.price.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    /month
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <Button
                  className={cn(
                    "w-full",
                    plan.popular &&
                      "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
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
      </div>
    </section>
  )
}

