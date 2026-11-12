/** Абстрактная «макула»: концентрические кольца с бирюзовым центром. Чистая декорация. */
export function LuteinMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className} fill="none">
      <defs>
        <radialGradient id="lm-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe9a8" />
          <stop offset="45%" stopColor="#f4c64e" />
          <stop offset="100%" stopColor="#f4c64e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#56d6d1" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#56d6d1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#lm-glow)" />
      {[88, 72, 56, 40].map((r, i) => (
        <circle key={r} cx="100" cy="100" r={r} stroke="white" strokeOpacity={0.1 + i * 0.06} strokeWidth="1" strokeDasharray={i % 2 ? "2 6" : undefined} />
      ))}
      <circle cx="100" cy="100" r="26" fill="url(#lm-core)" />
      <circle cx="100" cy="100" r="9" fill="#091b45" />
      <circle cx="104" cy="96" r="3" fill="white" fillOpacity="0.9" />
    </svg>
  );
}
