const Post = require("../model/post");
const User = require("../model/userModel");
const Admin = require("../model/admin");
const jwt = require("jsonwebtoken");
//Get Admin  page
const viewAdminPage = async (req, res) => {
  try {
    const adminId = req.params.id;
    res.render("admin/index",{adminId});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

//Get Admin Login page render
const getAdminLogIn = async (req, res) => {
  try {
    const adminId = req.params.id;
    res.render("admin/admin_login",{adminId});
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//function for creating jwt
const maxAge = 3*24*60*60;
const createToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,
    {
      expiresIn:maxAge
    }
  );
}

const getUserPostDetails = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
       return res.status(400).json({
        message: "Required field is missing : name or email or password",
      });
    }
    const admin = await Admin.findOne({email:email});
    if(!admin){
      return res.status(404).json({
        message:"Admin not found"
      })
    }
    const adminId = admin._id;
   
    const token = createToken( adminId);
    req.session.adminId = admin._id;
    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
    res.render("admin/admin_dashboard",{adminId});
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const   getAdminDashboard = (req,res)=>{
  const adminId = req.session.adminId;
  res.render("admin/admin_dashboard",{adminId});
}
const getAdminPosts = async (req, res) => {
 const adminId = req.session.adminId;
  res.render("admin/adminPosts",{adminId});
};

const getAdminAllPosts = async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
};

//Admit Edit Post
const adminEditPost = async (req, res) => {
  try {
    const id = req.params.id;
    let data = req.body;
    let post = await Post.findOne({ _id: id });
    if (!post) {
      return res.status(404).json({
        message: "Post with this id is not found",
      });
    }
    let updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });
    console.log("Updated Successfully");
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

//view post
const getAdminBlog = async (req, res) => {
  try {
    const adminId = req.session.adminId;
    let blogId = req.params.id;
    const blog = await Post.findById({ _id: blogId });
    res.render("admin/adminBlog", { blog,adminId });
  } catch (err) {
    console.log(err.meassage);
    res.status(500).json({
      message: err.message,
    });
  }
};

//Delete post
const deleteAdminPost = async (req, res) => {
  try {
    const id = req.params.id;
    let isExistingPost = await Post.findOne({ _id: id });
    if (!isExistingPost) {
      return res.status(404).json({
        message: "Post with this id is not found",
      });
    }
    await Post.findByIdAndDelete({ _id: id });
    res.json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.log(err.message);
  }
};

//GET all users
const getAdminUsers = async (req, res) => {
  try {
    const adminId = req.session.adminId;
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({
        message: "No users registered",
      });
    }
    res.render("admin/adminUser",{adminId});
  } catch (err) {
    console.log("Error", err.meassage);
    res.status(500).json({
      message: err.message,
    });
  }
};

//Get users
const getUser = async (req, res) => {
  try {
    let users = await User.find({});
    if (!users) {
      return res.status(404).json({
        message: "No users registered",
      });
    }
    res.json(users);
  } catch (err) {
    console.log("Error", err.meassage);
    res.status(500).json({
      message: err.message,
    });
  }
};

//Delete User
const deleteAdminUser = async (req, res) => {
  try {
    const id = req.params.id;
    const isExistingUser = await User.findOne({ _id: id });
    if (!isExistingUser) {
      return res.status(404).json({
        message: "user with this email id does not exist",
      });
    }
    const result = await User.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

//Logout admin
const logOut = (req,res)=>{
  req.session.destroy((err)=>{
    if(err){
      return res.statu(500).send("Failed to Logout");
    }
    res.clearCookie('connect.sid');
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/admin');
  })
}

module.exports = {
  viewAdminPage,
  getAdminLogIn,
  getUserPostDetails,
  getAdminPosts,
  getAdminAllPosts,
  adminEditPost,
  getAdminBlog,
  deleteAdminPost,
  getAdminUsers,
  getUser,
  deleteAdminUser,
  getAdminDashboard,
  logOut
};
