import { Transaction } from "@solana/web3.js";

import { Connection } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";

export async function triggerTransaction(
  transactionStr: string,
  connection: Connection,
  signTransaction: WalletContextState["signTransaction"]
) {
  const tx = Transaction.from(Buffer.from(transactionStr, "base64"));
  const signedTx = await signTransaction(tx);

  const txid = await connection.sendRawTransaction(signedTx.serialize());
  console.log("✅ Transaction sent. Signature:", txid);
  return txid;
}
