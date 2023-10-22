import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@specomm/common";
import { Product } from "../models/Product";
import { TicketCreatedPublisher } from "../events/publishers/TicketCreatedPublisher";

const router = express.Router();

router.post(
  "/api/products/",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("title required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const product = Product.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await product.save();
    // new TicketCreatedPublisher(client).publish({
    //   id: product.id,
    //   title: product.title,
    //   price: product.price,
    //   userId: product.userId,
    // });

    res.status(201).send(product);
  }
);

export { router as createProductRouter };
