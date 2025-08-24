import React, { useState, useEffect, useCallback, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Download, Plus } from 'lucide-react';

type Card = {
  id: number;
  className: string;
  thumbnail: string;
  title?: string;
  description?: string;
};


export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const selectedIndex = useMemo(() => {
    return selected ? cards.findIndex(card => card.id === selected.id) : -1;
  }, [selected, cards]);

  const handleClick = useCallback((card: Card) => {
    setSelected(card);
    setCurrentIndex(cards.findIndex(c => c.id === card.id));
    setIsModalOpen(true);
  }, [cards]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelected(null);
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300);
  }, []);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % cards.length;
    setCurrentIndex(nextIndex);
    setSelected(cards[nextIndex]);
  }, [currentIndex, cards]);

  const handlePrev = useCallback(() => {
    const prevIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelected(cards[prevIndex]);
  }, [currentIndex, cards]);

  const handleDownload = useCallback(() => {
    if (selected) {
      const link = document.createElement('a');
      link.href = selected.thumbnail;
      link.download = `design-${selected.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [selected]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (!selected) return;
      
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrev();
          break;
        case 'd':
        case 'D':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleDownload();
          }
          break;
      }
    };

    if (selected) {
      document.addEventListener('keydown', handleKeyboard);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyboard);
      document.body.style.overflow = 'unset';
    };
  }, [selected, handleClose, handleNext, handlePrev, handleDownload]);

  return (
    <>
      <div className="w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {cards.map((card, index) => (
            <div key={card.id} className={card.className}>
              <ImageComponent card={card} onClick={() => handleClick(card)} index={index} />
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && selected && (
        <div
          className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center transition-all duration-300 ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Controls Bar */}
          <div className={`absolute top-4 left-4 right-4 flex justify-between items-center z-10 transition-all duration-500 ${
            isClosing ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <span className="text-white text-sm font-medium">
                {currentIndex + 1} / {cards.length}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => { e.stopPropagation(); handleDownload(); }}
                className="bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-lg p-2 text-white transition-all duration-200 hover:scale-110"
                title="Download image (Ctrl+D)"
              >
                <Download size={20} />
              </button>
              <button
                onClick={handleClose}
                className="bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-lg p-2 text-white transition-all duration-200 hover:scale-110"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110 ${
              isClosing ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
            }`}
            title="Previous image (←)"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110 ${
              isClosing ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
            }`}
            title="Next image (→)"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Container */}
          <div
            className={`relative max-w-7xl max-h-[85vh] w-full mx-4 transition-all duration-500 ${
              isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.thumbnail || "/placeholder.svg"}
              alt={selected.title || "Selected design"}
              className="w-full h-full object-contain rounded-lg"
              id="modal-title"
            />
            
            {/* Image Info */}
            {selected.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                <h2 className="text-white text-lg font-semibold mb-1">{selected.title}</h2>
                {selected.description && (
                  <p className="text-white/80 text-sm">{selected.description}</p>
                )}
              </div>
            )}
          </div>

          {/* Keyboard Shortcuts Hint */}
          <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-white/70 text-xs transition-all duration-500 ${
            isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            Use ← → keys to navigate • ESC to close • Ctrl+D to download
          </div>
        </div>
      )}
    </>
  );
};

const ImageComponent = React.memo(({ card, onClick, index }: { card: Card; onClick: () => void; index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  return (
    <div 
      className="group relative overflow-hidden cursor-pointer bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl h-full w-full transition-all duration-500 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/10 animate-fade-in-up"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-label={`View ${card.title || 'design'} in full screen`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both'
      }}
    >
      {!imageError ? (
        <>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={card.thumbnail || "/placeholder.svg"}
            alt={card.title || "Design thumbnail"}
            className={`object-cover object-center absolute inset-0 h-full w-full transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 opacity-50">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
          <Maximize2 className="text-white drop-shadow-lg" size={24} />
        </div>
      </div>
    </div>
  );
});