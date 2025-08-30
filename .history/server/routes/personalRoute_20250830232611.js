const express = require("express");
const { savePersonalData, getPersonalDataForChart,addMedication,getMedications,scheduleReminders,deleteMedication,  getRecommendations, chat } = require("../controllers/personalController");



const router = express.Router();

router.post('/post-data',savePersonalData)
router.get('/get-data/:userId',getPersonalDataForChart)
router.post("/add-medication", addMedication);
router.get("/get-medication/:userId", getMedications);
router.delete("/delete-medication/:id", deleteMedication);
router.get("/get-recomendation/:userId", getRecommendations);
router.post("/chat",chat)



scheduleReminders();


module.exports = router;