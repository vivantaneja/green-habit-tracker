/** 0–1 progress for tree growth (height/leafiness) */
interface TreeIllustrationProps {
  progress: number
  className?: string
}

export function TreeIllustration({ progress, className = '' }: TreeIllustrationProps) {
  const height = 40 + progress * 80
  const opacity = 0.4 + progress * 0.6
  return (
    <div className={`flex flex-col items-center justify-end ${className}`}>
      <svg
        viewBox="0 0 80 120"
        className="max-h-32 w-auto"
        aria-hidden
      >
        <defs>
          <linearGradient id="trunk" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b0865a" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
        </defs>
        {/* Trunk */}
        <rect
          x="34"
          y={100 - height * 0.3}
          width="12"
          height={height * 0.3}
          fill="url(#trunk)"
          opacity={opacity}
        />
        {/* Foliage - scales with progress */}
        <ellipse
          cx="40"
          cy={60}
          rx={20 * (0.5 + progress * 0.5)}
          ry={35 * (0.5 + progress * 0.5)}
          fill="#059669"
          opacity={opacity}
        />
        <ellipse
          cx="40"
          cy="45"
          rx={18 * (0.5 + progress * 0.5)}
          ry={25 * (0.5 + progress * 0.5)}
          fill="#34d399"
          opacity={opacity}
        />
      </svg>
    </div>
  )
}
