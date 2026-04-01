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
  const [viewMode, setViewMode] = useState<"acir" | "brillig" | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    init().then(() => {
      setWasmReady(true);
    });

  }, []);

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

    try {
      const result = process_bytecode(bytecode);
      setOutput(result as ProgramView);
    } catch (err) {
      console.error("Processing failed:", err);
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
    <div className="min-h-screen bg-gray-950 text-gray-200 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <Header />

        <div className="space-y-6">
          <BytecodeInput value={bytecode} onChange={setBytecode} />

          <Controls
            onAcir={handleAcir}
            onBrillig={handleBrillig}
            loading={loading}
          />
        </div>

        {output && viewMode === "acir" && (
          <AcirView functions={output.acir} />
        )}

        {output && viewMode === "brillig" && (
          <BrilligView functions={output.brillig} />
        )}
      </div>
    </div>
  );
}