type Props = {
  onAcir: () => void;
  onBrillig: () => void;
  loading: boolean;
};

export default function Controls({ onAcir, onBrillig, loading }: Props) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onAcir}
        disabled={loading}
        className="group relative px-5 py-2 font-mono text-xs tracking-[0.12em] uppercase font-semibold border border-amber-500/60 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 rounded-sm"
        style={{boxShadow: 'none'}}
      >
        <span className="text-amber-600/60 mr-1.5">⬡</span>
        ACIR Opcodes
      </button>

      <button
        onClick={onBrillig}
        disabled={loading}
        className="group px-5 py-2 font-mono text-xs tracking-[0.12em] uppercase font-semibold border border-neutral-600/60 text-neutral-400 hover:bg-neutral-800/50 hover:border-neutral-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 rounded-sm"
      >
        <span className="text-neutral-600 mr-1.5">⬡</span>
        Brillig Functions
      </button>

      {loading && (
        <div className="flex items-center gap-2 ml-1">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
          <span className="font-mono text-[10px] text-amber-600/70 tracking-widest uppercase animate-pulse">
            processing
          </span>
        </div>
      )}
    </div>
  );
}