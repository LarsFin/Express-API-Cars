const DB = require('../../lib/repositories/in-memory-storage.js');
const ArgumentError = require('../../lib/common/argument-error.js');

let dbContext,
    carMock;

beforeEach(() => {
  carMock = jest.fn();
  dbContext = new DB(carMock);
});

describe("get all tests", () => {
  test("Return list of cars currently stored", () => {
    const expected = ['car1', 'car2', 'car3'];

    dbContext._cars = expected;

    const actual = dbContext.getCars();

    expect(actual).toBe(expected);
  });
});

describe("get car tests", () => {
  test("Return specific car via passed id", () => {
    const id = '4',
          intId = 4,
          car1 = { 'id': 1 },
          car2 = { 'id': 2 },
          expected = { 'id': intId },
          car3 = { 'id': 5 }

    dbContext._cars = [car1, car2, expected, car3];

    const actual = dbContext.getCar(id);

    expect(actual).toBe(expected);
  });

  test("Returns undefined if non-existant id given", () => {
    const id = '99';

    const actual = dbContext.getCar(id);

    expect(actual).toBeUndefined();
  });

  test("Throw ArgumentError from invalid id given", () => {
    const invalidId = '4.359';

    const wrapper = (() => dbContext.getCar(invalidId));

    expect(wrapper).toThrowError(ArgumentError);
  });
});

describe("add car tests", () => {
  const make = 'Tesla',
        model = 'S Series',
        colour = 'Black',
        year = 1995,
        carData = {
          'make': make,
          'model': model,
          'colour': colour,
          'year': year
        };

  test("Add a newly created car to 'storage' and return generated data", () => {
    const id = 1,
          expected = {
            'id': id,
            'make': make,
            'model': model,
            'colour': colour,
            'year': year
          };

    dbContext._buildCar = jest.fn(() => expected);

    expect(carMock).not.toHaveBeenCalled();

    expect(dbContext._cars.length).toBe(0);

    const actual = dbContext.addCar(carData);

    expect(dbContext._buildCar).toHaveBeenCalledTimes(1);
    expect(dbContext._buildCar).toHaveBeenCalledWith(id, make, model, colour, year);

    expect(dbContext._cars.length).toBe(1);

    expect(actual).toMatchObject(expected);
  });

  test("Id is automatically incremented on each creation", () => {
    const repeats = 3;

    dbContext._buildCar = jest.fn();

    for (let i = 0; i < repeats; i++) {
      const actual = dbContext.addCar(carData);

      expect(dbContext._buildCar).toHaveBeenCalledWith(i + 1, make, model, colour, year);
    }

    expect(dbContext._buildCar).toHaveBeenCalledTimes(repeats);
  });
});
