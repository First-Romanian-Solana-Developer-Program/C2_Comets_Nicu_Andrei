import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { FC, useState } from "react";
import styles from "../styles/PingButton.module.css";

export const PingButton: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = async () => {
    if (!connection || !publicKey) {
      console.error("Wallet not available!");
      return;

    }

    const pingProgramId = new web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
    const pingProgramDataAccount = new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");

    const tx = new web3.Transaction();

    const ix = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: pingProgramDataAccount,
          isSigner: false,
          isWritable: true,
        },
      ],
      programId: pingProgramId
    });

    tx.add(ix);
    const sg = await sendTransaction(tx, connection);
    console.log("Successfully sent tx: ", sg);
  };

  return (
    <div className={styles.buttonContainer} onClick={onClick}>
      <button className={styles.button}>Ping!</button>
    </div>
  );
};
