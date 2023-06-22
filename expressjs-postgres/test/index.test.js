const request = require("supertest");
const app = require("../src/index");

describe("Test API", () => {
    test("It should response the GET method", () => {
      return request(app)
        .get("/test")
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
  });

describe("Test DB connectivity", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Test DB connectivity", () => {
    test("It should response the GET method", () => {
      return request(app)
        .post("/backup")
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
  });