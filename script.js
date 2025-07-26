const contractAddress = '0xPLACEHOLDER_CONTRACT_ADDRESS'; // Replace with your deployed contract address

// Minimal ABI definition for systems
const abi = [
  {
    "type": "function",
    "name": "claim_resources",
    "inputs": [ { "name": "player", "type": "felt" } ],
    "outputs": []
  },
  {
    "type": "function",
    "name": "upgrade_miner",
    "inputs": [ { "name": "player", "type": "felt" } ],
    "outputs": []
  },
  {
    "type": "function",
    "name": "spawn_miner",
    "inputs": [ { "name": "player", "type": "felt" } ],
    "outputs": []
  }
];

let account;
let provider;
let contract;

async function connectWallet() {
  if (!window.starknet) {
    alert('No Starknet wallet found. Please install Argent X or Braavos.');
    return;
  }
  try {
    await window.starknet.enable();
    account = window.starknet.account;
    // Connect provider to testnet (adjust network if deploying elsewhere)
    provider = new starknet.Provider({ network: 'goerli-alpha' });
    contract = new starknet.Contract(abi, contractAddress, account);
    document.getElementById('wallet-address').textContent = account.address;
  } catch (err) {
    console.error(err);
    alert('Wallet connection failed: ' + err.message);
  }
}

async function spawnMiner() {
  if (!contract) {
    alert('Connect wallet first.');
    return;
  }
  try {
    const res = await contract.invoke('spawn_miner', { player: account.address });
    alert('Spawn transaction submitted. Transaction hash: ' + res.transaction_hash);
  } catch (err) {
    console.error(err);
    alert('Error spawning miner: ' + err.message);
  }
}

async function claimResources() {
  if (!contract) {
    alert('Connect wallet first.');
    return;
  }
  try {
    const res = await contract.invoke('claim_resources', { player: account.address });
    alert('Claim transaction submitted. Transaction hash: ' + res.transaction_hash);
  } catch (err) {
    console.error(err);
    alert('Error claiming resources: ' + err.message);
  }
}

async function upgradeMiner() {
  if (!contract) {
    alert('Connect wallet first.');
    return;
  }
  try {
    const res = await contract.invoke('upgrade_miner', { player: account.address });
    alert('Upgrade transaction submitted. Transaction hash: ' + res.transaction_hash);
  } catch (err) {
    console.error(err);
    alert('Error upgrading miner: ' + err.message);
  }
}

// Attach functions to buttons once the DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('connect-btn').addEventListener('click', connectWallet);
  document.getElementById('spawn-btn').addEventListener('click', spawnMiner);
  document.getElementById('claim-btn').addEventListener('click', claimResources);
  document.getElementById('upgrade-btn').addEventListener('click', upgradeMiner);
});
