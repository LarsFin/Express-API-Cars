const DB = require('../../lib/repositories/in-memory-storage.js');

let dbContext;

beforeEach(() => {
  dbContext = new DB();
});

describe("get all tests", () => {
  test("Return list of cars currently stored", () => {
    const expected = ['car1', 'car2', 'car3'];

    dbContext._cars = expected;

    const actual = dbContext.getCars();

    expect(actual).toBe(expected);
  })
})
