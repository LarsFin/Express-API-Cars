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
    id = this._validateId(id);

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
    id = this._validateId(id);

    let carFound = false;

    for (let i = 0; i < this._cars.length; i++) {
      if (this._cars[i].id === id) {
        carFound = true;
        this._cars.splice(i, 1);
      }
    }

    return carFound;
  }

  updateCar(id, updateData) {
    id = this._validateId(id);

    const car = this._cars.find((car) => {
      return car.id === id;
    });

    if (car) {
      for (const [key, value] of Object.entries(updateData)) {
        if (['make', 'model', 'colour', 'year'].includes(key)) {
          car[key] = updateData[key];
        }
      };
    };

    return car;
  }

  _validateId(id) {
    if (isNaN(id) || Number(id) % 1 !== 0) {
      throw new ArgumentError(`Passed id: ${id}, is not an integer.`);
    }

    return parseInt(id);
  }
}

module.exports = InMemoryDB;
