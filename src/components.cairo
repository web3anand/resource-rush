use starknet::ContractAddress;
use dojo::storage::world;

// Miner component: identifies a player’s Miner and stores production state.
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Miner {
    #[key] player: ContractAddress,
    level: u32,
    last_claim: u64,
    unclaimed: u128,
}

// Leaderboard component: tracks total Gems claimed by each player.
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Leaderboard {
    #[key] player: ContractAddress,
    total_claimed: u128,
}
