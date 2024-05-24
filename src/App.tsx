import { useEVMAddress, useWalletContext } from "@coinbase/waas-sdk-web-react";
import {
  CreateOrResumeWalletButton,
  LogoutButton,
  SignTransactionButton,
  ViewMyAddressLabel,
} from "./components";

function App() {
  const { wallet } = useWalletContext();
  const address = useEVMAddress(wallet);

  return (
    <>
      {!address && <CreateOrResumeWalletButton />}
      {address && (
        <>
          <ViewMyAddressLabel />
          <SignTransactionButton />
          <LogoutButton />
        </>
      )}
    </>
  );
}

export default App;
