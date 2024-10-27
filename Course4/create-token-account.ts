import dotenv from "dotenv";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

dotenv.config({ path: '../.env' });

const DECIMALS = 6;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`Public Key is ${user.publicKey.toBase58()}`);

const tokenMint = new PublicKey("2xbdDhRZxE5BdJNycPrsJwCHxBUCNUzapJTfHbf8R6SU");
const destPubKey = new PublicKey("9Nj4aSBVkusmC3Vz9eosaP9rD5Y7qqFLtpxBUjyAVKvC");
const destTokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMint, destPubKey);
const myTokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMint, user.publicKey);

console.log(`Token account: ${destTokenAccount.address.toBase58()}`);
console.log(`My Token account: ${myTokenAccount.address.toBase58()}`);

