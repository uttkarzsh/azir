import { type AcirFunction } from "../types";

type Props = {
  functions: AcirFunction[];
};

export default function AcirView({ functions }: Props) {
  return (
    <div className="space-y-8">
      {functions.map((func) => (
        <div key={func.func_index}>
          <div className="text-sm font-semibold text-blue-400 mb-3">
            Function {func.func_index}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-md p-4 font-mono text-sm space-y-1">
            {func.opcodes.map((op, idx) => (
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