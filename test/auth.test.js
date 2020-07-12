let request = require("supertest");
let app = require("../app");
describe("testing sign up cases", () => {
  it("should return success response", async (done) => {
    let response = await request(app).post("/signup").send({
      email: "imh19970408@gmail.com",
      password: "123455789",
      first_name: "ibrahim",
      last_name: "hasan",
      phone_num: "059711111",
    });
    expect(response.status).toBe(200);
    expect(response.message).toContain("sign up success and code is sent");
    done();
  });
});
