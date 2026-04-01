use std::fs;
use serde::Deserialize;
use serde_json::from_str;

use azir_core::{
    bytecode_to_program,
    program_to_view,
};

#[derive(Deserialize)]
struct CompiledFileBytecode {
    bytecode: String,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {

    let bytecode_path = "./example_circuit/target/example_circuit.json";
    let compiled_program = fs::read_to_string(bytecode_path)?;
    let compiled_file_bytecode: CompiledFileBytecode = from_str(&compiled_program)?;
    let program = bytecode_to_program(compiled_file_bytecode.bytecode)?;
    let view = program_to_view(&program);

    //print acir opcodes in the cli
    for func in view.acir {
        println!("func {}", func.func_index);
        println!(
            "current witness index: {}", func.current_witness_index
        );

        println!(
            "return values: {}\n", func.return_values
        );

        for (i, op) in func.opcodes.iter().enumerate() {
            println!("  Opcode {i}: {op}");
        }
    }

    println!();

    // print brillig functions in the cli
    for (i, f) in view.brillig.iter().enumerate() {
        println!(
            "unconstrained func {i}: {}", f.name
        );

        for (j, op) in f.bytecode.iter().enumerate() {
            println!("  {j}: {op}");
        }
    }

    Ok(())
}