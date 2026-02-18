mod bytecode_to_acir_program;
use bytecode_to_acir_program::*;
use std::fs;
use serde::Deserialize;


#[derive(Deserialize)]
struct CompiledFileBytecode {
    bytecode: String,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {

    let bytecode_path = "./example_circuit/target/example_circuit.json";

    let compiled_program = fs::read_to_string(bytecode_path)?;
    let compiled_file_bytecode: CompiledFileBytecode = serde_json::from_str(&compiled_program)?;

    let program = bytecode_to_acir_program(compiled_file_bytecode.bytecode)?;
    print_acir_and_brillig_opcodes(&program);

    Ok(())
}
