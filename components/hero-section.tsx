import { ImagesSlider } from "./images-slider";
import { Button } from "./ui/button";

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
  // @ts-ignore
  const getUrl = `/payment/${isPopular[0]?.id}`
  return (
    <ImagesSlider url={ getUrl || "#pricing-plan"} className="h-[30rem] md:h-[45rem]" images={getAPIData[0]?.image?.map((img)=>img?.imageLink)}>
      <Button>
        Buy Now
      </Button>
    </ImagesSlider>
  );
}
