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
  Carouselimg,
  carouselsdetail,
} from "../Controllers/AdminController.js";
const router = express.Router();

router.post("/adminRegister", adminRegister);
router.post("/adminLogin", adminLogin);
router.post("/adminLogout", adminLogout);
router.post("/addproduct", addproduct);
router.post("/Carousel", Carouselimg);
router.put("/updateproductimage/:id", AuthenticateJWT(), updateproductimage);
router.put("/updateproductdetail/:id", AuthenticateJWT(), updateproductdetail);
router.get("/carouselsdetail", carouselsdetail);
router.get("/productsdetail", AuthenticateJWT(), productsdetail);

export default router;
