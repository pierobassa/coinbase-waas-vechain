import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WalletProvider } from "@coinbase/waas-sdk-web-react";
import { DAppKitProvider } from "@vechain/dapp-kit-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <DAppKitProvider
    nodeUrl="https://node-testnet.vechain.energy"
    genesis="test"
    usePersistence
  >
    <WalletProvider
      projectId={"ce798339-e7dc-4119-a630-b38b4450a601"}
      verbose
      collectAndReportMetrics
      enableHostedBackups
      prod={false}
    >
      <App />
    </WalletProvider>
  </DAppKitProvider>
);
