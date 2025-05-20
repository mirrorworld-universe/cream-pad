import { Transaction } from "@solana/web3.js";

import { Connection } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { toast } from "@/app/components/common/toast";

export async function triggerTransaction(
  transactionStr: string,
  connection: Connection,
  wallet: WalletContextState
) {
  const { publicKey, signTransaction } = wallet;
  const tx = Transaction.from(Buffer.from(transactionStr, "base64"));
  const balance = await connection.getBalance(publicKey);
  const fee = await connection.getFeeForMessage(tx.compileMessage());

  if (balance < fee.value) {
    toast({
      title: "Insufficient balance",
      status: "error"
    });
    return null;
  }

  const signedTx = await signTransaction(tx);
  try {
    const txid = await connection.sendRawTransaction(signedTx.serialize());
    console.log("✅ Transaction sent. Signature:", txid);
    return txid;
  } catch (error) {
    toast({
      title: "Transaction failed",
      status: "error"
    });
    console.log("❌ Transaction failed. Error:", error);
  }
  return null;
}
