import Header from "./Header";
import { useState } from "react";

export default function ListCarForm() {
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    alert("Car Listed");
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
              Price ($)
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              id="price"
              name="price"
              placeholder="e.g. 15000"
              value={form.price}
              onChange={handleChange}
              required
              type="number"
              min="0"
            />
          </div>
          <div>
            <label
              className=" text-white block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 rounded bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
              id="description"
              name="description"
              placeholder="Add details (trim, mileage, condition...)"
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow transition"
          >
            List Car
          </button>
        </form>
      </div>
    </>
  );
}
