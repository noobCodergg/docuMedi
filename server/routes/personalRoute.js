const express = require("express");
const { savePersonalData, getPersonalDataForChart } = require("../controllers/personalController");



const router = express.Router();

router.post('/post-data',savePersonalData)
router.get('/get-data/:userId',getPersonalDataForChart)



module.exports = router;