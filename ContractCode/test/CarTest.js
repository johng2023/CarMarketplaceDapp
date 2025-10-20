const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Car", function () {
  let carContract;
  let accounts;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    const CarContract = await ethers.getContractFactory("CarMarketplace");
    carContract = await CarContract.deploy();
    await carContract.waitForDeployment();

    await carContract.connect(accounts[1]).listCar("BMW", "x3", 2014, 20000);
    await carContract
      .connect(accounts[2])
      .listCar("Ford", "explorer", 2010, 15000);
    await carContract
      .connect(accounts[2])
      .listCar("Lambo", "huracan", 2020, 200000);
  });

  it("user lists a car", async function () {
    const car = await carContract.cars(1);

    expect(car[1]).to.equal("BMW");
    expect(car[2]).to.equal("x3");
    expect(car[3]).to.equal(2014);
    expect(car[4]).to.equal(20000);
  });

  it("user buys a car", async function () {
    await carContract.connect(accounts[2]).buyCar(1, { value: 20000 });

    const car = await carContract.cars(1);
    expect(car[6]).to.equal(accounts[2].address);
    expect(car[7]).to.equal(true);
  });

  it("user filters for their cars", async function () {
    const myCars = await carContract.getMyCars(accounts[2].address);
    expect(myCars.length).to.equal(2);
    expect(myCars[1][1]).to.equal("Lambo");
    expect(myCars[0][1]).to.equal("Ford");
  });

  it("user filters using Car status", async function () {
    await carContract.connect(accounts[3]).buyCar(3, { value: 200000 });
    const myCars = await carContract.getCarsByStatus(true);

    expect(myCars.length).to.equal(1);
    expect(myCars[0][1]).to.equal("Lambo");
  });
});
