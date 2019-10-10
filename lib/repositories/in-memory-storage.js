class InMemoryDB {
  constructor() {
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
