const Food = require("../models/food");


exports.postFoodItems =  (req, res, next) => {
    const food = new Food({
      id: req.body.id,
      resName: req.body.resName,
      name: req.body.name,
      img: req.body.img,
      price: req.body.price,
      qty: req.body.qty,
      userId: req.userData.userId,
    });
    food.save();
    res.status(201).json({
      message: "Food item added to cart",
      data: food,
    });
  }

exports.getFoodItems = (req, res, next) => {
    Food.find().then((result) => {
      res.status(200).json({
        message: "Food items fetched successfully",
        food: result,
      });
    }).catch(error => {
        res.status(500).json({
            message: "Fetching items failed!"
        })
    })
  }

exports.deleteAllItems = (req, res, next) => {
    Food.deleteMany().then((result) => {
      res.status(200).json({
        message: "All items from cart are deleted!",
      });
    });
  }  

exports.deleteOneItem = (req, res, next) => {
    Food.deleteOne({ id: req.params.id }).then((result) => {
      res.status(200).json({
        message: "Qty decreased!",
      });
    });
  }