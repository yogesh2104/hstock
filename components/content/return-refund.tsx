import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReturnRefundPolicy() {
  return (
    <Card className="w-full max-w-3xl mx-auto ">
       <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Return / Refund Policy</CardTitle>
        </CardHeader>
      <CardContent className="space-y-6">
        <section>
             <h2 className="text-xl font-semibold mb-4">Software Variants</h2>
             <ul className="list-disc pl-5 space-y-2">
               <li>Online (Downloadable) Version</li>
               <li>Offline (By Courier) Version</li>
               <li className="text-sm text-gray-600">Note: Courier charges and pendrive charges will be extra.</li>
             </ul>
        </section>
        <PolicySection
          title="Online Version"
          english={[
            "You can cancel your order until you have activated the software or before receiving the activation keys.",
            "No return/refund will be applicable after the generation of activation keys.",
            "Reason: Because it will be registered after this procedure, we can't do anything according to our policy."
          ]}
          hindi={[
            "आप अपने आदेश को तब तक रद्द कर सकते हैं जब तक आपने सॉफ़्टवेयर को सक्रिय नहीं किया है या सक्रियण कुंजियां प्राप्त करने से पहले।",
            "सक्रियण कुंजियों के निर्वाण के बाद कोई वापसी/रिफंड लागू नहीं होगा।",
            "कारण: क्‍योंकि यह प्रिक्रिया के बाद पंजीकृत हो जाएगा, हम अपनी नीति के अनुसार कुछ नहीं कर सकते।"
          ]}
        />
        <hr />
        <PolicySection
          title="Offline Version"
          english={[
            "You can cancel your order before receiving a tracking ID, order confirmation, or before payment.",
            "No return/refund will be applicable after payment or after generating the order ID, tracking ID, and details.",
            "Reason: Because it will be registered after this procedure, we can't do anything according to our policy."
          ]}
          hindi={[
            "आप अपने आदेश को ट्रैकिंग आईडी, ऑर्डर पुष्टि प्राप्त करने से पहले, या भुगतान करने से पहले रद्द कर सकते हैं।",
            "भुगतान करने के बाद या ऑर्डर आईडी, ट्रैकिंग आईडी और विवरण उपलब्ध कराने के बाद कोई वापसी/रिफंड लागू नहीं होगा।",
            "कारण: क्योंकि यह प्रक्रिया के बाद पंजीकृत हो जाएगा, हम अपनी नीति के अनुसार कुछ नहीं कर सकते।"
          ]}
        />
      </CardContent>
    </Card>
  )
}

function PolicySection({ title, english, hindi }: { title: string, english: string[], hindi: string[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-4">
        <PolicyContent title="English" items={english} />
        <PolicyContent title="Hindi" items={hindi} />
      </div>
    </div>
  )
}

function PolicyContent({ title, items }: { title: string, items: string[] }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul className="list-disc pl-5 space-y-2">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

