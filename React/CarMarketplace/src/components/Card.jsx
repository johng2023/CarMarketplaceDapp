export default function Card({ make, model, year, img, price, seller }) {
  return (
    <div className="max-w-auto bg-white border border-white text-black rounded-lg m-4">
      <div className="p-5">
        <h1 className="mb-2 text-3xl font-bold text-black">BMW X3 2014</h1>
        <p className="mb-3 text-2xl text-black">Blue 90,000 miles</p>
        <p className="text-1xl font-bold text-red-500">3 ETH</p>
      </div>
    </div>
  );
}
