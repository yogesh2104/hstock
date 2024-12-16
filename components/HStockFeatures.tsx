import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { siteConfig } from '@/config/site-config';

const HStockFeatures = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Accordion type="single" collapsible>
        {siteConfig.featureSections.map((section, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold p-3 rounded">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="p-4">
              {section.description && (
                <p className="text-gray-600 mb-3">{section.description}</p>
              )}
              {section.features && (
                <div className="grid md:grid-cols-2 gap-3 order">
                  {section.features.map((feature, featureIndex) => (
                    <Card key={featureIndex} className="hover:shadow-md border transition-shadow">
                      <CardHeader className='p-2 text-start'>
                        <CardTitle>{feature.name}</CardTitle>
                      </CardHeader>
                      <CardContent className='p-2 text-start'>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default HStockFeatures;