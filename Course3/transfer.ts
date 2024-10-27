import dotenv from 'dotenv';
import {airdropIfRequired, getKeypairFromEnvironment} from "@solana-developers/helpers";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import {createMemoInstruction} from "@solana/spl-memo";

const sender = getKeypairFromEnvironment("SECRET_KEY");
console.log(sender.publicKey.toBase58());

const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
/*const latestBlockHeight = await connection.getBlockHeight();
console.log(`Latest block height: ${latestBlockHeight}`);


await airdropIfRequired(connection, sender.publicKey, 1*LAMPORTS_PER_SOL, 1*LAMPORTS_PER_SOL);
const senderBalance = await connection.getBalance(sender.publicKey);
console.log(`Sender's balance is ${senderBalance / LAMPORTS_PER_SOL} SOL`);*/

const receiver = new PublicKey("9Nj4aSBVkusmC3Vz9eosaP9rD5Y7qqFLtpxBUjyAVKvC");

const receiverBalance = await connection.getBalance(receiver);

console.log(`Receiver's balance is ${receiverBalance / LAMPORTS_PER_SOL} SOL`);

const transaction = new Transaction();

const transferInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiver,
    lamports: 0.1 * LAMPORTS_PER_SOL
});

transaction.add(transferInstruction);

const memo = "Thank you for the tip";

const memoInstruction = createMemoInstruction(memo);

transaction.add(memoInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [sender,]);

console.log(`Transaction confirmed, Signature: ${signature}`);
