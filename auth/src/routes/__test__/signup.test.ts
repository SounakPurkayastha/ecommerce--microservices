import request from "supertest";
import { app } from "../../app";

it("returns 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
});

it("returns 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test", password: "password" })
    .expect(400);
});

it("returns 400 with invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.in", password: "pa" })
    .expect(400);
});

it("returns 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.in" })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({ password: "password" })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.in", password: "password" })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.in", password: "password" })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.in", password: "password" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
