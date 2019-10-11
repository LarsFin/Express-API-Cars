const constants = require('../common/constants.js');
const ArgumentError = require('../common/argument-error.js');

class CarService {
  constructor(dbContext, httpMessageFactory) {
    this._dbContext = dbContext;
    this._msgFactory = httpMessageFactory;
  }

  getCars() {
    let response;

    try {
      const result = this._dbContext.getCars();
      response = this._msgFactory.buildResponse(constants.HttpStatusCodes.Ok, result);
    } catch (e) {
      response = this._msgFactory.handleError(e);
    }

    return response;
  }

  getCar(id) {
    let response;

    try {
      const result = this._dbContext.getCar(id);
      if (result) {
        response = this._msgFactory.buildResponse(constants.HttpStatusCodes.Ok, result);
      } else {
        response = this._msgFactory.buildResponse(constants.HttpStatusCodes.NotFound,
                                                  constants.UserFeedback.CarNotFound);
      }
    } catch (e) {
      if (e instanceof ArgumentError) {
        response = this._msgFactory.buildResponse(constants.HttpStatusCodes.BadRequest,
                                                  constants.UserFeedback.InvalidCarId);
      } else {
        response = this._msgFactory.handleError(e);
      }
    }

    return response;
  }

  addCar(carData) {
    let response;

    try {
      const result = this._dbContext.addCar(carData);
      response = this._msgFactory.buildResponse(constants.HttpStatusCodes.Created, result);
    } catch (e) {
      if (e instanceof ArgumentError) {
        response = this._msgFactory.buildResponse(constants.HttpStatusCodes.BadRequest,
                                                  constants.UserFeedback.AddCarInvalidYear);
      } else {
        response = this._msgFactory.handleError(e);
      }
    }

    return response;
  }

  deleteCar(id) {
    let response;

    try {
      const result = this._dbContext.deleteCar(id);
      if (result) {
        response = this._msgFactory.buildResponse(constants.HttpStatusCodes.Ok,
                                                  constants.UserFeedback.DeleteCarSuccess);
      } else {
        response = this._msgFactory.buildResponse(constants.HttpStatusCodes.NotFound,
                                                  constants.UserFeedback.CarNotFound);
      }
    } catch (e) {
      if (e instanceof ArgumentError) {
        response = this._msgFactory.buildResponse(constants.HttpStatusCodes.BadRequest,
                                                  constants.UserFeedback.InvalidCarId);
      } else {
        response = this._msgFactory.handleError(e);
      }
    }

    return response;
  }

  updateCar(id, carData) {
    
  }
}

module.exports = CarService;
