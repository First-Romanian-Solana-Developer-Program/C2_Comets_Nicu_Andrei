import dotenv from 'dotenv';
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

dotenv.config({ path: '../.env' });

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`Loaded keypair from env ${keypair.publicKey.toBase58()}`);
console.log(`Loaded keypair from env ${keypair.secretKey}`);
