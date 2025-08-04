const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const cron = require('node-cron');


exports.createAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    const saved = await newAppointment.save();
    res.status(201).json({ message: "Appointment created successfully", data: saved });
  } catch (error) {
    console.error("Create failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:  "muntasirniloy2002@gmail.com",
      pass:  "neih ewru erye hfvg" 
    }
  });

  try {
    await transporter.sendMail({
      from: `"DocuMedi" <${process.env.MAIL_USER || "muntasirniloy2002@gmail.com"}>`,
      to,
      subject,
      html
    });
    console.log(` Email sent to ${to}`);
  } catch (err) {
    console.error(" Email error:", err);
  }
};

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));

    const appointments = await Appointment.find({});

    for (const appt of appointments) {

      const appointmentDateTimeStr = `${appt.date}T${appt.time}:00`;

      const appointmentDateTime = new Date(
        new Date(appointmentDateTimeStr).toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
      );

     
      const reminderTime = new Date(appointmentDateTime.getTime() - 2 * 60 * 60 * 1000);

      
      const diff = Math.abs(now.getTime() - reminderTime.getTime());

     
      if (diff < 60 * 1000) {
        const user = await User.findById(appt.uploaded_by);
        if (user && user.email) {
          const html = `
            <h2>🩺 Appointment Reminder</h2>
            <p><strong>Name:</strong> ${appt.name}</p>
            <p><strong>Specialist:</strong> ${appt.specialist}</p>
            <p><strong>Reason:</strong> ${appt.reason}</p>
            <p><strong>Time:</strong> ${appt.time}</p>
            <p><strong>Date:</strong> ${appt.date}</p>
          `;
          await sendEmail(user.email, "Your Appointment Reminder", html);
          console.log(`📩 Email sent to ${user.email} for appointment ${appt._id}`);
        }
      }
    }
  } catch (err) {
    console.error("❌ Cron Error:", err);
  }
});



