//* mobile toggle menu navigation
$(document).ready(function(){
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
})

let fieldsChecked = [];
document.querySelector('#postalCodeError').innerText = "eg. A0A 1B1";
let errorBox = document.querySelector("#errorBox") 

//* Checkboxes 
let checkBox1 = document.querySelector("#checkBox1");
let checkBox2 = document.querySelector("#checkBox2");

//*********** RegEx Pattern Validation Functions ************ //

function hasCharCheck(dataToCheck){
    let pattern = /^[a-zA-Z]+$/;
    if(pattern.test(dataToCheck.field.value)){
        return true;
    }
    return false;
}

function isEmailValid(dataToCheck ){
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if(pattern.test(dataToCheck.field.value)){
        return true;
    }
    return false;
}

function phoneNumberCheck(dataToCheck){
    let pattern = /^[0-9]{10}$/;
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
    let pattern = /^(?:[A-Za-z]{2,15}(?:(\.\s|'s\s|\s?-\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$/;
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

//*********** Reset Functions  ************ //

function resetErrors(){
    fieldsChecked.forEach(inputField =>{
        inputField.error.innerText = "";
        inputField.error.style.color = "grey";
        inputField.field.style.border = "1px solid grey";
    })
}

function resetStyles(){
    errorBox.classList.remove("erroBoxStyle")
    document.querySelector("#checkBoxError").innerText = "";
}

function resetFields(){
    fieldsChecked.forEach(inputField => {
        inputField.field.value = ""
    });
    document.querySelector('#postalCodeError').innerText = "eg. A0A 1B1";
    document.querySelector('#postalCode').placeholder = "";
    checkBox1.checked = false;
    checkBox2.checked = false;
}

//* Success message styling
function formSuccessMsgStyle(){
    errorBox.classList.add("successMsgStyle");
}

//*********** Fields Validations  ************ //
let fieldsValidation = () =>{
    let errors = 0;
    resetStyles();
    fieldsChecked.forEach(inputField => {
        if(inputField.field.value == ""){
            inputField.error.innerText= "This field is required";
            inputField.field.style.border= "none"
            inputField.error.style.color = "red";
            inputField.field.style.borderBottom = "1px solid red"
            errors +=1;
        }
        else if (inputField.checker(inputField)==false){
            inputField.error.innerText= inputField.msg;
            inputField.field.style.border= "none"
            inputField.error.style.color = "red";
            inputField.field.style.borderBottom = "1px solid red"
            errors +=1;
        }
    });

    //* Checkbox check
    if(checkBox1.checked == false || checkBox2.checked == false){
        document.querySelector("#checkBoxError").innerText = "You must agree with the Terms and Conditions and receiving promotional emails.";
        errorBox.classList.add("erroBoxStyle")
        errors +=1;
    };

    return new Promise((resolve, reject) =>{
        if (errors == 0){
            resolve('Form Submitted Successfully !');
        }else{
            reject('error')
        }
    });
}

//* Form submisson Event Handler
function formClickHandler(e){
    resetErrors();
    e.preventDefault();
    window.scrollTo(0, 0);

    fieldsValidation()
    .then((success) => {
        formSuccessMsgStyle();
        resetFields();
        document.querySelector("#checkBoxError").innerText = success;
    })
    .catch((error) =>{
        document.querySelector('#postalCode').placeholder = "eg. A0A 1B1";
        console.log(error);
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
        {field: firstName , checker: hasCharCheck , error: firstNameError, msg: "Please enter a valid first name"},
        {field: lastName , checker: hasCharCheck , error: lastNameError, msg: "Please enter a valid last name"},
        {field: dateBirth , error: dateBirthError, checker: addressCheck, msg: "Please enter a valid date of birth"},
        {field: email , checker: isEmailValid , error: emailError, msg: "Please enter a valid email address"},
        {field: phoneNumber , checker: phoneNumberCheck, error: phoneNumbeError, msg: "Phone number must be 10 digits"},
        {field: address , error: addressError,  checker: addressCheck,  msg:" Please enter valid address"},
        {field: city , checker: cityValidation , error: cityError, msg: "Please enter a valid city name"},
        {field: postalCode , checker: postalCodeValidation , error: postalCodeError, msg: "Please enter a valid postal code"},
    ]
    let submitForm = document.querySelector("#submit");
    submitForm.addEventListener("click", formClickHandler);
}
document.addEventListener("DOMContentLoaded", function(){
    initForm();
});