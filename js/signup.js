
"use strict";

document.addEventListener('DOMContentLoaded', function(){
	var personForm = document.getElementById('signup');
	var stateSelect = personForm.elements['state'];
	var idx;
	var option;

    // add states
	for (idx = 0; idx < usStates.length; ++idx) {
		option = document.createElement('option');
		option.innerHTML = usStates[idx].name;
		option.value = usStates[idx].code;
		stateSelect.appendChild(option);
	}

    // hide/show the occupation other input
	personForm.elements['occupation'].addEventListener('change', function(){
	 	var occupation = this.value;
        if ('other' == occupation) {
		  personForm.elements['occupationOther'].style.display = 'block';
	 	} 
        else {
            personForm.elements['occupationOther'].style.display = 'none';
        }
	});

    // go to google.com
	var exitButton = document.getElementById('cancelButton');
    exitButton.addEventListener('click', function() {
        if (window.confirm('Are you really sure you want to leave? :(')) {
            window.location = 'http://www.google.com';
        }
    });

    personForm.addEventListener('submit', onSubmit);
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

    try {
        //calculate the age and test the age
        calculateAge(dob);
        hideMessage();
    }

    catch(exception){
        displayError(exception);
        evt.returnValue = false;
    }

    try {
        displayZip(zipcode);
    }

    catch(exception) {
        alert("zip code can be only 5 digits number");
        evt.returnValue = false;
    }

    //evt.returnValue = validateForm(this);

    if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }

    return evt.returnValue;
} //onSubmit()

//calculate the person's age based on the date-of-birth
function calculateAge(dob) {
    if (!dob) {
        throw new Error("Please tell me when you were born!");
    }

    var today = new Date();
    dob = new Date(dob);
    var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
    var monthDiff = today.getMonth() - dob.getUTCMonth();
    var daysDiff = today.getDate() - dob.getUTCDate();

    if (monthDiff < 0 ||(0 === monthDiff && daysDiff < 0 )) {
        yearsDiff--;
    }

    if (yearsDiff < 13) {
        throw new Error("You must be older than 13");
    }
    //return moment().diff(dob, 'years');
}

// verify zipcode
function displayZip(zip) {
    var zipRegExp = new RegExp('^\\d{5}$');
    if (!zipRegExp.test(zip)) {
        throw new Error();
    }
} 

function displayError(error) {
    //use displayMessage to display the error
    displayMessage(error, true);
} 

function displayMessage(message, isError) {
    var msgElem = document.getElementById('birthdateMessage');
    msgElem.innerHTML = message;
    msgElem.className = isError ? 'alert alert-danger' : 'alert alert-success';
    msgElem.style.display = 'block';
}

function hideMessage(message, isError) {
    var msgElem = document.getElementById('birthdateMessage');
    msgElem.innerHTML = message;
    msgElem.className = isError ? 'alert alert-danger' : 'alert alert-success';
    msgElem.style.display = 'none';
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
    //var occupationOther = 'occupationOther';
    for (idx = 0; idx < requiredFields.length; idx++) {
        formValid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }
    var personForm = document.getElementById('signup');
    var occupationForOther = personForm.elements['occupation'].value;
    if ( 'other' == occupationForOther) {
        formValid &= validateRequiredField(form.elements['occupationOther']);
    }
    return formValid;
}


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










