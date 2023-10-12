import express, { Request, Response } from "express";
import { Product } from "../models/Product";

const router = express.Router();

router.get("/api/products", async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.status(200).send(products);
});

export { router as indexProductsRouter };
