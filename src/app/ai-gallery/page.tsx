"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import BlurText from '@/components/shared/BlurText';
import GallerySkeleton from '@/components/ui/GallerySkeleton';

interface AIGalleryItem {
  id: number;
  title: string;
  prompt: string;
  tags: string[];
  created_at: string;
  images: {
    id: number;
    image_url: string;
    public_id: string;
    display_order: number;
  }[];
}

function AIGalleryContent() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<AIGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAnimationComplete = () => {
    console.log('AI Gallery animation completed!');
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  useEffect(() => {
    const queryFromUrl = searchParams.get('q');
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
    }
  }, [searchParams]);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ai-gallery');
      
      if (!response.ok) {
        throw new Error('Failed to fetch gallery items');
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      setError('Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  // Filter items by search query
  const filteredItems = searchQuery 
    ? items.filter(item => {
        const searchLower = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(searchLower) ||
          item.prompt.toLowerCase().includes(searchLower) ||
          item.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        );
      })
    : items;


  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchGalleryItems}
            className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header Section */}
      <section className="relative z-20">
        <div className="bg-white dark:bg-gray-900 px-4 md:px-8 lg:px-[6rem] pt-8 md:pt-16 lg:pt-[8rem] pb-8 md:pb-12 lg:pb-[5rem] transition-colors duration-300">
          <div className="flex items-center justify-between mb-8 md:mb-16 lg:mb-[10rem]">
            <BlurText
              text="(AI Gallery)"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-[16px] md:text-[20px] lg:text-[22px] italic font-meta text-zinc-500 dark:text-zinc-400 transition-colors duration-300"
            />
            <BlurText
              text={`(${filteredItems.length})`}
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-[16px] md:text-[20px] lg:text-[22px] italic font-meta text-zinc-500 dark:text-zinc-400 transition-colors duration-300"
            />
          </div>
          <BlurText
            text="AI Artworks"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-[4rem] md:text-[8rem] lg:text-[19rem] text-zinc-900 dark:text-zinc-100 font-bold leading-none font-heading transition-colors duration-300"
          />
          <BlurText
            text="Explore my collection of AI-generated artworks, prompts, and creative experiments."
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-[1.5rem] md:text-[3rem] lg:text-[5rem] text-zinc-800 dark:text-zinc-200 font-semibold leading-none transition-colors duration-300"
          />
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white dark:bg-gray-900 px-4 md:px-8 lg:px-[6rem] pb-8 transition-colors duration-300">
        <div className="relative max-w-2xl">
          <div className="relative">
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari berdasarkan judul, prompt, atau tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-colors duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Menampilkan {filteredItems.length} dari {items.length} hasil untuk &ldquo;{searchQuery}&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-white dark:bg-gray-900 px-4 md:px-8 lg:px-[6rem] pb-16 md:pb-24 lg:pb-32 transition-colors duration-300">
        {loading && <GallerySkeleton />}
        
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              {searchQuery ? `Tidak ada karya seni yang ditemukan untuk &ldquo;${searchQuery}&rdquo;` : 'Tidak ada karya seni ditemukan'}
            </p>
          </div>
        )}
        
        {!loading && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredItems.map((item) => {
              const hasImages = item.images && item.images.length > 0;
              const primaryImage = hasImages 
                ? (item.images.find(img => img.display_order === 0) || item.images[0])
                : null;
              
              return (
                <Link
                  key={item.id}
                  href={`/ai-gallery/${item.id}`}
                  className="group block"
                >
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    {/* Image */}
                    <div className="aspect-square relative bg-zinc-100 dark:bg-zinc-700">
                      {primaryImage ? (
                        <Image
                          src={primaryImage.image_url}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Image count overlay */}
                      {hasImages && item.images.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                          {item.images.length} images
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-2 transition-colors duration-300">
                        {item.title}
                      </h3>
                      
                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded transition-colors duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                          {item.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded transition-colors duration-300">
                              +{item.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Prompt preview */}
                      {item.prompt && (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 transition-colors duration-300">
                          {item.prompt.replace(/<[^>]*>/g, '')} {/* Remove HTML tags for preview */}
                        </p>
                      )}

                      {/* Date */}
                      <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2 transition-colors duration-300">
                        {new Date(item.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default function AIGalleryPage() {
  return (
    <Suspense fallback={<GallerySkeleton />}>
      <AIGalleryContent />
    </Suspense>
  );
}
