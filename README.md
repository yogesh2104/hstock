This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.






<!-- // "use client"


// interface adminProps{
//   id: string,
//   btnText: string,
//   btnLink:string,
//   isShow: boolean,
//   image: [
//       {
//         "id": string,
//         "imageId": string,
//         "isActive": boolean,
//         "imageLink":string
//       },
//   ]
// }

// import { useState, useEffect, useRef, useCallback } from "react"

// export default function HeroSection({getAPIData}:{getAPIData:adminProps[]}) {

//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [animationType, setAnimationType] = useState<"next" | "prev" | null>(null)

//   const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null)

//   // Clear all timeouts
//   const clearAllTimeouts = useCallback(() => {
//     if (autoAdvanceRef.current) {
//       clearTimeout(autoAdvanceRef.current)
//       autoAdvanceRef.current = null
//     }
//   }, [])

//   // Set auto advance timer
//   const setAutoAdvance = useCallback(() => {
//     clearAllTimeouts()
//     autoAdvanceRef.current = setTimeout(() => {
//       showSlider("next")
//     }, 7000)
//   }, [])

//   const showSlider = useCallback(
//     (type: "next" | "prev") => {
//       setAnimationType(type)

//       if (type === "next") {
//         setCurrentSlide((prev) => (prev + 1) % getAPIData[0]?.image?.length)
//       } else {
//         setCurrentSlide((prev) => (prev - 1 + getAPIData[0]?.image?.length) % getAPIData[0]?.image?.length)
//       }

//       // Reset animation state after a short delay
//       setTimeout(() => {
//         setAnimationType(null)
//       }, 500)

//       // Reset auto advance
//       setAutoAdvance()
//     },
//     [setAutoAdvance],
//   )

//   // Initialize auto advance
//   useEffect(() => {
//     setAutoAdvance()
//     return clearAllTimeouts
//   }, [setAutoAdvance, clearAllTimeouts])

//   const handleThumbnailClick = useCallback(
//     (index: number) => {
//       if (index === currentSlide) return

//       const type = index > currentSlide ? "next" : "prev"
//       setAnimationType(type)
//       setCurrentSlide(index)

//       // Reset animation state
//       setTimeout(() => {
//         setAnimationType(null)
//       }, 500)

//       // Reset auto advance
//       setAutoAdvance()
//     },
//     [currentSlide, setAutoAdvance],
//   )

//   return (
//     <div className="hero-container">
//       <div className={`carousel ${animationType || ""}`}>
//         <div className="list">
//           {getAPIData[0]?.image?.map((slide, index) => {
//             const isActive = index === currentSlide
//             const isNext = index === (currentSlide + 1) % getAPIData[0]?.image?.length
//             const isPrev = index === (currentSlide - 1 + getAPIData[0]?.image?.length) % getAPIData[0]?.image?.length

//             // For prev animation, we need to identify the slide that's moving out
//             const isMovingOut = animationType === "prev" && index === (currentSlide + 1) % getAPIData[0]?.image?.length

//             let slideClass = "item"
//             if (isActive) slideClass += " active"
//             if (isNext) slideClass += " next"
//             if (isPrev) slideClass += " prev"
//             if (isMovingOut) slideClass += " moving-out"

//             return (
//               <div
//                 key={slide.id}
//                 className={slideClass}
//                 style={{
//                   zIndex: isActive ? 1 : isMovingOut ? 2 : 0,
//                 }}
//               >
//                 <img
//                   src={slide.imageLink}
//                   alt={`Slide ${slide.id}`}
//                   loading={index === 0 ? "eager" : "lazy"}
//                 />
//               </div>
//             )
//           })}
//         </div>

//         <div className="thumbnail">
//           {getAPIData[0]?.image.map((slide, index) => (
//             <div
//               key={slide.id}
//               className={`item ${index === currentSlide ? "active" : ""}`}
//               onClick={() => handleThumbnailClick(index)}
//             >
//               <img
//                 src={slide.imageLink}
//                 alt={`Thumbnail ${slide.id}`}
//                 loading="lazy"
//               />
//             </div>
//           ))}
//         </div>

//         <button
//           className="arrow-btn arrow-left"
//           onClick={() => showSlider("prev")}
//           disabled={animationType !== null}
//         >
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//         </button>
        
//         {/* Right Arrow */}
//         <button
//           className="arrow-btn arrow-right"
//           onClick={() => showSlider("next")}
//           disabled={animationType !== null}
//         >
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//         </button>
//       </div>

//       <style jsx>{`
//         .carousel {
//           height: 90vh;
//           overflow: hidden;
//           position: relative;
//         }

//         .carousel .list {
//           width: 100%;
//           height: 100%;
//           position: relative;
//         }

//         .carousel .list .item {
//           width: 100%;
//           height: 100%;
//           position: absolute;
//           inset: 0 0 0 0;
//           opacity: 0;
//           transition: opacity 0.5s ease-in-out;
//         }

//         .carousel .list .item.active {
//           opacity: 1;
//           z-index: 1;
//         }

//         .carousel .list .item img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         .carousel .list .item .title {
//           font-size: 5em;
//           font-weight: bold;
//           line-height: 1.3em;
//           margin-bottom: 10px;
//         }

//         .carousel .list .item .description {
//           font-size: 1.2em;
//           margin-bottom: 20px;
//           opacity: 0.9;
//         }

//         .carousel .list .item .buttons {
//           display: grid;
//           grid-template-columns: repeat(2, 130px);
//           grid-template-rows: 40px;
//           gap: 5px;
//           margin-top: 20px;
//         }

//         .carousel .list .item .buttons button {
//           border: none;
//           background-color: #eee;
//           letter-spacing: 3px;
//           font-family: 'Poppins', sans-serif;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .carousel .list .item .buttons button:nth-child(2) {
//           background-color: transparent;
//           border: 1px solid #fff;
//           color: #eee;
//         }

//         .carousel .list .item .buttons button:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(0,0,0,0.3);
//         }

//         /* thumbnail */
//         .thumbnail {
//           position: absolute;
//           bottom: 50px;
//           right: 50px;
//           width: max-content;
//           z-index: 100;
//           display: flex;
//           gap: 20px;
//         }

//         .thumbnail .item {
//           width: 150px;
//           height: 220px;
//           flex-shrink: 0;
//           position: relative;
//           cursor: pointer;
//           transition: transform 0.3s ease, opacity 0.3s ease;
//           opacity:1;
//         }

//         .thumbnail .item.active {
//           transform: scale(1.05);
//           opacity: 1;
//           border: 2px solid #f1683a;
//           border-radius: 22px;
//         }

//         .thumbnail .item img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           border-radius: 20px;
//         }

//         .thumbnail .item .content {
//           color: #fff;
//           position: absolute;
//           bottom: 10px;
//           left: 10px;
//           right: 10px;
//         }

//         .thumbnail .item .content .title {
//           font-weight: 500;
//           font-size: 0.9em;
//         }

//         .thumbnail .item .content .description {
//           font-weight: 300;
//           font-size: 0.8em;
//           opacity: 0.8;
//         }

//         .arrow-btn {
//           position: absolute;
//           top: 50%;
//           transform: translateY(-50%);
//           width: 60px;
//           height: 60px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.1);
//           backdrop-filter: blur(10px);
//           border: 2px solid rgba(255, 255, 255, 0.2);
//           color: white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           z-index: 200;
//           transition: all 0.3s ease;
//         }
        
//         .arrow-btn:hover:not(:disabled) {
//           background: rgba(255, 255, 255, 0.2);
//           border-color: rgba(255, 255, 255, 0.4);
//           transform: translateY(-50%) scale(1.1);
//         }
        
//         .arrow-btn:disabled {
//           opacity: 1;
//           opacity: 0.3;
//           cursor: not-allowed;
//         }
        
//         .arrow-left {
//           border: 2px solid #f1683a;
          
//           left: 30px;
//         }
        
//         .arrow-right {
//           border: 2px solid #f1683a;
//           right: 30px;
//         }
        

//         /* Animation for content */
//         .carousel .list .item.active .content .title,
//         .carousel .list .item.active .content .description,
//         .carousel .list .item.active .content .buttons {
//           transform: translateY(50px);
//           filter: blur(20px);
//           opacity: 0;
//           animation: showContent 0.5s 0.5s linear 1 forwards;
//         }

//         @keyframes showContent {
//           to {
//             transform: translateY(0px);
//             filter: blur(0px);
//             opacity: 1;
//           }
//         }

//         .carousel .list .item.active .content .description {
//           animation-delay: 0.7s !important;
//         }

//         .carousel .list .item.active .content .buttons {
//           animation-delay: 0.9s !important;
//         }

//         /* Next animation */
//         .carousel.next .list .item.active img {
//           width: 150px;
//           height: 220px;
//           position: absolute;
//           bottom: 50px;
//           right: 50px;
//           border-radius: 30px;
//           animation: showImage 0.5s linear 1 forwards;
//         }

//         @keyframes showImage {
//           to {
//             bottom: 0;
//             right: 0;
//             width: 100%;
//             height: 100%;
//             border-radius: 0;
//           }
//         }

//         /* Removed thumbnail movement animation for next click */
//         /* .carousel.next .thumbnail .item:nth-last-child(1) {
//           overflow: hidden;
//           animation: showThumbnail 0.5s linear 1 forwards;
//         }

//         @keyframes showThumbnail {
//           from {
//             width: 0;
//             opacity: 0;
//           }
//         }

//         .carousel.next .thumbnail {
//           animation: effectNext 0.5s linear 1 forwards;
//         }

//         @keyframes effectNext {
//           from {
//             transform: translateX(150px);
//           }
//         } */

//         /* Prev animation */
//         .carousel.prev .list .item.moving-out {
//           z-index: 2;
//         }

//         .carousel.prev .list .item.moving-out img {
//           animation: outFrame 0.5s linear 1 forwards;
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           z-index: 2;
//         }

//         @keyframes outFrame {
//           to {
//           to {
//             width: 150px;
//             width: 150px;
//             height: 220px;
//             height: 220px;
//             bottom: 50px;
//             bottom: 50px;
//             right: 50px;
//             left: 50%;
//             transform: translateX(-50%);
//             border-radius: 20px;
//             border-radius: 20px;
//           }
//           }
//         }
//         }

//         .carousel.prev .list .item.moving-out .content .title,
//         .carousel.prev .list .item.moving-out .content .description,
//         .carousel.prev .list .item.moving-out .content .buttons {
//           animation: contentOut 0.5s linear 1 forwards !important;
//         }

//         @keyframes contentOut {
//           to {
//             transform: translateY(-150px);
//             filter: blur(20px);
//             opacity: 0;
//           }
//         }

//         /* running time */
//         .carousel .time {
//           position: absolute;
//           z-index: 1000;
//           width: 0%;
//           height: 3px;
//           background-color: #f1683a;
//           left: 0;
//           top: 0;
//         }

//         .carousel.next .time,
//         .carousel.prev .time {
//           animation: runningTime 0.5s linear 1 forwards;
//         }

//         @keyframes runningTime {
//           from { width: 100% }
//           to { width: 0 }
//         }

//         @media screen and (max-width: 678px) {
//           .carousel .list .item .content {
//             padding-right: 0;
//           }
//           .carousel .list .item .content .title {
//             font-size: 30px;
//           }
//           .arrows {
//             right: 50px;
//             transform: none;
//           }
//           .thumbnail {
//             display: none;
//           }
//         }

        	
//         /* Responsive Design */
//         @media screen and (max-width: 768px) {
//           .arrow-btn {
//             width: 50px;
//             height: 50px;
//           }
//           to {
          
//             transform: translateY(-150px);
//           .arrow-left {
//             filter: blur(20px);
//             left: 15px;
//           }
          
//           .arrow-right {
//             right: 15px;
//           }
          
//           .thumbnail {
//             bottom: 30px;
//             opacity: 0;
//             gap: 10px;
//           }
          
//           .thumbnail .item {
//             width: 100px;
//             height: 150px;
//           }
//           }
//         }
//         }
//       `}</style>
//     </div>
//   )
// } -->

