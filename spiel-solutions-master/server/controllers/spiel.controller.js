const Spiel = require("../models/spiel.model");

// BASIC CRUD COMMANDS

// CREATE
module.exports.createSpiel = (req, res) => {
  Spiel.create(req.body)
    .then((newSpiel) => res.json(newSpiel))
    .catch((err) =>
      res
        .status(400)
        .json({
          message: "Something went wrong when creating a Spiel!!",
          error: err,
        })
    );
};

// READ ONE
module.exports.findOneSpiel = (req, res) => {
  Spiel.findOne({ _id: req.params._id })
    .then((singleSpiel) => res.json(singleSpiel))
    .catch((err) =>
      res.json({
        message: "Something went wrong when finding one Spiel!!",
        error: err,
      })
    );
};

// READ ALL
module.exports.findAllSpiels = (req, res) => {
  Spiel.find()
    .then((allSpiels) => res.json(allSpiels))
    .catch((err) =>
      res.json({
        message: "Something went wrong when finding all the Spiels!!",
        error: err,
      })
    );
};

// UPDATE
module.exports.updateSpiel = (req, res) => {
  Spiel.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
    .then((updatedSpiel) => res.json(updatedSpiel))
    .catch((err) =>
      res
        .status(400)
        .json({
          message: "Something went wrong when updating a Spiel!!",
          error: err,
        })
    );
};

// DELETE
module.exports.deleteSpiel = (req, res) => {
  Spiel.deleteOne({ _id: req.params._id })
    .then((deletedSpiel) => res.json(deletedSpiel))
    .catch((err) =>
      res.json({
        message: "Something went wrong when deleting the Spiel!!",
        error: err,
      })
    );
};

// Find all by Script Name
module.exports.findByScriptName = (req, res) => {
  Spiel.find({ scriptName: req.params.scriptName })
    .then((spiels) => res.json(spiels))
    .catch((err) => res.json(err));
};

// Update modalArr or pageArr of parent element
module.exports.createLink = (req, res) => {
  console.log(req.body);
  if (req.body.element == "Page") {
    Spiel.findByIdAndUpdate(
      { _id: req.params.parent_id },
      {
        $push: {
          pageArr: {
            child_id: req.body.child_id,
            child_name: req.body.child_name,
          },
        },
      }
    )
      .then((saveRes) => res.json(saveRes))
      .catch((err) => res.json(err));
  }
  if (req.body.element == "Modal") {
    Spiel.findByIdAndUpdate(
      { _id: req.params.parent_id },
      {
        $push: {
          modalArr: {
            child_id: req.body.child_id,
            child_name: req.body.child_name,
          },
        },
      }
    )
      .then((saveRes) => res.json(saveRes))
      .catch((err) => res.json(err));
  }
};

// Updating modalArr or pageArr of parent by removing child name and id from it.
module.exports.deleteLink = (req, res) => {
  console.log(req.body);
  if (req.body.element == "Page") {
    Spiel.findByIdAndUpdate(
      { _id: req.params.parent_id },
      { $pull: { pageArr: { child_id: req.body.child_id } } }
    )
      .then((saveRes) => res.json(saveRes))
      .catch((err) => res.json(err));
  }
  if (req.body.element == "Modal") {
    Spiel.findByIdAndUpdate(
      { _id: req.params.parent_id },
      { $pull: { modalArr: { child_id: req.body.child_id } } }
    )
      .then((saveRes) => res.json(saveRes))
      .catch((err) => res.json(err));
  }
};

// Get all where isHead = true
module.exports.findAllHeadSpiels = (req, res) => {
  Spiel.find({ isHead: true })
    .then((allHeadSpiels) => res.json(allHeadSpiels))
    .catch((err) =>
      res.json({
        message: "Something went wrong when finding all the Head Spiels!!",
        error: err,
      })
    );
};

// Find one by scriptName & isHead:true
module.exports.findOneHeadSpiel = (req, res) => {
  Spiel.findOne({ scriptName: req.params.scriptName, isHead: true })
    .then((singleSpiel) => res.json(singleSpiel))
    .catch((err) =>
      res.json({
        message: "Something went wrong when finding one Spiel!!",
        error: err,
      })
    );
};
//Delete Script
module.exports.deleteScript = (req, res) => {
  Spiel.deleteMany({ scriptName: req.params.scriptName })
    .then((deletedSpiel) => res.json(deletedSpiel))
    .catch((err) =>
      res.json({
        message: "Something went wrong when deleting the Spiel!!",
        error: err,
      })
    );
};
