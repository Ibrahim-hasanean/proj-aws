let request = require("supertest");
let app = require("../app");
const User = require("../db/User");
// beforeEach(async () => {
//   let deletedUser = await User.findOne({ where: { email: "test@test.com" } });
//   if (deletedUser) deletedUser.destroy();
//   return;
// });
describe("testing sign up cases", () => {
  it("should return conflict 409 response", async (done) => {
    let response = await request(app).post("/signup").send({
      email: "imh19970408@gmail.com",
      password: "123455789",
      first_name: "ibrahim",
      last_name: "hasan",
      phone_num: "05978888",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toContain("user is already signed up");
    done();
  });
  it("should return not valid email 400 response", async (done) => {
    let response = await request(app).post("/signup").send({
      email: "imh199704",
      password: "123455789",
      first_name: "ibrahim",
      last_name: "hasan",
      phone_num: "05978888",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("email is not valid");
    done();
  });
  it("should return 400 not password is required response", async (done) => {
    let response = await request(app).post("/signup").send({
      email: "test@tes.com",
      first_name: "ibrahim",
      last_name: "hasan",
      phone_num: "05978888",
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toContain("password is required");
    done();
  });
  it("should return 401 password must be more 8 character response", async (done) => {
    let response = await request(app).post("/signup").send({
      email: "test@tes.com",
      first_name: "ibrahim",
      password: "123",
      last_name: "hasan",
      phone_num: "05971111",
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toContain("password must be 8 character");
    done();
  });
  it("should return 401 password must contain numbers and letters response", async (done) => {
    let response = await request(app).post("/signup").send({
      email: "test@tes.com",
      first_name: "ibrahim",
      password: "123456789",
      last_name: "hasan",
      phone_num: "05971111",
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toContain(
      "password must contain numbers and letters"
    );
    done();
  });
  it("should return 400 not valid phone number response", async (done) => {
    let response = await request(app).post("/signup").send({
      email: "test@tes.com",
      password: "123455789",
      first_name: "ibrahim",
      last_name: "hasan",
      phone_num: "05975555asd5",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("phone is not valid");
    done();
  });
  it("should return success response", async (done) => {
    let response = await request(app).post("/signup").send({
      email: "test@test.com",
      password: "123455789",
      first_name: "ibrahim",
      last_name: "hasan",
      phone_num: "05978888",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toContain("sign up success and code is sent");
    done();
  });
});
