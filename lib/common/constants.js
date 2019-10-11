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
    'CarNotFound': "This car could not be found.",
    'InvalidCarId': "Bad request, id must be an integer",

    // Successful operations
    'DeleteCarSuccess': "Successfully deleted car from storage"
  }
}
