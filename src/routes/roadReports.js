const express = require("express");

const prisma = require("../prisma");
const { message } = require("antd");

const router = express.Router();

router.get("/test", (req, res) =>{
    res.json({
        success: true,
        message: 'Road report route is working'
    });
});

router.get("/", async(req, res)=>{
  try {
    const reports = await prisma.roadReport.findMany();
    res.json({
        success:true,
        reports,
    });


  } catch (error) {
    res.status(500).json({
        success:false,
        message:"Road Reports fetch unsuccessfully"
    });
  }
});

router.post("/" , async(req, res)=>{
    try {
        const { roadname, location, issueType, description} = req.body;

        if(!roadname || !location || !issueType || !description){
            return res.status(400).json({
                success: false,
                message: "please fill all the needed information"
            });
        }

        const report = await prisma.roadReport.create({
            data:{
                roadName,
                location, 
                issueType, 
                description,
                reporterId: 1,
            },
        });

        return res.status(201).json({
            success:true,
            message:"road Report successfully submitted", 
            reports
        });
    } catch (error) {
        console.error("Create Road Report Error", error);
        return res.status(500).json({
            success: false,
            message: "cannot create a report successfully",
        });

    }
});

module.exports = router;
