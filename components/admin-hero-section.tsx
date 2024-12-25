"use client"

import { useState } from "react"
import { Eye, EyeOff, Plus, Trash2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { API_ENDPOINT, BASE_URL } from "@/config/api-endpoint"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { ImagesSlider } from "./images-slider"
import Link from "next/link"


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

export const AdminHeroSection=({getAPIData}:{getAPIData:adminProps[]})=>{
    const router = useRouter()
    const [heroImageLink,setHeroImageLink] = useState([""])
    const [openLink,setOpenLink] = useState(false)
    const [buttonInfo,setButtonInfo] = useState({
        btnlink:"",
        btnText:""
    })

    const handleAddHeroLink=()=>{
        setHeroImageLink([...heroImageLink,""])
    }

    const removeFeature=(id:number)=>{
        const findIndx = heroImageLink.filter((_,i)=> i!== id)
        setHeroImageLink(findIndx)
    }

    const handleAddMoreLink =(index: number, value: string)=>{
        const newLink = [...heroImageLink]
        newLink[index] = value
        setHeroImageLink(newLink)
    }

    const handleSaveHeroImageLink=async ()=>{
        // console.log("setOpenLink",heroImageLink)
        setOpenLink(false)

        const formData = {
            btnlink:buttonInfo.btnlink, 
            btnText:buttonInfo.btnText, 
            heroImageLink
        }

        try {
            const response = await fetch(`${BASE_URL}${API_ENDPOINT.heroSection}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            })
      
            const data = await response.json()
            if (response.ok) {
              router.refresh()
              toast.success("Added Successfull")
            } else {
              router.refresh()
              toast.error('Failed to submit data')
            }
          } catch (error) {
            router.refresh()
            toast.error('Error submitting data')
        }
    }

    const handleToggleShow = async (itemId:string,show:boolean) => {
        const bData = { id:itemId ,show:!show }
        try {
            const response = await fetch(`${BASE_URL}${API_ENDPOINT.heroSection}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bData),
            })
            if (response.ok) {
                router.refresh()
            } else {
                router.refresh()
                toast.error("Not Able to Update.")
            }
        } catch (error) {
            toast.error("Not Able to Update.")
            router.refresh()
        } 
    };
    
    const handleDelete = async (itemId:string) => {
        const bData = { id:itemId, }
        try {
            const response = await fetch(`${BASE_URL}${API_ENDPOINT.heroSection}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bData),
            })
            if (response.ok) {
                router.refresh()
            } else {
                router.refresh()
                toast.error("Not Able to Update.")
            }
        } catch (error) {
            toast.error("Not Able to Update.")
            router.refresh()
        } 
    };

    return(
        <div>
            <div className="flex gap-4 justify-end">
                {/* <Button onClick={()=>setOpenButtonInfo(true)}>Enter Button Info</Button> */}
                <Button variant={"outline"} onClick={()=>setOpenLink(true)}>Enter Image Link</Button>
            </div>

            <div className=" mx-auto">
                {getAPIData?.map((item) => (
                    <Card key={item.id} className="mb-4">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Hero Section</CardTitle>
                        <div className="flex space-x-2">
                        <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleToggleShow(item.id,item.isShow)}
                        >
                            {item.isShow ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={() => handleDelete(item.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                        <p><strong>Button Text:</strong> {item.btnText}</p>
                        <p><strong>Button Link:</strong> {item.btnLink}</p>
                        <p><strong>Visibility:</strong> {item.isShow ? 'Visible' : 'Hidden'}</p>
                        </div>
                        <Carousel className="w-full">
                        <CarouselContent>
                            <ImagesSlider url={item.btnLink} className="h-[35rem]" images={item.image?.map((img)=>img.imageLink)}>
                            <div
                                className="z-50 flex flex-col justify-end items-end"
                            >
                                {/* <Link href={item.btnLink} className="px-4 py-2 backdrop-blur-sm border bg-black border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
                                    <span>{item.btnText} →</span>
                                    <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
                                </Link> */}
                            </div>
                            </ImagesSlider>
                        </CarouselContent>
                        </Carousel>
                    </CardContent>
                    </Card>
                ))}
            </div>


            {/* <Dialog open={openButtonInfo} onOpenChange={setOpenButtonInfo}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Edit/Update Button Information</DialogTitle>
                    
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-center gap-4">
                            <Label htmlFor="name" >Button Link</Label>
                            <Input
                                id="name"
                                value={buttonInfo.btnlink}
                                onChange={(e)=>setButtonInfo({...buttonInfo, btnlink:e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-1 items-center gap-4">
                            <Label htmlFor="username" >Button Text</Label>
                            <Input
                                id="username"
                                value={buttonInfo.btnText}
                                onChange={(e)=>setButtonInfo({...buttonInfo, btnText:e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <Button type="submit" onClick={handleSave}>Save changes</Button>
                    </div>
                </DialogContent>
            </Dialog> */}

            <Dialog open={openLink} onOpenChange={setOpenLink}>
                <DialogContent className="sm:max-w-[425px] h-[27rem] overflow-auto">
                    <DialogHeader><DialogTitle>Add Hero Section Image Link</DialogTitle></DialogHeader>
                    <div className="grid grid-cols-1 items-center gap-4">
                            <Label htmlFor="name" >Button Link</Label>
                            <Input
                                id="name"
                                value={buttonInfo.btnlink}
                                onChange={(e)=>setButtonInfo({...buttonInfo, btnlink:e.target.value})}
                                className="col-span-3"
                            />
                    </div>

                    <div className="grid grid-cols-1 items-center gap-4">
                        <Label htmlFor="username" >Button Text</Label>
                        <Input
                            id="username"
                            value={buttonInfo.btnText}
                            onChange={(e)=>setButtonInfo({...buttonInfo, btnText:e.target.value})}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid gap-2 py-1">
                        <Label htmlFor="name" className="">Button Image Link</Label>
                            {heroImageLink?.map((btnLink,index)=>{
                                return(
                                    <div key={index} className="flex items-center space-x-2 ">
                                        <Input
                                            id="name"
                                            value={btnLink}
                                            onChange={(e) => handleAddMoreLink(index, e.target.value)}
                                            className="col-span-3"
                                        />
                                        {index>0 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => removeFeature(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>)}
                                    </div>
                                )
                            })}
                            <Button onClick={handleAddHeroLink}><Plus className="size-10"/> Add More Link</Button>
                    </div>
                    <div className="text-center">
                        <Button type="submit" onClick={handleSaveHeroImageLink}>Save changes</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}