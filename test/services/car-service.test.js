const dbPath = '../../lib/repositories/in-memory-storage.js',
      mfPath = '../../lib/helpers/message-factory.js';

const constants = require('../../lib/common/constants.js');
const ArgumentError = require('../../lib/common/argument-error.js');
const CS = require('../../lib/services/car-service.js');
const DB = require(dbPath);
const MF = require(mfPath);

let dbContextMock,
    messageFactoryMock,
    carService;

afterEach(() => {
  jest.resetModules()
});

beforeEach(() => {
  dbContextMock = new DB();
  messageFactoryMock = new MF();
  carService = new CS(dbContextMock, messageFactoryMock);

  jest.mock(dbPath);
  jest.mock(mfPath);
});

describe("get all tests", () => {
  test("Returns response with array of cars as body", () => {
    const result = ['car1', 'car2', 'car3'],
          expected = {
            'code': constants.HttpStatusCodes.Ok,
            'body': result
          };

    dbContextMock.getCars = jest.fn(() => result);
    messageFactoryMock.buildResponse = jest.fn(() => expected);

    expect(messageFactoryMock.buildResponse).not.toHaveBeenCalled();

    const actual = carService.getCars();

    expect(messageFactoryMock.buildResponse).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.buildResponse).toHaveBeenCalledWith(constants.HttpStatusCodes.Ok, result);

    expect(actual).toMatchObject(expected);
  });

  test("Returns error response", () => {
    const errorMessage = "Error message",
          error = new Error(errorMessage),
          expected = {
            'code': constants.HttpStatusCodes.InternalServerError,
            'body': errorMessage
          };

    messageFactoryMock.handleError = jest.fn(() => expected);
    dbContextMock.getCars = jest.fn(() => {
      throw error;
    });

    expect(messageFactoryMock.handleError).not.toHaveBeenCalled();

    const actual = carService.getCars();

    expect(messageFactoryMock.handleError).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.handleError).toHaveBeenCalledWith(error);

    expect(actual).toMatchObject(expected);
  });
});

describe("get car tests", () => {
  const id = 1;

  test("Find car from dbContext and populate response", () => {
    const result = {
            'id': 1,
            'make': "Renault",
            'model': "B Series",
            'colour': "Jet Black",
            'year': 2012
          },
          expected = {
            'code': constants.HttpStatusCodes.Ok,
            'body': result
          }

    dbContextMock.getCar = jest.fn(() => result);
    messageFactoryMock.buildResponse = jest.fn(() => expected);

    expect(messageFactoryMock.buildResponse).not.toHaveBeenCalled();

    const actual = carService.getCar(id);

    expect(dbContextMock.getCar).toHaveBeenCalledWith(id);

    expect(messageFactoryMock.buildResponse).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.buildResponse).toHaveBeenCalledWith(constants.HttpStatusCodes.Ok, result);

    expect(actual).toMatchObject(expected);
  });

  test("Returns Error response", () => {
    const errorMessage = "Error Message",
          error = new Error(errorMessage),
          expected = {
            'code': constants.HttpStatusCodes.InternalServerError,
            'body': errorMessage
          }

    messageFactoryMock.handleError = jest.fn(() => expected);
    dbContextMock.getCar = jest.fn(() => {
      throw error;
    });

    expect(messageFactoryMock.handleError).not.toHaveBeenCalled();

    const actual = carService.getCar(id);

    expect(messageFactoryMock.handleError).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.handleError).toHaveBeenCalledWith(error);

    expect(actual).toMatchObject(expected);
  });

  test("Returns Not Found from non existant item", () => {
    const result = undefined,
          expected = {
            'code': constants.HttpStatusCodes.NotFound,
            'body': constants.UserFeedback.CarNotFound
          };

    messageFactoryMock.buildResponse = jest.fn(() => expected);
    dbContextMock.getCar = jest.fn(() => undefined);

    expect(messageFactoryMock.buildResponse).not.toHaveBeenCalled();

    const actual = carService.getCar(id);

    expect(messageFactoryMock.buildResponse).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.buildResponse).toHaveBeenCalledWith(constants.HttpStatusCodes.NotFound,
                                                                  constants.UserFeedback.CarNotFound);

    expect(actual).toMatchObject(expected);
  });

  test("Returns bad request from invalid id in url", () => {
    const invalidId = 'AE0X',
          expected = {
            'code': constants.HttpStatusCodes.BadRequest,
            'body': constants.UserFeedback.InvalidCarId
          };

    messageFactoryMock.buildResponse = jest.fn(() => expected);
    dbContextMock.getCar = jest.fn(() => {
      throw new ArgumentError();
    });

    expect(messageFactoryMock.buildResponse).not.toHaveBeenCalled();

    const actual = carService.getCar(invalidId);

    expect(messageFactoryMock.buildResponse).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.buildResponse).toHaveBeenCalledWith(constants.HttpStatusCodes.BadRequest,
                                                                  constants.UserFeedback.InvalidCarId);

    expect(actual).toMatchObject(expected);
  });
});

describe("add car tests", () => {
  const make = 'Audi',
        model = 'Flashy car',
        colour = 'Silver',
        year = 1999,
        carData = {
          'make': make,
          'model': model,
          'colour': colour,
          'year': year
        };

  test("Return created response with created car data", () => {
    const result = {
            'id': 1,
            'make': make,
            'model': model,
            'colour': colour,
            'year': year
          },
          expected = {
            'code': constants.HttpStatusCodes.Created,
            'body': result
          };

    dbContextMock.addCar = jest.fn(() => result);
    messageFactoryMock.buildResponse = jest.fn(() => expected);

    expect(messageFactoryMock.buildResponse).not.toHaveBeenCalled();

    const actual = carService.addCar(carData);

    expect(messageFactoryMock.buildResponse).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.buildResponse).toHaveBeenCalledWith(constants.HttpStatusCodes.Created, result);

    expect(actual).toMatchObject(expected);
  });

  test("Returns error response", () => {
    const errorMessage = 'Error message',
          error = new Error(errorMessage),
          expected = {
            'code': constants.HttpStatusCodes.InternalServerError,
            'body': errorMessage
          };

    messageFactoryMock.handleError = jest.fn(() => expected);
    dbContextMock.addCar = jest.fn(() => {
      throw error;
    });

    expect(messageFactoryMock.handleError).not.toHaveBeenCalled();

    const actual = carService.addCar(carData);

    expect(messageFactoryMock.handleError).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.handleError).toHaveBeenCalledWith(error);

    expect(actual).toMatchObject(expected);
  });

  test("Returns bad request from invalid year given", () => {
    const invalidYear = 'A year!',
          invalidCarData = {
            'make': make,
            'model': model,
            'colour': colour,
            'year': invalidYear
          },
          expected = {
            'code': constants.HttpStatusCodes.BadRequest,
            'body': constants.UserFeedback.AddCarInvalidYear
          };

    messageFactoryMock.buildResponse = jest.fn(() => expected);
    dbContextMock.addCar = jest.fn(() => {
      throw new ArgumentError();
    });

    expect(messageFactoryMock.buildResponse).not.toHaveBeenCalled();

    const actual = carService.addCar(invalidCarData);

    expect(messageFactoryMock.buildResponse).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.buildResponse).toHaveBeenCalledWith(constants.HttpStatusCodes.BadRequest,
                                                                  constants.UserFeedback.AddCarInvalidYear);

    expect(actual).toMatchObject(expected);
  });
});

describe("delete car tests", () => {
  const id = 1;

  test("Delete car from dbContext and populate response", () => {
    const expected = {
      'code': constants.HttpStatusCodes.Ok,
      'body': constants.UserFeedback.DeleteCarSuccess
    };

    dbContextMock.deleteCar = jest.fn(() => true);
    messageFactoryMock.buildResponse = jest.fn(() => expected);

    expect(messageFactoryMock.buildResponse).not.toHaveBeenCalled();
    expect(dbContextMock.deleteCar).not.toHaveBeenCalled();

    const actual = carService.deleteCar(id);

    expect(dbContextMock.deleteCar).toHaveBeenCalledWith(id);

    expect(messageFactoryMock.buildResponse).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.buildResponse).toHaveBeenCalledWith(constants.HttpStatusCodes.Ok,
                                                                  constants.UserFeedback.DeleteCarSuccess);

    expect(actual).toMatchObject(expected);
  });

  test("Return Error response", () => {
    const errorMessage = "Error message",
          error = new Error(errorMessage),
          expected = {
            'code': constants.HttpStatusCodes.InternalServerError,
            'body': errorMessage
          };

    messageFactoryMock.handleError = jest.fn(() => expected);
    dbContextMock.deleteCar = jest.fn(() => {
      throw error;
    });

    expect(messageFactoryMock.handleError).not.toHaveBeenCalled();

    const actual = carService.deleteCar(id);

    expect(messageFactoryMock.handleError).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.handleError).toHaveBeenCalledWith(error);

    expect(actual).toMatchObject(expected);
  });

  test("Return Bad Request from invalid id", () => {
    const invalidId = "words",
          expected = {
            'code': constants.HttpStatusCodes.BadRequest,
            'body': constants.UserFeedback.InvalidCarId
          };

    messageFactoryMock.buildResponse = jest.fn(() => expected);
    dbContextMock.deleteCar = jest.fn(() => {
      throw new ArgumentError();
    });

    expect(messageFactoryMock.buildResponse).not.toHaveBeenCalled();

    const actual = carService.deleteCar(id);

    expect(messageFactoryMock.buildResponse).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.buildResponse).toHaveBeenCalledWith(constants.HttpStatusCodes.BadRequest,
                                                                  constants.UserFeedback.InvalidCarId);

    expect(actual).toMatchObject(expected);
  });

  test("Return NotFound from non existant id", () => {
    const nonExistantId = 99,
          expected = {
            'code': constants.HttpStatusCodes.NotFound,
            'body': constants.UserFeedback.CarNotFound
          };

    dbContextMock.deleteCar = jest.fn(() => false);
    messageFactoryMock.buildResponse = jest.fn(() => expected);

    const actual = carService.deleteCar(id);

    expect(messageFactoryMock.buildResponse).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.buildResponse).toHaveBeenCalledWith(constants.HttpStatusCodes.NotFound,
                                                                  constants.UserFeedback.CarNotFound);

    expect(actual).toMatchObject(expected);
  });
});

describe("update car tests", () => {
  const id = 1,
        make = "make",
        model = "model",
        colour = "colour",
        year = 2019,
        updateData = {
          'make': make,
          'model': model,
          'colour': colour,
          'year': year
        };

  test("Return update car in storage", () => {
    const result = {
            'id': id,
            'make': make,
            'model': model,
            'colour': colour,
            'year': year
          },
          expected = {
            'code': constants.HttpStatusCodes.Ok,
            'body': result
          };

    dbContextMock.updateCar = jest.fn(() => result);
    messageFactoryMock.buildResponse = jest.fn(() => expected);

    expect(messageFactoryMock.buildResponse).not.toHaveBeenCalled();
    expect(dbContextMock.updateCar).not.toHaveBeenCalled();

    const actual = carService.updateCar(id, updateData);

    expect(dbContextMock.updateCar).toHaveBeenCalledWith(id, updateData);

    expect(messageFactoryMock.buildResponse).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.buildResponse).toHaveBeenCalledWith(constants.HttpStatusCodes.Ok,
                                                                  result);

    expect(actual).toMatchObject(expected);
  });

  test("Return error response", () => {
    const errorMessage = "Error message",
          error = new Error(errorMessage),
          expected = {
            'code': constants.HttpStatusCodes.InternalServerError,
            'body': errorMessage
          };

    messageFactoryMock.handleError = jest.fn(() => expected);
    dbContextMock.updateCar = jest.fn(() => {
      throw error;
    });

    expect(messageFactoryMock.handleError).not.toHaveBeenCalled();

    const actual = carService.updateCar(id, updateData);

    expect(messageFactoryMock.handleError).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.handleError).toHaveBeenCalledWith(error);

    expect(actual).toMatchObject(expected);
  });

  test("Return bad request from invalid id", () => {
    const invalidId = "words",
          expected = {
            'code': constants.HttpStatusCodes.BadRequest,
            'body': constants.UserFeedback.InvalidCarId
          };

    messageFactoryMock.buildResponse = jest.fn(() => expected);
    dbContextMock.updateCar = jest.fn(() => {
      throw new ArgumentError();
    });

    expect(messageFactoryMock.buildResponse).not.toHaveBeenCalled();

    const actual = carService.updateCar(id);

    expect(messageFactoryMock.buildResponse).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.buildResponse).toHaveBeenCalledWith(constants.HttpStatusCodes.BadRequest,
                                                                  constants.UserFeedback.InvalidCarId);

    expect(actual).toMatchObject(expected);
  });

  test("Return not found from non existant id", () => {
    const result = undefined,
          expected = {
            'code': constants.HttpStatusCodes.NotFound,
            'body': constants.UserFeedback.CarNotFound
          };

    messageFactoryMock.buildResponse = jest.fn(() => expected);
    dbContextMock.updateCar = jest.fn(() => undefined);

    expect(messageFactoryMock.buildResponse).not.toHaveBeenCalled();

    const actual = carService.updateCar(id);

    expect(messageFactoryMock.buildResponse).toHaveBeenCalledTimes(1);
    expect(messageFactoryMock.buildResponse).toHaveBeenCalledWith(constants.HttpStatusCodes.NotFound,
                                                                  constants.UserFeedback.CarNotFound);

    expect(actual).toMatchObject(expected);
  });
});
