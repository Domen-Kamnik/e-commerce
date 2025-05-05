import { Router } from "express";
import { login, register } from "../controllers/authController";
import { body, check, query } from "express-validator";

const authRoutes: Router = Router();

authRoutes.post(
  "/register",
  [
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Not a valid email address"),
    check("password")
      .notEmpty()
      .withMessage("Password required")
      .isLength({ min: 8 }),
    check("name").notEmpty().trim().isLength({ min: 6 }),
  ],
  register
);

authRoutes.post(
  "/login",
  [body("email").notEmpty().isEmail(), body("password").notEmpty()],
  login
);

export default authRoutes;
