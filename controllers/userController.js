const User = require("../model/userModel");
const Post = require("../model/post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Function for pagination
async function pagination(req) {
  let perPage = 4;
  let page = parseInt(req.query.page) || 1;

  const posts = await Post.aggregate([{ $sort: { createdAt: -1 } }])
    .skip(perPage * (page - 1))
    .limit(perPage)
    .exec();

  const count = await Post.countDocuments();
  const nextPage = page + 1;
  const hasNextPage = nextPage <= Math.ceil(count / perPage);
  return { posts, page, hasNextPage, nextPage };
}

//Home
const renderHome = async (req, res) => {
  res.render("home");
};

//get signup page
const getSignUp = async (req, res) => {
  res.render("signup");
};

//get login page
const getLogIn = async (req, res) => {
  res.render("login");
};

const saltRounds = 10; //for setting salt in hashing

//function for jwt creation
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

//user signup
const userSignUP = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Required field is missing : name,email or password",
      });
    }
    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      console.log("Email id already registered");
      return res.status(400).json({
        message: "The email id already exists",
      });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const data = await user.save();
    const token = createToken(data._id);

    // Set session data
    req.session.userId = data._id;
    //set jwt in response
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.redirect("/viewblogs");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//User login
const userLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        message: "Required fields are missing",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User with email id is not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = createToken(user._id);
    //set session
    req.session.userId = user._id;
    //set jwt in response
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.redirect("/viewblogs");
  } catch (err) {
    console.log("error is", err.meassage);
    res.status(500).json({
      message: err.meassage,
    });
  }
};

//save posts
const createBlog = async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    res.status(400).json({
      message: "Required fields are missing: title or body",
    });
  }
  const newBlog = await Post.create({
    title: title,
    body: body,
    user_Id: req.session.userId,
  });
  res.redirect("/viewblogs");
};

// Get all Blogs
const getAllBlogs = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { posts, page, hasNextPage, nextPage } = await pagination(req);
    res.render("blogpage", {
      userId,
      posts,
      page,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    console.log("error is", error.message);
  }
};

//Get blog by id
const getBlog = async (req, res) => {
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
};

//View User Posts
const viewUserPost = async (req, res) => {
  try {
    let userId = req.session.userId;
    const posts = await Post.find({ user_Id: userId });
    if (posts.length === 0) {
      console.log("The user has no blogs");
      return res.status(400).json({
        message: "The user has no blogs",
      });
    }
    res.render("userBlog", { posts, userId });
  } catch (err) {
    console.log("Error is", err.meassage);
    res.status(500).json({
      message: err.message,
    });
  }
};

//Edit user's post
const editUserPost = async (req, res) => {
  try {
    const id = req.params.id;
    const isPostExist = await Post.find({ _id: id });
    if (!isPostExist) {
      return res.status(404).json({
        message: "Post with this id is not found",
      });
    }
    const updatedData = {
      title: req.body.title,
      body: req.body.body,
    };
    await Post.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
  } catch (err) {
    res.status(500).json({
      message: `Error occured :err.message`,
    });
  }
};

//getblogs
const getBlogs = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    console.log(err.message);
  }
};

//Delete User Post
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const isExistingPost = await Post.findOne({ _id: id });
    if (!isExistingPost) {
      res.status(404).json({
        message: `post with id ${id} is not found`,
      });
    }
    await Post.deleteOne({_id:id});
  } catch (err) {
    console.log("Error",err.message);
    res.status(500).json({
      message:err.message
    });
  }
};

//Search
const searchBlog = async (req, res) => {
  try {
    const searchItem = req.body.searchedItem;
    const searchNoSpecialChar = searchItem.replace(/[^a-zA-Z0-9 ]/g, "");
    const posts = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    res.render("searchResults", { posts });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  userSignUP,
  userLogIn,
  renderHome,
  getSignUp,
  getLogIn,
  createBlog,
  getAllBlogs,
  getBlog,
  searchBlog,
  viewUserPost,
  editUserPost,
  getBlogs,
  deletePost,
};
