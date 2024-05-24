import { useEVMAddress, useWalletContext } from "@coinbase/waas-sdk-web-react";
import {
  CreateOrResumeWalletButton,
  LoginButton,
  LogoutButton,
  SignTransactionButton,
  ViewMyAddressLabel,
} from "./components";

function App() {
  const { wallet } = useWalletContext();
  const address = useEVMAddress(wallet);

  return (
    <>
      {!address && (
        <>
          <LoginButton />
          <CreateOrResumeWalletButton />
        </>
      )}
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
