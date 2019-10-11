const ArgumentError = require('../common/argument-error.js');

const Car = (id, make, model, colour, year) => {
  if (isNaN(year) || Number(year) % 1 !== 0) {
    throw new ArgumentError(`Invalid argument '${year}', year must be an integer`);
  }

  year = parseInt(year);

  return {
    'id': id,
    'make': make,
    'model': model,
    'colour': colour,
    'year': year
  }
}

module.exports = Car;
