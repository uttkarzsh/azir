type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function BytecodeInput({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <div className="text-xs uppercase tracking-wide text-gray-500">
        Bytecode Input
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={12}
        className="w-full bg-gray-900 border border-gray-800 rounded-md p-4 font-mono text-sm focus:outline-none focus:border-blue-500 transition"
        placeholder="Paste compiled bytecode here..."
      />
    </div>
  );
}