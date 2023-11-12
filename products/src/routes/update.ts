import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Product } from "../models/Product";
import { TicketUpdatedPublisher } from "../events/publishers/TicketUpdatedPublisher";
import { natsWrapper } from "../nats-wrapper";
import {
  BadRequestError,
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

    if (product.orderId)
      throw new BadRequestError("Cannot edit reserved ticket");

    if (product.userId != req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    product.set({
      title: req.body.title,
      price: req.body.price,
    });

    await product.save();

    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: product.id,
      title: product.title,
      price: product.price,
      userId: product.userId,
      version: product.version,
    });

    res.send(product);
  }
);

export { router as updateProductRouter };
