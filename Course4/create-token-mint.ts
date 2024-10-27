import { createMint } from "@solana/spl-token";
import dotenv from "dotenv";
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js";

dotenv.config({ path: '../.env' });

const DECIMALS = 6;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`Public Key is ${user.publicKey.toBase58()}`);

const tokenMint = await createMint(
    connection,
    user,
    user.publicKey,
    null,
    DECIMALS
);

const link = getExplorerLink("address", tokenMint.toBase58() ,"devnet");

console.log(`Link: ${link}`);

