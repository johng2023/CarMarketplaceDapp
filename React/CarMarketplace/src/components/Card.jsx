import { useState } from "react";
import { getCarMarketplaceContract } from "../contract";
import { ethers } from "ethers";
import { getIPFSUrl } from "../ipfs";

export default function Card({
  id,
  make,
  model,
  year,
  price,
  seller,
  imageUrl,
}) {
  const [buying, setBuying] = useState(false);
  const [imageError, setImageError] = useState(false);

  async function buyCar() {
    setBuying(true);

    try {
      const contract = await getCarMarketplaceContract();
      const priceInWei = ethers.parseEther(price);
      const tx = await contract.buyCar(id, { value: priceInWei });
      await tx.wait();
      alert("Car purchased successfully! 🎉");
      window.location.reload();
    } catch (error) {
      console.error("Error buying car:", error);
      alert("Error buying car: " + error.message);
    } finally {
      setBuying(false);
    }
  }

  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="max-w-auto bg-white border border-white text-black rounded-lg m-4 overflow-hidden">
      <div className="w-full h-48 bg-gray-200 overflow-hidden">
        {!imageError && imageUrl ? (
          <img
            src={getIPFSUrl(imageUrl)}
            alt={`${make} ${model}`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-gray-500 text-4xl">🚗</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h1 className="mb-2 text-3xl font-bold text-black">
          {make} {model}
        </h1>

        <p className="mb-3 text-2xl text-black">Year: {year}</p>

        <p className="text-1xl font-bold text-red-500">{price} ETH</p>

        <p className="text-sm text-gray-600 mt-2">
          Seller: {shortenAddress(seller)}
        </p>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 rounded p-2 mb-2 mr-2 float-right text-white transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={buyCar}
        disabled={buying}
      >
        {buying ? "Buying..." : "Buy Car"}
      </button>
    </div>
  );
}
