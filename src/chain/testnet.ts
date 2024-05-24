export const testnet = {
  id: 100010,
  name: "vechain_testnet",
  network: "homestead",
  nativeCurrency: {
    name: "VeChainThor",
    symbol: "VET",
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ["https://node-testnet.vechain.energy"],
      rpc: ["http://localhost:8545"],
    },
    default: {
      http: ["https://node-testnet.vechain.energy"],
      rpc: ["http://localhost:8545"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explore-testnet.vechain.org" },
  },
};
