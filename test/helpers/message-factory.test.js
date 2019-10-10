const MF = require('../../lib/helpers/message-factory.js');
const constants = require('../../lib/common/constants.js')

let messageFactory;

beforeEach(() => {
  messageFactory = new MF();
});

describe("build response tests", () => {
  test("Constructs an object, populated correctly with passed parameters", () => {
    const statusCode = 200,
          body = "The body",
          expected = { 'code': statusCode, 'body': body };

    const actual = messageFactory.buildResponse(statusCode, body);

    expect(actual).toMatchObject(expected);
  })
})

describe("handle error tests", () => {
  test("Constructs an object, populated correctly with exception data", () => {
    const errorMessage = "The error message",
          error = new Error(errorMessage),
          expected = {
            'code': constants.HttpStatusCodes.InternalServerError,
            'body': errorMessage
          };

    const actual = messageFactory.handleError(error);

    expect(actual).toMatchObject(expected);
  })
})
