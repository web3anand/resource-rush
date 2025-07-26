use starknet::ContractAddress;

// Event emitted when a player claims Gems.  Off‑chain indexers and front‑ends
// can listen for this to update the UI in real time.
#[derive(Event, Drop, Serde, SerdeLen)]
struct Claimed {
    player: ContractAddress,
    amount: u128,
}
