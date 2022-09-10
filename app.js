const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');


const app=express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://admin-ujjawal:Ujjawal500!@cluster0.hw53y9e.mongodb.net/usersDB",{useNewUrlParser:true});
const medSchema=new mongoose.Schema({
    medname:String,
    expirydate:String,
    quantity:Number,
    addinfo:String
});

const userSchema=new mongoose.Schema({
    name:String,
    phone:Number,
    address:String,
    bloodgrp:String,
    
    medList:[medSchema]
});
const User=mongoose.model("User",userSchema);
const Med=mongoose.model("Med",medSchema);

app.get("/",function(req,res){
    res.render("index");
});
app.get("/request",function(req,res){
    res.render("request",{items2:[],bg:'',items:[],med:''});
});
app.get("/donate",function(req,res){
    res.render("donate");
});
app.post("/request",function(req,res){
    const med_name=req.body.med;
    const blood_name=req.body.Bloodgrp;
    if(req.body.but==="blood"){
        User.find({bloodgrp:blood_name}, function(er,response){
            if(response.length===0){
                res.send("<script>alert('No Match Found'); window.location.href = '/request';</script>");
                
            }
            else{
            console.log(response);
            res.render("request",{items2:response,bg:blood_name,items:[],med:''});
            }
        })
    }
    if(req.body.but==="med"){
    User.find({medList:{$elemMatch:{medname:med_name}}},function(err,response){
        if(response.length===0){
            res.send("<script>alert('No Match Found'); window.location.href = '/request';</script>");
        }
        else{
        console.log(response);

        res.render("request",{items2:[],bg:'',items:response,med:med_name});
        }
    })
}
    

});

app.post("/donate", function(req, res){
   
   const userName=req.body.name;
   const phn=req.body.phn;
   const add=req.body.address;
   const medName=req.body.mname;
   const quan=req.body.mqua;
   const exp=req.body.date;
   const addinfo=req.body.addinfo;
   const med=new Med({
    medname:medName,
    expirydate:exp,
    quantity:quan,
    addinfo:addinfo
   });
   User.findOne({phone:phn},function(err,call){

        if(call==null){
            if(req.body.blood==='on'){
                var  bloodgrp=req.body.Bloodgrp;
                 }
                
                
                 
                  const user=new User({
                      name:userName,
                      phone:phn,
                      address:add,
                      bloodgrp:bloodgrp,
                     
                  });
                  user.medList.push(med);
                  user.save();
                 
                //   console.log("Hogya")
                  res.redirect("/");
               

        }
        else{
            
            call.medList.push(med);
            call.save();
            res.redirect("/");
        }
   })
})

    
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, function(){
    console.log("ServerStarte");
});


