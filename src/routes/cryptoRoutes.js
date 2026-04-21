import { Router } from "express";
import {
  createCrypto,
  getAllCrypto,
  getNewListings,
  getTopGainers,
} from "../controllers/cryptoController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/crypto", getAllCrypto);
router.get("/crypto/gainers", getTopGainers);
router.get("/crypto/new", getNewListings);
router.post("/crypto", requireAuth, createCrypto);

export default router;
