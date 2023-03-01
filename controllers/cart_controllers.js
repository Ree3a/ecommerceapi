const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");
const upload = require("../middleware/upload");

const addCartProduct = async (req, res, next) => {
  //   const { user = req.user.userId } = req.body;
  const productId = req.query.id;
  const cart = new Cart({
    user: req.user.userId,
    product: productId,
  });
  try {
    await cart.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
  return res.status(201).json({
    success: true,
    data: cart,
  });
};

const getAllCartProduct = (req, res, next) => {
  Cart.find()
    .populate("user")
    .populate("product")
    .then((cart) => {
      res.status(200).json({
        success: true,
        message: "List of All Cart Products",
        data: cart,
      });
    })
    .catch(next);
};

const deleteAllCartProduct = (req, res, next) => {
  Cart.deleteMany()
    .then((reply) => {
      res.json(reply);
    })
    .catch(console.log);
};

const getCartProductByID = async (req, res, next) => {
  const id = req.params.id;
  let cart;
  try {
    cart = await Cart.findById(id).populate("product");
  } catch (err) {
    console.log(err);
  }
  if (!cart) {
    return res.status(404).json({ msg: "No Cart Product Found" });
  }
  return res.status(200).json(cart);
};

const deleteCartProductById = async (req, res, next) => {
  const id = req.query.id;
  let cart;
  try {
    cart = await Cart.findByIdAndRemove(id).populate("product");
  } catch (err) {
    console.log(err);
  }
  if (!cart) {
    return res.status(404).json({
      success: false,
      msg: "No Cart Product Found to delete",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Cart Product Removed",
    data: cart,
  });
};

module.exports = {
  addCartProduct,
  getAllCartProduct,
  deleteAllCartProduct,
  deleteCartProductById,
  getCartProductByID,
};
