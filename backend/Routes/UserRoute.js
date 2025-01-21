import express from "express";
import { AuthenticateJWT } from "../Middleware/AuthenticateJWT.js";
import {
  productsdetail,
  searchproduct,
  userRegister,
  userLogin,
} from "../Controllers/UserController.js";
const router = express.Router();

router.get("/productsdetail", productsdetail);
router.post("/userRegister", userRegister);
router.post("/userLogin", userLogin);
router.get("/searchproduct", searchproduct);

export default router;
