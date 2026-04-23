const { expect } = require("chai");
const request = require("request");
const { app, multiplyIn } = require("../server.js");
baseUrl = "http://localhost:3000";

describe("Pasta Recipe Multiplier API", () => {
  // Test 1: Valid Behaviour 
  it("should correctly multiply 100g by 3 servings to get 300g", () => {
    const result = multiplyIn(100, 3);
    expect(result).to.equal(300);
  });

  // Test 2: Invalid/Error Behaviour 
  it("should return null if the input is a string instead of a number", () => {
    const result = multiplyIn("100", 3);
    expect(result).to.be.null;
  });

  // Test 3: Edge Case 
  it("should return 0 if the multiplier is 0", () => {
    const result = multiplyIn(100, 0);
    expect(result).to.equal(0);
  });

  // Test 4: Handling Missing/Undefined Inputs
    it("should return null if one or both inputs are undefined", () => {
        const result = multiplyIn(undefined, 3);
        expect(result).to.be.null;
    });

  // Test 5: REST API Endpoint Test
  it("should return a 200 status and an array of data", function (done) {
    request.get(`${baseUrl}/api/recipes`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

