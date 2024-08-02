const express = require("express");
const router = express.Router();
const {
  viewAdminPage,
  adminLogIn,
  getAdminLogIn,
  getAdminSignUp,
  adminSignUp,
  getUserPostDetails,
  getAdminPosts,
  getAdminAllPosts,
  adminEditPost,getAdminBlog,
  deleteAdminPost,
  getAdminUsers,
  getUser,
  deleteAdminUser
} = require("../controllers/adminController");

router.get("/admin", viewAdminPage);
router.get("/admin/login", getAdminLogIn);
router.get("/admin/signup", getAdminSignUp);
router.get('/admin/viewpost/:id',getAdminBlog)
router.post("/admin/account/signup",adminSignUp);
router.post("/admin/account/login",getUserPostDetails);
router.get("/admin/account/login",getUserPostDetails)
router.get("/admin/posts",getAdminPosts);
router.get('/admin/getpost',getAdminAllPosts);
router.put('/admin/post/:id', adminEditPost);
router.delete('/admin/post/:id',deleteAdminPost);

router.get('/admin/getusers',getUser);
router.get('/admin/users',getAdminUsers);
router.delete('/admin/user/:id',deleteAdminUser);

module.exports = router;
