/*       CONSTANTS      */
const inputSection = document.querySelector(".login-panel__input-section");
const inputSectionGroups = document.querySelectorAll(".input-section__section-group")
const usernameField = document.querySelector(`input[name="username"]`);
const passwordField = document.querySelector(`input[name="password"]`)
const loginBtn = document.querySelector("button#login-btn");
const registerBtn = document.querySelector("button#register-btn")
const errorElement = document.querySelector(`span[name="error"]`)
const Hostname = "http://localhost:4000";
/************************/

//Hide Label when the inputSectionGroup is blur and the input value is blank:

/** LESSONS
 * - "focus" and "blur" events only work with input elements 
 * - use "click" event with elements to denote that they're focused 
 * - "focus" and "blur" events can be use against elements that have focus by default or are assigned to focus
 */
/****************** UI SECTION ************************** */
      
function onSectionGroupFocus(sectionGroup){
 //hide the label:
 sectionGroup.querySelector("label").classList.add("section-group__label--active");
 //focus the input:
 sectionGroup.querySelector("input").focus();
 //apply the right style:
 sectionGroup.classList.add("input-section__section-group--active");
}
function onSectionGroupBlur(sectionGroup){
//check if the value of the input is blank
 if (sectionGroup.querySelector("input").value.replace(/\s*/g, "") == ""){
  //show the label:
  sectionGroup.querySelector("label").classList.remove("section-group__label--active");
  
  //apply the right style:
  sectionGroup.classList.remove("input-section__section-group--active");  
  }
}



for(const sectionGroup of inputSectionGroups){
      sectionGroup.addEventListener("click", ()=> onSectionGroupFocus(sectionGroup));
      sectionGroup.querySelector("input").addEventListener("blur", ()=>onSectionGroupBlur(sectionGroup));
      sectionGroup.addEventListener("focus",()=> onSectionGroupFocus(sectionGroup));
      
}
/************************************************/


/**************** ACCOUNT OPERATIONS *****************/
function onLoginAttempt(){
 //Sending a login request to the server:
 fetch(`${Hostname}/login`,  {method:"POST", body: JSON.stringify({username: usernameField, password: passwordField}) })
 // Response Body (Blob to JSON object
 .then((response)=>response.json())
 //Handle data returned by the server if any
 .then((data)=>{
   //IF ERROR EXSIST:
   if(data.error){
     errorElement.textContent = data.error;
  
   }

 }); 

}
function onRegisterAttempt(){

}

loginBtn.addEventListener("click", onLoginAttempt);
loginBtn.addEventListener("keypress",onLoginAttempt);
registerBtn.addEventListener("click", onRegisterAttempt);
registerBtn.addEventListener("keypress",onRegisterAttempt);

/******************************************************/