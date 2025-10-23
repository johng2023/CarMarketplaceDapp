import Header from "./Header";
import { useState } from "react";
import { getCarMarketplaceContract } from "../contract";
import { ethers } from "ethers";
import { uploadToIPFS } from "../ipfs";

export default function ListCarForm() {
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be less than 5MB");
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    try {
      setUploadingImage(true);
      console.log("Uploading image to IPFS...");
      const imageUrl = await uploadToIPFS(imageFile);
      console.log("Image uploaded:", imageUrl);
      setUploadingImage(false);

      console.log("Listing car on blockchain...");
      const contract = await getCarMarketplaceContract();
      const priceInWei = ethers.parseEther(form.price);

      const tx = await contract.listCar(
        form.make,
        form.model,
        parseInt(form.year),
        priceInWei,
        imageUrl
      );

      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed!");

      alert("Car listed successfully!");

      // Reset form
      setForm({
        make: "",
        model: "",
        year: "",
        price: "",
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error listing car:", error);
      alert("Failed to list car: " + error.message);
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  }

  return (
    <>
      <Header />
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
              disabled={loading}
            />
          </div>

          <div>
            <label
              className="text-white block text-sm font-medium mb-1"
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
              disabled={loading}
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
              disabled={loading}
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
              placeholder="e.g. 3"
              value={form.price}
              onChange={handleChange}
              required
              type="number"
              step="0.001"
              min="0"
              disabled={loading}
            />
          </div>

          <div>
            <label
              className="text-white block text-sm font-medium mb-1"
              htmlFor="image"
            >
              Car Image
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              disabled={loading}
            />
            <p className="text-xs text-gray-400 mt-1">
              Max 5MB. JPG, PNG, GIF supported.
            </p>
          </div>

          {imagePreview && (
            <div className="mt-2">
              <p className="text-white text-sm mb-2">Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded"
              />
            </div>
          )}

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {uploadingImage
              ? "Uploading image to IPFS..."
              : loading
              ? "Listing car on blockchain..."
              : "List Car"}
          </button>

          {loading && (
            <div className="text-white text-sm text-center">
              {uploadingImage ? (
                <p>Uploading image to IPFS...</p>
              ) : (
                <p>Saving to blockchain...</p>
              )}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
