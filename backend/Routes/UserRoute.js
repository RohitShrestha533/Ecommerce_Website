import express from "express";
import {
  productsdetail,
  searchproduct,
} from "../Controllers/UserController.js";
const router = express.Router();

router.get("/productsdetail", productsdetail);
router.get("/searchproduct", searchproduct);

export default router;
