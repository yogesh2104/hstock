"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, User, CreditCard, Calendar, Hash, ChevronDownIcon } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { BASE_URL } from "@/config/api-endpoint"

import { Calendar as ComCalendar } from "@/components/ui/calendar"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface Purchase {
  id: string
  userId: string
  planId: string
  amount: number
  discount: number
  finalAmount: number
  transactionId: string
  status: "PENDING" | "VERIFIED" | "REJECTED"
  referralCode: string
  createdAt: string
  updatedAt: string
  user:{  
    active:boolean
    address:string
    address2: string
    buyId:string
    city:string
    companyName:string
    country:string
    email:string
    emailVerified: null | string
    id:string
    image: null| string
    isGetReferral:boolean
    name:string
    phoneNumber:number
    pincode:number
    role:string
    state:string
    updatedAt:string
  }
  plan: {
    id: string
    name: string
    logo: string
    planID: string
    price: number
    description: string
    buttonText: string
    popular: boolean
    features: string[]
    position: number
  }
}

interface EmailProps{
  emailTitle: string, 
  id: string
}

interface AdminPurchasesProps {
  purchases: Purchase[],
  emailTemp:EmailProps[],
  token:string | null
}

export default function AdminPayment({ purchases,emailTemp, token}: AdminPurchasesProps) {
  const router = useRouter()
  const [purchaseStatuses, setPurchaseStatuses] = useState<Record<string, string>>(
    purchases.reduce(
      (acc, purchase) => {
        acc[purchase.id] = purchase.status
        return acc
      },
      {} as Record<string, string>,
    ),
  )

  const [selectedTemplates, setSelectedTemplates] = useState<Record<string, string>>({});

  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dates, setDates] = useState<Record<string | number, Date | undefined>>({})
  
  
  const handleDateChange = (id: string, newDate: Date | undefined) => {
    setDates((prev) => ({
      ...prev,
      [id]: newDate,
    }))
  }


  const handleStatusChange = async (purchaseId: string, newStatus: string) => {
    setPurchaseStatuses((prev) => ({
      ...prev,
      [purchaseId]: newStatus,
    }))
    try {
      const response = await fetch(`${BASE_URL}/done`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          paymentId:purchaseId,
          status: newStatus
        }),
      })

      if (response.ok) {
        toast.success("status updated")
      } else {
        toast.error("Failed to update status")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  const handleSendDetails = async (purchase: Purchase, emailID:string,) => {
    const selectedDate = dates[purchase.id]
    if (!selectedDate) {
      toast.error("Please select an expiry date before sending details.")
      return
    }else{
      try {
        setError(null);
  
        // 1️⃣ Register API
        const formdata = new FormData();
        formdata.append("apiKey", "iconic@infotech@PhotoAlbum");
        formdata.append("act", "Register");
        formdata.append("productId", purchase?.plan?.planID);
        formdata.append("name", purchase?.user?.name);
        formdata.append("email", purchase?.user?.email);
        formdata.append(
          "address",
          `${purchase?.user?.address} ${purchase?.user?.address2 || ""} ${purchase?.user?.city} ${purchase?.user?.country} ${purchase?.user?.pincode}`
        );
        formdata.append("mobile", String(purchase?.user?.phoneNumber));
  
        const registerRes = await fetch("https://xpn.me/photoAlbum/api.php", {
          method: "POST",
          body: formdata,
        });
  
        const registerResult = await registerRes.text();
        console.log("Register result:", registerResult);
  
        // 2️⃣ GetLicKey API (only if register success)
        const formdata1 = new FormData();
        formdata1.append("apiKey", "iconic@infotech@PhotoAlbum");
        formdata1.append("email", purchase?.user?.email);
        formdata1.append("expiry", selectedDate.toISOString());
        formdata1.append("act", "GetLicKey");
        formdata1.append("productId", purchase.plan.planID);
  
        const licenseRes = await fetch("https://xpn.me/photoAlbum/api.php", {
          method: "POST",
          body: formdata1,
        });
  
        const licenseResult = await licenseRes.json();
        const licKey =
          licenseResult?.licenseKey ||
          licenseResult?.key ||
          JSON.stringify(licenseResult);
        setLicenseKey(licKey);
  
        // 3️⃣ Call your Next.js API
        const backendRes = await fetch("/api/final-purchase", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({
            userId: purchase.user.id, 
            licenseKey:licKey,
            emailTempId:emailID
          }),
        });
        if(backendRes.ok){
          toast.success("Email Send.....")
        }
      } catch (err: any) {
        console.error("Error:", err);
        setError(err.message || "Something went wrong");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200"
      case "PENDING":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleTemplateChange = (purchaseId: string, templateId: string) => {
    setSelectedTemplates((prev) => ({
      ...prev,
      [purchaseId]: templateId,
    }));
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {purchases.map((purchase) => (
            <Card key={purchase.id} className="overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r p-2 from-slate-50 to-blue-50 border-b border-slate-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      <img
                        src={purchase.plan.logo || "/placeholder.svg"}
                        alt={purchase.plan.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900">{purchase.plan.name}</CardTitle>
                      <p className="text-slate-600 text-sm mt-1">{purchase.plan.description}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(purchaseStatuses[purchase.id])} font-medium`}>
                    {purchaseStatuses[purchase.id]}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="grid md:grid-cols-1 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">User ID:</span>
                      <span className="font-mono text-slate-900">{purchase.userId}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Hash className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">Transaction ID:</span>
                      <span className="font-mono text-slate-900">{purchase.transactionId}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">Created:</span>
                      <span className="text-slate-900">
                        {new Date(purchase.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <CreditCard className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">Amount:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 line-through">₹{purchase.amount.toLocaleString()}</span>
                        <span className="font-semibold text-slate-900">₹{purchase.finalAmount.toLocaleString()}</span>
                        <Badge variant="secondary" className="text-xs">
                          ₹{purchase.discount} off
                        </Badge>
                      </div>
                    </div>

                    {purchase.referralCode && (
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-slate-600">Referral Code:</span>
                        <Badge variant="outline" className="font-mono">
                          {purchase.referralCode}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Update Status</label>
                      <Select
                        value={purchaseStatuses[purchase.id]}
                        onValueChange={(value) => handleStatusChange(purchase.id, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="VERIFIED">Verified</SelectItem>
                          <SelectItem value="REJECTED">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Select Email Template</label>
                      <Select 
                        value={selectedTemplates[purchase.id] || ""}
                        onValueChange={(value) => handleTemplateChange(purchase.id, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {emailTemp?.map((e)=>(
                            <SelectItem value={e.id}>{e?.emailTitle}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Label htmlFor="date" className="px-1">
                        Select Expiry Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" id="date" className="w-full justify-between font-normal">
                            {dates[purchase.id] ? dates[purchase.id]?.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full overflow-hidden p-0" align="start">
                          <ComCalendar
                            mode="single"
                            selected={dates[purchase.id]}
                            captionLayout="dropdown"
                            onSelect={(newDate) => handleDateChange(purchase.id, newDate)}
                            startMonth={new Date(2024, 0)}
                            endMonth={new Date(new Date().getFullYear() + 10, 11)}
                            className="w-full"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <Button
                      onClick={() => handleSendDetails(purchase, selectedTemplates[purchase.id])}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
