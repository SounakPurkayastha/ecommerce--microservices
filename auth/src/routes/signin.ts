import express from "express";
import { Password } from '../services/Password';
import { body } from "express-validator";
import { Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/users/signin", 
[
  body('email')
    .isEmail()
    .withMessage("Email must be valid"), 

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Must provide password')
],
validateRequest,
async (req: Request, res: Response) => {
  const {email, password} = req.body;

  const existingUser = await User.findOne({email});
  
  if(!existingUser)
    throw new BadRequestError("Invalid credentials");

  const passwordsMatch = await Password.compare(existingUser.password, password);

  if(!passwordsMatch)
    throw new BadRequestError("Invalid credentials");

  const userJwt = jwt.sign({
    id:existingUser.id,
    email:existingUser.email
  },process.env.JWT_KEY!);

  req.session =  {
    jwt:userJwt
  };

  res.status(200).send(existingUser);
});

export { router as signinRouter };
