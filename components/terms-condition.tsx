import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { siteConfig } from "@/config/site-config"

interface subenglish {
  id: number,
  text: string,
}
export default function TermsConditions() {
  return (
    <Card className="w-full max-w-3xl mx-auto ">
       <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Terms & Conditions</CardTitle>
        </CardHeader>
      <CardContent className="space-y-6">
        <Section
          english={siteConfig.termsData.english}
          hindi={siteConfig.termsData.hindi}
        />
        <div className="mt-6 p-4 bg-gray-50  dark:border text-black rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Company Details</h3>
          <p className="">
            Company Name: {siteConfig.siteName}
            <br />
            Email: {siteConfig.email}
            <br />
            Phone: {siteConfig.phoneNumber}
            <br />
            Jurisdiction: {siteConfig.address}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function Section({ english, hindi }: { english: subenglish[], hindi: subenglish[] }) {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <Content title="English" items={english} />
        <Content title="Hindi" items={hindi} />
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
            <h3 className="text-lg  mb-2 flex items-center">
              {item.id}. {item.text}
            </h3>
          </div>
        ))}
      </ul>
    </div>
  )
}

