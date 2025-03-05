"use strict";

import { ethers } from "ethers";
import Web3Modal from "web3modal";

// Wallet provider options
const providerOptions = {
  walletconnect: {
    package: () => import("@walletconnect/web3-provider"),
    options: {
      infuraId: "YOUR_INFURA_ID", // Replace with your Infura Project ID
    },
  },
};

// Initialize Web3Modal
const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

let provider;
let signer;
let userAddress;

// Connect wallet function
async function connectWallet() {
  try {
    const instance = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(instance);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    document.getElementById("wallet-status").innerText = `Connected: ${userAddress}`;
    document.getElementById("connectWalletBtn").classList.add("d-none");
    document.getElementById("disconnectWalletBtn").classList.remove("d-none");

    console.log("Wallet connected:", userAddress);
  } catch (error) {
    console.error("Wallet connection failed:", error);
  }
}

// Disconnect wallet
async function disconnectWallet() {
  web3Modal.clearCachedProvider();
  provider = null;
  signer = null;
  userAddress = null;

  document.getElementById("wallet-status").innerText = "Disconnected";
  document.getElementById("connectWalletBtn").classList.remove("d-none");
  document.getElementById("disconnectWalletBtn").classList.add("d-none");
}

// Attach functions to buttons
document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
document.getElementById("disconnectWalletBtn").addEventListener("click", disconnectWallet);
