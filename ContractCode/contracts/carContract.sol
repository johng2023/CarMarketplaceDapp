// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract CarMarketplace {
    struct Car {
        uint id;
        string make;
        string model;
        uint year;
        uint price;
        address payable seller;
        address buyer;
        bool sold;
    }

    mapping(uint => Car) public cars;
    uint public carCount;

    event CarListed(
        uint indexed id,
        string make,
        string model,
        uint price,
        address indexed seller
    );
    event CarSold(
        uint indexed id,
        address indexed buyer,
        address seller,
        uint price
    );

    function listCar(
        string calldata _make,
        string calldata _model,
        uint _year,
        uint _price
    ) external {
        require(_price > 0, "Price must be more than 0");
        carCount++;
        cars[carCount] = Car({
            id: carCount,
            make: _make,
            model: _model,
            year: _year,
            price: _price,
            seller: payable(msg.sender),
            buyer: address(0),
            sold: false
        });

        emit CarListed(carCount, _make, _model, _price, msg.sender);
    }

    function buyCar(uint _carId) public payable {
        Car storage car = cars[_carId];
        require(_carId > 0 && _carId <= carCount, "Car does not exist");
        require(!car.sold, "Car already sold");
        require(msg.sender != car.seller, "Seller can't buy car");
        require(msg.value == car.price, "Send exact car price amount");

        car.buyer = msg.sender;
        car.sold = true;

        (bool success, ) = car.seller.call{value: msg.value}("");
        require(success, "Transfer Failed");

        emit CarSold(_carId, msg.sender, car.seller, car.price);
    }

    function getCarsByStatus(bool _sold) external view returns (Car[] memory) {
        uint count = 0;

        for (uint i = 1; i <= carCount; ) {
            if (cars[i].sold == _sold) {
                count++;
            }
            i++;
        }

        Car[] memory result = new Car[](count);
        uint index = 0;

        for (uint i = 1; i <= carCount; ) {
            if (cars[i].sold == _sold) {
                result[index] = cars[i];
                index++;
            }
            i++;
        }

        return result;
    }

    function getMyCars(address _seller) external view returns (Car[] memory) {
        uint count = 0;

        for (uint i = 1; i <= carCount; ) {
            if (cars[i].seller == _seller) {
                count++;
            }
            i++;
        }

        Car[] memory myCars = new Car[](count);

        uint index = 0;

        for (uint i = 1; i <= carCount; ) {
            if (cars[i].seller == _seller) {
                myCars[index] = cars[i];
                index++;
            }
            i++;
        }

        return myCars;
    }
}
