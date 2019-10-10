const carModel = require('../../lib/models/car.js');
const ArgumentError = require('../../lib/common/argument-error.js');

describe("car model tests", () => {
  const id = 1,
        make = "Ford",
        model = "Some model",
        colour = "Pink";

  it("Should return a car model object", () => {
    const year = "2004",
          intYear = 2004,
          expected = {
            'id': id,
            'make': make,
            'model': model,
            'colour': colour,
            'year': intYear
          };

    const actual = carModel(id, make, model, colour, year);

    expect(actual).toMatchObject(expected);
  });

  it("Should throw ArgumentError from invalid year", () => {
    const invalidYear = "Two-Thousand-and-Four";

    const wrapper = () => {
      carModel(id, make, model, colour, invalidYear);
    }

    expect(wrapper).toThrowError(ArgumentError);
  });
});
