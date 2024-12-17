'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { siteConfig } from '@/config/site-config'

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    setIsLoading(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
    }
  }

  return (
    <div className="bg-card py-10 px-4 md:container md:mx-auto mb-3 md:rounded-xl" id='contact-form'>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <p className=" text-3xl font-bold dark:text-primary text-white">CONTACT US</p>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Let&apos;s talk about your problem.
            </h1>
          </div>

          <div className="space-y-6 grid grid-cols-2 md:grid-cols-2">
            <div>
              <h3 className="text-white font-medium mb-2">Our Location</h3>
              <p className="text-gray-400">{siteConfig.address}</p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Email Address</h3>
              <p className="text-gray-400">{siteConfig.email}</p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Phone Number</h3>
              {siteConfig.phoneNumber}
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">How Can We Help?</h3>
              <p className="text-gray-400">Tell us your problem we will get<br />back to you ASAP.</p>
            </div>
          </div>
        </div>

        <Card className="border border-border/10 dark:border-border/60 ">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-white text-sm mb-2 block">
                  Full Name*
                </label>
                <Input
                  id="name"
                  name='name'
                  placeholder="Enter your full name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border border-border/10 dark:border-border/60  text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-white text-sm mb-2 block">
                  Email Address*
                </label>
                <Input
                  id="email"
                  type="email"
                  name='email'
                  placeholder="Enter your email address"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border border-border/10 dark:border-border/60  text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-white text-sm mb-2 block">
                  Message*
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Type your message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="border border-border/10 dark:border-border/60  text-white placeholder:text-gray-400 min-h-[160px]"
                />
              </div>
              <Button type="submit" disabled={status === "sending"} className="w-full bg-white text-black hover:bg-white hover:text-black">
                {status === "sending" ? "Sending..." : "Submit"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
          {status === "success" && <p className="text-green-500">Message sent successfully!</p>}
          {status === "error" && <p className="text-destructive">Failed to send message. Try again.</p>}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

