use base64::{Engine, engine::general_purpose::STANDARD};
use flate2::read::GzDecoder;
use std::io::Read;

use acir::circuit::Program;
use acir_field::FieldElement;

pub fn bytecode_to_acir_program(bytecode: String) -> Result<Program<FieldElement>, Box<dyn std::error::Error>> {
    let compressed_bytes = STANDARD.decode(bytecode)?;
    let mut decoder = GzDecoder::new(&compressed_bytes[..]);
    let mut decompressed = Vec::new();
    decoder.read_to_end(&mut decompressed)?;

    let program: Program<FieldElement> =
        Program::deserialize_program(&compressed_bytes)?;

    Ok(program)
}

pub fn print_acir_and_brillig_opcodes(program: &Program<FieldElement>) {
    //print ACIR opcodes
    for (func_index, circuit) in program.functions.iter().enumerate() {
        println!("func {func_index}");

        for (i, opcode) in circuit.opcodes.iter().enumerate() {
            println!("  Opcode {i}: {opcode:?}");
        }
    }

    println!(" ");

    //print Brillig functions
    for (i, brillig_fn) in program.unconstrained_functions.iter().enumerate() {
        println!("unconstrained func {i}: {}", brillig_fn.function_name);
        for (j, op) in brillig_fn.bytecode.iter().enumerate() {
            println!("  {j}: {op:?}");
        }
    }
}