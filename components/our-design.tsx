// "use client"
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { Plus } from 'lucide-react';
// import { LayoutGrid } from "./layout-grid";

// type Card = {
//   id: number;
//   className: string;
//   thumbnail: string;
//   title?: string;
//   description?: string;
// };

// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(false);
  
//   useEffect(() => {
//     const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
//     checkIsMobile();
//     window.addEventListener('resize', checkIsMobile);
//     return () => window.removeEventListener('resize', checkIsMobile);
//   }, []);
  
//   return isMobile;
// };


// export function OurDesign() {
//   const isMobile = useIsMobile();
//   const [visibleCount, setVisibleCount] = useState(6);
//   const [isLoading, setIsLoading] = useState(false);
  
//   // Generate all 48 cards
//   const allCards = useMemo(() => {
//     const cards: Card[] = [];
//     const layouts = [
//       "col-span-1",
//       "col-span-1 md:col-span-2",
//       "col-span-1 md:row-span-2",
//       "col-span-1 md:col-span-2 md:row-span-2"
//     ];
    
//     for (let i = 1; i <= 48; i++) {
//       cards.push({
//         id: i,
//         className: layouts[(i - 1) % layouts.length],
//         thumbnail: `/our-design/12X36 (${i}).jpg`,
//         title: `Design ${i}`,
//         description: `Beautiful design showcase ${i}`
//       });
//     }
//     return cards;
//   }, []);

//   const displayCards = useMemo(() => 
//     isMobile ? allCards.slice(0, Math.min(visibleCount, 12)) : allCards.slice(0, visibleCount),
//     [allCards, isMobile, visibleCount]
//   );

//   const handleLoadMore = useCallback(() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setVisibleCount(prev => Math.min(prev + 6, allCards.length));
//       setIsLoading(false);
//     }, 500);
//   }, [allCards.length]);

//   const hasMore = visibleCount < allCards.length;

//   return (
//     <div className="py-10 px-4 bg-white dark:bg-slate-950 transition-colors duration-300" id='our-design'>
//       <div className="text-center mb-16">
//         <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
//           <span className="block bg-gradient-to-r from-slate-900 via-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-indigo-400">
//             Our Design
//           </span>
//           <span className="block bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//             That Stands Out
//           </span>
//         </h2>
//         <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
//           Create amazing experiences effortlessly with our flexible and innovative design solutions that captivate and
//           inspire.
//         </p>
//       </div>
      
//       <div className="container mx-auto max-w-6xl">
//         <LayoutGrid cards={displayCards} />
        
//         {hasMore && (
//           <div className="flex justify-center mt-12">
//             <button
//               onClick={handleLoadMore}
//               disabled={isLoading}
//               className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-xl"
//             >
//               {isLoading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                   Loading...
//                 </>
//               ) : (
//                 <>
//                   <Plus className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-90" />
//                   Load More Designs
//                 </>
//               )}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client"
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Grid, Square, Maximize2, ImageIcon, X } from 'lucide-react';

type Card = {
  id: number;
  className: string;
  thumbnail: string;
  title?: string;
  description?: string;
};

type LayoutConfig = {
  id: string;
  name: string;
  description: string;
  gridClass: string;
  cardLayouts: string[];
  imageAspect: 'cover' | 'contain' | 'fill';
  showFullWidth?: boolean;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  return isMobile;
};

const layoutConfigs: LayoutConfig[] = [
  {
    id: 'wide-showcase',
    name: 'Wide Showcase',
    description: 'Perfect for panoramic images',
    gridClass: 'flex flex-col gap-8',
    cardLayouts: ["w-full"],
    imageAspect: 'contain',
    showFullWidth: true
  },
];

const ImageCard = ({ card, layout, imageAspect, onImageClick }: { 
  card: Card; 
  layout: string;
  imageAspect: 'cover' | 'contain' | 'fill';
  onImageClick: (card: Card) => void;
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const aspectRatioClass = layout.includes('full') || layout.includes('w-full') 
    ? 'aspect-[3/1]' // Wide aspect for panoramic images
    : 'aspect-[4/3]';

  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill'
  }[imageAspect];

  return (
    <div className={`${layout} group cursor-pointer`} onClick={() => onImageClick(card)}>
      <div className="relative h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
        <div className={`relative ${aspectRatioClass} w-full overflow-hidden`}>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {!imageError ? (
            <img
              src={card.thumbnail}
              alt={card.title || `Design ${card.id}`}
              className={`w-full h-full ${objectFitClass} transition-all duration-300 group-hover:scale-110 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700">
              <div className="text-center text-slate-500 dark:text-slate-400">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Image not available</p>
              </div>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
          {card.description && (
            <p className="text-sm text-gray-200 line-clamp-2">{card.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ImageModal = ({ card, isOpen, onClose }: { 
  card: Card | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !card) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90" onClick={onClose}>
      <div className="relative max-w-7xl max-h-full w-full">
        <img
          src={card.thumbnail}
          alt={card.title || `Design ${card.id}`}
          className="w-full h-full object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
        <X onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white  rounded-full p-2 cursor-pointer"/>
      </div>
    </div>
  );
};

export function OurDesign() {
  const isMobile = useIsMobile();
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLayout, setCurrentLayout] = useState('masonry');
  const [modalCard, setModalCard] = useState<Card | null>(null);
  
  // Generate all 48 cards
  const allCards = useMemo(() => {
    const cards: Card[] = [];
    
    for (let i = 1; i <= 48; i++) {
      cards.push({
        id: i,
        className: "",
        thumbnail: `/our-design/12X36 (${i}).jpg`,
        title: `Design ${i}`,
        description: `Beautiful design showcase piece featuring innovative layout and creative elements`
      });
    }
    return cards;
  }, []);

  const activeLayout = useMemo(() => 
    layoutConfigs.find(l => l.id === currentLayout) || layoutConfigs[0],
    [currentLayout]
  );

  const displayCards = useMemo(() => {
    const maxCards = isMobile ? Math.min(visibleCount, 12) : visibleCount;
    return allCards.slice(0, maxCards).map((card, index) => ({
      ...card,
      className: activeLayout.cardLayouts[index % activeLayout.cardLayouts.length]
    }));
  }, [allCards, isMobile, visibleCount, activeLayout]);

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 6, allCards.length));
      setIsLoading(false);
    }, 500);
  }, [allCards.length]);

  const handleImageClick = useCallback((card: Card) => {
    setModalCard(card);
  }, []);

  const hasMore = visibleCount < allCards.length;

  return (
    <div className="py-10 px-4 bg-white dark:bg-slate-950 transition-colors duration-300" id='our-design'>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="block bg-gradient-to-r from-slate-900 via-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-indigo-400">
            Our Design
          </span>
          <span className="block bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            That Stands Out
          </span>
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Create amazing experiences effortlessly with our flexible and innovative design solutions that captivate and
          inspire.
        </p>
      </div>
      <div className="container mx-auto max-w-6xl">
        {activeLayout.showFullWidth ? (
          <div className={activeLayout.gridClass}>
            {displayCards.map((card) => (
              <div key={card.id} className="relative group cursor-pointer" onClick={() => handleImageClick(card)}>
                <div className="relative w-full aspect-[3/1] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <img
                    src={card.thumbnail}
                    alt={card.title || `Design ${card.id}`}
                    className={`w-full h-full object-${activeLayout.imageAspect} transition-transform duration-300 group-hover:scale-105`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Grid layouts
          <div className={activeLayout.gridClass}>
            {displayCards.map((card) => (
              <ImageCard
                key={card.id}
                card={card}
                layout={card.className}
                imageAspect={activeLayout.imageAspect}
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        )}
        
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                  Load More Designs ({allCards.length - visibleCount} remaining)
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      <ImageModal 
        card={modalCard} 
        isOpen={!!modalCard} 
        onClose={() => setModalCard(null)} 
      />
    </div>
  );
}

// Separate ImageCard component for better organization
// const ImageCard = ({ card, layout, imageAspect, onImageClick }: { 
//   card: Card; 
//   layout: string;
//   imageAspect: 'cover' | 'contain' | 'fill';
//   onImageClick: (card: Card) => void;
// }) => {
//   const [imageError, setImageError] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const objectFitClass = {
//     cover: 'object-cover',
//     contain: 'object-contain bg-slate-100 dark:bg-slate-800',
//     fill: 'object-fill'
//   }[imageAspect];

//   return (
//     <div className={`${layout} group cursor-pointer`} onClick={() => onImageClick(card)}>
//       <div className="relative h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
//         {/* Loading State */}
//         {!imageLoaded && (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         )}
        
//         {/* Image */}
//         {!imageError ? (
//           <img
//             src={card.thumbnail}
//             alt={card.title || `Design ${card.id}`}
//             className={`w-full h-full ${objectFitClass} transition-all duration-300 group-hover:scale-110 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
//             onLoad={() => setImageLoaded(true)}
//             onError={() => {
//               setImageError(true);
//               setImageLoaded(true);
//             }}
//             loading="lazy"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700">
//             <div className="text-center text-slate-500 dark:text-slate-400">
//               <Square className="w-12 h-12 mx-auto mb-2 opacity-50" />
//               <p className="text-sm">Design {card.id}</p>
//             </div>
//           </div>
//         )}
        
//         {/* Hover Overlay */}
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
//           <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//         </div>

//         {/* Content Overlay */}
//         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//           <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
//           {card.description && (
//             <p className="text-sm text-gray-200 line-clamp-2">{card.description}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
