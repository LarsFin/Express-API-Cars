const ArgumentError = require('../common/argument-error.js');

class InMemoryDB {
  constructor(carBuilder) {
    this._idCounter = 1;
    this._buildCar = carBuilder;
    this._cars = [];
  }

  getCars() {
    return this._cars;
  }

  getCar(id) {
    if (isNaN(id) || Number(id) % 1 !== 0) {
      throw new ArgumentError(`Passed id: ${id}, is not an integer.`);
    }

    id = parseInt(id);

    return this._cars.find((car) => {
      return car.id === id;
    });
  }

  addCar(carData) {
    const car = this._buildCar(this._idCounter,
                               carData.make,
                               carData.model,
                               carData.colour,
                               carData.year);

    this._cars.push(car);

    this._idCounter++;
    return car;
  }

  deleteCar(id) {
    
  }
}

module.exports = InMemoryDB;
