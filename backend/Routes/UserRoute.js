import express from "express";
import {
  productsdetail,
  searchproduct,
  userRegister,
} from "../Controllers/UserController.js";
const router = express.Router();

router.get("/productsdetail", productsdetail);
router.post("/userRegister", userRegister);
router.get("/searchproduct", searchproduct);

export default router;
