


import AnimationContainer from "./animation-container";
import { PinContainer } from "./3d-pin";
import { Domain } from "@/config/api-endpoint";
import { siteConfig } from "@/config/site-config";
  

export const ServiceWeProvide=()=>{
    return(
        <div className="container mx-auto">
            <AnimationContainer delay={0.1}>
                <div className="flex flex-col items-center lg:items-center justify-center w-full py-4 max-w-xl mx-auto">
                    <h2 className="text-center lg:text-center text-3xl md:text-4xl font-medium font-heading mt-6">Services that we provide</h2>
                    <p className="mt-4 text-center text-sm max-w-lg"> Sign up today and get 10 days free Accress.</p>
                </div>
            </AnimationContainer>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full py-2 gap-2">
                
                {siteConfig.ServicesWeProvide?.map((process, id) => (    
                    <div className="w-full flex items-center justify-center" key={id}>
                        <PinContainer
                            title={siteConfig.siteName}
                            href={`${Domain}`}
                        >
                            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[17rem]">
                            <div className="flex flex-col items-start justify-center w-full">
                                <process.icon strokeWidth={1.5} className="w-10 h-10 text-foreground" />
                                <div className="flex flex-col relative items-start">
                                <span className="absolute -top-6 right-0 border-2 border-border text-foreground font-medium text-2xl rounded-full w-12 h-12 flex items-center justify-center">
                                    {id + 1}
                                </span>
                                <h3 className="text-base mt-6 font-medium text-foreground">{process.title}</h3>
                                <p className="mt-2 text-sm text-black dark:text-white">{process.description}</p>
                                <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                                </div>
                            </div>
                            </div>
                        </PinContainer>
                    </div>
                ))}

            </div>
        </div>
    )
}


