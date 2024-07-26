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

//Check Admin LogIn 
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

const getUserPostDetails = async(req,res)=>{
  res.redirect('/admin/home');
};

const getAdminHome = async(req,res)=>{
  res.render('admin/admin_dashboard');
};

const getAdminPosts = async(req,res)=>{
  // const posts = await Post.find({});
  // res.render('admin/adminPosts',{
  //   posts
  // });
  res.render('admin/adminPosts');
};

const getAdminAllPosts = async(req,res)=>{
  const posts = await Post.find({});
  res.json(posts)
}

//Admit Edit Post
const adminEditPost = async (req,res)=>{
 try{
  const id = req.params.id;
  let data = req.body;
 let post = await Post.findOne({_id:id});
 if(!post){
  return res.status(404).json({
    message:"Post with this id is not found"
  });
 }
  let updatedPost = await Post.findByIdAndUpdate(id,data,{ new: true });
  console.log("Updated Successfully");
  res.json({ message: "Employee updated successfully" });
 }catch(err){
  console.log("Error",err.message);
  res.status(500).json({
    message:err.message
  });
 }
};

//view post 
const getAdminBlog = async(req,res)=>{
  try {
    let blogId = req.params.id;
    const blog = await Post.findById({ _id: blogId });
    res.render("blog", { blog });
  } catch (err) {
    console.log(err.meassage);
    res.status(500).json({
      message: err.message,
    });
  }
}
//Delete post
const deleteAdminPost = async(req,res)=>{
try{
  const id = req.params.id;
  let isExistingPost = await Post.findOne({_id:id});
  if(!isExistingPost){
    return res.status(404).json({
      message:"Post with this id is not found"
    });
  }
  await Post.findByIdAndDelete({_id:id});
  res.json({
    message:"Post deleted successfully"
  });
}catch(err){
  console.log(err.message);
}
}

module.exports = {
  viewAdminPage,
  adminLogIn,
  getAdminLogIn,
  getAdminSignUp,
  adminSignUp,
  getUserPostDetails,
  getAdminHome,
  getAdminPosts,
  getAdminAllPosts,
  adminEditPost,getAdminBlog,
  deleteAdminPost
};
