import { Cpu, Workflow, Gauge, Handshake, CircleCheckBig, Brush, Frame, Filter } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import MagicCard from './magic.card'

export default function FeaturesAndHighlight() {
  const features = [
        {
        title: "High-Quality Designs",
        description: "Attractive, unique, and high-resolution designs.",
        icon: <Cpu/>,
        },
        {
            title: "Seamless Workflow",
            description: "Automate your workflow smoothly without any interruptions.",
            icon: <Workflow/>,
        },
        {
            title: "Superior Speed",
            description: "Fastest performance compared to other software solutions.",
            icon: <Gauge/>,
        },
        {
            title: "User-Friendly Interface",
            description: "Easy-to-understand user interface. And Easy-to-use",
            icon: <Handshake />,
        },
        {
            title: "Complete Solution",
            description: "Retouch photos to final designs all in one software.",
            icon: <CircleCheckBig />,
        },
        {
            title: "Make Your Own Designs",
            description: "Create your own designs manually or automatically.",
            icon: <Brush />,
        },
        {
            title: "Extractor",
            description: "Extract clips, frames, or backgrounds from any template with one click.",
            icon: <Frame />,
        },
        {
            title: "Effects & Filters",
            description: "Unique filters and effects like cinematic effects, dark spot healing, smoothness filter, etc.",
            icon: <Filter />,
        }
  ]

  return (
    <div className="bg-card py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-9">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.slice(0,4).map((feature, index) => (
            <MagicCard key={index}  className="group md:py-4">
                <div className="rounded-full border border-border/10 dark:border-border/60 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="group-hover:text-white text-gray-300">{feature.description}</p>
            </MagicCard>
          ))}
        </div>
        <h2 className="text-4xl font-bold text-white mb-9 mt-6">Highlights</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.slice(4,8).map((feature, index) => (
            <MagicCard key={index}  className="group md:py-4">
                <div className="rounded-full border border-border/10 dark:border-border/60 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="group-hover:text-white text-gray-300">{feature.description}</p>
            </MagicCard>
          ))}
        </div>
      </div>
    </div>
  )
}

