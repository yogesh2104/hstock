import Link from "next/link"
import AnimationContainer from "./animation-container"
import { MessageSquare, Youtube, Twitter, Linkedin, Facebook, Instagram } from "lucide-react"
import Image from "next/image"
import { siteConfig } from "@/config/site-config"

const Footer = () => {
  return (
    <footer className="relative border-t pt-16 pb-8 px-4 sm:px-6 lg:px-8 w-full">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
      <div className="absolute inset-0"></div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <AnimationContainer delay={0.2} className="mt-8 md:mt-0">
              <Link href="/" className="font-bold text-xl flex items-center group">
                <div className="relative">
                  <Image
                    width={50}
                    height={50}
                    src={"/logo.png"}
                    alt="logo"
                    className="rounded-xl w-12 h-12 mr-3  transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                </div>
                <span className=" group-hover:text-purple-300 transition-colors duration-300">
                  {siteConfig?.siteName || "Company"}
                </span>
              </Link>
            </AnimationContainer>

            <div className="space-y-3">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <h3 className="text-lg font-semibold  mb-2 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Business Hours
                </h3>
                <p className=" text-sm leading-relaxed">
                  Our calling hours are from 10:00 AM to 6:00 PM, Monday through Friday.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Follow Us</h4>
              <div className="flex gap-1">
                
                <Link
                  href={siteConfig?.socialLink?.twitter}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 group"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-green-600" fill="currentColor" width="22" height="22"  viewBox="0 0 32 32" id="whatsapp">
                <path d="m23.237 18.253-2.889-1.333c-.256-.142-.51-.028-.765.284-.311.425-.454.595-.822 1.049-.198.255-.34.425-.566.453-.256.057-.595-.085-.652-.085-.907-.311-1.955-1.077-2.748-1.786-.765-.708-1.615-1.7-1.983-2.579-.057-.113-.17-.397 0-.623.34-.454.397-.482.765-.907.255-.312.453-.595.368-.851L12.671 8.56c-.114-.227-.453-.255-.85-.284-.34 0-.708 0-.963.057-.566.199-1.728 1.729-1.869 2.835-.312 2.409 1.869 5.612 4.051 7.596 2.182 2.013 5.553 3.912 7.932 3.373 1.105-.255 2.522-1.53 2.635-2.126.057-.255.028-.623-.028-.964-.029-.397-.114-.68-.342-.794z"></path>
                <path d="M16.014 0C7.714 0 1 6.718 1 14.994c0 2.919.85 5.641 2.266 7.936L1 32l8.102-3.685a14.933 14.933 0 0 0 6.913 1.701c8.27 0 14.985-6.718 14.985-15.022C31 6.718 24.285 0 16.014 0zm0 27.011c-2.663 0-5.1-.85-7.082-2.324l-3.654 2.324 1.643-4.167a11.977 11.977 0 0 1-2.918-7.851c0-6.632 5.382-11.989 12.012-11.989a11.972 11.972 0 0 1 11.983 11.989c-.001 6.633-5.355 12.018-11.984 12.018z"></path>
              </svg>
                </Link>
                <Link
                  href={siteConfig?.socialLink?.facebook}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-600/50 transition-all duration-300 group"
                >
                  <Facebook className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
                </Link>
                <Link
                  href={siteConfig?.socialLink?.facebook}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-600/50 transition-all duration-300 group"
                >
                  <Instagram   className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
                </Link>
                <Link
                  href={siteConfig?.socialLink?.youtube}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 group"
                >
                  <Youtube className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6 relative">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {siteConfig.footerLink.map((item, id) => (
                <li key={id}>
                  <Link
                    href={item.link}
                    scroll={true}
                    className="text-sm leading-6 transition-all duration-300 flex items-center group"
                  >
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold mb-6 relative">
              Our Location
            </h3>
            <div className="relative">
              <div className="h-[240px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                {siteConfig.ourLocation}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>

        <AnimationContainer delay={0.6} className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm">{siteConfig.footerText}</p>
            </div>

            <div className="flex items-center space-x-6 text-xs">
              <Link href="/policy" className="transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors duration-300">
                Terms of Service
              </Link>
              {/* <Link href="/cookies" className="transition-colors duration-300">
                Cookie Policy
              </Link> */}
            </div>
          </div>
        </AnimationContainer>
      </div>
    </footer>
  )
}

export default Footer

