import { type AcirFunction } from "../types";

type Props = {
  functions: AcirFunction[];
};

function colorizeOpcode(op: string): React.ReactNode {
  // Highlight opcode type keyword
  const match = op.match(/^([A-Z_:]+)(.*)/);
  if (match) {
    return (
      <>
        <span className="text-amber-400">{match[1]}</span>
        <span className="text-neutral-400">{match[2]}</span>
      </>
    );
  }
  return <span className="text-neutral-400">{op}</span>;
}

export default function AcirView({ functions }: Props) {
  const totalOpcodes = functions.reduce((s, f) => s + f.opcodes.length, 0);

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-[10px] tracking-[0.2em] text-amber-600/80 uppercase">
          ► acir functions
        </span>
        <div className="flex-1 h-px bg-neutral-800" />
        <span className="font-mono text-[10px] text-neutral-600">
          {functions.length} fn · {totalOpcodes} ops
        </span>
      </div>

      <div className="space-y-4">
        {functions.map((func) => (
          <div key={func.func_index} className="border border-neutral-800 rounded-sm overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2 bg-neutral-900/80 border-b border-neutral-800">
              <span className="font-mono text-[10px] text-amber-500/80 tracking-widest uppercase">
                fn[{func.func_index}]
              </span>
              <span className="font-mono text-[10px] text-neutral-600">
                {func.opcodes.length} opcodes
              </span>
            </div>

            <div className="bg-neutral-950 p-0 font-mono text-xs">
              {func.opcodes.map((op, idx) => (
                <div
                  key={idx}
                  className="flex items-baseline px-4 py-0.5 hover:bg-neutral-900/60 transition-colors group"
                >
                  <span className="text-neutral-700 w-10 shrink-0 text-right mr-4 group-hover:text-neutral-500 select-none tabular-nums">
                    {idx}
                  </span>
                  <span className="leading-5">{colorizeOpcode(op)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}