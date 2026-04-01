use base64::{Engine, engine::general_purpose::STANDARD};
use flate2::read::GzDecoder;
use std::io::Read;
use acir::circuit::Program;
use acir_field::FieldElement;
use serde::Serialize;

// get program from bytecode

pub fn bytecode_to_program(bytecode: String) -> Result<Program<FieldElement>, Box<dyn std::error::Error>> {
    let compressed_bytes = STANDARD.decode(bytecode)?;
    let mut decoder = GzDecoder::new(&compressed_bytes[..]);
    let mut decompressed = Vec::new();
    decoder.read_to_end(&mut decompressed)?;

    let program: Program<FieldElement> =
        Program::deserialize_program(&compressed_bytes)?;

    Ok(program)
}

// view structures

#[derive(Serialize)]
pub struct ProgramView {
    pub acir: Vec<AcirFunctionView>,
    pub brillig: Vec<BrilligFunctionView>,
}

#[derive(Serialize)]
pub struct AcirFunctionView {
    pub func_index: usize,
    pub current_witness_index: u32,
    pub return_values: String,
    pub opcodes: Vec<String>,
}

#[derive(Serialize)]
pub struct BrilligFunctionView {
    pub name: String,
    pub bytecode: Vec<String>,
}

// program to view

pub fn program_to_view(
    program: &Program<FieldElement>,
) -> ProgramView {

    let acir = program
        .functions
        .iter()
        .enumerate()
        .map(|(func_index, circuit)| {
            AcirFunctionView {
                func_index,
                current_witness_index:
                    circuit.current_witness_index,
                return_values:
                    format!("{:?}", circuit.return_values),
                opcodes: circuit
                    .opcodes
                    .iter()
                    .map(|op| format!("{op:?}"))
                    .collect(),
            }
        })
        .collect();

    let brillig = program
        .unconstrained_functions
        .iter()
        .map(|f| {
            BrilligFunctionView {
                name: f.function_name.clone(),
                bytecode: f
                    .bytecode
                    .iter()
                    .map(|op| format!("{op:?}"))
                    .collect(),
            }
        })
        .collect();

    ProgramView { acir, brillig }
}