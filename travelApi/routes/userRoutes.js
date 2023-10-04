const express = require("express");
const routesController = require("./../controller/routes.controller");
const busController = require("./../controller/bus.controller");
const dashboardController = require("./../controller/dashboard.controller");

const verifyBus = require("../middleware/verifyBus");
const authJwt = require("../middleware/authJwt");
const { khalti } = require("../controller/payment.controller");
const {
  buyticket,
  alltickets,
  getticketsById,
  cancelTickets,
  verifyTicketsCancel,
} = require("../controller/tickets.controller");
const { getsalesdata } = require("../controller/dashboard.controller");

const router = express.Router();

router
  .route("/addbus")
  .post([verifyBus.checkDuplicateBusno], busController.addbus);
router.route("/deletebus").post(busController.deletebus);
router.route("/getallbus").get(busController.getallbus);
router.route("/getbusbyid").post(busController.getbusbyid);

router.route("/addbusbyid").post(busController.addbusbyid);

router.route("/addroutes").post(routesController.addRoutes);
router.route("/getallroutes").get(routesController.getallRoutes);
router.route("/addroutesbyid").post(routesController.addRoutesbyid);

// .get([authJwt.verifyToken], routesController.getallRoutes);
router.route("/searchroutes").post(routesController.searchRoutes);
router.route("/routesbyid").post(routesController.getRoutesById);

router.route("/payment").post(khalti);

router.route("/ticket").post(buyticket);
router.route("/alltickets").post(alltickets);
router.route("/ticketsbyid").post(getticketsById);
router.route("/cancel").post(cancelTickets);
router.route("/verifycancel").post(verifyTicketsCancel);

router.route("/getuser").post(dashboardController.getuserdata);

router.route("/salesdata").get(dashboardController.getsalesdata);

module.exports = router;
