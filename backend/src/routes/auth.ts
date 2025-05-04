import { Router } from "express";
import { login, register } from "../controllers/authController";
import { body, query } from "express-validator";

const authRoutes: Router = Router();

authRoutes.post(
  "/register",
  [
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().isLength({ min: 8 }),
    body("name").notEmpty().trim().isLength({ min: 6 }),
  ],
  register
);

authRoutes.post(
  "/login",
  [body("email").notEmpty().isEmail(), body("password").notEmpty()],
  login
);

export default authRoutes;
