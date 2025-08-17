const express = require("express");
const { saveDoctor, getDoctors } = require("../controllers/doctorController");




const router = express.Router();

router.post('/post-doctor',saveDoctor)
router.get('/get-doctor',getDoctors)



module.exports = router;