"use client";

import React, { useState, useEffect } from 'react';
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

export default function AIGalleryPage() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<AIGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('');

  const handleAnimationComplete = () => {
    console.log('AI Gallery animation completed!');
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  useEffect(() => {
    const tagFromUrl = searchParams.get('tag');
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl);
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

  // Get all unique tags
  const allTags = Array.from(
    new Set(items.flatMap(item => item.tags || []))
  ).sort((a, b) => a.localeCompare(b));

  // Filter items by selected tag
  const filteredItems = selectedTag 
    ? items.filter(item => item.tags?.includes(selectedTag))
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

      {/* Filter Section */}
      {allTags.length > 0 && (
        <section className="bg-white dark:bg-gray-900 px-4 md:px-8 lg:px-[6rem] pb-8 transition-colors duration-300">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSelectedTag('')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedTag === ''
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              All ({items.length})
            </button>
            {allTags.map((tag) => {
              const count = items.filter(item => item.tags?.includes(tag)).length;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedTag === tag
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {tag} ({count})
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="bg-white dark:bg-gray-900 px-4 md:px-8 lg:px-[6rem] pb-16 md:pb-24 lg:pb-32 transition-colors duration-300">
        {loading && <GallerySkeleton />}
        
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              {selectedTag ? `No artworks found with tag "${selectedTag}"` : 'No artworks found'}
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
