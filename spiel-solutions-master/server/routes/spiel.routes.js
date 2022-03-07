const SpielController = require("../controllers/spiel.controller");

module.exports = (app) => {
  // CREATE
  app.post("/api/spiels/create", SpielController.createSpiel);
  // READ ALL
  app.get("/api/spiels", SpielController.findAllSpiels);
  // READ ONE
  app.get("/api/spiels/:_id", SpielController.findOneSpiel);
  // UPDATE
  app.put("/api/spiels/update/:_id", SpielController.updateSpiel);
  // DELETE
  app.delete("/api/spiels/delete/:_id", SpielController.deleteSpiel);
  // GET ALL BY SCRIPTNAME
  app.get(
    "/api/spiels/scriptName/:scriptName",
    SpielController.findByScriptName
  );
  // Find parent and add to modalArr or pageArr
  app.put("/api/spiels/update/array/:parent_id/", SpielController.createLink);
  // Find parent and delete child from modalArr or pageArr
  app.put("/api/spiels/delete/array/:parent_id/", SpielController.deleteLink);
  // Find all heads of scripts
  app.get("/api/spiels/find/heads", SpielController.findAllHeadSpiels);
  // Find head of one scriptName
  app.get(
    "/api/spiels/find/oneHead/:scriptName",
    SpielController.findOneHeadSpiel
  );
  //Delete script
  app.delete(
    "/api/spiels/script/delete/:scriptName",
    SpielController.deleteScript
  );
};
