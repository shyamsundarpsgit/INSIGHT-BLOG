const jwt = require('jsonwebtoken');
const Admin = require('../model/admin');
const JWT_SECRET = process.env.JWT_SECRET;

const requireAuth = (req,res,next)=>{
    if(!req.session.adminId){
        return res.redirect('/admin/login');
    }
    next();
}

const authenticateAndCheckAdmin = async(req,res,next)=>{
 const token = req.cookies.jwt;
 if(!token){
    return res.redirect('/admin/login');
 }
 try{
   const decodedToken  = jwt.verify(token,JWT_SECRET);
   
   //fetch admin id
   const admin = await Admin.findById(decodedToken.id);

   if(!admin){
    res.locals.admin = null;
    return res.redirect('admin/login');
   }
   res.locals.admin = admin;
   next();
 }catch(err){
  console.log(err.message);
  res.locals.admin = null;
  res.redirect('/admin/login');
 }
}

module.exports = {
  requireAuth,
  authenticateAndCheckAdmin,
}