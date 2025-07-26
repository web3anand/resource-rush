use starknet::{ContractAddress, get_block_timestamp};
use dojo::storage::world::{get_component, set_component, emit_event};

use crate::components::{Miner, Leaderboard};
use crate::events::Claimed;

// System that allows players to claim their accumulated Gems.  The amount
// produced depends on time elapsed since the last claim and the Miner’s level.
#[system]
fn claim_resources(player: ContractAddress) {
    let (mut miner) = get_component::<Miner>(player);
    let current_time = get_block_timestamp();
    let elapsed = current_time - miner.last_claim;
    let production_rate: u128 = match miner.level {
        0 => 1,
        1 => 5,
        2 => 12,
        _ => 20,
    };
    let produced = production_rate * elapsed as u128;
    // Reset miner state
    miner.unclaimed = 0;
    miner.last_claim = current_time;
    set_component::<Miner>(player, miner);
    // Update leaderboard
    let (mut lb) = get_component::<Leaderboard>(player);
    lb.total_claimed += produced;
    set_component::<Leaderboard>(player, lb);
    // Emit an event for off‑chain consumption (optional)
    emit_event(Claimed { player, amount: produced });
}

// System that upgrades a player’s Miner.  The cost increases with the level.
#[system]
fn upgrade_miner(player: ContractAddress) {
    let (mut miner) = get_component::<Miner>(player);
    let upgrade_cost: u128 = 100 * (miner.level + 1) as u128;
    assert!(miner.unclaimed >= upgrade_cost, 'Not enough resources');
    miner.unclaimed -= upgrade_cost;
    miner.level += 1;
    set_component::<Miner>(player, miner);
}
