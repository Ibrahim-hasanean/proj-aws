let request = require("supertest");
let app = require("../app");
const User = require("../db/User");
beforeAll(async (done) => {
  await User.destroy({ where: {}, truncate: true });
  done();
  return;
});
describe("testing sign up cases", () => {
  it("should return success response", async (done) => {
    let response = await request(app).post("/signup").send({
      email: "test@test.com",
      password: "123455789aa",
      first_name: "ibrahim",
      last_name: "hasan",
      phone_num: "05978888",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toContain("sign up success and code is sent");
    done();
  });
  it("should return conflict 409 response", async (done) => {
    let response = await request(app).post("/signup").send({
      email: "test@test.com",
      password: "1234557asd",
      first_name: "ibrahim",
      last_name: "hasan",
      phone_num: "05978888",
    });
    expect(response.status).toBe(409);
    expect(response.body.message).toContain("user is already signed up");
    done();
  });
  it("should return not valid email 400 response", async (done) => {
    let response = await request(app).post("/signup").send({
      email: "imh199704",
      password: "123455789ad",
      first_name: "ibrahim",
      last_name: "hasan",
      phone_num: "059787778",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("email is not valid");
    done();
  });
  it("should return 401  password is required response", async (done) => {
    let response = await request(app).post("/signup").send({
      email: "my_v_s@hotmail.com",
      first_name: "ibrahim",
      last_name: "hasan",
      phone_num: "059797667",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("password is required");
    done();
  });
  it("should return 401 password must be more 8 character response", async (done) => {
    let response = await request(app).post("/signup").send({
      email: "test@tesmm.com",
      first_name: "ibrahim",
      password: "123",
      last_name: "hasan",
      phone_num: "05971111",
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toContain("password must be 8 character");
    done();
  });

  it("should return 400 not valid phone number response", async (done) => {
    let response = await request(app).post("/signup").send({
      email: "test@teees.com",
      password: "123455789cz",
      first_name: "ibrahim",
      last_name: "hasan",
      phone_num: "05975555asd5",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("phone is not valid");
    done();
  });
});
describe("testing sign in cases", () => {
  it("login should success", async () => {
    let response = await request(app).post("/login").send({
      email: "test@test.com",
      password: "123455789aa",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toContain("login success");
    expect(response.body).toHaveProperty("token");
  });
  it("login should return incorrect password", async () => {
    let response = await request(app).post("/login").send({
      email: "test@test.com",
      password: "12345578",
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toContain("password is wrong");
  });
  it("login should return user not found", async () => {
    let response = await request(app).post("/login").send({
      email: "test@notfound.com",
      password: "123455789aa",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("user not found");
  });
});

describe("testing verify cases", () => {
  it("should verify confirm_account_code successfully", async () => {
    let user = await User.findOne({ where: { email: "test@test.com" } });
    let code = user.confirm_account_code;
    let response = await request(app).post("/verify").send({
      email: "test@test.com",
      code,
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toContain("your account is verified");
  });
  it("should return user not found", async () => {
    let response = await request(app).post("/verify").send({
      email: "testASDAS@test.com",
      code: "asd",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("user not found");
  });

  it("should verify confirm_account_code failed", async () => {
    let user = await User.findOne({ where: { email: "test@test.com" } });
    let response = await request(app).post("/verify").send({
      email: "test@test.com",
      code: "asda",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("code is wrong");
  });
});

afterAll(async (done) => {
  await User.destroy({ where: {}, truncate: true });
  done();
  return;
});
