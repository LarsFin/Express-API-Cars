const dbPath = '../../lib/repositories/in-memory-storage.js',
      mfPath = '../../lib/helpers/message-factory.js';

const constants = require('../../lib/common/constants.js');
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

describe("add car tests", () => {
  make = "Audi",
        model = "Flashy car",
        colour = "Silver",
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
    const errorMessage = "Error message",
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
  });
});
