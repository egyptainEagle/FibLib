const Express = require("express");
const Routes = new Express.Router();
const LoginRecords = {}
const Mongoose = require("mongoose");
const Crypto = require("crypto");
/**** Database Intialization *********/



Routes.get("/",(req, res)=>{
res.render("index");
})

Routes.post("/login",(req, res)=>{
/* Request Form:
  {
      username: <String>,
      password: <String>
  }
*/
//Waiting for body response 
let reqBody = ""
req.on("data", (data)=>reqBody+=data );
req.on("end", ()=>{  
 //Checking for the entry:
  const User = USERS.find(reqBody,`{_id: 0}`)[0];
 if(User){
  //IF EXIST: add it to the loginRecord dictionary and assing the value to a unique identifier 
   const userHash =Crypto.randomUUID();  
   LoginRecords[userHash] = User;
   setTimeout(()=>delete LoginRecords[userHash], 10000);
   res.end(JSON.stringify({id: userHash}));
}else{
   //IF NOT EXIST: return error saying that the user doesn't exist
   res.end(JSON.stringify({error: "User Doesn't exist"})) ;
}  
})

})
Routes.post("/register", (req,res)=>{
/* Request Form:
  {
      username: <String>,
      password: <String>
  }
*/
let reqBody = "";
req.on("data", (data)=>reqBody+=data);
req.on("end",()=>{
//Checking for the entry:
const User = USERS.find(reqBody,{_id: 0})[0];
if(!User){
 //IF EXIST: add it to the loginRecord dictionary and assing the value to a unique identifier 
  //Register the user to the database:
    USERS.insertMany([JSON.parse(reqBody)])
  
  const userHash =Crypto.randomUUID();  
  LoginRecords[userHash] = User;
  setTimeout(()=>delete LoginRecords[userHash], 10000);
  res.end(JSON.stringify({id: userHash}));
}else{
  //IF NOT EXIST: return error saying that the user doesn't exist
  res.end(JSON.stringify({error: "User Doesn't exist"})) ;
}  
})
})

exports.Router = Routes;