module.exports = app => {
  const properties = require("../controllers/property.controller.js");

  var router = require("express").Router();

  // Create a new Property
  router.post("/", properties.create);

  // Retrieve all Properties
  router.get("/", properties.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", properties.findOne);

  // Update a Tutorial with id
  router.put("/:id", properties.update);

  // Delete a Tutorial with id
  router.delete("/:id", properties.delete);

  // Delete all Properties
  router.delete("/", properties.deleteAll);

  app.use('/api/properties', router);
};
