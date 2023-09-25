const express = require("express");
const routesController = require("./../controller/routes.controller");
const busController = require("./../controller/bus.controller");

const verifyBus = require("../middleware/verifyBus");
const authJwt = require("../middleware/authJwt");

const router = express.Router();

router
  .route("/addbus")
  .post([verifyBus.checkDuplicateBusno], busController.addbus);
router.route("/deletebus").post(busController.deletebus);
router.route("/getallbus").get(busController.getallbus);

router.route("/addroutes").post(routesController.addRoutes);
router
  .route("/getallroutes")
  .get([authJwt.verifyToken], routesController.getallRoutes);
router.route("/searchroutes").post(routesController.searchRoutes);
router.route("/routesbyid").post(routesController.getRoutesById);

// router
//   .route("/routes")
//   .post(routesController.routes)
//   .get(routesController.getRoutes);

// router.route("/toplace").get(routesController.getToPlace);

// router.route("/fromplace").get(routesController.getFromPlace);

// router
//     .route('/:id')
//     .get(routesController.getUser)
//     .patch(routesController.updateUser)
//     .delete(routesController.deleteUser);

module.exports = router;
