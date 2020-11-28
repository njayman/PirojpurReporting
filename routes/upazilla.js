const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {fieldDayYear,agriFair,agriFairYear,agriFairForm,agriFairFormPost,fieldDayForm,fieldDayFormPost,upazillasignup,upazillasignuppost,upazillalogin,upazillaloginpost,upazillaDashboard,
    trainedFarmer,trainedFarmerYear,trainedFarmerForm,trainedFarmerFormPost,initialTrial,initialTrialYear,initialTrialForm,initialTrialFormPost,
    finalTrial,finalTrialYear,finalTrialForm,finalTrialFormPost,agriFairEdit,agriFairDelete,
    trainedFarmerEdit,trainedFarmerDelete,initialTrialEdit,initialTrialDelete,finalTrialEdit,finalTrialDelete,
    fieldDay,fieldDayEdit,fieldDayDelete,irrigation,irrigationYear,irrigationForm,irrigationFormPost,irrigationEdit,irrigationDelete,
machinery,machineryYear,machineryForm,machineryFormPost,machineryEdit,machineryDelete,
motivation,motivationYear,motivationForm,motivationFormPost,motivationEdit,motivationDelete} = require('../controllers/upazilla.controller');

router.get('/login',upazillalogin);
router.post('/logins',upazillaloginpost);
router.get('/dashboard',upazillaDashboard);

router.get('/signup',upazillasignup);
router.post('/signups',upazillasignuppost);

router.get('/trainedFarmer',trainedFarmer);
router.post('/trainedFarmerYear',trainedFarmerYear);
router.get('/trainedFarmerForm',trainedFarmerForm);
router.post('/trainedFarmerFormPost',trainedFarmerFormPost);
router.get('/trainedFarmerEdit/:id',trainedFarmerEdit);
router.post('/trainedFarmerDelete/:id',trainedFarmerDelete);

router.get('/initialTrial',initialTrial);
router.post('/initialTrialYear',initialTrialYear);
router.get('/initialTrialForm',initialTrialForm);
router.post('/initialTrialFormPost/:id',initialTrialFormPost);
router.get('/initialTrialEdit/:id',initialTrialEdit);
router.post('/initialTrialDelete/:id',initialTrialDelete);

router.get('/finalTrial',finalTrial);
router.post('/finalTrialYear',finalTrialYear);
router.get('/finalTrialForm',finalTrialForm);
router.post('/finalTrialFormPost/:id',finalTrialFormPost);
router.get('/finalTrialEdit/:id',finalTrialEdit);
router.post('/finalTrialDelete/:id',finalTrialDelete);

router.get('/agriFair',agriFair);
router.post('/agriFairYear',agriFairYear);
router.get('/agriFairForm',agriFairForm);
router.post('/agriFairFormPost',agriFairFormPost);
router.get('/agriFairEdit/:id',agriFairEdit);
router.post('/agriFairDelete/:id',agriFairDelete);

router.get('/fieldDay',fieldDay);
router.post('/fieldDayYear',fieldDayYear);
router.get('/fieldDayForm',fieldDayForm);
router.post('/fieldDayFormPost',fieldDayFormPost);
router.get('/fieldDayEdit/:id',fieldDayEdit);
router.post('/fieldDayDelete/:id',fieldDayDelete);

router.get('/irrigation',irrigation);
router.post('/irrigationYear',irrigationYear);
router.get('/irrigationForm',irrigationForm);
router.post('/irrigationFormPost',irrigationFormPost);
router.get('/irrigationEdit/:id',irrigationEdit);
router.post('/irrigationDelete/:id',irrigationDelete);

router.get('/machinery',machinery);
router.post('/machineryYear',machineryYear);
router.get('/machineryForm',machineryForm);
router.post('/machineryFormPost',machineryFormPost);
router.get('/machineryEdit/:id',machineryEdit);
router.post('/machineryDelete/:id',machineryDelete);

router.get('/motivation',motivation);
router.post('/motivationYear',motivationYear);
router.get('/motivationForm',motivationForm);
router.post('/motivationFormPost',motivationFormPost);
router.get('/motivationEdit/:id',motivationEdit);
router.post('/motivationDelete/:id',motivationDelete);

module.exports = router;