
/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";
document.addEventListener('DOMContentLoaded', function(){
	var personForm = document.getElementById('signup');
	var stateSelect = personForm.elements['state'];
	var idx;
	var option;

	for (idx = 0; idx < usStates.length; ++idx) {
		option = document.createElement('option');
		option.innerHTML = usStates[idx].name;
		option.value = usStates[idx].code;
		stateSelect.appendChild(option);
	}

	// var occupation = personForm.elements['occupationOther'];
	// personForm.addEventListener('change', function(){
	// 	if (occupation = 'other') {
	// 		occupationOther.style.display = 'block';
	// 	}
	// });

	var exitButton = document.getElementById('cancelButton');
    exitButton.addEventListener('click', function() {
        if (window.confirm('Are you really sure you want to leave? I worked really hard on this!')) {
            window.location = 'http://www.google.com';
        }
    });

    personForm.addEventListener('submit',onSubmit);
});



/* onSubmit()
 * Called when the user attempts to submit the form
 * The browser will pass an event object as the first parameter and we can use this object
 * to stop the form from being submitted if it is invalid.
 * Also the keyword 'this' will refer to the form that is being submitted while inside this function.
 * */
function onSubmit(evt) {
    evt.returnValue = validateForm(this);
	var zipcode = this.elements['zip'].value;
	var dob = this.elements['birthdate'].value;
    console.log(dob);

    try {
        //calculate the age
        var age = calculateAge(dob);
        displayAge(zip);
    }

    catch(exception){
        displayError(exception);
    }

    if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }

    return evt.returnValue;
} //onSubmit()

function calculateAge(dob) {
    if (!dob) {
        throw new Error('Please tell me when you were born!');
    }
    //calculate the person's age based on the date-of-birth
    var today = new Date();
    dob = new Date(dob);
    var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
    var monthDiff = today.getMonth() - dob.getUTCMonth();
    var daysDiff = today.getDate() - dob.getUTCDate();

    if (monthDiff < 0 ||(0 === monthDiff && daysDiff < 0 )) {
        yearsDiff--;
    }

    return yearsDiff;
    //return moment().diff(dob, 'years');
}

function displayZip(zip) {
    var zipRegExp = new RegExp('^\\d{5}$');
    if (!zipRegExp.test(zip)) {
        throw new Error('Your zipcode cannot contain besides numbers!');
    }
} 

function displayError(error) {
    //use displayMessage to display the error
    displayMessage(error, true);
} 

function displayMessage(message, isError) {
    var msgElem = document.getElementById('error-message');
    msgElem.innerHTML = message;
    msgElem.className = isError ? 'alert alert-danger' : 'alert alert-success';
    msgElem.style.display = 'block';
}
/* validateForm()
* This function validates the form's information and returns true if the form is valid or false if the form is invalid.
* It will also let the user know which fields are invalid.
* parameters:
*   form    reference to the form that needs to be validated
* */
function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var formValid = true;
    for (idx = 0; idx < requiredFields.length; idx++) {
        formValid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }
    if (!formValid) {
       // var errMsg = document.getElementById('error-message');
        //errMsg.innerHTML = 'Please fill out the required field';
        //errMsg.style.display = 'block';
    }
    return formValid;
}

//validateForm()

/* validateRequiredField()
* This function validates a field that is required. If the field does not have a value, or has only spaces,
* it will mark the field as invalid and return false. Otherwise it will return true.
* */
function validateRequiredField(field) {
    var value = field.value.trim();
    var valid = value.length > 0;
    if (valid) {
        field.className = 'form-control';
    }

    else {
        field.className = 'form-control invalid-field';
    }
    return valid;
} //validateRequiredField()










