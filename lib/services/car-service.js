const constants = require('../common/constants.js');

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
}

module.exports = CarService;
