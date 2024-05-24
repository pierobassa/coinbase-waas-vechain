import { useWalletContext } from "@coinbase/waas-sdk-web-react";

export const CreateOrResumeWalletButton = () => {
  const { waas, user, wallet, isCreatingWallet } = useWalletContext();

  return (
    <button
      disabled={!waas || !user || isCreatingWallet || !!wallet}
      onClick={async () => {
        // check if your user has a wallet, and restore it if they do!
        if (user!.hasWallet) {
          // restores the user's existing wallet.
          user!.restoreFromHostedBackup!();
        } else {
          // creates a new wallet.
          user!.create();
        }
      }}
    >
      {isCreatingWallet ? "Creating wallet..." : "Create/Resume Wallet"}
    </button>
  );
};
