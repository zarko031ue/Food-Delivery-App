const bcrypt = require('bcrypt');
const jsonWebToken = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                address: req.body.address
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User created!',
                        result: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                          message: "This email already exists!"
                    })
                })
        });
}

exports.loginUser = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
      .then( user => {
        if (!user) {
            res.status(401).json({
            errors
          });
          return 
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            message: "Invalid authentication credentials!",
          });
        }
        const token = jsonWebToken.sign(
            {email: fetchedUser.email, userId: fetchedUser._id, address: fetchedUser.address, name: fetchedUser.name}, 
            process.env.JWT_KEY, 
            {expiresIn: "1h"},
            );
           res.status(200).json({ 
              token: token,
              expiresIn: 3600,
              id: fetchedUser._id,
              email: fetchedUser.email,
              address: fetchedUser.address,
              name: fetchedUser.name
            });
      })
      .catch((err) => {
        return res.status(401).json({
          message: "Invalid authentication credentials!",
        });
      });
  }