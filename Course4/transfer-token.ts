import dotenv from "dotenv";
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";

dotenv.config({ path: '../.env' });

const AMOUNT = 5;
const DECIMALS = 6;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`Public Key is ${user.publicKey.toBase58()}`);

const tokenMint = new PublicKey("2xbdDhRZxE5BdJNycPrsJwCHxBUCNUzapJTfHbf8R6SU");
const destPubKey = new PublicKey("9Nj4aSBVkusmC3Vz9eosaP9rD5Y7qqFLtpxBUjyAVKvC");
const sourceTokenAccount = new PublicKey("2tXpLS5azseAuBo4sGd98RnUFNKGsy1rfJeMjGUpPX3Z")
const destTokenAccount = new PublicKey("DK9LrX2U8yhEfac1q5Ue8vPteg9BYTf1hqaC4FYf4JaD");

const sign = await transfer(connection, user, sourceTokenAccount, destTokenAccount, user, AMOUNT * (10 ** DECIMALS));
const link = getExplorerLink("tx", sign, "devnet");

console.log(`I did transfer ${AMOUNT} tokens to ${destPubKey}\nLink: ${link}`);