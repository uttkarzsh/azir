import { type BrilligFunction } from "../types";

type Props = {
  functions: BrilligFunction[];
};

export default function BrilligView({ functions }: Props) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
          ► brillig functions
        </span>
        <div className="flex-1 h-px bg-neutral-800" />
        <span className="font-mono text-[10px] text-neutral-600">
          {functions.length} fn
        </span>
      </div>

      <div className="space-y-4">
        {functions.map((fn, i) => (
          <div key={i} className="border border-neutral-800 rounded-sm overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2 bg-neutral-900/80 border-b border-neutral-800">
              <span className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
                fn[{i}]
              </span>
              <span className="font-mono text-[10px] text-neutral-500">{fn.name}</span>
              <span className="font-mono text-[10px] text-neutral-700 ml-auto">
                {fn.bytecode.length} instrs
              </span>
            </div>

            <div className="bg-neutral-950 font-mono text-xs">
              {fn.bytecode.map((op, idx) => (
                <div
                  key={idx}
                  className="flex items-baseline px-4 py-0.5 hover:bg-neutral-900/60 transition-colors group"
                >
                  <span className="text-neutral-700 w-10 shrink-0 text-right mr-4 group-hover:text-neutral-500 select-none tabular-nums">
                    {idx}
                  </span>
                  <span className="text-neutral-400 leading-5">{op}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}