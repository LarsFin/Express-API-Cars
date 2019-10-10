class InMemoryDB {
  constructor(carBuilder) {
    this._buildCar = carBuilder;
    this._cars = [];
  }

  getCars() {
    return this._cars;
  }

  addCar(carData) {
    // To be implemented
  }
}

module.exports = InMemoryDB;
