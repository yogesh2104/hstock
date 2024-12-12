import Link from "next/link";
import AnimationContainer from "./animation-container";
import { MessageSquare, Youtube,Twitter,Linkedin } from "lucide-react";
import Image from "next/image";
import { siteConfig } from '@/config/site-config';
import { MapComponent, MapProvider } from "./map";


const Footer = () => {
  return (
    <footer className="relative border-t border-border pt-6 pb-8 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-foreground rounded-full"></div>

      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">


          <div className="space-y-6">
            <AnimationContainer delay={0.2} className="mt-8 md:mt-0">
              <Link href="/" className="font-bold text-lg flex items-center">
                <Image
                  width={50} 
                  height={50} 
                  src={"/logo.png"}
                  alt="logo" 
                  className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
              </Link>
            </AnimationContainer>
            <div className="">
              <h1 className="text-xl">Timming</h1>
              <p className="text-xs">Our calling hours are from 10:00 AM to 6:00 PM.</p>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="p-2 rounded-full transition-colors">
                <MessageSquare className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 rounded-full transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 rounded-full transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>



          <div className="">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {siteConfig.footerLink.map((item,id)=>(
                <li key={id}>
                <Link key={item.name} href={item.link} scroll={true} className="text-sm leading-5 hover:text-foreground transition-colors">
                  {item.name}
                </Link>
              </li>
              ))}
            </ul>
          </div>

        

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Our Location</h3>
            <div className="h-[200px] rounded-lg overflow-hidden">
            <MapProvider>
              <MapComponent/>
            </MapProvider>
              {/* <Map address="1600 Amphitheatre Parkway, Mountain View, CA" /> */}
            </div>
          </div>
        </div>


        <AnimationContainer
          delay={0.6}
          className="mt-8 border-t border-border/40 pt-4 px-4 sm:px-6 lg:px-8"
        >
          <div className="flex justify-center">
            <p className="text-xs leading-5 text-muted-foreground text-center">
              {siteConfig.footerText}
            </p>
          </div>
        </AnimationContainer>
      </div>

      
    </footer>
  );
};

export default Footer;


