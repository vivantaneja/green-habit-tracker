const MAX_VISIBLE = 15

interface BottleIllustrationProps {
  count: number
  className?: string
}

function BottleSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 48"
      className={className}
      aria-hidden
    >
      <path
        d="M8 4h8v4H8V4zm1 4h6v2H9V8zm-1 2v32c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V10H8zm2 4h4v24h-4V14z"
        fill="currentColor"
        className="text-primary-400"
      />
      <ellipse cx="12" cy="6" rx="4" ry="2" fill="currentColor" className="text-primary-500" />
    </svg>
  )
}

export function BottleIllustration({ count, className = '' }: BottleIllustrationProps) {
  const visible = Math.min(count, MAX_VISIBLE)
  return (
    <div className={`flex flex-wrap items-end justify-center gap-1 ${className}`}>
      {Array.from({ length: visible }, (_, i) => (
        <div
          key={i}
          className="flex flex-col items-center"
          style={{
            transform: `translateY(${Math.sin(i * 0.5) * 2}px)`,
          }}
        >
          <BottleSvg className="h-8 w-5 sm:h-10 sm:w-6" />
        </div>
      ))}
      {count > MAX_VISIBLE && (
        <span className="self-end pb-1 text-sm font-medium text-slate-600">
          +{count - MAX_VISIBLE}
        </span>
      )}
    </div>
  )
}
