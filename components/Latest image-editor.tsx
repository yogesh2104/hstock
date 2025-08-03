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
    <div className="bg-card">
      <section className=" container mx-auto py-5">
        <div className="relative z-10 container mx-auto px-4 py-5">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight" >
              Speedy and Easy <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Image Editing
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              To make image editing easier , more accurate and faster, we offer a complete image editing package with new algorithms and automation features.
            </p>
          </div>
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

