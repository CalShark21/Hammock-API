const Property = require("../models/property.model.js");

// Create and Save a new Property
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Property
  const property = new Property({
    title: req.body.title,
    description: req.body.description,
    proptype: req.body.proptype,
    location: req.body.location,
    guests: req.body.guests,
    beds: req.body.beds,
    baths: req.body.baths,
    amenities: req.body.amenities,
    price: req.body.price,
  });

  // Save Tutorial in the database
  Property.create(property, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the property."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Property.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving properties."
      });
    else res.send(data);
  });
};


// Find a single Tutorial by Id
exports.findOne = (req, res) => {
  Property.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Property with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Property with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Property.updateById(
    req.params.id,
    new Property(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Property with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Property with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Property with the specified id in the request
exports.delete = (req, res) => {
  Property.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Property with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};

// Delete all Properties from the database.
exports.deleteAll = (req, res) => {
  Property.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all properties."
      });
    else res.send({ message: `All Properties were deleted successfully!` });
  });
};
