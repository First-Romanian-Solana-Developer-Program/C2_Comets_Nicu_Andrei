import dotenv from "dotenv";
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";

dotenv.config({ path: '../.env' });

const AMOUNT = 9;
const DECIMALS = 6;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`Public Key is ${user.publicKey.toBase58()}`);

const tokenMint = new PublicKey("2xbdDhRZxE5BdJNycPrsJwCHxBUCNUzapJTfHbf8R6SU");
const destTokenAccount = new PublicKey("DK9LrX2U8yhEfac1q5Ue8vPteg9BYTf1hqaC4FYf4JaD");
const myTokenAccount = new PublicKey("2tXpLS5azseAuBo4sGd98RnUFNKGsy1rfJeMjGUpPX3Z");

const sign = await mintTo(connection, user, tokenMint, destTokenAccount, user, AMOUNT * (10 ** DECIMALS));
const sign2 = await mintTo(connection, user, tokenMint, myTokenAccount, user, (AMOUNT+2) * (10 ** DECIMALS));

const link = getExplorerLink("tx", sign, "devnet");
const link2 = getExplorerLink("tx", sign2, "devnet");

console.log(`Token mint tx link: ${link}`);
console.log(`Token mint in my account tx link: ${link2}`);

