
const User = require("../models/UserModel");
let userController = {};

userController.showAll = (req, res) => {
  console.log("showAll");
  console.log(res.body);

  User.find().exec((err, users) => {
    if (err) throw err;
    res.json({ users });
  });
};

userController.onCreate = (req, res, next) => {
  console.log("onCreate");
  console.log(req.body);

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
  console.log(newUser);

  newUser.save((err, users) => {
    if (err) throw err;
    res.sendStatus(200);
  });
};

userController.onEdit = (req, res, next) => {
  console.log("onEdit");
  console.log(req.body);

  User.findOneAndUpdate(
    {
      _id: req.body._id
    },
    {
      firstName: req.body.firstName
      // lastName: req.body.lastName,
      // userName: req.body.userName,
      // password:  req.body.password,
      // address: {
      //   address: req.body.address,
      //   city: req.body.city,
      //   postCode: req.body.postCode,
      // },
    },
    (err, user) => {
      if (err) throw err;
      console.log(user);
    }
  );
};

userController.onDelete = (req, res, next) => {
  console.log("onDelete");
  console.log(req.body);

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
