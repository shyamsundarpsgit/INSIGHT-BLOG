const express = require('express');
const router = express.Router();
const {viewAdminPage,adminLogIn, getAdminLogIn,getAdminSignUp, adminSignUp}= require('../controllers/adminController');


router.get('/admin',viewAdminPage)
router.get('/admin/login',getAdminLogIn);
router.get('/admin/signup',getAdminSignUp);
router.post('/admin/signup',adminSignUp);
module.exports = router;