const express = require("express");
const router = express.Router();
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
router.get('/admin/viewpost/:id',getAdminBlog)
router.post("/admin/account/login",getUserPostDetails);
router.get("/admin/account/login",getAdminDashboard)
router.get("/admin/posts",getAdminPosts);
router.get('/admin/getpost',getAdminAllPosts);
router.put('/admin/post/:id', adminEditPost);
router.delete('/admin/post/:id',deleteAdminPost);

router.get('/admin/getusers',getUser);
router.get('/admin/users',getAdminUsers);
router.delete('/admin/user/:id',deleteAdminUser);

router.get('/admin/logout',logOut);

module.exports = router;
