const db=require('../models');
const pd = db.pd;
const dd = db.dd;
const ad = db.ad;       
const upazilla = db.upazilla;
const trainedFarmer = db.trainedFarmer;
const initialTrial = db.initialTrial;
const finalTrial = db.finalTrial;
const irrigation = db.irrigation;
const machinery = db.machinery;
const motivation = db.motivation;
const fieldDay = db.fieldDay;
const agriFair = db.agriFair;

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');


module.exports.pdlogin=async(req,res)=>{
    res.render('pd/login', { title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'' });
    res.send("log");
};

module.exports.pdloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        pd.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "pd";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/pd/dashboard');
                    }
                    else{
                        return res.status(200).render('pd/login', { title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('pd/login', { title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Please provide a username and password' });
            }
        })
        .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tutorials."
              });
            });
        // upazilla.findAll({ where: {uname: uname} })
        // .then(data => {
        //     if(data.length > 0){
        //         bcrypt.compareSync(password , upazilla.password, function(err, result) {
        //             if(result== true){
        //                 res.redirect('/upazilla/dashboard');
        //             }
        //             else{
        //                 res.redirect('/upazilla/dashboard');
        //             }
        //         });
        //     }else{
        //         return res.status(200).render('upazilla/login', { title: 'Horticulture Wing Central Management Software',msg:'Please provide a username and password' });
        //     }
        // })
        // .catch(err => {
        //   res.status(500).send({
        //     message:
        //       err.message || "Some error occurred while retrieving tutorials."
        //   });
        // });

        
    }
    catch(error){
        console.log(error);
    } 
};

module.exports.pdDashboard = async(req,res) => {
    console.log("pddashboard",res.locals.type);
    res.render('pd/dashboard', { title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.pdsignup=async(req,res)=>{
    res.render('pd/signup', { title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'' });
    res.send("log");
};
module.exports.pdsignuppost=async(req,res)=>{
    try {
        const{uname,password,confirmPassword}=req.body;

        const data = await pd.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('pd/signup',{title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'ERROR: The pd is already enrolled!'})
        }
        else if(password !== confirmPassword){
            return res.render('pd/signup',{title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'ERROR: Passwords do not match!'})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createpd = await pd.create({
                    uname: uname,
                    password:hashedPassword,
                    pd_id:1
                    })
                res.render('pd/signup',{title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'pd Registered Successfully!'})
            }
            catch (err) {
                console.log(err);
            }
            
        }
    }
    catch(error){
        console.log(error);
    } 
};
//signUp controller end

//trainedFarmer controller
module.exports.trainedFarmer=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:''});
    }
     
    //  records:result

};

module.exports.trainedFarmerFilter=async(req,res)=>{
    await trainedFarmer.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/trainedFarmer/trainedFarmerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/trainedFarmer/trainedFarmerYear', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })

};

module.exports.trainedFarmerDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', upazillas:err });
    }
     

};
//trainedFarmer controller end

//initialTrial controller
module.exports.initialTrial=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/initialTrial/initialTrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/initialTrial/initialTrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:''});
    }
     
    //  records:result

};

module.exports.initialTrialFilter=async(req,res)=>{
    await initialTrial.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/initialTrial/initialTrialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/initialTrial/initialTrialYear', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: err });
    })

};
module.exports.initialTrialDistrictFilter=async(req,res)=>{
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/initialTrial/initialTrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', upazillas:err });
    }
     

};
//initialTrial controller end

//finalTrial controller
module.exports.finalTrial=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/finalTrial/finalTrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/finalTrial/finalTrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:''});
    }
    //  records:result

};

module.exports.finalTrialFilter=async(req,res)=>{
    await finalTrial.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/finalTrial/finalTrialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/finalTrial/finalTrialYear', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })

};
module.exports.finalTrialDistrictFilter=async(req,res)=>{
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/finalTrial/finalTrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', upazillas:err });
    }
     

};
//finalTrial controller end

//agriFair controller
module.exports.agriFair=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/agriFair/agriFair', { title: 'কৃষি মেলা তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/agriFair/agriFair', { title: 'কৃষি মেলা তথ্য',success:''});
    }
     
    //  records:result

};

module.exports.agriFairFilter=async(req,res)=>{
    await agriFair.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/agriFair/agriFairTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/agriFair/agriFairYear', { title: 'কৃষি মেলা তথ্য',success:'', records: err });
    })

};

module.exports.agriFairDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/agriFair/agriFair', { title: 'কৃষি মেলা তথ্য',success:'', upazillas:err });
    }
     

};
//agriFair controller end

//irrigation controller
module.exports.irrigation=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/irrigation/irrigation', { title: 'সেচ অবকাঠামো নির্মাণ তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/irrigation/irrigation', { title: 'সেচ অবকাঠামো নির্মাণ তথ্য',success:''});
    }
     
    //  records:result

};

module.exports.irrigationFilter=async(req,res)=>{
    await irrigation.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/irrigation/irrigationTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/irrigation/irrigationYear', { title: 'সেচ অবকাঠামো নির্মাণ তথ্য',success:'', records: err });
    })

};

module.exports.irrigationDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/irrigation/irrigation', { title: 'সেচ অবকাঠামো নির্মাণ তথ্য',success:'', upazillas:err });
    }
     

};
//irrigation controller end

//machinery controller
module.exports.machinery=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/machinery/machinery', { title: 'কৃষি যন্ত্রপাতি বিতরণ প্রতিবেদন তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/machinery/machinery', { title: 'কৃষি যন্ত্রপাতি বিতরণ প্রতিবেদন তথ্য',success:''});
    }
     
    //  records:result

};

module.exports.machineryFilter=async(req,res)=>{
    await machinery.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/machinery/machineryTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/machinery/machineryYear', { title: 'কৃষি যন্ত্রপাতি বিতরণ প্রতিবেদন তথ্য',success:'', records: err });
    })

};

module.exports.machineryDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/machinery/machinery', { title: 'কৃষি যন্ত্রপাতি বিতরণ প্রতিবেদন তথ্য',success:'', upazillas:err });
    }
     

};
//machinery controller end

//motivation controller
module.exports.motivation=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/motivation/motivation', { title: 'উদ্বুদ্ধকরণ ভ্রমণ তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/motivation/motivation', { title: 'উদ্বুদ্ধকরণ ভ্রমণ তথ্য',success:''});
    }
     
    //  records:result

};

module.exports.motivationFilter=async(req,res)=>{
    await motivation.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/motivation/motivationTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/motivation/motivationYear', { title: 'উদ্বুদ্ধকরণ ভ্রমণ তথ্য',success:'', records: err });
    })

};

module.exports.motivationDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/motivation/motivation', { title: 'উদ্বুদ্ধকরণ ভ্রমণ তথ্য',success:'', upazillas:err });
    }
     

};
//motivation controller end

//fieldDay controller
module.exports.fieldDay=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস তথ্য',success:''});
    }
     
    //  records:result

};

module.exports.fieldDayFilter=async(req,res)=>{
    await fieldDay.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/fieldDay/fieldDayTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/fieldDay/fieldDayYear', { title: 'মাঠ দিবস তথ্য',success:'', records: err });
    })

};

module.exports.fieldDayDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস তথ্য',success:'', upazillas:err });
    }
     

};
//fieldDay controller end