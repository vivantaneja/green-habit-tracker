export function HeroPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-40" aria-hidden>
      <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex" x="0" y="0" width="40" height="34.64" patternUnits="userSpaceOnUse">
            <path
              d="M20 0L40 8.66v17.32L20 34.64 0 25.98V8.66L20 0z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary-500"
            />
          </pattern>
          <pattern id="lines" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 20V0M20 0v20" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-primary-400" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
        <rect width="100%" height="100%" fill="url(#lines)" opacity="0.5" />
      </svg>
    </div>
  )
}
