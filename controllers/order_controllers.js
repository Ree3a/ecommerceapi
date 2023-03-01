const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");
const upload = require("../middleware/upload");
const Orders = require("../models/Orders");

const addOrder = async (req, res, next) => {
    const { user = req.user.userId } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ msg: "Unable to Find this user by this ID" });
  }
  const id = req.query.id;
  const order = new Orders({
    user: req.user.userId,
    product: id,
  });
  try {
    await order.save();
    // existingUser.orders.push(order);
    // await existingUser.save();

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
  return res.status(201).json({
    success: true,
    data: order,
  });
};

const getAllOrders = (req, res, next) => {
  Orders.find()
    .populate("user")
    .populate("product")
    .then((order) => {
      res.status(200).json({
        success: true,
        message: "List of All Orders",
        data: order,
      });
    })
    .catch(next);
};

// const getUserOrder = async (req, res, next) => {
//   const id = req.user.userId;
//   let userOrders;
//   try {
//     userOrders = await User.findById(id)
//       .populate({
//         path: "orders",
//         populate: {
//           path: "product",
//           model: "Product",
//         },
//       });
//   } catch (err) {
//     console.log(err);
//   }
//   if (!userOrders) {
//     return res.status(404).json({ msg: "No Orders Found" });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "List of All User Orders",
//     data: userOrders.orders,
//   });
  
  // User.find({userId: req.user.userId})
  //   .populate("user")
  //   .populate("product")
  //   .then((order) => {
  //     res.status(200).json({
  //       success: true,
  //       message: "List of all User Orders",
  //       data: order,
  //     });
  //   })
  //   .catch(next);
// };

const deleteAllOrders = (req, res, next) => {
  Orders.deleteMany()
    .then((reply) => {
      res.json(reply);
    })
    .catch(console.log);
};

const orderStatus = async (req, res, next) => {
  const { status} = req.body;
  const id = req.query.id;
  let order;
  try {
    order = await Orders.findByIdAndUpdate(
      id,
      {
        status
      },
      { new: true }
    );
  } catch (err) {
    return console.log(err);
  }
  if (!order) {
    return res.status(500).json({
      success: false,
      msg: "Unable to update the order",
    });
  }
  return res.status(201).json({
    success: true,
    message: "Order Updated",
    data: order,
  });
};

module.exports = {
    addOrder,
    getAllOrders,
    deleteAllOrders,
    orderStatus
    // getUserOrder
};
