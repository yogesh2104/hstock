"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Compare } from "./compare"

interface EditingOption {
  id: string
  name: string
  beforeImg: string
  afterImg: string
}

const editingOptions: EditingOption[] = [
  { 
    id: "auto-correction", 
    name: "Auto Correction",
    beforeImg: "/compare/auto-correction-before.jpg",
    afterImg: "/compare/auto-correction-after.jpg"
  },
  { 
    id: "hue-saturation", 
    name: "Hue Saturation",
    beforeImg: "/compare/hue-saturation-before.jpg",
    afterImg: "/compare/hue-saturation-after.jpg"
  },
  { 
    id: "blending-mode", 
    name: "Blending mode",
    beforeImg: "/compare/blending-mode-before.jpg",
    afterImg: "/compare/blending-mode-after.jpg"
  },
  { 
    id: "brightness-contrast", 
    name: "Brightness contrast",
    beforeImg: "/compare/auto-correction-after.jpg",
    afterImg: "/compare/auto-correction-before.jpg"
  },
  { 
    id: "change-color-light", 
    name: "Change Color Light",
    beforeImg: "/compare/auto-correction-after.jpg",
    afterImg: "/compare/auto-correction-before.jpg"
  },
  { 
    id: "color-balance", 
    name: "Color Balance",
    beforeImg: "/compare/auto-correction-after.jpg",
    afterImg: "/compare/auto-correction-before.jpg"
  },
  { 
    id: "color-mixer-effect", 
    name: "Color Mixer Effect",
    beforeImg: "/compare/auto-correction-after.jpg",
    afterImg: "/compare/auto-correction-before.jpg"
  },
  { 
    id: "fade", 
    name: "Fade",
    beforeImg: "/compare/auto-correction-after.jpg",
    afterImg: "/compare/auto-correction-before.jpg"
  },
  { 
    id: "focus-tool", 
    name: "Focus Tool",
    beforeImg: "/compare/auto-correction-after.jpg",
    afterImg: "/compare/auto-correction-before.jpg"
  },
  { 
    id: "jewellery-highlight", 
    name: "Jewellery Highlight",
    beforeImg: "/compare/auto-correction-after.jpg",
    afterImg: "/compare/auto-correction-before.jpg"
  },
  { 
    id: "curve-level", 
    name: "Curve & Level",
    beforeImg: "/compare/auto-correction-after.jpg",
    afterImg: "/compare/auto-correction-before.jpg"
  },
  { 
    id: "pencil-effect", 
    name: "Pencil Effect",
    beforeImg: "/compare/auto-correction-after.jpg",
    afterImg: "/compare/auto-correction-before.jpg"
  },
  { 
    id: "shadow-highlight", 
    name: "Shadow And Highlight",
    beforeImg: "/compare/auto-correction-after.jpg",
    afterImg: "/compare/auto-correction-before.jpg"
  },
  { 
    id: "tint-temperature", 
    name: "Tint And Temperature",
    beforeImg: "/compare/auto-correction-after.jpg",
    afterImg: "/compare/auto-correction-before.jpg"
  },
  { 
    id: "toning", 
    name: "Toning",
    beforeImg: "/compare/auto-correction-after.jpg",
    afterImg: "/compare/auto-correction-before.jpg"
  },
  { 
    id: "transparency", 
    name: "Transparency On Selection",
    beforeImg: "/compare/auto-correction-after.jpg",
    afterImg: "/compare/auto-correction-before.jpg"
  },
  { 
    id: "water-color", 
    name: "Water color Effect",
    beforeImg: "/compare/auto-correction-after.jpg",
    afterImg: "/compare/auto-correction-before.jpg"
  },
]

export default function ImageEditor() {
  const [selectedOption, setSelectedOption] = React.useState<EditingOption>(editingOptions[0])

  return (
    <div className="bg-card">
        <section className=" container mx-auto py-20">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-3">
                <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">Speedy and Easy Image Editing</h1>
                <p className=" text-white">To make image editing easier , more accurate and faster, we offer a complete image editing package with new algorithms and automation features.</p>
            </div>
            
            <div className="md:flex flex-row">
                {/* Sidebar */}
                <div className="w-full md:w-64 rounded-lg border border-border/10 dark:border-border/60 p-4 overflow-y-auto">
                    <div className="space-y-2">
                    {editingOptions.map((option) => (
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
                <div className="flex-1 p-6 overflow-y-auto">
                    <h2 className="mb-6 text-2xl font-semibold text-white">{selectedOption.name}</h2>
                    
                    <div className="relative h-[300px] md:h-[580px] w-full overflow-hidden rounded-lg border border-border/10 dark:border-border/60">
                        {/* compare here */}
                        <Compare
                            firstImage={selectedOption.beforeImg}
                            secondImage={selectedOption.afterImg}
                            firstImageClassName=" object-left-top"
                            secondImageClassname=" object-left-top"
                            className="h-[300px] md:h-[580px] w-full"
                            slideMode="drag"
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

