import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Domain } from "@/config/api-endpoint"
import { siteConfig } from "@/config/site-config"
import Link from "next/link"

interface subenglish {
  id: number,
  title: string,
  content:string
}
export default function PrivacyPolicy() {
  return (
    <Card className="w-full max-w-3xl mx-auto ">
       <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          <p className="text-sm text-gray-600">Last updated: 11/12/2024</p>
        </CardHeader>
      <CardContent className="space-y-6">
      <section>
        <p>{siteConfig.siteName} (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) operates <Link href={Domain} className='underline'>{siteConfig.siteName}</Link>.</p>
        <p>This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our Service.</p>
        </section>
        <Section
          english={siteConfig.privacyPolicyData}
        />
        <div className="mt-6 p-4 bg-gray-50  dark:border text-black rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Company Details</h3>
          <div className="">
            Company Name: {siteConfig.siteName}
            <br />
            Email: {siteConfig.email}
            <br />
            Phone: {siteConfig.phoneNumber}
            <br />
            Jurisdiction: {siteConfig.address}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Section({ english }: { english: subenglish[]}) {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <Content title="English" items={english} />
      </div>
    </div>
  )
}

function Content({ title, items }: { title: string, items: subenglish[]}) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul className="list-disc space-y-2">
        {items.map((item, index) => (
          <div key={item.id} className="mb-4 p-3 rounded-lg border ">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            {item.id}. {item.title}
          </h3>
          <p className="text-gray-700 dark:text-white">{item.content}</p>
        </div>
        ))}
      </ul>
    </div>
  )
}

