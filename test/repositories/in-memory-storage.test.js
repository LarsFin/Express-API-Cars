const DB = require('../../lib/repositories/in-memory-storage.js');
const CM = require('../../lib/models/car.js');

let dbContext,
    carMock;

beforeEach(() => {
  carMock = CM;
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

    carMock = jest.fn(() => expected);

    expect(carMock).not.toHaveBeenCalled();

    expect(dbContext._cars.length).toBe(0);

    const actual = dbContext.addCar(carData);

    expect(carMock).toHaveBeenCalledTimes(1);
    expect(carMock).toHaveBeenCalledWith(id, make, model, colour, year);

    expect(dbContext._cars.length).toBe(1);

    expect(actual).toMatchObject(expected);
  });

  test("Id is automatically incremented on each creation", () => {
    const repeats = 3;

    carMock = jest.fn(() => expected);

    for (let i = 0; i < repeats; i++) {
      const actual = dbContext.addCar(carData);

      expect(carMock).toHaveBeenCalledWith(i + 1, make, model, colour, year);
    }

    expect(carMock).toHaveBeenCalledTimes(repeats);
  });
});
