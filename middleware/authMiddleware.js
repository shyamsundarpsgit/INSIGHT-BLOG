const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const JWT_SECRET = process.env.JWT_SECRET;

const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.render('login');
  }
  next();
};


const authenticateAndCheckUser = async (req, res,next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.redirect("login");
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
   
    //fetch user id
    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.locals.user = null;
      return res.redirect("login");
    }
     res.locals.user = user;
     next();
  } catch (err) {
    console.log(err.message);
    res.locals.user = null;
    res.redirect('/login');
  }
};

module.exports = { requireAuth, authenticateAndCheckUser  };
