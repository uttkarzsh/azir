use wasm_bindgen::prelude::*;
use serde_wasm_bindgen;

use azir_core::{
    bytecode_to_program,
    program_to_view,
};

#[wasm_bindgen]
pub fn process_bytecode(bytecode: String) -> JsValue {

    let program =
        bytecode_to_program(bytecode)
        .expect("Failed to parse bytecode");

    let view =
        program_to_view(&program);

    serde_wasm_bindgen::to_value(&view)
        .expect("Serialization failed")
}