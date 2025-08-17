const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const cookieParser = require("cookie-parser");
const path = require('path')
const authRoute = require('./routes/userRoute')
const fileRoute = require('./routes/fileRoute')
const appointmentRoute = require('./routes/appointmentRoute')
const personalRoute = require('./routes/personalRoute')
const doctorRoute = require('./routes/doctorRoute')

require("dotenv").config();

connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true, 
  })
);

app.use('/api/auth',authRoute)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/files",fileRoute)
app.use("/api/appointment",appointmentRoute)
app.use("/api/personalized",personalRoute)
app.use("/api/doctors",doctorRoute)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));