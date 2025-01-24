import express from "express";
import { AuthenticateJWT } from "../Middleware/AuthenticateJWT.js";
import {
  productsdetail,
  searchproduct,
  userRegister,
  userLogin,
  Addtocart,
  cartdetail,
  UpdateCart,
  removeProductFromCart,
  userLogout,
  changepassword,
  countProductsInCart,
} from "../Controllers/UserController.js";
import { createOrder } from "../Controllers/OrderController.js";
const router = express.Router();

router.get("/productsdetail", productsdetail);
router.get("/cartdetail", AuthenticateJWT(["user"]), cartdetail);
router.get(
  "/countProductsInCart",
  AuthenticateJWT(["user"]),
  countProductsInCart
);
router.post("/userRegister", userRegister);
router.post("/change-password", changepassword);
router.post("/Addtocart", AuthenticateJWT(["user"]), Addtocart);
router.post("/UpdateCart", AuthenticateJWT(["user"]), UpdateCart);
router.delete(
  "/removeProductFromCart/:productId",
  AuthenticateJWT(["user"]),
  removeProductFromCart
);
router.post("/userLogout", AuthenticateJWT(["user"]), userLogout);
router.post("/checkout", AuthenticateJWT(["user"]), createOrder);
router.post("/userLogin", userLogin);
router.get("/searchproduct", searchproduct);

export default router;
