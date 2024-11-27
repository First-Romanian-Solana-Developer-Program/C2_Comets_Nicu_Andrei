import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";

import { assert } from "chai";
import web3 = anchor.web3;

describe("favorites", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(anchor.AnchorProvider.env());

  const user = (provider.wallet as anchor.Wallet).payer;
  const program = anchor.workspace.Favorites as Program<Favorites>;

  before(async () => {
    const balance = await provider.connection.getBalance(user.publicKey);
    const balanceSOL = balance / web3.LAMPORTS_PER_SOL;
    const formattedBalance = new Intl.NumberFormat().format(balanceSOL);
    console.log(`Balance of account ${user.publicKey.toBase58()}: ${formattedBalance} SOL`);
  })

  it("Is initialized!", async () => {
    try {
      const tx = await program.methods.initialize().rpc();
      console.log("Transaction signature:", tx);
    } catch (err) {
      console.error("Error initializing:", err);
    }
  });


  it("Save a user's favorites to the blockchain", async () => {
    const favoriteNumber = new anchor.BN(23);
    const favoriteColor = "purple";
    const favoriteHobbies = ["blah", "halb", "traveling"];

    const txHash = await program.methods
      .setFavorites(favoriteNumber, favoriteColor, favoriteHobbies)
      .signers([user])
      .rpc();

    console.log('txHash', txHash);

    const [favoritesPda, favoritesBump] = await anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favorites"), user.publicKey.toBuffer()],
      program.programId
    );

    const favoritesAccount = await program.account.favorites.fetch(favoritesPda);

    assert.equal(favoritesAccount.number.toString(), favoriteNumber.toString());
    assert.equal(favoritesAccount.color, favoriteColor);
    assert.deepEqual(favoritesAccount.hobbies, favoriteHobbies);

  });

  it("Doesn't let people write to favorites for other users", async () => {
    const someRandomGuy = anchor.web3.Keypair.generate();
    try {
      await program.methods
        .setFavorites(new anchor.BN(420), "red", ["being a dork"])
        .signers([someRandomGuy])
        .rpc();
    } catch (error) {
      const errorMessage = (error as Error).message;
      assert.isTrue(errorMessage.includes("unknown signer"));
    }
  });

});