import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "What is Azir?",
    answer:
      "Azir is a visual inspection tool for ACIR programs. It helps developers understand how compiled Noir circuits are represented internally as opcodes and functions. But that's not all. More mind-blowing features are on the way!!",
  },
  {
    question: "What is ACIR?",
    answer:
      "ACIR (Abstract Circuit Intermediate Representation) is the intermediate format used by Noir to represent circuits before proving. It defines constraints and operations that form the computation. ACIR is backend-agnostic, meaning it can later be translated into formats like R1CS or PLONKish arithmetizations used by different proving systems.",
  },
  {
    question: "What are opcodes?",
    answer:
      "Opcodes are the individual instructions that define the circuit logic. Each opcode represents an operation such as arithmetic constraints, memory operations, or assertions.",
  },
  {
    question: "What are Brillig functions?",
    answer:
      "Brillig functions represent unconstrained execution logic that runs outside the main constraint system. They are typically used for general-purpose computation that does not need to be proven as part of the circuit. Instead of generating constraints, Brillig code performs computations and returns results that can later be used by constrained ACIR operations."
  },
  {
    question: "What does 'unconstrained' mean?",
    answer:
      "Unconstrained execution refers to computation that does not generate proof constraints. Unlike ACIR operations, which enforce correctness through constraints, unconstrained logic runs normally without being verified directly by the proving system."
  },
  {
    question: "Is this everything Azir can do?",
    answer:
      "Not at all. Additional features are planned, including deeper visualization tools, execution tracing, and circuit structure exploration. Check back later as the tool evolves."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="mt-10 border-t border-neutral-800 pt-8">
      <h2 className="text-lg font-semibold text-neutral-300 mb-4">
        FAQs
      </h2>

      <div className="space-y-3">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-neutral-800 rounded-md bg-neutral-900"
          >
            {/* Question */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left text-sm font-medium text-neutral-200 hover:bg-neutral-800 transition"
            >
              {item.question}

              <span className="text-neutral-500">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {/* Answer */}
            {openIndex === index && (
              <div className="px-4 pb-4 text-sm text-neutral-400 leading-relaxed mt-1">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}