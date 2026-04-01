
fn main(given_hash: [u32; 8], x: [u32; 16], stat: [u32; 8]){
    let hash = std::hash::sha256_compression(x, stat);
    assert_eq(hash, given_hash);
}
