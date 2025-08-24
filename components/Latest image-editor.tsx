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
    <div className="">
      <section className=" container mx-auto py-5">
        <div className="relative z-10 container mx-auto px-4 py-5">
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Speedy and Easy <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}
                Image Editing
              </span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              To make image editing easier , more accurate and faster, we offer a complete image editing package with new algorithms and automation features.
            </p>
          </div>
        </div>
        
        <div className="md:flex flex-row">
          <div className="w-full md:w-64 rounded-lg border border-gray-200 shadow-xl p-4 overflow-y-auto">
              <div className="space-y-2">
              {siteConfig.editingOptions.map((option) => (
                <Button
                    key={option.id}
                    variant="link"
                    size={"side"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        selectedOption.id === option.id && "text-black bg-gray-300"
                    )}
                    onClick={() => setSelectedOption(option)}
                    >
                    {option.name}
                </Button>
              ))}
              </div>
          </div>

          <div className="flex-1 md:p-6 overflow-y-auto">
            <h2 className="mb-6 text-2xl font-semibold text-black">{selectedOption.name}</h2>
            <div className="relative h-[350px] md:h-[580px] w-full overflow-hidden rounded-lg border">
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

