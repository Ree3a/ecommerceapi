const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");
const upload = require("../middleware/upload");

const createProduct = async (req, res, next) => {
  const { name, description, weight, price } = req.body;
  const product = new Product({
    name,
    description,
    weight,
    price,
    // image: req.file.filename,
  });

    const file = req.file;
    if (file) {
      const fileName = req.file.filename;
      product.image = fileName;
    }
  try {
    await product.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
  return res.status(201).json(product);
};


const updateProduct = async (req, res, next) => {
  const { name, description, weight, price } = req.body;
  const id = req.query.id;
  let product;
  try {
    product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        weight,
        price,
        // image,
        image: req.file.filename,
      },
      { new: true }
    );
  } catch (err) {
    return console.log(err);
  }
  if (!product) {
    return res.status(500).json({
      success: false,
      msg: "Unable to update the product",
    });
  }
  return res.status(201).json({
    success: true,
    message: "Product Updated",
    data: product,
  });
};

const getAllProducts = (req, res, next) => {
  Product.find()
    .then((product) => {
      res.status(200).json({
        success: true,
        message: "List of All products",
        data: product,
      });
    })
    .catch(next);
};

const deleteAllProducts = (req, res, next) => {
  Product.deleteMany()
    .then((reply) => {
      res.json(reply);
    })
    .catch(console.log);
};

const getProductByID = async (req, res, next) => {
  const id = req.params.id;
  let product;
  try {
    product = await Product.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!product) {
    return res.status(404).json({
      success: false,
      msg: "No Product Found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Product Found",
    data: product
  });
};

const deleteProductbyID = (req, res, next) => {
  const id = req.query.id;
  Product.findByIdAndDelete(id)
  .then((reply) => {
    // res.json(reply)
    res.status(200).json({ success: true, message: reply });
  }).catch(next)
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteAllProducts,
  getProductByID,
  deleteProductbyID,
  updateProduct
};
