"use strict";

//Function to validate entries
$(function() {
    //initialize form
    $("#registration_form").validate({
        //specify rules
        rules: {
            date: {
                required: true,
                dateUS: true,
            },
            fname: {
                required: true,
                lettersonly: true,
            },
            lname: {
                required: true,
                lettersonly: true,
            },
            phone: {
                required: true,
                number: true,
                minlength: 7,
            },
            email: {
                required: true,
                email: true,
            },
            emailtwo: {
                required: true,
                equalTo: "#email",
            },
            zip: {
                required: true,
                zipcodeUS: true,   
            }
        },
        //specify error messages
        messages: {
            date: {
                required: "Required",
                dateUS: "MM/DD/YYYY",
            },
            fname: {
                required: "Required",
                lettersonly: "No Numbers",
            },
            lname: {
                required: "Required",
                lettersonly: "No Numbers",
            },
            phone: {
                required: "Required",
                number: "Numbers only",
                minlength: "Must be >= 7",
            },
            email: {
                required: "Required",
                email: "Must be valid",
            },
            emailtwo: {
                required: "Required",
                equalTo: "Doesn't match",
            },
            zip: {
                required: "Required",
                lettersonly: "Must be valid",
            },
        },

        //submit handler
        submitHandler: function(form){
            saveRegistration();
            form.submit();
        }
    });
});

var saveRegistration = function() {

    //Gotta make sure this all works
    sessionStorage.setItem("date", $("#date").val());
    sessionStorage.setItem("custtype", 
        $("input[name='custtype']:checked").val());

    if($("#newcust").is(':checked'))
        sessionStorage.setItem("newcust", "New Customer");
    else sessionStorage.setItem("newcust", "Returning Customer");
    
    sessionStorage.setItem("fname", $("#fname").val());
    sessionStorage.setItem("lname", $("#lname").val());
    sessionStorage.setItem("phone", $("#phone").val());
    sessionStorage.setItem("email", $("#email").val());
    sessionStorage.setItem("state", $("#state").val());
    sessionStorage.setItem("zip", $("#zip").val());


    //Bed Type
    if($("king").checked)
        sessionStorage.setItem("bedType", "King");
    else if($("double").checked)
        sessionStorage.setItem("bedType", "Double Double");

};

//Fill state selector
var fillStates = function() {
    var states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 
    'FM', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 
    'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 
    'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 
    'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

    var statesField = $("#state");
    var fragment = document.createDocumentFragment();
    states.forEach(function(state, index){
        var opt = document.createElement('option');
        opt.innerHTML = state;
        opt.value = state;
        fragment.appendChild(opt);
    });
    statesField.append(fragment);
}

//Resets the registration form
var resetFields = function() {
    $("#date").val("");
    $("#fname").val("");
    $("#lname").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#emailtwo").val("");
    $("#zip").val("");

    var validator = $("#registration_form").validate();
    validator.resetForm();
}

var testFunk = function() {
    alert($("#state").val())
}

window.onload = function() {
    this.fillStates();

    $("#reset").click(function(event){
        resetFields();
    });
};