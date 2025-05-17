require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");


const PORT = process.env.PORT || 5000;
const dbConnect = require("./Database/db");
dbConnect();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



// apis
app.use("/api/auth",require("./routes/Auth"));
app.use("/api/doctors",require("./routes/AppointmentRoute"));
app.use("/api/appointment",require("./routes/AppointmentRoute"));
app.use("/api/contact",require("./routes/Contact_route"));


app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})







