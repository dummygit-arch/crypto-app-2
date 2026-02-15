// src/App.jsx
import React, { useEffect } from "react";
import {
  createWeb3Modal,
  defaultConfig,
  useSwitchNetwork,
  useWeb3ModalAccount,
  useWeb3ModalProvider
} from "@web3modal/ethers5/react";

import { connect_wallet } from "./utils";
import LandingPage from "./general/landingpage";

// WalletConnect Project ID
const projectId = "ebe9eafc5b727a796d945a82b483e146";

// Define your supported chains
const chains = [
  {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://eth.llamarpc.com"
  },
  {
    chainId: 56,
    name: "Binance Smart Chain",
    currency: "BNB",
    explorerUrl: "https://bscscan.com",
    rpcUrl: "https://bsc-dataseed1.defibit.io"
  }
];

// Web3Modal ethers config
const ethersConfig = defaultConfig({
  metadata: {
    name: "Blockchain",
    description: "Web3 Application for Digital Asset Management",
    url: "http://localhost:5173/",
    icons: ["https://avatars.githubusercontent.com/u/37784886"]
  },
  defaultChainId: 1,
  rpcUrl: "https://eth.llamarpc.com"
});

// Create modal once globally
createWeb3Modal({
  ethersConfig,
  projectId,
  chains,
  themeMode: "dark", // or "light"
  themeVariables: {
    // "--w3m-accent": "#8e44ad",          // Primary button color
    "--w3m-background": "#1e1e2f",       // Modal background
    "--w3m-border-radius": "10px",       // Border radius for modal
    "--w3m-font-family": "Poppins, sans-serif",
    "--w3m-z-index": "9999",             // Useful if your modal appears behind stuff
  }
});

const App = () => {
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (address && walletProvider && switchNetwork) {
      connect_wallet(walletProvider, address, switchNetwork);
    }
  }, [address, walletProvider, switchNetwork]) // safe deps

  return (
    <>
      <LandingPage />
    </>
  );
};

export default App;
