const express = require("express");

const bcryptjs = require("bcryptjs");
const prisma = require("../prisma");
const { message } = require("antd");
const router = express.Router();

const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Name, Email, Password are require",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "Password most require more than or at least 8 character and must upper case , lower case and unique character",
      });
    }

    const normalizeEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizeEmail,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this Email already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizeEmail,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createAt: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Registration error", error);
    return res.status(500).json({
      success: false,
      message: "something went wrong Registration error",
    });
  }
});

router.post("/login", async (req, res)=>{
    try {
        const {email, password} = req.body;
         if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and Password are required"
            });
         }

         const normalizeEmail = email.trim().toLowerCase();

         const user = await prisma.user.findUnique({
            where:{
                email: normalizeEmail,
            }
         });

         if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid Email and Password",
            });
         }

         const isMatch = await bcryptjs.compare(password, user.password);
         if(!isMatch){
            return res.status(401).json({
                success:false, 
                message:"Invalid Email and Password",
            });
         }

         const token = jwt.sign(
          {
            userId: user.id,
            role:user.role,

          },
          process.env.JWT_SECRET,
          {expiresIn: "1d"}
         );

         return res.status(200).json({
          success:true,
          message:"Login Successfully",
          token: token,
          user:{
            user: user.id,
            name:user.name, 
            email:user.email,
            role:user.role,
            
          },
         });
    } catch (error) {
        console.error("Login Error", error);
        return res.status(500).json({
          success:false,
          message:"Something went wrong in Login",
        });
    }
});

module.exports = router;
