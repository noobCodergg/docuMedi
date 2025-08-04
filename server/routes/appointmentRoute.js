const express = require("express");
const upload = require("../middlewares/multer");
const { createAppointment } = require("../controllers/appointmentController");




const router = express.Router();

router.post('/create-appointment',createAppointment)



module.exports = router;