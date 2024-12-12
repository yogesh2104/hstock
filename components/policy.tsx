// import React from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
// import { siteConfig } from '@/config/site-config';
// import Link from 'next/link';
// import { Domain } from '@/config/api-endpoint';

// const PrivacyPolicy = () => {
  // const privacyPolicyData = [
  //   {
  //     id: 1,
  //     title: "Information Collection",
  //     content: "We collect the following information from our customers: Full name, Email address, Phone number, Permanent or residence address, City, State, Pin code"
  //   },
  //   {
  //     id: 2,
  //     title: "Use of Information",
  //     content: "User account creation, Providing software updates and support, Marketing purposes"
  //   },
  //   {
  //     id: 3,
  //     title: "Cookies",
  //     content: "Description of cookie policy would be added here."
  //   },
  //   {
  //     id: 4,
  //     title: "Data Security",
  //     content: "We value your trust in providing us your personal information; thus, we strive to use commercially acceptable means of protecting it."
  //   },
  //   {
  //     id: 5,
  //     title: "Information Sharing",
  //     content: "We share our customers' data with some third parties when necessary for validation purposes."
  //   },
  //   {
  //     id: 6,
  //     title: "User Rights",
  //     content: "Users can update their registered information, but it is not guaranteed that the software they purchased will be registered with that information. However, your updated information will be used for your next purchase."
  //   },
  //   {
  //     id: 7,
  //     title: "Third-party Services",
  //     content: "We use third-party services for payments and related processes."
  //   },
  //   {
  //     id: 8,
  //     title: "Children's Privacy",
  //     content: "Although our software encourages customers to learn new things, there is no specific age criterion for using it. However, we recommend that this software be used primarily by individuals aged 17 and above."
  //   },
  //   {
  //     id: 9,
  //     title: "Changes to the Privacy Policy",
  //     content: "If we make any changes to our privacy policy, updates will be communicated to customers through our official website, YouTube channel, Instagram page, Facebook page, WhatsApp channel, email, and customer personal numbers, etc."
  //   },
  //   {
  //     id: 10,
  //     title: "Contact Information",
  //     content: "If you have any questions about this Privacy Policy, please contact us: Email: support@hstockalbums.com Phone: +91XXXXXXXXXX, +91XXXXXXXXXX"
  //   },
  //   {
  //     id: 11,
  //     title: "Website Link",
  //     content: "For more information, please visit our website: [Your Website URL]."
  //   }
  // ];

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
//             <p className="text-sm text-gray-600">Last updated: 11/12/2024</p>
//         </CardHeader>
//       <CardContent>
        // <section>
        // <p>{siteConfig.siteName} ("us", "we", or "our") operates <Link href={Domain} className='underline'>{siteConfig.siteName}</Link>.</p>
        // <p>
        // This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our Service.
        // </p>

//         </section>
//         <Accordion type="single" collapsible className="w-full">
//           {privacyPolicyData.map((section) => (
//             <AccordionItem key={section.id} value={`item-${section.id}`}>
//               <AccordionTrigger className="text-left">
//                 {section.id}. {section.title}
//               </AccordionTrigger>
//               <AccordionContent>
//                 <p className="text-gray-700 p-4 bg-gray-50 rounded-lg">
//                   {section.content}
//                 </p>
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
        
//         <div className="mt-6 p-4 bg-gray-50  dark:border text-black rounded-lg">
//           <h3 className="text-lg font-semibold mb-2">Company Details</h3>
//           <p className="">
//             Company Name: {siteConfig.siteName}
//             <br />
//             Email: {siteConfig.email}
//             <br />
//             Phone: {siteConfig.phoneNumber}
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default PrivacyPolicy;



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
        <p>{siteConfig.siteName} ("us", "we", or "our") operates <Link href={Domain} className='underline'>{siteConfig.siteName}</Link>.</p>
        <p>This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our Service.</p>
        </section>
        <Section
          english={siteConfig.privacyPolicyData}
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

