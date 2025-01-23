import express from "express";
import { AuthenticateJWT } from "../Middleware/AuthenticateJWT.js";
import {
  productsdetail,
  searchproduct,
  userRegister,
  userLogin,
  Addtocart,
  cartdetail,
  removeProductFromCart,
  userLogout,
  countProductsInCart,
} from "../Controllers/UserController.js";
const router = express.Router();

router.get("/productsdetail", productsdetail);
router.get("/cartdetail", AuthenticateJWT(["user"]), cartdetail);
router.get(
  "/countProductsInCart",
  AuthenticateJWT(["user"]),
  countProductsInCart
);
router.post("/userRegister", userRegister);
router.post("/Addtocart", AuthenticateJWT(["user"]), Addtocart);
router.delete(
  "/removeProductFromCart/:productId",
  AuthenticateJWT(["user"]),
  removeProductFromCart
);
router.post("/userLogout", AuthenticateJWT(["user"]), userLogout);
router.post("/userLogin", userLogin);
router.get("/searchproduct", searchproduct);

export default router;
