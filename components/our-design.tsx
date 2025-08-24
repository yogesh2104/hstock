"use client"
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Plus } from 'lucide-react';
import { LayoutGrid } from "./layout-grid";

type Card = {
  id: number;
  className: string;
  thumbnail: string;
  title?: string;
  description?: string;
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


export function OurDesign() {
  const isMobile = useIsMobile();
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  
  // Generate all 48 cards
  const allCards = useMemo(() => {
    const cards: Card[] = [];
    const layouts = [
      "col-span-1",
      "col-span-1 md:col-span-2",
      "col-span-1 md:row-span-2",
      "col-span-1 md:col-span-2 md:row-span-2"
    ];
    
    for (let i = 1; i <= 48; i++) {
      cards.push({
        id: i,
        className: layouts[(i - 1) % layouts.length],
        thumbnail: `/our-design/12X36 (${i}).jpg`,
        title: `Design ${i}`,
        description: `Beautiful design showcase ${i}`
      });
    }
    return cards;
  }, []);

  const displayCards = useMemo(() => 
    isMobile ? allCards.slice(0, Math.min(visibleCount, 12)) : allCards.slice(0, visibleCount),
    [allCards, isMobile, visibleCount]
  );

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 6, allCards.length));
      setIsLoading(false);
    }, 500);
  }, [allCards.length]);

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
        <LayoutGrid cards={displayCards} />
        
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
                  Load More Designs
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

