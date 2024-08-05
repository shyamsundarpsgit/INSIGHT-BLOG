const jwt = require('jsonwebtoken');
const admin = require('../model/admin');
const JWT_SECRET = process.env.JWT_SECRET;

const requireAuth = (req,res)=>{
    
}