import request from "supertest";
import { app } from "../../app";
import { Product } from "../../models/Product";
import { natsWrapper } from "../../nats-wrapper";

jest.mock("../../nats-wrapper");

it("has a route handler listening to /api/products for post requests", async () => {
  const response = await request(app).post("/api/products").send({});

  expect(response.status).not.toEqual(404);
});

it("can be accessed only if logged in", async () => {
  const response = await request(app).post("/api/products").send({});

  expect(response.status).toEqual(401);
});

it("status code not 401 if user is logged in", async () => {
  const response = await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns error if invalid title provided", async () => {
  await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .send({ title: "", price: 10 })
    .expect(400);

  await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .send({ price: 10 })
    .expect(400);
});

it("creates products with valid inputs", async () => {
  let products = await Product.find({});

  expect(products.length).toEqual(0);

  await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .send({ title: "asdasdasd", price: 10 })
    .expect(201);

  products = await Product.find();

  expect(products.length).toEqual(1);
});

it("publishes an event", async () => {
  await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .send({ title: "asdasdasd", price: 10 })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
