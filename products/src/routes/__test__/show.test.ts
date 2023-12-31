import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns 404 if product is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/products/${id}`).send().expect(404);
});

it("returns product if found", async () => {
  const title = "book";
  const price = 10;

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  const productResponse = await request(app)
    .get(`/api/products/${response.body.id}`)
    .send()
    .expect(200);

  expect(productResponse.body.title).toEqual(title);
  expect(productResponse.body.price).toEqual(price);
});
