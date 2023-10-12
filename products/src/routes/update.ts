import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Product } from "../models/Product";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@specomm/common";

const router = express.Router();

router.put(
  "/api/products/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new NotFoundError();
    }

    if (product.userId != req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    product.set({
      title: req.body.title,
      price: req.body.price,
    });

    await product.save();

    res.send(product);
  }
);

export { router as updateProductRouter };
