require('dotenv').config()
const express = require("express");
const path = require("path");
const user_routes = require("./routes/user_routes");
const product_routes = require("./routes/product_routes");
const cart_routes = require("./routes/cart_routes");
const order_routes = require("./routes/order_routes");

const mongoose = require("mongoose");


const app = express();
const port = 5000;


mongoose.set('strictQuery',true);
mongoose
  .connect("mongodb://127.0.0.1:27017/bakery")
  .then(() => {
    console.log("Connected to MongoDB server");
    app.listen(port, () => {
      console.log(`App is running in ${port}`);
    });
  })
  .catch((err) => next(err));

// Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
})


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World it's me")
});

app.use(
  "/uploads",
  express.static(path.join(__dirname, "/uploads"))
);


app.use("/user", user_routes);
app.use("/product", product_routes);
app.use("/cart", cart_routes);
app.use("/order", order_routes);


app.use((err, req, res, next) => {
  console.log(err.stack);
  if (res.statusCode == 200) res.status(500);
  res.json({ err: err.message });
});
