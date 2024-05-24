import { useEVMAddress, useWalletContext } from "@coinbase/waas-sdk-web-react";
import { toViem } from "@coinbase/waas-sdk-viem";
import { createWalletClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { useEffect } from "react";

// a button to sign a transaction.
export const SignTransactionButton = () => {
  const { wallet } = useWalletContext();
  const address = useEVMAddress(wallet);

  useEffect(() => {
    console.log(wallet);
  }, [wallet]);

  return (
    <button
      disabled={!address}
      onClick={async () => {
        // get a viem account.
        const account = toViem(address!);

        // use viem to send eth.
        const walletClient = createWalletClient({
          account,
          chain: baseSepolia,
          transport: http(),
        });

        // send the transaction!
        const txHash = await walletClient.sendTransaction({
          account,
          to: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          value: 1000000000000000000n,
        });

        console.log("Sent ETH!", txHash);
      }}
    >
      Send ETH
    </button>
  );
};
