import MagicCard from "./magic.card";
import AnimationContainer from "./animation-container";
import { siteConfig } from "@/config/site-config";

const Highlights=()=>{
    return(
        <div className="bg-card border p-20">
            <div className="container mx-auto">
                <AnimationContainer delay={0.1}>
                    <div className="flex flex-col items-center lg:items-center justify-center w-full py-8 max-w-xl mx-auto">
                        <h2 className="text-white text-center lg:text-center text-3xl md:text-5xl font-medium font-heading ">
                        Highlights
                        </h2>
                    </div>
                </AnimationContainer>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2">
                    {siteConfig.highlight.map((process, id) => (
                        <AnimationContainer delay={0.2 * id} key={id}>
                            <MagicCard className="group md:py-8">
                                <div className="flex flex-col items-start justify-center w-full">
                                    <div className="flex flex-col relative items-start">
                                        <h2 className="mt-3 font-medium text-white">{process.title}</h2>
                                        <p className="mt-2 text-sm text-white">{process.description}</p>
                                    </div>
                                </div>
                            </MagicCard>
                        </AnimationContainer>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Highlights