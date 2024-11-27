import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import dotenv from "dotenv";
import { keypairIdentity, Metaplex, bundlrStorage } from "@metaplex-foundation/js";
import { uploadMetadata } from "./uploadMetadata";
import { createNft } from "./createNft";

const nftData = {
    name: "SDP Coole Nft",
    symbol: "MyNFT",
    description: "This is a cool NFT from SDP qwertyzxy",
    imgPath: "solana.png",
};

async function main() {

    dotenv.config({ path: '../.env' });

    const keypair = getKeypairFromEnvironment("SECRET_KEY");

    console.log(`Keypair loaded: ${keypair.publicKey.toBase58()}`);

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    console.log(`Connection done!`);

    const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair)).use(bundlrStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: "https://api.devnet.solana.com",
        timeout: 60000,
    }))

    console.log("Metaplex loaded");

    const uri = await uploadMetadata(metaplex, nftData);

    console.log("Off-chain img and metadata uploaded");

    const nft = await createNft(metaplex, uri, nftData);


}

main().then((): void => console.log("🟢 Hooray!"));


