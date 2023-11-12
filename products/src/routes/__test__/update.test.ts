import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../nats-wrapper";
import { Product } from "../../models/Product";

it("returns a 404 if provided ID does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "sjalksjdlaksd", price: 40 })
    .expect(404);
});

it("returns a 401 if user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/products/${id}`)
    .send({ title: "sjalksjdlaksd", price: 40 })
    .expect(401);
});

it("returns a 401 if user does not own the product", async () => {
  const response = await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .send({ title: "sfsdfdsfqwf", price: 40 });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "newstring", price: 100 })
    .expect(401);
});

it("returns a 400 if user provides invalid title or price", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .send({ title: "sfsdfdsfqwf", price: 40 });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "asdasd", price: -20 })
    .expect(400);
});

it("updates product with valid fields", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .send({ title: "sfsdfdsfqwf", price: 40 });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "newtitle", price: 100 })
    .expect(200);

  const productResponse = await request(app)
    .get(`/api/products/${response.body.id}`)
    .send();

  expect(productResponse.body.title).toEqual("newtitle");
  expect(productResponse.body.price).toEqual(100);
});

it("publishes an event", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .send({ title: "sfsdfdsfqwf", price: 40 });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "newtitle", price: 100 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("rejects update if ticket is reserved", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .send({ title: "sfsdfdsfqwf", price: 40 });

  const ticket = await Product.findById(response.body.id);
  ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });

  await ticket!.save();

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "newtitle", price: 100 })
    .expect(400);
});
