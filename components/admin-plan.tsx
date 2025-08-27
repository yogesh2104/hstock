"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check, Plus, X } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { API_ENDPOINT, BASE_URL } from "@/config/api-endpoint"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


type adminPlanPros = {
  getPlan: {
    id: string,
    name: string,
    logo: string,
    price: Number,
    description: string,
    buttonText: string,
    popular: boolean,
    features: string[]
  }[]
}

export default function AdminPlans({getPlan}:adminPlanPros) {
  const [openInfo,setOpenInfo] = useState(false) 
  const [openDelete, setOpenDelete] = useState(false)
  const [addPlanData,setAddPlanData] = useState({
    name:"",
    price:0,
    description:"",
    buttonText:"Buy Now",
    popular:false,
    features:[""]
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAddPlanData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setAddPlanData(prev => ({ ...prev, popular: checked }))
  }

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...addPlanData.features]
    newFeatures[index] = value
    setAddPlanData(prev => ({ ...prev, features: newFeatures }))
  }

  const addFeature = () => {
    setAddPlanData(prev => ({ ...prev, features: [...prev.features, ""] }))
  }

  const removeFeature = (index: number) => {
    const newFeatures = addPlanData.features.filter((_, i) => i !== index)
    setAddPlanData(prev => ({ ...prev, features: newFeatures }))
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${BASE_URL}${API_ENDPOINT.planApi}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addPlanData),
      })

      const data = await response.json()
      if (response.ok) {
        router.refresh()
        toast.success("Added Successfull")
        setAddPlanData({
            name:"",
            price:0,
            description:"",
            buttonText:"Buy Now",
            popular:false,
            features:[""]
        })
      } else {
        router.refresh()
        toast.error('Failed to submit data')
      }
    } catch (error) {
        router.refresh()
        toast.error('Error submitting data')
    } finally{
        setOpenInfo(false)
    }
  }


  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-end">
            <Button onClick={()=>setOpenInfo(true)}>Add Plan</Button>
        </div>
        <div className="grid gap-6 pt-12 lg:grid-cols-3 lg:gap-8">
          {getPlan.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative flex flex-col border",
                "dark:bg-zinc-900",
                plan.popular && "border-primary dark:shadow-lg"
              )}
            >

              <Button
                variant="destructive"
                size="sm"
                className="absolute top-4 right-2"
                onClick={() => setOpenDelete(true)}
              >
                Delete
              </Button>

              <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Plan?</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete <b>{plan.name}</b>?  
                      This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setOpenDelete(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        try {
                          const response = await fetch(`${BASE_URL}${API_ENDPOINT.planApi}`, {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ id: plan.id }),
                          });

                          const data = await response.json();

                          if (response.ok) {
                            toast.success("Plan deleted successfully");
                            router.refresh();
                          } else {
                            toast.error(data.message || "Failed to delete plan");
                          }
                        } catch (error) {
                          toast.error("Error deleting plan");
                        } finally {
                          setOpenDelete(false);
                        }
                      }}
                    >
                      Yes, Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
                
              {plan.popular && (
                <Badge
                  className="absolute -top-2 right-4 rounded-sm px-3"
                  variant="secondary"
                >
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <img src={plan.logo} className="size-20 mx-auto"/>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">₹</span>
                  <span className="text-5xl font-bold tracking-tight">
                    {plan.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <Button
                  className={cn(
                    "w-full",
                    plan.popular &&
                      "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
              <CardFooter className="flex-1">
                <div className="flex flex-col gap-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Features
                  </h4>
                  <ul className="grid gap-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>



      <Dialog open={openInfo} onOpenChange={setOpenInfo}>
        <DialogContent className="max-w-xl h-[36rem] overflow-auto">
            <DialogTitle>
                <p className="text-2xl font-bold text-center">Add New Plan</p>
            </DialogTitle>
            <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                    <Label htmlFor="name">Plan Name</Label>
                    <Input
                    id="name"
                    name="name"
                    value={addPlanData.name}
                    onChange={handleInputChange}
                    required
                    />
                </div>

                <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                    id="price"
                    name="price"
                    type="number"
                    value={addPlanData.price}
                    onChange={handleInputChange}
                    required
                    />
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={addPlanData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="buttonText">Button Text</Label>
                    <Input
                        id="buttonText"
                        name="buttonText"
                        value={addPlanData.buttonText}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="popular"
                        checked={addPlanData.popular}
                        onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="popular">Popular Plan</Label>
                </div>

                <div>
                    <Label>Features</Label>
                    {addPlanData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                        <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                        required
                        />
                        {index > 0 && (
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeFeature(index)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        )}
                    </div>
                    ))}
                    <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                    className="mt-2"
                    >
                    <Plus className="h-4 w-4 mr-2" /> Add Feature
                    </Button>
                </div>
                <div className="text-center">
                    <Button type="submit">Add Plan</Button>
                </div>
            </form>
        </DialogContent>
      </Dialog>

    </section>
  )
}

