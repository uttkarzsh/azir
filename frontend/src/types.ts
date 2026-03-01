export type AcirFunction = {
  func_index: number;
  opcodes: string[];
};

export type BrilligFunction = {
  name: string;
  bytecode: string[];
};

export type ProgramView = {
  acir: AcirFunction[];
  brillig: BrilligFunction[];
};