import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../middlewares/auth";
const router = express.Router();

router.post(
  "/register",
  [
    check("email", "Email is required").isString(),
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User({ ...req.body });
      await user.save();

      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000, //in milliseconds => same value as the jwt expiry
      });

      res.status(200).send({ message: "user registered OK." });
    } catch (error) {
      res.status(500).send({ message: "something went wrong." });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

export default router;
