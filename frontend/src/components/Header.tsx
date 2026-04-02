export default function Header() {
  return (
    <header className="relative mb-2">
      <div className="flex items-baseline gap-4">
        <h1 className="font-light text-5xl tracking-[-0.03em] text-amber-400" 
            style={{textShadow: '0 0 30px rgba(251,191,36,0.4), 0 0 60px rgba(251,191,36,0.1)'}}>
          AZIR
        </h1>
        <span className="font-mono text-xs text-amber-600/70 tracking-[0.25em] uppercase pb-1">
          v0.1.0
        </span>
      </div>
      <p className="font-mono text-xs text-neutral-500 mt-1 tracking-[0.15em] uppercase">
        Circuit inspector·{" "}
        <span className="text-amber-700/60 hover:text-amber-700/50 hover:underline transition"><a href="https://github.com/uttkarzsh/azir" target="_blank"
rel="noopener noreferrer">SOURCE CODE</a> </span>
      </p>
      <div className="mt-4 h-px bg-gradient-to-r from-amber-500/40 via-amber-500/10 to-transparent" />
    </header>
  );
}