console.log("Running send-tokens script...");
const RDT = window.RDT;

export async function sendTokens(
  rdt,
  fromAccount,
  toAccount,
  tokenAddress,
  amount
) {
  console.log(
    "Sending tokens from: ",
    fromAccount,
    "to:",
    toAccount,
    "Token: ",
    tokenAddress,
    "Amount:",
    amount
  );

  // Create a transaction to send tokens
  const transaction = `
    CALL_METHOD Address("${fromAccount}") "withdraw" Address("${tokenAddress}") Decimal("${amount}");
    TAKE_FROM_WORKTOP Address("${tokenAddress}") Decimal("${amount}") Bucket("sent_tokens");
    CALL_METHOD Address("${toAccount}") "try_deposit_or_abort" Bucket("sent_tokens") None;
    CALL_METHOD Address("${fromAccount}") "deposit_batch" Expression("ENTIRE_WORKTOP");
  `;

  console.log("Transaction created:", transaction);
  // Send the transaction
  try {
    const result = await rdt.walletApi.sendTransaction({
      transactionManifest: transaction,
    });
    console.log("Transaction sent successfully:", result);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}
