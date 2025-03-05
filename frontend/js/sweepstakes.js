"use strict";

// ------------------ ENTER PHYSICAL ITEM SWEEPSTAKES ------------------
async function enterPhysicalSweepstakes() {
  alert("Entering the luxury watch sweepstakes!");

  // If integrated with Solidity smart contract
  try {
    const contractAddress = "0xYourSweepstakesContract"; // Replace with deployed contract address
    const contractABI = [ /* Include your contract ABI */ ];

    if (!window.ethereum) {
      alert("MetaMask required for sweepstakes entry!");
      return;
    }

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    await contract.methods.enterPhysicalSweepstakes().send({ from: accounts[0], value: web3.utils.toWei("0.1", "ether") });

    document.getElementById("physicalOutcome").innerText = "Successfully entered the sweepstakes!";
  } catch (error) {
    console.error("Sweepstakes entry failed:", error);
    document.getElementById("physicalOutcome").innerText = "Error entering sweepstakes.";
  }
}

// ------------------ ENTER CRYPTO REWARD SWEEPSTAKES ------------------
async function enterCryptoSweepstakes() {
  alert("Entering the crypto reward sweepstakes!");

  // If integrated with Solidity smart contract
  try {
    const contractAddress = "0xYourSweepstakesContract"; // Replace with deployed contract address
    const contractABI = [ /* Include your contract ABI */ ];

    if (!window.ethereum) {
      alert("MetaMask required for sweepstakes entry!");
      return;
    }

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    await contract.methods.enterCryptoSweepstakes().send({ from: accounts[0], value: web3.utils.toWei("0.1", "ether") });

    document.getElementById("cryptoOutcome").innerText = "Successfully entered the sweepstakes!";
  } catch (error) {
    console.error("Sweepstakes entry failed:", error);
    document.getElementById("cryptoOutcome").innerText = "Error entering sweepstakes.";
  }
}
