const personalModel = require('../models/personalizedModel')


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
