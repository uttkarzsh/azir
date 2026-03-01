import { type BrilligFunction } from "../types";

type Props = {
  functions: BrilligFunction[];
};

export default function BrilligView({ functions }: Props) {
  return (
    <div className="space-y-8">
      {functions.map((fn, i) => (
        <div key={i}>
          <div className="text-sm font-semibold text-indigo-400 mb-3">
            {fn.name}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-md p-4 font-mono text-sm space-y-1">
            {fn.bytecode.map((op, idx) => (
              <div key={idx} className="text-gray-300">
                <span className="text-gray-500 mr-2">{idx}</span>
                {op}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}