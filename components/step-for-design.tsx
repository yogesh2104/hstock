import { AnimatedStep } from "./AnimatedStep";
import AnimationContainer from "./animation-container";

export function SetpForDesgin() {
    const servies = [
      {
        quote:"The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
        name: "Yogesh Singh",
        src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        quote:
          "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
        name: "Anuj Mahur",
        src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        quote:
          "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
        name: "100rabh Sharma",
        src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ];





  return (
        <div className="container max-w-6xl mx-auto">
            <AnimationContainer delay={0.1}>
                <div className="flex flex-col items-center lg:items-center justify-center w-full py-4 max-w-xl mx-auto">
                    <h2 className="text-center lg:text-center text-3xl md:text-4xl font-medium font-heading mt-6">Step For Design</h2>
                    <p className="mt-4 text-center text-sm max-w-lg">Just 3 Step of Designing</p>
                </div>
            </AnimationContainer>
            <AnimatedStep servies={servies} autoplay={false}/>
        </div>
  )
  
}