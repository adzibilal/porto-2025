export default function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="bg-zinc-50 dark:bg-zinc-800 rounded-lg overflow-hidden animate-pulse">
          {/* Image skeleton */}
          <div className="aspect-square bg-zinc-200 dark:bg-zinc-700"></div>
          
          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            {/* Title skeleton */}
            <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
            
            {/* Tags skeleton */}
            <div className="flex space-x-2">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-12"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-16"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-14"></div>
            </div>
            
            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
              <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-2/3"></div>
            </div>
            
            {/* Date skeleton */}
            <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
