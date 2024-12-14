import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HStockFeatures = () => {
  const featureSections = [
    {
      title: "Photoshop Versions",
      description: "Supports all Photoshop versions from CS3 to CC 2023"
    },
    {
      title: "Settings",
      description: "Select preferred data in one go, easy access to photos, cutout portraits, and template packs"
    },
    {
      title: "Collection",
      description: "Store custom collections for future use"
    },
    {
      title: "Auto Features",
      features: [
        {
          name: "Auto Page",
          description: "Create a complete sheet with one click in seconds"
        },
        {
          name: "Auto Fill",
          description: "Manually open template and insert photo into frame layer"
        },
        {
          name: "Automate",
          description: "Design entire album at once with a single click"
        }
      ]
    },
    {
      title: "Image Manipulation",
      features: [
        {
          name: "Image Change",
          description: "Replace sample images with your own photos"
        },
        {
          name: "Image Import",
          description: "Place your own images anywhere on the template"
        },
        {
          name: "Swap",
          description: "Interchange images used in template"
        },
        {
          name: "Background Change",
          description: "Modify template background"
        }
      ]
    },
    {
      title: "Advanced Editing",
      features: [
        {
          name: "M.1",
          description: "Multiple image enhancement options including levels, sharpening, hotspot fill, healing filters, color tones, cinematic effects, beauty retouch, and more"
        },
        {
          name: "M.2",
          description: "Batch processing capabilities like clearing layers, resetting, splitting, inverting images, and template creation"
        }
      ]
    },
    {
      title: "Output & Export",
      features: [
        {
          name: "PSD to JPG",
          description: "Convert finished templates from PSD to JPG format"
        },
        {
          name: "Save & Save As",
          description: "Save or save as any image or template"
        },
        {
          name: "Watermark",
          description: "Add custom watermarks to documents"
        }
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* <h1 className="text-2xl font-bold md:mb-6 text-center">Explore Features</h1> */}
      
      <Accordion type="single" collapsible>
        {featureSections.map((section, index) => (
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