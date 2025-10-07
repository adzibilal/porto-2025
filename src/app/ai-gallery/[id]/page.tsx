"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import BlurText from '@/components/shared/BlurText';
import { Metadata } from 'next';

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

// Generate metadata for AI Gallery detail page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.adzibilal.vercel.app';
  
  try {
    // Fetch artwork data
    const response = await fetch(`${baseUrl}/api/ai-gallery/${params.id}`, {
      cache: 'no-store' // Ensure fresh data for metadata
    });
    
    if (!response.ok) {
      return {
        title: 'Artwork Not Found | AI Gallery - Adzi Bilal',
        description: 'The requested AI artwork could not be found in Adzi Bilal\'s gallery',
        openGraph: {
          title: 'Artwork Not Found | AI Gallery - Adzi Bilal',
          description: 'The requested AI artwork could not be found in Adzi Bilal\'s gallery',
          images: [`${baseUrl}/og-image.jpg`],
          url: `${baseUrl}/ai-gallery/${params.id}`,
          type: 'article',
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Artwork Not Found | AI Gallery - Adzi Bilal',
          description: 'The requested AI artwork could not be found in Adzi Bilal\'s gallery',
          images: [`${baseUrl}/og-image.jpg`],
        },
      };
    }

    const item: AIGalleryItem = await response.json();
    const currentUrl = `${baseUrl}/ai-gallery/${item.id}`;
    const imageUrl = item.images && item.images.length > 0 
      ? item.images[0].image_url 
      : `${baseUrl}/og-image.jpg`;
    
    // Clean prompt for description (remove HTML tags and limit length)
    const cleanPrompt = item.prompt 
      ? item.prompt.replace(/<[^>]*>/g, '').substring(0, 160) + '...'
      : `AI-generated artwork by Adzi Bilal - ${item.title}`;
    
    const description = cleanPrompt.length > 160 
      ? cleanPrompt.substring(0, 157) + '...'
      : cleanPrompt;

    return {
      title: `${item.title} | AI Gallery - Adzi Bilal`,
      description: description,
      keywords: [
        'AI Art',
        ...(item.tags || []),
        'Adzi Bilal',
        'AI Gallery',
        'Artificial Intelligence',
        'Digital Art'
      ],
      authors: [{ name: 'Adzi Bilal' }],
      creator: 'Adzi Bilal',
      publisher: 'Adzi Bilal',
      alternates: {
        canonical: currentUrl,
      },
      openGraph: {
        title: `${item.title} | AI Gallery - Adzi Bilal`,
        description: description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: item.title,
          },
        ],
        url: currentUrl,
        type: 'article',
        siteName: 'Adzi Bilal Portfolio',
        locale: 'id_ID',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${item.title} | AI Gallery - Adzi Bilal`,
        description: description,
        images: [imageUrl],
        creator: '@adzibilal',
        site: '@adzibilal',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      other: {
        'article:author': 'Adzi Bilal',
        'article:published_time': item.created_at,
        'article:section': 'AI Gallery',
        ...(item.tags?.reduce((acc, tag, index) => {
          acc[`article:tag:${index}`] = tag;
          return acc;
        }, {} as Record<string, string>) || {}),
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Loading AI Artwork | AI Gallery - Adzi Bilal',
      description: 'Loading AI-generated artwork from Adzi Bilal\'s gallery',
      openGraph: {
        title: 'Loading AI Artwork | AI Gallery - Adzi Bilal',
        description: 'Loading AI-generated artwork from Adzi Bilal\'s gallery',
        images: [`${baseUrl}/og-image.jpg`],
        url: `${baseUrl}/ai-gallery/${params.id}`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Loading AI Artwork | AI Gallery - Adzi Bilal',
        description: 'Loading AI-generated artwork from Adzi Bilal\'s gallery',
        images: [`${baseUrl}/og-image.jpg`],
      },
    };
  }
}

export default function AIGalleryDetailPage() {
  const params = useParams();
  const [item, setItem] = useState<AIGalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);

  const handleAnimationComplete = () => {
    console.log('AI Gallery detail animation completed!');
  };

  useEffect(() => {
    if (params.id) {
      fetchGalleryItem(params.id as string);
    }
  }, [params.id]);

  const fetchGalleryItem = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/ai-gallery/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Artwork not found');
        } else {
          throw new Error('Failed to fetch gallery item');
        }
        return;
      }

      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error('Error fetching gallery item:', error);
      setError('Failed to load artwork');
    } finally {
      setLoading(false);
    }
  };

  const copyPromptToClipboard = async () => {
    if (!item?.prompt) return;

    try {
      // Remove HTML tags from prompt
      const plainTextPrompt = item.prompt.replace(/<[^>]*>/g, '');
      await navigator.clipboard.writeText(plainTextPrompt);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = item.prompt.replace(/<[^>]*>/g, '');
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const copyLinkToClipboard = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopyLinkSuccess(true);
      setTimeout(() => setCopyLinkSuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopyLinkSuccess(true);
      setTimeout(() => setCopyLinkSuccess(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-zinc-900 dark:border-zinc-100 border-t-transparent mx-auto mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-400">Loading artwork...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Artwork not found'}</p>
          <Link 
            href="/ai-gallery"
            className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const selectedImage = item.images && item.images.length > 0 ? item.images[selectedImageIndex] : null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 px-4 md:px-8 lg:px-[6rem] py-4 border-b border-zinc-200 dark:border-zinc-700 transition-colors duration-300">
        <Link 
          href="/ai-gallery"
          className="inline-flex items-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Gallery
        </Link>
      </nav>

      {/* Header Section */}
      <section className="relative z-20">
        <div className="bg-white dark:bg-gray-900 px-4 md:px-8 lg:px-[6rem] pt-8 md:pt-16 lg:pt-[4rem] pb-8 md:pb-12 lg:pb-[3rem] transition-colors duration-300">
          <div className="flex items-center justify-between mb-8 md:mb-16 lg:mb-[5rem]">
            <BlurText
              text="(AI Artwork)"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-[16px] md:text-[20px] lg:text-[22px] italic font-meta text-zinc-500 dark:text-zinc-400 transition-colors duration-300"
            />
            <BlurText
              text={new Date(item.created_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-[16px] md:text-[20px] lg:text-[22px] italic font-meta text-zinc-500 dark:text-zinc-400 transition-colors duration-300"
            />
          </div>
          <BlurText
            text={item.title}
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-[2rem] md:text-[4rem] lg:text-[8rem] text-zinc-900 dark:text-zinc-100 font-bold leading-none font-heading transition-colors duration-300 mb-4 md:mb-8"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white dark:bg-gray-900 px-4 md:px-8 lg:px-[6rem] pb-16 md:pb-24 lg:pb-32 transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square relative bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
              {selectedImage ? (
                <Image
                  src={selectedImage.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnail Grid */}
            {item.images && item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square relative bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden transition-all ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-zinc-900 dark:ring-zinc-100'
                        : 'hover:opacity-80'
                    }`}
                  >
                    <Image
                      src={image.image_url}
                      alt={`${item.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12.5vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3 transition-colors duration-300">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/ai-gallery?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-300"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Prompt Section */}
            {item.prompt && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
                    Prompt
                  </h3>
                  <button
                    onClick={copyPromptToClipboard}
                    className={`inline-flex items-center px-3 py-1 text-sm rounded-md transition-all duration-300 transform group ${
                      copySuccess
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 animate-success-pulse'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-102'
                    }`}
                  >
                    {copySuccess ? (
                      <>
                        <svg className="w-4 h-4 mr-1 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 transition-colors duration-300">
                  <div 
                    className="text-zinc-700 dark:text-zinc-300 leading-relaxed prose prose-sm max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: item.prompt }}
                  />
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3 transition-colors duration-300">
                Details
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-zinc-500 dark:text-zinc-400">Created</dt>
                  <dd className="text-zinc-900 dark:text-zinc-100">
                    {new Date(item.created_at).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500 dark:text-zinc-400">Images</dt>
                  <dd className="text-zinc-900 dark:text-zinc-100">
                    {item.images ? item.images.length : 0} image{(item.images?.length || 0) !== 1 ? 's' : ''}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500 dark:text-zinc-400">Tags</dt>
                  <dd className="text-zinc-900 dark:text-zinc-100">
                    {item.tags ? item.tags.length : 0} tag{(item.tags?.length || 0) !== 1 ? 's' : ''}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Share Section */}
            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3 transition-colors duration-300">
                Share
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={copyLinkToClipboard}
                  className={`inline-flex items-center px-3 py-2 text-sm rounded-md transition-all duration-300 transform group ${
                    copyLinkSuccess
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 animate-success-pulse'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-102'
                  }`}
                >
                  {copyLinkSuccess ? (
                    <>
                      <svg className="w-4 h-4 mr-1 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Link
                    </>
                  )}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 transform hover:scale-102 group"
                >
                  <svg className="w-4 h-4 mr-1 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Share on Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
