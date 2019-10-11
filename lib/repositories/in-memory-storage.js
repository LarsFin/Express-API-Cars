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
}

module.exports = InMemoryDB;
