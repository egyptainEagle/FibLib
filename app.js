const Express = require("express");
const Routes = require("./routes").Router;
const App = Express();
const PORT = process.env.PORT || 4000;
const Settings = require("./settings").Settings;
const Mongoose = require("mongoose");
/****************************************/
/* Intial Settings */
App.use("/public", Express.static("public"))
Settings(App);
App.use(Routes);
/******************/
/**** Database Intialization ****/
Mongoose.connect("mongodb+srv://maximous:123maximous@m001.cmsqx.mongodb.net/?retryWrites=true&w=majority")
const USERSSchema = new Mongoose.Schema({
 username: {
   type:String,
   required: true,
   maxlength: 25
 },
 password: {
   type:String,
   required: true,
   maxlength: 25
 }
});
const USERS = Mongoose.model("users", USERSSchema);
/*************************************/





App.listen(PORT, ()=> console.log('Server Has Started at Port: '+ PORT))
/** LESSONS:
 *  - exports object is exported as an object 
 * 
 */
