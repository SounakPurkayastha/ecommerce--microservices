import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@specomm/common";

import { createProductRouter } from "./routes/new";
import { showProductRouter } from "./routes/show";
import { indexProductsRouter } from "./routes";
import { updateProductRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV != "test",
  })
);
app.use(currentUser);

app.use(createProductRouter);
app.use(showProductRouter);
app.use(indexProductsRouter);
app.use(updateProductRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
