import { useEVMAddress, useWalletContext } from "@coinbase/waas-sdk-web-react";
import { toViem } from "@coinbase/waas-sdk-viem";
import { createWalletClient, custom } from "viem";
import { useEffect } from "react";
import { testnet } from "../chain/testnet";
import { ethers } from "ethers";
import { vechain } from "viem/chains";
import { HttpClient, VechainProvider } from "@vechain/sdk-network";

import { ThorClient } from "@vechain/sdk-network";

const client = new ThorClient(new HttpClient(testnet.rpcUrls.default.http[0]));

console.log(vechain.id);

// a button to sign a transaction.
export const SignTransactionButton = () => {
  const { wallet } = useWalletContext();
  const address = useEVMAddress(wallet);

  useEffect(() => {
    console.log(wallet);
  }, [wallet]);

  //   const publicClient = useMemo(() => {
  //     return createPublicClient({
  //       transport: custom(new Provider({ connex })),
  //     });
  //   }, [connex]);

  const valueToSend = ethers.toBigInt(ethers.parseEther("0.1"));

  return (
    <button
      disabled={!address}
      onClick={async () => {
        // get a viem account.
        const account = toViem(address!);
        // use viem to send eth.
        const walletClient = createWalletClient({
          account,
          chain: testnet,
          //   transport: http(testnet.rpcUrls.default.rpc[0]),
          transport: custom(new VechainProvider(client)),
        });

        console.log("valueToSend", valueToSend.toString());

        // await account.signTransaction({
        //   account,
        //   to: "0xf077b491b355E64048cE21E3A6Fc4751eEeA77fa",
        //   value: valueToSend,
        //   data: "0x",
        // });

        // send the transaction.

        //TODO: this opens veworld
        // const txHash = await walletClient.sendTransaction({
        //   account: account.address,
        //   to: "0xf077b491b355E64048cE21E3A6Fc4751eEeA77fa",
        //   value: valueToSend,
        // });

        //TODO: this throws Number "1.17645579097283e+66" is not in safe integer error
        const txHash = await walletClient.sendTransaction({
          account,
          to: "0xf077b491b355E64048cE21E3A6Fc4751eEeA77fa",
          value: valueToSend,
          data: "0x",
        });

        console.log("Sent VET!", txHash);
        console.log(testnet.blockExplorers.default.url + `/${txHash}`);
      }}
    >
      Send VET
    </button>
  );
};
