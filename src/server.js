const prisma = require("./prisma");


const express = require("express");
const cors = require("cors");
const { message } = require("antd");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const authRoute = require("./routes/auth");



const roadReportsRouter = require("./routes/roadReports");


app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Run successfully",
  });
});

app.get("/api/db_check", async(req, res) => {
  try{
    await prisma.$connect();
    res.status(200).json({
      success: true, 
      message: "Database connected successfully"
    });
  }catch(error){
      console.log("Database connection Failed", error);
       res.status(500).json({
        success: false,
        message: "Database connection Failed"
       });
  }
});

app.use("/api/auth", authRoute);

app.use("/api/road-reports", roadReportsRouter);

//server start

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`backend running at http//:localhost: ${PORT}`);
});
