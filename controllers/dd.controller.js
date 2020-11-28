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

module.exports.upazillatable=async(req,res)=>{
    res.json({ message: "hello upazilla" });
};

module.exports.allupazilla=async(req,res)=>{
    res.json({ message: "hello upazilla" });
};


module.exports.ddlogin=async(req,res)=>{
    res.render('dd/login', { title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'' });
    res.send("log");
};

module.exports.ddloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        dd.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "dd";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/dd/dashboard');
                    }
                    else{
                        return res.status(200).render('dd/login', { title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('dd/login', { title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Please provide a username and password' });
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

module.exports.ddDashboard = async(req,res) => {
    console.log("dddashboard",res.locals.type);
    res.render('dd/dashboard', { title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.ddsignup=async(req,res)=>{
    await ad.findAll()
    .then(data => {
        console.log("inside");
        res.render('dd/signup', { title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'',records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('dd/signup', { title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'',records: err });
    })
};
module.exports.ddsignuppost=async(req,res)=>{
    try {
        const{ads,uname,password,confirmPassword}=req.body;
        const ddata=await ad.findAll();
        const data = await dd.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('dd/signup',{title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'ERROR: The dd is already enrolled!',records: ddata })
        }
        else if(password !== confirmPassword){
            return res.render('dd/signup',{title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'ERROR: Passwords do not match!',records: ddata })
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createdd = await dd.create({
                    uname: uname,
                    password:hashedPassword,
                    ad_id:ads,
                    pd_id:1
                    })
                res.render('dd/signup',{title: 'গোপালগঞ্জ,খুলনা,বাগেরহাট,সাতক্ষীরা এবং পিরোজপুর কৃষি উন্নয়ন প্রকল্প এ স্বাগতম',msg:'dd Registered Successfully!',records: ddata })
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
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.trainedFarmerFilter=async(req,res)=>{
    await trainedFarmer.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/trainedFarmer/trainedFarmerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/trainedFarmer/trainedFarmerYear', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })

};
//trainedFarmer controller end

//initialTrial controller
module.exports.initialTrial=async(req,res)=>{
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/initialTrial/initialTrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/initialTrial/initialTrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', upazillas:err });
    }
    //  records:result

};

module.exports.initialTrialFilter=async(req,res)=>{
    await initialTrial.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/initialTrial/initialTrialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/initialTrial/initialTrialYear', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: err });
    })

};
//initialTrial controller end

//finalTrial controller
module.exports.finalTrial=async(req,res)=>{
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/finalTrial/finalTrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/finalTrial/finalTrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.finalTrialFilter=async(req,res)=>{
    await finalTrial.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/finalTrial/finalTrialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/finalTrial/finalTrialYear', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })

};
//finalTrial controller end

//agriFair controller
module.exports.agriFair=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/agriFair/agriFair', { title: 'কৃষি মেলা তথ্য',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/agriFair/agriFair', { title: 'কৃষি মেলা তথ্য',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.agriFairFilter=async(req,res)=>{
    await agriFair.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/agriFair/agriFairTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/agriFair/agriFairYear', { title: 'কৃষি মেলা তথ্য',success:'', records: err });
    })

};
//agriFair controller end

//irrigation controller
module.exports.irrigation=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/irrigation/irrigation', { title: 'সেচ অবকাঠামো নির্মাণ তথ্য',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/irrigation/irrigation', { title: 'সেচ অবকাঠামো নির্মাণ তথ্য',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.irrigationFilter=async(req,res)=>{
    await irrigation.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/irrigation/irrigationTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/trainedFarmer/trainedFarmerYear', { title: 'সেচ অবকাঠামো নির্মাণ তথ্য',success:'', records: err });
    })

};
//irrigation controller end

//machinery controller
module.exports.machinery=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/machinery/machinery', { title: 'কৃষি যন্ত্রপাতি বিতরণ প্রতিবেদন',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/machinery/machinery', { title: 'কৃষি যন্ত্রপাতি বিতরণ প্রতিবেদন',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.machineryFilter=async(req,res)=>{
    await machinery.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/machinery/machineryTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/machinery/machineryYear', { title: 'কৃষি যন্ত্রপাতি বিতরণ প্রতিবেদন',success:'', records: err });
    })

};
//machinery controller end

//motivation controller
module.exports.motivation=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/motivation/motivation', { title: 'উদ্বুদ্ধকরণ ভ্রমণ তথ্য',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/motivation/motivation', { title: 'উদ্বুদ্ধকরণ ভ্রমণ তথ্য',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.motivationFilter=async(req,res)=>{
    await motivation.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/motivation/motivationTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/motivation/motivationYear', { title: 'উদ্বুদ্ধকরণ ভ্রমণ তথ্য',success:'', records: err });
    })

};
//motivation controller end

//fieldDay controller
module.exports.fieldDay=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/fieldDay/fieldDay', { title: 'মাঠ দিবস তথ্য',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/fieldDay/fieldDay', { title: 'মাঠ দিবস তথ্য',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.fieldDayFilter=async(req,res)=>{
    await fieldDay.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/fieldDay/fieldDayTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/fieldDay/fieldDayYear', { title: 'মাঠ দিবস তথ্য',success:'', records: err });
    })

};
//fieldDay controller end

