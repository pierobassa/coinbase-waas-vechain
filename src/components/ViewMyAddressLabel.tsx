import { useEVMAddress, useWalletContext } from "@coinbase/waas-sdk-web-react";

// a <p> to see your user's address.
export const ViewMyAddressLabel = () => {
  const { wallet } = useWalletContext();
  const address = useEVMAddress(wallet);
  return (
    <div>
      {address && <p>Your address is: {address.address}</p>}
      {!address && <p>No wallet.</p>}
    </div>
  );
};
