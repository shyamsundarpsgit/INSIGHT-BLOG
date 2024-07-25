const express = require('express');
const router = express.Router();
const {viewAdminPage,adminLogIn, getAdminLogIn,getAdminSignUp, adminSignUp,getUserPostDetails,getAdminHome}= require('../controllers/adminController');


router.get('/admin',viewAdminPage)
router.get('/admin/login',getAdminLogIn);
router.get('/admin/signup',getAdminSignUp);
router.post('/admin/signup',adminSignUp);
router.post('/admin/login',getUserPostDetails);
router.get('/admin/home',getAdminHome);
module.exports = router;