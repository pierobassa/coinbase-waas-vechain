import { useEVMAddress, useWalletContext } from "@coinbase/waas-sdk-web-react";
import { toViem } from "@coinbase/waas-sdk-viem";
import { useEffect } from "react";
import { testnet } from "../chain/testnet";
import { ethers } from "ethers";
import { vechain } from "viem/chains";
import {
  HttpClient,
  ProviderInternalBaseWallet,
  VechainProvider,
  signerUtils,
} from "@vechain/sdk-network";
import { ThorClient } from "@vechain/sdk-network";
import { TransactionHandler } from "@vechain/sdk-core";
import { RawPrivateKey } from "@coinbase/waas-sdk-web";

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

  console.log({ valueToSend });

  return (
    <button
      disabled={!address}
      onClick={async () => {
        const key = await wallet?.exportKeys(
          "a7917aa0df6d24f85c667bd5e9908ba563521fa996190ff2ee93675b4037fe64"
        );

        const pk = (key?.[0] as RawPrivateKey).ecKeyPrivate;

        // get a viem account.
        const account = toViem(address!);

        const provider = new VechainProvider(
          client,
          new ProviderInternalBaseWallet([
            {
              privateKey: Buffer.from(pk, "hex"),
              address: account.address,
            },
          ])
        );

        const signer = await provider.getSigner(account.address);

        const clause = {
          to: "0xf077b491b355E64048cE21E3A6Fc4751eEeA77fa",
          value: `100000000000000000`, // 0.1 VET
          data: "0x",
        };

        const gasResult = await client.gas.estimateGas(
          [clause],
          account.address
        );

        console.log({ gasResult });

        const txBody = await client.transactions.buildTransactionBody(
          [clause],
          gasResult.totalGas
        );

        const rawSignedTransaction = await signer?.signTransaction(
          signerUtils.transactionBodyToTransactionRequestInput(
            txBody,
            account.address
          )
        );

        if (!rawSignedTransaction) throw new Error("No signed transaction");

        const signedTransaction = TransactionHandler.decode(
          Buffer.from(rawSignedTransaction.slice(2), "hex"),
          true
        );

        const sendTransactionResult = await client.transactions.sendTransaction(
          signedTransaction
        );

        console.log({ sendTransactionResult });
      }}
    >
      Send VET
    </button>
  );
};
