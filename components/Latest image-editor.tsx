"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Compare } from "./compare"
import { siteConfig } from '@/config/site-config';
import { useIsMobile } from "@/hook/use-mobile"

interface EditingOption {
  id: string
  name: string
  beforeImg: string
  afterImg: string
}


export default function ImageEditor() {
  const isMobile = useIsMobile()
  const [selectedOption, setSelectedOption] = React.useState<EditingOption>(siteConfig.editingOptions[0])

  return (
    <div className="bg-card py-6 px-4 md:container mx-auto md:rounded-xl mt-4">
      <section className=" container mx-auto py-5">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-3">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">Speedy and Easy Image Editing</h1>
              <p className=" text-white">To make image editing easier , more accurate and faster, we offer a complete image editing package with new algorithms and automation features.</p>
          </div>
          
          <div className="md:flex flex-row">
              {/* Sidebar */}
              <div className="w-full md:w-64 rounded-lg border border-border/10 dark:border-border/60 p-4 overflow-y-auto">
                  <div className="space-y-2">
                  {siteConfig.editingOptions.map((option) => (
                    <Button
                        key={option.id}
                        variant="link"
                        size={"side"}
                        className={cn(
                            "w-full justify-start text-left font-normal text-white",
                            selectedOption.id === option.id && "bg-white text-black"
                        )}
                        onClick={() => setSelectedOption(option)}
                        >
                        {option.name}
                    </Button>
                  ))}
                  </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 md:p-6 overflow-y-auto">
                  <h2 className="mb-6 text-2xl font-semibold text-white">{selectedOption.name}</h2>
                  
                  <div className="relative h-[280px] md:h-[580px] w-full overflow-hidden rounded-lg border border-border/10 dark:border-border/60">
                      {/* compare here */}
                      <Compare
                        firstImage={selectedOption.beforeImg}
                        secondImage={selectedOption.afterImg}
                        firstImageClassName=" object-left-top"
                        secondImageClassname=" object-left-top"
                        className="h-[280px] md:h-[580px] w-full"
                        slideMode={isMobile ? "hover":"drag"}
                        autoplay
                      />
                      <div className="absolute bottom-4 z-50 left-4 rounded bg-black/50 px-2 py-1 text-sm text-white">Before</div>
                      <div className="absolute bottom-4 z-50 right-4 rounded bg-black/50 px-2 py-1 text-sm text-white">After</div>
                  </div>
              </div>
          </div>
      </section> 
    </div>
  )
}

