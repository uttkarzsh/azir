import { useState, useEffect } from "react";
import init, { process_bytecode } from "azir_wasm";
import { type ProgramView } from "./types.ts";

import Header from "./components/Header.tsx";
import BytecodeInput from "./components/BytecodeInput.tsx";
import Controls from "./components/Controls.tsx";
import AcirView from "./components/AcirView.tsx";
import BrilligView from "./components/BrilligView.tsx";

export default function App() {
  const [wasmReady, setWasmReady] = useState(false);
  const [bytecode, setBytecode] = useState("");
  const [output, setOutput] = useState<ProgramView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"acir" | "brillig" | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setWasmReady(true);
      })
      .catch((err) => {
        console.error("WASM init failed:", err);
      });
  }, []);

  useEffect(() => {
    setOutput(null);
    setError(null);
  }, [bytecode]);

  async function runProcessor() {
     if (!wasmReady) {
    console.warn("WASM not ready");
    return;
  }

  if (!bytecode.trim()) {
    console.warn("Empty bytecode");
    return;
  }

  if (output) return;

  setLoading(true);
  setError(null);

  try {
    const result = process_bytecode(bytecode);
    setOutput(result as ProgramView);
  } catch (err) {
    console.error("Processing failed:", err);
    setError("Invalid bytecode or failed to parse program.");
  } finally {
    setLoading(false);
  }
  }

  async function handleAcir() {
    await runProcessor();
    setViewMode("acir");
  }

  async function handleBrillig() {
    await runProcessor();
    setViewMode("brillig");
  }

  return (
    <div
      className="min-h-screen bg-neutral-950 text-neutral-200 px-8 py-10"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.08) 2px,
            rgba(0,0,0,0.08) 4px
          )
        `,
      }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <Header />

        <div className="space-y-4">
          <BytecodeInput value={bytecode} onChange={setBytecode} />
          {error && (
          <div className="border border-red-800 bg-red-950/40 text-red-400 px-4 py-3 rounded-md font-mono text-sm">
            ⚠ {error}
          </div>
        )}
          <Controls onAcir={handleAcir} onBrillig={handleBrillig} loading={loading} />
        </div>

        {output && viewMode === "acir" && <AcirView functions={output.acir} />}
        {output && viewMode === "brillig" && <BrilligView functions={output.brillig} />}
      </div>
    </div>
  );
}