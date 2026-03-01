import { useState } from "react";
import { type ProgramView } from "./types.ts";

import Header from "./components/Header.tsx";
import BytecodeInput from "./components/BytecodeInput.tsx";
import Controls from "./components/Controls.tsx";
import AcirView from "./components/AcirView.tsx";
import BrilligView from "./components/BrilligView.tsx";

export default function App() {
  const [bytecode, setBytecode] = useState("");
  const [output, setOutput] = useState<ProgramView | null>(null);
  const [viewMode, setViewMode] = useState<"acir" | "brillig" | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchProgram() {
    if (!bytecode.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bytecode }),
      });

      const data: ProgramView = await res.json();
      setOutput(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAcir() {
    await fetchProgram();
    setViewMode("acir");
  }

  async function handleBrillig() {
    await fetchProgram();
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