const express = require("express");
const router = express.Router();
const {
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
  deleteAdminPost,
} = require("../controllers/adminController");

router.get("/admin", viewAdminPage);
router.get("/admin/login", getAdminLogIn);
router.get("/admin/signup", getAdminSignUp);
router.get('/admin/viewpost/:id',getAdminBlog)
router.post("/admin/signup", adminSignUp);
router.post("/admin/login", getUserPostDetails);
router.get("/admin/home", getAdminHome);
router.get("/admin/posts", getAdminPosts);
router.get('/admin/getpost',getAdminAllPosts);
router.put('/admin/post/:id', adminEditPost);
router.delete('/admin/post/:id',deleteAdminPost);
module.exports = router;
