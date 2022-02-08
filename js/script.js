$(document).ready(function(){
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
})

//*** Form Validation using RegEx ***//

let fieldsChecked;

function hasCharCheck(dataToCheck){
    let pattern = /^[a-zA-Z]+$/;
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

function phoneNumberCheck(dataToCheck){
    let pattern = /^[#.0-9a-zA-Z\s,-]+$/;
    if(pattern.test(dataToCheck.field.value)){
        return true;
    }
    return false;
}

function addressCheck(dataToCheck){
    let pattern =  /^[A-Za-z0-9\s#()+-`\\\]\|'/.]{3,}$/; 
    if(pattern.test(dataToCheck.field.value)){
        return true;
    }
    return false;
}

function cityValidation(dataToCheck){
    let pattern = /^(?:[A-Za-z]{2,}(?:(\.\s|'s\s|\s?-\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$/;
    if(pattern.test(dataToCheck.field.value)){
        return true;
    }
    return false;
}

function postalCodeValidation(dataToCheck){
    let pattern = /[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/;
    if(pattern.test(dataToCheck.field.value)){
        return true;
    }
    return false;
}

// Function for resetting the errors after form submisson 
function resetErrors(){
    fieldsChecked.forEach(inputField =>{
        inputField.error.innerText = "";
        inputField.field.style.border = "1px solid grey"
    })
}

function formClickHandler(e){
    console.log("Check that form!")
    let errorsFound = 0;
    resetErrors();
    e.preventDefault();

    // * automated error message
    fieldsChecked.forEach(inputField => {
        if(inputField.field.value == ""){
            inputField.error.innerText= "This field is required";
            inputField.field.style.border= "none"
            inputField.field.style.borderBottom = "1px solid red"
        }
        else if (inputField.checker(inputField)==false){
            inputField.error.innerText= inputField.msg;
            errorsFound +=1;
        }
    })
    window.scrollTo(0, 0);
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
    let phoneNumber = document.querySelector("#mobileNumber");
    let phoneNumbeError = document.querySelector("#mobileNumberError");
    let address = document.querySelector('#address');
    let addressError = document.querySelector('#addressError');
    let city = document.querySelector('#city');
    let cityError = document.querySelector('#cityError');
    let postalCode = document.querySelector('#postalCode');
    let postalCodeError = document.querySelector('#postalCodeError');

    // * Declaring data objects for checking the information entered by the user
    fieldsChecked = [
        {field:firstName , checker: hasCharCheck , error: firstNameError, msg:"Please enter a Valid first name"},
        {field:lastName , checker: hasCharCheck , error: lastNameError, msg:"Please enter a Valid last name"},
        {field:dateBirth , error: dateBirthError, msg:"Please enter a Valid Date of birth"},
        {field:email , checker:hasEmailValid , error: emailError, msg:"Please enter a Valid email address"},
        {field:phoneNumber , checker:phoneNumberCheck, error: phoneNumbeError, msg:"Phone number must be 10 digits"},
        {field:address , error: addressError,  checker: addressCheck,  msg:"Please enter valid address"},
        {field:city , checker:cityValidation , error: cityError, msg:"Please enter a valid city name"},
        {field:postalCode , checker:postalCodeValidation , error: postalCodeError, msg:"Please enter a valid city name"},
    ]
    let submitForm = document.querySelector("#submit");
    submitForm.addEventListener("click", formClickHandler);
}

document.addEventListener("DOMContentLoaded", function(){
    initForm();
});

