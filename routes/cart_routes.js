const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart_controllers");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router
  .route("/")
  .get(auth.verifyUser, cartController.getAllCartProduct)
  //   .post(auth.verifyUser, cartController.addCartProduct)
  .delete(auth.verifyUser, cartController.deleteAllCartProduct)
  .put((req, res) => {
    res.status(501).send({ msg: "Not Implemented" });
  });

router.route("/add").post(auth.verifyUser, cartController.addCartProduct);

router
  .route("/delCartProductByID")
  .delete(auth.verifyUser, cartController.deleteCartProductById);

router
  .route("/:id")
  .get(auth.verifyUser, cartController.getCartProductByID)
  .post((req, res) => {
    res.status(501).send({ reply: "Not Implemented" });
  })
  


module.exports = router;
