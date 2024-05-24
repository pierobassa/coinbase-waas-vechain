//////////////// [frontend] component.tsx - 2. Use `useWalletContext` to login and setup your user!
import { useWalletContext } from "@coinbase/waas-sdk-web-react";

// a button to login your user.
// this will trigger Coinbase Managed Auth
export const LoginButton = () => {
  const { waas, user } = useWalletContext();
  return (
    <button
      disabled={!waas || !!user}
      onClick={() => {
        waas!.login();
      }}
    >
      Login
    </button>
  );
};
