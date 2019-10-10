class InMemoryDB {
  constructor() {
    this._cars = [];
  }

  getCars() {
    return this._cars;
  }
}

module.exports = InMemoryDB;
