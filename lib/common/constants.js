module.exports = {
  'HttpStatusCodes': {
    // Success
    'Ok': 200,
    'Created': 201,

    // Client error
    'BadRequest': 400,
    'NotFound': 404,

    // Server issue
    'InternalServerError': 500
  },

  'UserFeedback': {
    // Client issue calls
    'AddCarInvalidYear': "Bad request, year must be an integer.",
    'GetCarNotFound': "This car could not be found.",
    'GetCarInvalidId': "Bad request, id must be an integer"
  }
}
