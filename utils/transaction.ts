import { Transaction } from "@solana/web3.js";

import { Connection } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { toast } from "@/app/components/common/toast";

export async function triggerTransaction(
  transactionStr: string,
  connection: Connection,
  signTransaction: WalletContextState["signTransaction"]
) {
  const tx = Transaction.from(Buffer.from(transactionStr, "base64"));
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
