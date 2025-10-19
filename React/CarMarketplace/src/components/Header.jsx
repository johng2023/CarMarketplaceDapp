import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState();

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Install Metamask or Web3 Wallet Extension");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.log("Failed to connect", error);
    }
  }

  return (
    <div className="bg-black flex justify-between items-center p-3 h-25 border-b-2 border-white">
      <div>
        <h1 className="text-3xl text-white ml-5">
          <Link to="/">Web3 Car Marketplace</Link>
        </h1>
      </div>

      <div className="flex gap-6">
        <button
          onClick={connectWallet}
          className="border border-white text-white p-2 rounded-xl hover:scale-102 h-auto"
        >
          {isConnected === true ? "Connected to: " + account : "Connect Wallet"}
        </button>
        <button className="border border-white text-white p-2 rounded-xl hover:scale-102 h-auto">
          <Link to="/list">List Your Car</Link>
        </button>
      </div>
    </div>
  );
}
