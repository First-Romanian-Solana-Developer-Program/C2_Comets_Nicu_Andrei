import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

export function SendSolForm() {

    const [amount, setAmount] = useState(0);
    const [destination, setDestination] = useState('');

    const { connection } = useConnection();
    const { publicKey, signTransaction, sendTransaction } = useWallet();

    function handleAmountChange(event) {
        setAmount(event.target.value);
    }

    function handleDestinationChange(event) {
        setDestination(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!connection || !publicKey) {
            console.error("Wallet not available!");
            return;
        }

        console.log(amount, destination);



        const tx = new Transaction();
        const ix = SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(destination),
            lamports: amount * LAMPORTS_PER_SOL
        })

        tx.add(ix);

        const blockhash = await connection.getLatestBlockhash();

        tx.recentBlockhash = blockhash.blockhash;

        tx.feePayer = publicKey;

        const signedTx = await signTransaction(tx);

        const sign = await sendTransaction(signedTx, connection);

        console.log(sign);
    }

    return (

        <form onSubmit={handleSubmit}>
            <label>
                Amount
                <input type="text" value={amount} onChange={handleAmountChange} />
            </label>
            <label>
                Destination
                <input type="text" value={destination} onChange={handleDestinationChange} />
            </label>

            <input type="submit" value="Sign and Submit" />
        </form>
    );
}
