// Loading skeleton components for better perceived performance
export function SkeletonCard() {
  return (
    <div className="hand-card p-4 animate-pulse">
      <div className="h-4 bg-secondary rounded w-3/4 mb-3" />
      <div className="h-3 bg-secondary rounded w-full mb-2" />
      <div className="h-3 bg-secondary rounded w-2/3" />
    </div>
  );
}

export function SkeletonGrid({ count = 5 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-secondary rounded w-full" style={{ width: `${90 - i * 15}%` }} />
      ))}
    </div>
  );
}

export function SkeletonButton() {
  return <div className="h-10 bg-secondary rounded-xl w-32 animate-pulse" />;
}
