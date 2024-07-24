const express = require("express");
const router = express.Router();
const {
  renderHome,
  getSignUp,
  getLogIn,
  createBlog,
  getAllBlogs,
  getBlog,
  searchBlog,
  userSignUP,
  userLogIn,
  viewUserPost,
  editUserPost,
  getBlogs
} = require("../controllers/userController");

const {
  requireAuth,
  authenticateAndCheckUser,
} = require("../middleware/authMiddleware");
router.get("/", renderHome);
router.get("/signup", getSignUp);
router.post("/signup", userSignUP);

router.get("/login", getLogIn);
router.post('/login',userLogIn);

router.post("/addblog", requireAuth, authenticateAndCheckUser, createBlog);

router.get("/viewblogs", requireAuth, authenticateAndCheckUser, getAllBlogs);

router.get('/viewallblogs',requireAuth, authenticateAndCheckUser,getBlogs)

router.get("/viewblog/:id", requireAuth, authenticateAndCheckUser, getBlog);

router.get('/userblog/:id',requireAuth,authenticateAndCheckUser,viewUserPost);

router.put('/userblog/:id',requireAuth, authenticateAndCheckUser,editUserPost);

router.post("/search", requireAuth, authenticateAndCheckUser, searchBlog);
module.exports = router;
  