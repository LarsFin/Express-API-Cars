const constants = require('../common/constants.js');

class MessageFactory {
  buildResponse(code, body) {
    return {
      code,
      body
    }
  }

  handleError(exception) {
    return {
      'code': constants.HttpStatusCodes.InternalServerError,
      'body': exception.message
    }
  }
}

module.exports = MessageFactory;
