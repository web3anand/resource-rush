// Front-end logic for Resource Rush game.
// Connects to the user’s Starknet wallet and provides stub functions for game actions.
// Replace placeholder contract interactions when a contract is deployed.

let account;

async function connectWallet() {
    // Ensure a Starknet wallet (e.g., Argent X, Braavos) is installed
    if (!window.starknet) {
        alert('No Starknet wallet found. Please install Argent X or Braavos.');
        return;
    }
    try {
        // Request connection to the wallet
        await window.starknet.enable();
        // Depending on the wallet implementation, account details may be exposed on window.starknet.account
        account = window.starknet.account || null;

        let address = '';
        if (account && account.address) {
            address = account.address;
        } else if (window.starknet.selectedAddress) {
            // Some wallets expose selectedAddress directly
            address = window.starknet.selectedAddress;
        } else {
            address = 'Connected';
        }

        document.getElementById('wallet-address').textContent = `Wallet: ${address}`;
        alert('Wallet connected!');
    } catch (err) {
        console.error(err);
        alert('Wallet connection failed: ' + err.message);
    }
}

// Placeholder function for spawning a Miner
async function spawnMiner() {
    if (!account) {
        alert('Please connect your wallet first.');
        return;
    }
    // TODO: invoke the spawn_miner system on your deployed contract
    alert('Spawn Miner called (not yet implemented).');
}

// Placeholder function for claiming Gems
async function claimGems() {
    if (!account) {
        alert('Please connect your wallet first.');
        return;
    }
    // TODO: invoke the claim_resources system on your deployed contract
    alert('Claim Gems called (not yet implemented).');
}

// Placeholder function for upgrading a Miner
async function upgradeMiner() {
    if (!account) {
        alert('Please connect your wallet first.');
        return;
    }
    // TODO: invoke the upgrade_miner system on your deployed contract
    alert('Upgrade Miner called (not yet implemented).');
}

// Attach click handlers to buttons once the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('connect-btn').addEventListener('click', connectWallet);
    document.getElementById('spawn-btn').addEventListener('click', spawnMiner);
    document.getElementById('claim-btn').addEventListener('click', claimGems);
    document.getElementById('upgrade-btn').addEventListener('click', upgradeMiner);
});
