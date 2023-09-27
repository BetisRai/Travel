const express = require("express");
const routesController = require("./../controller/routes.controller");
const busController = require("./../controller/bus.controller");

const verifyBus = require("../middleware/verifyBus");
const authJwt = require("../middleware/authJwt");
const { khalti } = require("../controller/payment.controller");
const { buyticket, alltickets } = require("../controller/tickets.controller");

const router = express.Router();

router
  .route("/addbus")
  .post([verifyBus.checkDuplicateBusno], busController.addbus);
router.route("/deletebus").post(busController.deletebus);
router.route("/getallbus").get(busController.getallbus);

router.route("/addroutes").post(routesController.addRoutes);
router.route("/getallroutes").get(routesController.getallRoutes);

// .get([authJwt.verifyToken], routesController.getallRoutes);
router.route("/searchroutes").post(routesController.searchRoutes);
router.route("/routesbyid").post(routesController.getRoutesById);

router.route("/payment").post(khalti);
router.route("/ticket").post(buyticket);
router.route("/alltickets").post(alltickets);

module.exports = router;
