const Doctor = require('../models/doctorModel')




exports.saveDoctor = async (req, res) => {
  try {
    const { formData } = req.body; 
    console.log("Received Data:", formData);

    const { name, specialist, contact, schedule } = formData; 

    
    if (!name || !specialist || !schedule || !schedule.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const newDoctor = await Doctor.create({
      name,
      specialist,
      contact,
      schedule,
    });

    res.status(201).json({
      message: "Doctor data saved successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving doctor data", error: error.message });
  }
};


exports.getDoctors = async(req,res) =>{
    try{
        const data = await Doctor.find();
        res.status(200).json(data)
    }catch(error){
        res.status(500).json("Internal Server Error")
    }
}

