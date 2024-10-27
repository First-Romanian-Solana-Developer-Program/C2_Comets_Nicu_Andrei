import dotenv from 'dotenv';
import {Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl} from "@solana/web3.js"
import {airdropIfRequired} from "@solana-developers/helpers";

dotenv.config({ path: '../.env' });

const connection = new Connection(clusterApiUrl("devnet"),"confirmed");

console.log("Connected to devnet", connection.rpcEndpoint);

const myPubkey = new PublicKey("5qgq7m48f3jt4J2181thofpCWG2XPyGGam4MW5jXvsLx");

const balanceInLamports = await connection.getBalance(myPubkey);

console.log("My account's balance is ",balanceInLamports);

console.log("Airdropping 1 SOL to myself...");

await airdropIfRequired(connection, myPubkey, 1*LAMPORTS_PER_SOL, 0.5*LAMPORTS_PER_SOL);

console.log("Done!");

const balanceInLamports2 = await connection.getBalance(myPubkey);

console.log("Balance in lamports is ", balanceInLamports2);