const Post = require("../model/post");
const User = require("../model/userModel");
const Admin = require('../model/admin');
//Get Admin  page
const viewAdminPage = async (req, res) => {
  try {
    res.render("admin/index");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};
//Get Admin Login page render
const getAdminLogIn = async(req,res)=>{
    try{
     res.render('admin/admin_login');
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

//Check Admin LogIn check
const adminLogIn = async (req, res) => {
  try {
    const {email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      res.status(400).json({
        message: "Required field is missing : name or email or password",
      });
    }

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


//Admin singup page render
const getAdminSignUp = async(req,res)=>{
    try{
       res.render('admin/admin_signup');
    }catch(err){
        res.statu(500).json({
            message:err.message
        });
    }
}

//Admin SignUp Check
const adminSignUp = async(req,res)=>{
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
      res.status(400).json({
        message: "Required field is missing : name,email or password",
      });
    }
    const user = await Admin.create({ name, email, password });
    res.status(201).json({
      data: { user },
      message: "user created successfully",
    });
}





module.exports = {
  viewAdminPage,
  adminLogIn,
  getAdminLogIn,
  getAdminSignUp,
  adminSignUp,
};
