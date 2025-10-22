import Card from "./Card";
import Header from "./Header";

import { useState, useEffect } from "react";
import { getCarMarketplaceContract } from "../contract";
import { ethers } from "ethers";

export default function CarGrid() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCars();
  }, []);

  async function loadCars() {
    try {
      console.log("Connecting to the contract");

      const contract = await getCarMarketplaceContract();
      const carsOnChain = await contract.getCarsByStatus(false);
      console.log(carsOnChain);

      //format data
      const formattedCars = carsOnChain.map((car) => ({
        id: car.id.toString(),
        make: car.make,
        model: car.model,
        year: car.year.toString(),
        price: ethers.formatEther(car.price),
        seller: car.seller,
        sold: car.sold,
      }));

      console.log(formattedCars);

      setCars(formattedCars);
      setLoading(false);
    } catch (error) {
      console.error("Error loading cars", error);
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Header></Header>

      <div className="flex justify-center items-center m-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {cars.map((car) => (
            <Card
              key={car.id}
              id={car.id}
              make={car.make}
              model={car.model}
              year={car.year}
              price={car.price}
              seller={car.seller}
            ></Card>
          ))}
        </div>
      </div>
    </>
  );
}
