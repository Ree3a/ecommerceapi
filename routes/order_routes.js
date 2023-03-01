const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order_controllers");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router.use(auth.verifyUser)
  .route("/")
  // .get(auth.verifyAdmin, orderController.getAllOrders)
  .get(orderController.getAllOrders)
  //   .post(auth.verifyUser, cartController.addCartProduct)
  .delete(auth.verifyAdmin, orderController.deleteAllOrders)
  .put((req, res) => {
    res.status(501).send({ msg: "Not Implemented" });
  });

router.route("/add").post(auth.verifyUser, orderController.addOrder);
router.route("/updateOrderStatus").put(auth.verifyUser, orderController.orderStatus);

// router.route("/getUserOrder").get(auth.verifyUser, orderController.getUserOrder);

// router
//   .route("/:id")
//   .get(auth.verifyUser, cartController.getCartProductByID)
//   .post((req, res) => {
//     res.status(501).send({ reply: "Not Implemented" });
//   })
//   .delete(auth.verifyUser, cartController.deleteCartProductById);

module.exports = router;
