type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function BytecodeInput({ value, onChange }: Props) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.2em] text-amber-600/80 uppercase">
          ► bytecode
        </span>
        <div className="flex-1 h-px bg-neutral-800" />
        {value && (
          <span className="font-mono text-[10px] text-neutral-600">
            {value.length} chars
          </span>
        )}
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={10}
          className="w-full bg-neutral-950 border border-neutral-800 rounded-sm p-4 font-mono text-xs text-amber-300/80 focus:outline-none focus:border-amber-600/50 transition-colors resize-none leading-relaxed placeholder:text-neutral-700"
          style={{
            caretColor: '#f59e0b',
            boxShadow: 'inset 0 1px 8px rgba(0,0,0,0.6)',
          }}
          placeholder="paste compiled program bytecode here..."
          spellCheck={false}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}