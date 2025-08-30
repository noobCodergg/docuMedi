const personalModel = require('../models/personalizedModel')
const nodemailer = require("nodemailer");
const userModel = require('../models/userModel')

exports.savePersonalData = async (req, res) => {
  try {
    const { formData } = req.body; // destructure from req.body
    console.log("Received Data:", formData);

    const { userId, bloodSugar, systolic, diastolic, stepCount, burnedCalories, weight, date } = formData;

    // create & save in one step
    const data = await personalModel.create({
      userId,
      bloodSugar,
      systolic,
      diastolic,
      stepCount,
      burnedCalories,
      weight,
      date,
    });

    res.status(201).json({
      message: "Data saved successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error saving data",
      error: error.message,
    });
  }
};




exports.getPersonalDataForChart = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const data = await personalModel
      .find(
        { userId },
        { bloodSugar: 1, systolic: 1, diastolic: 1, stepCount: 1, burnedCalories: 1, weight: 1, date: 1, _id: 0 }
      )
      .sort({ date: 1 });

    // Optional: format date to string for frontend chart libraries
    const formattedData = data.map((item) => ({
      bloodSugar: item.bloodSugar,
      systolic: item.systolic,
      diastolic: item.diastolic,
      stepCount: item.stepCount,
      burnedCalories: item.burnedCalories,
      weight: item.weight,
      date: item.date.toISOString().split("T")[0], // YYYY-MM-DD
    }));

    res.status(200).json({ message: "Data fetched for chart", data: formattedData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
};





const Medication = require("../models/medicationModel");
const cron = require("node-cron");


exports.addMedication = async (req, res) => {
  try {
    const { name, dosage, frequency, times, user, weekDays } = req.body;

    const med = await Medication.create({
      name,
      dosage,
      frequency,
      times,
      user,
      weekDays: frequency === "weekly" ? weekDays : [],
    });

    res.status(201).json(med);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getMedications = async (req, res) => {
  try {
    const { userId } = req.params;
    const meds = await Medication.find({ user: userId });
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteMedication = async (req, res) => {
  try {
    const med = await Medication.findByIdAndDelete(req.params.id);
    if (!med) return res.status(404).json({ message: "Medication not found" });
    res.status(200).json({ message: "Medication deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "muntasirniloy2002@gmail.com", 
    pass: "neih ewru erye hfvg",   
  },
});

exports.scheduleReminders = async () => {
  const meds = await Medication.find();

  meds.forEach((med) => {
    med.times.forEach((time) => {
      const [hour, minute] = time.split(":");
      console.log(hour,minute)
      let cronTimes = [];

      if (med.frequency === "daily") {
        cronTimes.push(`${minute} ${hour} * * *`);
      } else if (med.frequency === "weekly") {
        med.weekDays.forEach(day => {
          const dayNum = {Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6}[day];
          cronTimes.push(`${minute} ${hour} * * ${dayNum}`);
        });
      } else if (med.frequency === "monthly") {
        cronTimes.push(`${minute} ${hour} 1 * *`);
      }

      cronTimes.forEach(cronTime => {
        cron.schedule(cronTime, async () => {
          try {
            const user = await userModel.findById(med.user);
            if (!user || !user.email) return;

            await transporter.sendMail({
              from: "your_email@gmail.com",
              to: user.email,
              subject: "Medication Reminder 💊",
              text: `Hi ${user.name}, Reminder: Take ${med.name} (${med.dosage})`,
            });

            console.log(`Email sent to ${user.email} for ${med.name}`);
          } catch (err) {
            
            console.error("Error sending email:", err);
          }
        });
      });
    });
  });
};



// controllers/personalController.js

/*exports.getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const vitalsList = await personalModel.find({
      userId,
      date: { $gte: thirtyDaysAgo }
    });

    if (!vitalsList || vitalsList.length === 0) {
      return res.status(200).json({ recommendations: ["No vitals data for the last 30 days."] });
    }

    const user = await userModel.findById(userId);
    const heightInM = (user?.height || 170) / 100; // default 1.7 m

    const avg = { weight: 0, bmi: 0, systolic: 0, diastolic: 0, bloodSugar: 0 };
    let countBP = 0;

    vitalsList.forEach(v => {
      avg.weight += v.weight || 0;
      avg.bmi += v.weight && heightInM ? v.weight / (heightInM ** 2) : 0;

      if (v.systolic && v.diastolic) {
        avg.systolic += v.systolic;
        avg.diastolic += v.diastolic;
        countBP++;
      }

      avg.bloodSugar += v.bloodSugar || 0;
    });

    const n = vitalsList.length;
    avg.weight /= n;
    avg.bmi /= n;
    avg.systolic = countBP ? avg.systolic / countBP : 0;
    avg.diastolic = countBP ? avg.diastolic / countBP : 0;
    avg.bloodSugar /= n;

    const recommendations = [];

    // BMI / Weight Recommendations
    if (avg.bmi >= 30) {
      recommendations.push(
        "Obese: Reduce calorie intake, increase exercise.",
        "Foods to eat: Leafy vegetables, fruits, whole grains, lean protein (chicken, fish, tofu).",
        "Foods to avoid: Sugary drinks, pastries, fried foods, processed snacks, excessive red meat.",
        "Exercise: Cardio 5–6 times/week (brisk walking, cycling, swimming), strength training 2–3 times/week (bodyweight exercises, resistance bands).",
        "Sleep: 7–9 hours nightly.",
        "Stress reduction: Meditation, deep breathing, yoga."
      );
    } else if (avg.bmi >= 25) {
      recommendations.push(
        "Overweight: Maintain a healthy diet, exercise regularly.",
        "Foods to eat: Vegetables, fruits, whole grains, lean protein.",
        "Foods to avoid: Sugary and fried foods, processed snacks.",
        "Exercise: 30–45 min/day moderate activity (walking, light jogging, yoga, swimming).",
        "Sleep: 7–9 hours nightly.",
        "Stress reduction: Meditation, walking, or yoga."
      );
    } else if (avg.bmi < 18.5) {
      recommendations.push(
        "Underweight: Eat nutrient-rich foods and balanced meals.",
        "Foods to eat: Nuts, seeds, dairy, lean protein, complex carbs.",
        "Exercise: Light strength training to build muscle (push-ups, squats, resistance bands).",
        "Sleep: 7–9 hours nightly.",
        "Stress reduction: Avoid skipping meals and maintain consistency."
      );
    }

    // Blood Pressure Recommendations
    if (avg.systolic >= 140 || avg.diastolic >= 90) {
      recommendations.push(
        "High blood pressure: Reduce salt, exercise, consult doctor.",
        "Foods to eat: Fruits, vegetables, whole grains, low-fat dairy.",
        "Foods to avoid: Processed foods, high sodium snacks, fast food.",
        "Exercise: Moderate aerobic activity 30 min/day (walking, swimming, cycling)."
      );
    } else if (avg.systolic < 90 || avg.diastolic < 60) {
      recommendations.push(
        "Low blood pressure: Stay hydrated, eat small frequent meals.",
        "Include moderate salt in meals.",
        "Avoid sudden standing, maintain healthy blood sugar.",
        "Exercise: Light activity like walking or yoga to improve circulation."
      );
    }

    // Blood Sugar Recommendations
    if (avg.bloodSugar >= 126) {
      recommendations.push(
        "High blood sugar: Monitor carbs, consult doctor for diabetes.",
        "Foods to eat: High-fiber foods, lean protein, low-GI carbs.",
        "Foods to avoid: Sugary foods, soft drinks, processed carbs.",
        "Exercise: 30 min/day moderate activity to improve insulin sensitivity (brisk walking, cycling, swimming)."
      );
    } else if (avg.bloodSugar < 70) {
      recommendations.push(
        "Low blood sugar: Eat balanced meals every 3–4 hours.",
        "Include protein and complex carbs.",
        "Avoid skipping meals.",
        "Exercise: Light aerobic activity is okay; avoid strenuous activity on empty stomach."
      );
    }

    // Heart Rate Recommendations
    const heartRates = vitalsList.map(v => v.heartRate || 0);
    const avgHeartRate = heartRates.reduce((a,b) => a+b,0)/heartRates.length;
    if (avgHeartRate > 100) {
      recommendations.push(
        "High heart rate: Rest, reduce stress, consult doctor if persists.",
        "Stress reduction: Meditation, deep breathing.",
        "Exercise: Light to moderate cardio only if doctor approves."
      );
    } else if (avgHeartRate < 50) {
      recommendations.push(
        "Low heart rate: Monitor symptoms, consult doctor.",
        "Light activity is fine, but consult if abnormal."
      );
    }

    // General Sleep & Stress Recommendations
    recommendations.push(
      "Sleep schedule: Maintain 7–9 hours nightly, consistent bedtime and wake-up time.",
      "Stress management: Meditation 10–20 min daily, journaling, yoga, light walking.",
      "Hydration: Drink 2–3 L water daily."
    );

    res.status(200).json({ recommendations });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};




const API_KEY = "AIzaSyDTR52ewrPKvBgBDsQJ_C-ciXXAHJmcBBY";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) return res.status(400).json({ reply: "No message provided." });

    const payload = {
      contents: [
        {
          parts: [
            {
              text: message
            }
          ]
        }
      ]
    };

    const response = await fetch(`${GEMINI_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return res.status(response.status).json({ reply: `API Error: ${errorText}` });
    }

    const data = await response.json();
    console.log("API Response:", JSON.stringify(data, null, 2));

    // Gemini response path
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a reply.";
     

    res.status(200).json({ reply: botReply });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ reply: "Something went wrong!" });
  }
};*/