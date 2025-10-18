import Link from "next/link";
import { ImagesSlider } from "./images-slider";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

interface adminProps{
  "id": string,
  "btnText": string,
  "btnLink":string,
  "isShow": boolean,
  "image": [
      {
        "id": string,
        "imageId": string,
        "isActive": boolean,
        "imageLink":string
      },
  ]
}
interface PlanProps{
  id: string
  name: string
  logo: string
  price: number
  description: string
  buttonText: string
  popular: boolean
  features: string[]
}

export function HeroSection({getAPIData, getPlan }:{getAPIData:adminProps[],getPlan:PlanProps[] }) {
  const isPopular = getPlan?.filter((plan)=>plan?.popular==true)

  const getUrl = `/payment/${isPopular[0]?.id}`
  return (
    <ImagesSlider 
      url={ getUrl || "#pricing-plan"} 
      objectFit="contain"
      className="h-[16rem] md:h-[22rem] lg:h-[36rem] xl:h-[42rem] 2xl:h-[52rem]" 
      images={getAPIData[0]?.image?.map((img)=>img?.imageLink)}
    >
      <a href={getUrl || "#pricing-plan"} className={cn(buttonVariants({variant:"outline"}))}>
        Buy Now
      </a>
    </ImagesSlider>
  );
}
