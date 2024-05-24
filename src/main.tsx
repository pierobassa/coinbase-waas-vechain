import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WalletProvider } from "@coinbase/waas-sdk-web-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WalletProvider
    projectId={"YOUR_PROJECT_ID"}
    verbose
    collectAndReportMetrics
    enableHostedBackups
  >
    <App />
  </WalletProvider>
);
