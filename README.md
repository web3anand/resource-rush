# Resource Rush – a simple Starknet idle game

This project scaffolds a fully on‑chain idle game using the Dojo engine and
Starknet.  Players spawn a Miner that slowly generates Gems, claim their
accumulated rewards and upgrade the Miner to increase production.  The
leaderboard tracks the total Gems claimed by each player.

## Prerequisites

* [Scarb](https://docs.swmansion.com/scarb) and [Cairo](https://github.com/starkware-libs/cairo) – used to compile Cairo contracts.
* [Dojo](https://dojoengine.org/) – the on‑chain game engine and toolchain.  Install via `sozo` CLI.
* A local Starknet node (Katana) and indexer (Torii) for development.

## Building and running locally

1. Install Scarb and Dojo as described in the official documentation.
2. Start a local Starknet node with `katana` and the Torii indexer with `torii`.
3. Compile the contracts:

```bash
sozo build
```

4. Deploy the world (game) on your local node:

```bash
sozo migrate
```

5. Use a front‑end (e.g. React + starknet.js) or the CLI to call systems defined in `src/systems.cairo`, such as `claim_resources` and `upgrade_miner`.

## Files overview

* **Scarb.toml** – project and dependency configuration.
* **src/components.cairo** – defines the data structures (Miner, Leaderboard) used in the game.  Each component uses the `#[derive(Component)]` macro provided by Dojo.
* **src/systems.cairo** – contains systems (functions) that mutate component state.  For example, `claim_resources` awards Gems based on the time elapsed and the Miner’s level; `upgrade_miner` increases a Miner’s level at a cost.
* **src/events.cairo** – defines event structures that can be emitted for off‑chain indexing and UI updates.
* **src/lib.cairo** – entry point that exposes modules to the compiler.

You can extend this skeleton by adding more systems (e.g., for spawning miners), new components (e.g., random bonus items) and additional logic to make the game more engaging.

## Next steps

To make this game production‑ready, consider:

* Integrating session keys to reduce transaction signing friction.
* Implementing randomness using a Starknet randomness service or oracle for bonus rewards.
* Building a front‑end with live updates via Torii’s GraphQL endpoint.
* Performing security audits before deploying on testnet or mainnet.

Enjoy building on Starknet!
