import { useWalletContext } from "@coinbase/waas-sdk-web-react";

// a button to logout your user.
export const LogoutButton = () => {
  const { waas, user } = useWalletContext();
  return (
    <button
      onClick={async () => {
        await waas?.logout();
      }}
      disabled={!user}
    >
      Logout
    </button>
  );
};
