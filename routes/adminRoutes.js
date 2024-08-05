const express = require("express");
const router = express.Router();
const {requireAuth,authenticateAndCheckAdmin}=require('../middleware/adminAuth');
const {
  viewAdminPage,
  getAdminLogIn,
  getUserPostDetails,
  getAdminPosts,
  getAdminAllPosts,
  adminEditPost,getAdminBlog,
  deleteAdminPost,
  getAdminUsers,
  getUser,
  deleteAdminUser,getAdminDashboard,logOut
} = require("../controllers/adminController");

router.get("/admin", viewAdminPage);

router.get("/admin/login", getAdminLogIn);

router.post("/admin/account/login",getUserPostDetails);

router.get('/admin/viewpost/:id',requireAuth,authenticateAndCheckAdmin,getAdminBlog);

router.get("/admin/account/login",requireAuth,authenticateAndCheckAdmin,getAdminDashboard);

router.get("/admin/posts",requireAuth,authenticateAndCheckAdmin,getAdminPosts);

router.get('/admin/getpost',requireAuth,authenticateAndCheckAdmin,getAdminAllPosts);

router.put('/admin/post/:id',requireAuth,authenticateAndCheckAdmin,adminEditPost);

router.delete('/admin/post/:id',requireAuth,authenticateAndCheckAdmin,deleteAdminPost);

router.get('/admin/getusers',requireAuth,authenticateAndCheckAdmin,getUser);

router.get('/admin/users',requireAuth,authenticateAndCheckAdmin,getAdminUsers);

router.delete('/admin/user/:id',requireAuth,authenticateAndCheckAdmin,deleteAdminUser);

router.get('/admin/logout',requireAuth,authenticateAndCheckAdmin,logOut);

module.exports = router;
