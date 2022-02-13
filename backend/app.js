const express = require("express");
const bodyParser = require('body-parser');

const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");


const app = express();

const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

app.use(express.json());
app.use(bodyParser.json());

var database;

MongoClient.connect(
  "mongodb+srv://zarko031:" + process.env.MONGO_ATLAS_PW + "@cluster0.bnnu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  (error, result) => {
    if (error) throw error;
    database = result.db("mydb");

    console.log("Connection sucessful");
  }
);

mongoose.connect("mongodb+srv://zarko031:" + process.env.MONGO_ATLAS_PW + "@cluster0.bnnu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed!');
  })


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // no matter which domain the app which is sending the request is running on, it's allowed to access our resources,
  
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // incoming request may have these extra headers,
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/api/restaurants", (req, res) => {
  database
    .collection("restaurants")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json({
        message: "Restaurants fetched successfully",
        restaurants: result,
      });
    });
});

app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

module.exports = app;
