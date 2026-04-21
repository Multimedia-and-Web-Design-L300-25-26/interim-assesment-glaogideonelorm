import { Router } from "express";
import {
  login,
  loginInfo,
  logout,
  register,
  registerInfo,
} from "../controllers/authController.js";

const router = Router();

router.get("/register", registerInfo);
router.post("/register", register);

router.get("/login", loginInfo);
router.post("/login", login);

router.post("/logout", logout);

export default router;
