import express from "express";
import { AuthenticateJWT } from "../Middleware/AuthenticateJWT.js";
import {
  adminLogin,
  adminLogout,
  adminRegister,
  productsdetail,
  addproduct,
  updateproductimage,
  updateproductdetail,
} from "../Controllers/AdminController.js";
const router = express.Router();

router.post("/adminRegister", adminRegister);
router.post("/adminLogin", adminLogin);
router.post("/adminLogout", adminLogout);
router.post("/addproduct", addproduct);
router.put("/updateproductimage/:id", AuthenticateJWT(), updateproductimage);
router.put("/updateproductdetail/:id", AuthenticateJWT(), updateproductdetail);
router.get("/productsdetail", AuthenticateJWT(), productsdetail);

export default router;
