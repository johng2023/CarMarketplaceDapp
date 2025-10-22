import Header from "./Header";
import { useState } from "react";
import { getCarMarketplaceContract } from "../contract";
import { ethers } from "ethers";

export default function ListCarForm() {
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      console.log("Connecting to contract");
      const contract = await getCarMarketplaceContract();
      const priceWei = ethers.parseEther(form.price);

      //call smart contract and sign transaction
      const tx = await contract.listCar(
        form.make,
        form.model,
        parseInt(form.year),
        priceWei
      );
      await tx.wait();

      alert("Success car was listed");

      setForm({
        make: "",
        model: "",
        year: "",
        price: "",
      });
    } catch (error) {
      console.error("Failed to list car", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header></Header>
      <div className="max-w-lg mx-auto border border-white rounded-2xl mt-8 mb-10 p-8 m-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          List your car for sale
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              className="text-white block text-sm font-medium mb-1"
              htmlFor="make"
            >
              Make
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              id="make"
              name="make"
              placeholder="e.g. Toyota"
              value={form.make}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className=" text-white block text-sm font-medium mb-1"
              htmlFor="model"
            >
              Model
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              id="model"
              name="model"
              placeholder="e.g. Corolla"
              value={form.model}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="text-white block text-sm font-medium mb-1"
              htmlFor="year"
            >
              Year
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              id="year"
              name="year"
              placeholder="e.g. 2022"
              value={form.year}
              onChange={handleChange}
              required
              type="number"
              min="1900"
              max="2100"
            />
          </div>
          <div>
            <label
              className="text-white block text-sm font-medium mb-1"
              htmlFor="price"
            >
              Price (ETH)
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              id="price"
              name="price"
              placeholder="e.g. 3 ETH"
              value={form.price}
              onChange={handleChange}
              required
              type="number"
              step="0.001"
              min="0"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow transition"
          >
            {loading ? "Listing Car..." : "List Car"}
          </button>
        </form>
      </div>
    </>
  );
}
