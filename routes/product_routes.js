const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controllers");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(upload.single("image"), productController.createProduct)
  .delete(auth.verifyUser, productController.deleteAllProducts)
  .put((req, res) => {
    res.status(501).send({ msg: "Not Implemented" });
  });

router
  .route("/:id")
  .get(auth.verifyUser, productController.getProductByID)
  .post((req, res) => {
    res.status(501).send({ reply: "Not Implemented" });
  })

router.put("/update/", auth.verifyUser,upload.single("image"), productController.updateProduct)

router.use(auth.verifyUser)
  .route("/delProductByID")
  .delete(auth.verifyAdmin, productController.deleteProductbyID)
//   .put(productController.updatePostByID);

module.exports = router;
