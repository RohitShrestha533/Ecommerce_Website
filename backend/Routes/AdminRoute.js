import express from "express";
import {
  adminLogin,
  adminLogout,
  adminRegister,
  addproduct,
} from "../Controllers/AdminController.js";
const router = express.Router();

router.post("/adminRegister", adminRegister);
router.post("/adminLogin", adminLogin);
router.post("/adminLogout", adminLogout);
router.post("/addproduct", addproduct);

export default router;
