type Props = {
  onAcir: () => void;
  onBrillig: () => void;
  loading: boolean;
};

export default function Controls({ onAcir, onBrillig, loading }: Props) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        onClick={onAcir}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-md text-sm font-medium transition"
      >
        Show ACIR Opcodes
      </button>

      <button
        onClick={onBrillig}
        disabled={loading}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-md text-sm font-medium transition"
      >
        Show Brillig Functions
      </button>

      {loading && (
        <span className="text-sm text-gray-400 ml-2">
          Processing…
        </span>
      )}
    </div>
  );
}