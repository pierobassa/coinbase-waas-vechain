import { useWalletContext } from "@coinbase/waas-sdk-web-react";
import { useEffect } from "react";

export const CreateOrResumeWalletButton = () => {
  const { waas, user, wallet, isCreatingWallet, error } = useWalletContext();

  console.log({
    waas,
    user,
    wallet,
    isCreatingWallet,
    error,
  });
  useEffect(() => {
    if (error) {
      console.error("Error creating or restoring wallet:", error);
    }
  }, [error]);

  const isDisabled = !waas || !user || isCreatingWallet || !!wallet;

  console.log("isDisabled", isDisabled);
  return (
    <button
      disabled={isDisabled}
      onClick={async () => {
        // check if your user has a wallet, and restore it if they do!
        if (user?.hasWallet) {
          console.log("Restoring wallet...")
          // restores the user's existing wallet.
          user.restoreFromHostedBackup!();
        } else {
          // creates a new wallet.
          const newWallet = await user?.create();

          console.log("Backup: ", newWallet?.backup);
        }
      }}
    >
      {isCreatingWallet ? "Creating wallet..." : "Create/Resume Wallet"}
    </button>
  );
};
