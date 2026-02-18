use base64::{Engine, engine::general_purpose::STANDARD};
use flate2::read::GzDecoder;

use acir::circuit::Program;
use acir_field::FieldElement;

use std::io::Read;

fn main() -> Result<(), Box<dyn std::error::Error>> {

    //bytecode from compiled circuit .json file
    let bytecode = "H4sIAAAAAAAA/5WRP08CMRjGe+fiB9DdUTeVLwB3gOKARmI0JsY0XCWNpXf2CpHx/QbXlsS4mQBH4p+EyejuF2FzdHEXMBwJRjm79vc+v+dtl7S66dYx5XYbBg7D1UvHvy42eNXFjEHvMFfeKWjoH1PJSRiibArIysKDIyhjtDa+byMFcYXyGiMm0vptDf19LDRiNr2yGG7dbbwcFJ4BTs7WM++7rddAucNP8zGGFsZ8W+sBI7aJosVWuM+FIRHylAjfaJOipm1S9LSjxZBCyooipQceFaQqaZOcU94cdbmFnuvzUBqI85OrVeiXuCQ1IjpHme0US83Nr/xvHsHj+Ac9LLHrB60kBs36JMFzJrtXpIR5KRRPDuVYtCb4ftCeBizFhasGZuEPpw3xXqMelC50gi7P262Udus3O+rkaTNJm3XoVqQfKD1be/oQX13AkXBIAwAA";

    //decode bytecode
    let compressed_bytes = STANDARD.decode(bytecode)?;
    let mut decoder = GzDecoder::new(&compressed_bytes[..]);
    let mut decompressed = Vec::new();
    decoder.read_to_end(&mut decompressed)?;



    let program: Program<FieldElement> =
        Program::deserialize_program(&compressed_bytes)?;

    //print ACIR opcodes
    for (func_index, circuit) in program.functions.iter().enumerate() {
        println!("func {func_index}");

        for (i, opcode) in circuit.opcodes.iter().enumerate() {
            println!("  Opcode {i}: {opcode:?}");
        }
    }

    //print Brillig functions
    for (i, brillig_fn) in program.unconstrained_functions.iter().enumerate() {
        println!("unconstrained func {i}: {}", brillig_fn.function_name);
        for (j, op) in brillig_fn.bytecode.iter().enumerate() {
            println!("  {j}: {op:?}");
        }
    }

    Ok(())
}
