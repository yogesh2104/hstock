"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Check, Shield, Sparkles, Crown, Gift } from "lucide-react"

type PlanType = {
  id: string
  name: string
  logo: string
  price: number
  description: string
  features: string[]
}

export default function PaymentPage({ params }: { params: Promise<{ planId: string }> }) {
  const router = useRouter()
  const { planId } = use(params)
  const [plan, setPlan] = useState<PlanType | null>(null)
  const [loading, setLoading] = useState(true)
  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)
  const [txnId, setTxnId] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const finalAmount = plan ? plan.price - discount : 0

  useEffect(() => {
    async function fetchPlan() {
      try {
        const response = await fetch(`/api/plan/get-plan/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: planId }),
        })

        if (response.status === 401) {
          router.replace("/")
          return
        }

        const data = await response.json()

        if (response.ok) {
          setPlan(data?.data)
        } else {
          setPlan(null)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlan()
  }, [planId, router])

  const applyCoupon = async () => {
    if (!coupon) return toast.error("Enter a referral code")
    try {
      const res = await fetch("/api/referral/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: coupon }),
      })
      const data = await res.json()
      if (res.ok) {
        setDiscount(data.discount)
        toast.success(`Coupon applied! Discount ₹${data.discount}`)
      } else {
        toast.error(data.message || "Invalid coupon")
      }
    } catch (err) {
      toast.error("Error applying coupon")
    }
  }

  const handlePayment = async () => {
    if (!txnId) return toast.error("Enter transaction ID")
    setSubmitting(true)
    try {
      const res = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan?.id,
          amount: plan?.price,
          discount,
          finalAmount,
          transactionId: txnId,
          referralCode:coupon
        }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("Payment submitted, waiting for admin verification")
        router.push("/")
      } else {
        toast.error(data.message || "Payment failed")
      }
    } catch (err) {
      toast.error("Error submitting payment")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your plan details...</p>
        </div>
      </div>
    )
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center p-8">
          <div className="text-red-500 mb-4">
            <Shield className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Plan Not Found</h2>
          <p className="text-gray-600">The requested plan could not be found.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen mb-10">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Crown className="h-4 w-4" />
            Complete Your Purchase
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
          <p className="text-gray-600">You're just one step away from unlocking premium features</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <img src={plan.logo || "/placeholder.svg"} alt={plan.name} className="w-10 h-10 object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      POPULAR
                    </div>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">₹{finalAmount.toLocaleString()}</span>
                  {discount > 0 && (
                    <span className="text-lg text-gray-500 line-through">₹{plan.price.toLocaleString()}</span>
                  )}
                </div>
                {discount > 0 && (
                  <div className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Gift className="h-4 w-4" />
                    You saved ₹{discount}
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  What's Included
                </h3>
                <div className="grid gap-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-green-100 rounded-full p-1 mt-0.5">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-900">Payment Details</h3>
              <p className="text-gray-600 text-sm">Complete your secure payment below</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <Label className="text-sm font-medium text-amber-800 mb-2 block">Have a referral code?</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter referral code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="border-amber-200 "
                  />
                  <Button
                    onClick={applyCoupon}
                    variant="outline"
                    className="border-amber-300 text-amber-700 hover:bg-amber-100 bg-transparent"
                  >
                    Apply
                  </Button>
                </div>
              </div>

              <div className="text-center bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Scan QR Code to Pay</h4>
                  <p className="text-sm text-gray-600">Use any UPI app to complete payment</p>
                </div>
                <div className="inline-block bg-white p-4 rounded-2xl shadow-lg">
                  <img src="/QR.png" alt="QR Code" className="w-48 h-48 mx-auto" />
                </div>
                <p className="text-xs text-gray-500 mt-3">Supported: Google Pay, PhonePe, Paytm, BHIM & more</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Transaction ID *</Label>
                <Input
                  placeholder="Enter your UPI transaction ID (e.g. UPI123456789)"
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value)}
                  className="h-12"
                />
                <p className="text-xs text-gray-500 mt-1">
                  You'll find this in your payment app after completing the transaction
                </p>
              </div>
            </CardContent>

            <CardFooter className="pt-6">
              <Button
                onClick={handlePayment}
                disabled={submitting || !txnId}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200"
              >
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing 
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Confirm Payment
                  </div>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
