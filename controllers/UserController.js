const User = require("../models/UserModel");
let userController = {};

userController.showAll = (req, res) => {
  User.find().exec((err, users) => {
    if (err) throw err;
    res.json({ users });
  });
};

userController.onCreate = (req, res, next) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    password: req.body.password,
    address: {
      address: req.body.address,
      city: req.body.city,
      postCode: req.body.postCode
    }
  });

  newUser.save((err, users) => {
    if (err) throw err;
    res.sendStatus(200);
  });
};

userController.onEdit = (req, res, next) => {
  User.findOneAndUpdate(
    {
      _id: req.body._id
    },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      address: {
        address: req.body.address,
        city: req.body.city,
        postCode: req.body.postCode
      }
    },
    (err, user) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
};

userController.onDelete = (req, res, next) => {
  User.deleteOne(
    {
      _id: req.body._id
    },
    (err, user) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
};

module.exports = userController;
