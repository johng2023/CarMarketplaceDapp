import { getCarMarketplaceContract } from "../contract";
import { ethers } from "ethers";

export default function Card({ id, make, model, year, price, seller }) {
  async function buyCar() {
    try {
      const contract = await getCarMarketplaceContract();
      const tx = await contract.buyCar(id, { value: ethers.parseEther(price) });
      await tx.wait();

      alert("Car purchased");
      window.location.reload();
    } catch (error) {
      alert("Error Buying Car");
      console.error("Error Buying Car", error);
    }
  }

  return (
    <div className="max-w-auto w-full bg-white border border-gray-200 rounded-xl shadow-lg m-4 flex flex-col justify-between">
      <div className="p-5 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900 break-words">
          {make} {model} {year}
        </h1>
        <p className="text-gray-500 text-sm">
          <span className="font-medium text-gray-700">Seller:</span>
          <span
            className="inline-block max-w-[160px] align-middle ml-1 truncate"
            title={seller}
          >
            {seller}
          </span>
        </p>
        <p className="text-xl font-bold text-black">
          {price} <span className="font-normal">ETH</span>
        </p>
      </div>
      <div className="p-5 pt-0 flex justify-end">
        <button
          onClick={buyCar}
          className="bg-blue-600 text-white rounded-lg px-5 py-2 hover:bg-blue-700 transition font-semibold shadow"
        >
          Buy Car
        </button>
      </div>
    </div>
  );
}
