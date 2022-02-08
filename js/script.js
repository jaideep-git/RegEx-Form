$(document).ready(function(){
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
})

document.querySelector("#firstNameError").innerText= "First Name*";
document.querySelector("#lastNameError").innerText= "Last Name";

//*** Form Validation using RegEx ***//

let fieldsChecked;

function hasCharCheck(dataToCheck){
    let pattern = /^[a-zA-Z]+$/;
    if(pattern.test(dataToCheck.field.value)){
        return true;
    }
    return false;
}

function hasDateCheck(dataToCheck){
    let pattern = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    if(pattern.test(dataToCheck.field.value)){
        return true;
    }
    return false;
}

function hasEmailValid(dataToCheck ){
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if(pattern.test(dataToCheck.field.value)){
        return true;
    }
    return false;
}

// Function for resetting the errors after form submisson 
function resetErrors(){
    fieldsChecked.forEach(inputField =>{
        inputField.error.innerText = "";
    })
}

function formClickHandler(e){
    console.log("Check that form!")
    let errorsFound = 0;
    resetErrors();
    e.preventDefault();

    // * automated error message
    fieldsChecked.forEach(inputField => {
        if(inputField.checker(inputField)==false){
            inputField.error.innerText= inputField.msg;
            errorsFound +=1;
        }
    })
}

// * Grabbing input and error fields
function initForm() {
    let firstName = document.querySelector("#firstName");
    let firstNameError = document.querySelector("#firstNameError");
    let lastName = document.querySelector("#lastName");
    let lastNameError = document.querySelector("#lastNameError");
    let dateBirth = document.querySelector("#dateBirth");
    let dateBirthError = document.querySelector("#dobError");
    let email = document.querySelector("#email");
    let emailError = document.querySelector("#emailAddressError");

    // * Declaring data objects for checking the information entered by the user
    fieldsChecked = [
        {field:firstName , checker: hasCharCheck , error: firstNameError, msg:"Please enter a Valid first name"},
        {field:lastName , checker: hasCharCheck , error: lastNameError, msg:"Please enter a Valid last name"},
        {field:dateBirth , checker: hasDateCheck , error: dateBirthError, msg:"Please enter a Valid Date of birth"},
        {field:email , checker:hasEmailValid , error: emailError, msg:"Please enter a Valid email address"}
    ]
    let submitForm = document.querySelector("#submit");
    submitForm.addEventListener("click", formClickHandler);
}

document.addEventListener("DOMContentLoaded", function(){
    initForm();
});

