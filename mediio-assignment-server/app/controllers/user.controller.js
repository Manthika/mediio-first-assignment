const db = require("../models");
const User = db.users;

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    token: req.body.token
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};


// Find a single user with an id
exports.findOne = (req, res) => {
  const email = req.params.email;

  User.findOne({email: email})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with email " + email });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with email=" + email });
    });
};

