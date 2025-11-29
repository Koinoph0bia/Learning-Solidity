// requirements: ethers.js library
// Create an .env and store the private key and the recipient wallet as PRIVATE_KEY and WALLET


import {ethers} from "ethers";

// .env file
import {loadEnvFile} from "node:process";

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

// Calculate the RLP-encoded tx hash -> before signing

const unsignedTx = ethers.Transaction.from(txData).unsignedSerialized;

console.log("RLP-Encoded Tx (Unsigned): " + unsignedTx);

const txHash = ethers.keccak256(unsignedTx);

console.log("Tx Hash (Unsigned): " + txHash);

// Sign the tx

async function signAndSend(){
		
		// Sign the tx with the wallet
		const signedTx = await wallet.signTransaction(txData);
		console.log("Signed Raw Transaction: " + signedTx);
		
		// Send the signed tx to the ETH network
		const txResponse = await provider.broadcastTransaction(signedTx);
		console.log("Transaction Hash: " + txResponse.hash);

		// wait for the tx to be mined
		const receipt = await txResponse.wait();
		console.log("Transaction Receipt: ", receipt);

}

signAndSend().catch(console.error);
		


