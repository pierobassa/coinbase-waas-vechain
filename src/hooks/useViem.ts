import { useMemo } from "react";
import { useConnex } from "@vechain/dapp-kit-react";
import { Provider } from "@vechain/web3-providers-connex";
import { createPublicClient, createWalletClient, custom } from "viem";

export function useViem() {
  const connex = useConnex();

  const publicClient = useMemo(() => {
    return createPublicClient({
      transport: custom(new Provider({ connex })),
    });
  }, [connex]);

  return {
    publicClient,
  };
}
