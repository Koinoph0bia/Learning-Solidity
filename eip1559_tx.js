// requirements: ethers.js library
// Create an .env and store the private key and the recipient wallet as PRIVATE_KEY and WALLET


import {ethers} from "ethers";

// .env file

const { loadEnvFile } = require('node:process');

loadEnvFile();


// RPC endpoint
const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");

// Our private key

const privKey = process.env.PRIVATE_KEY

// create a wallet instance

const wallet = new ethers.Wallet(privKey);

const recipient = process.env.WALLET
// creating tx data 

const txData = {
		nonce: await provider.getTransactionCount(wallet.address), // get the nonce
		to: recipient, // receiver address
		value: ethers.parseEther("0.0001"), 
		gasLimit: ethers.toBeHex(0x30000),
		maxFeePerGas: ethers.parseUnits("100", "gwei"),
		maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"), 
		data: "0x", // Optional data
		chainId: 11155111, //sepolia
};


