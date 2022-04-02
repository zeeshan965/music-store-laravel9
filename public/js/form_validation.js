var input = document.querySelector("#phone")
if (input !== null) {
    var iti = window.intlTelInput(input, {
        utilsScript: utilsScript
    });
}

/**
 * Jquery Validation
 * Form Validation Handler
 * Rules | Messages | Error placement | Highlight/Un Highlight | Success | Submit handler
 * @param form
 * @param type
 */
let validate = function (form, type) {
    form.validate({
        rules: rules[type],
        messages: messages[type],
        highlight: function (element) { // high light error inputs
            $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change done by hightlight
            $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
        },
        submitHandler: function (form) {
            if (type == "login") dispatchLogin(form);
            else if (type == "register") dispatchRegister(form);
            else if (type == "updatePassword") dispatchUpdatePassword(form);
            else form.submit();

            console.log(form)
            return false; // extra insurance preventing the default form action
        }
    });
}

/**
 * Custom validation
 * letter only a-z
 */
$.validator.addMethod("lettersOnly", function (value, element) {
    return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Letters only please");

/**
 *Int - Tel input method for international phone validation
 * @param value , element
 * @returns bool
 */
jQuery.validator.addMethod("phoneValid", function (value, element) {
    if (input.value.trim()) {
        if (iti.isValidNumber()) {
            element.value = iti.getNumber(); //assign international format number to element
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}, "Invalid Phone Number");

/**
 * @type {{profile: {phone: {required: boolean, phoneValid: boolean}, name: {minlength: number, required: boolean, lettersOnly: boolean}}, login: {password: {minlength: number, required: boolean}, email: {required: boolean, email: boolean}}, register: {password: {minlength: number, required: boolean}, password_confirmation: {minlength: number, equalTo: string, required: boolean}, phone: {required: boolean, phoneValid: boolean}, name: {minlength: number, required: boolean, lettersOnly: boolean}, email: {onkeyup: boolean, remote: {data: {_token: (*|jQuery)}, type: string, url: string}, required: boolean, email: boolean}}}}
 */
let rules = {
    login: {
        password: {
            required: true,
            minlength: 8
        },
        email: {
            required: true,
            email: true,
        },
    },
    forgotPassword: {
        email: {
            required: true,
            email: true
        },
    },
    register: {
        name: {
            required: true,
            minlength: 3,
            lettersOnly: true
        },
        password: {
            required: true,
            minlength: 8
        },
        password_confirmation: {
            required: true,
            minlength: 8,
            equalTo: "#password"
        },
        email: {
            required: true,
            email: true,
            remote: {
                url: "check_email",
                type: "post",
                data: {
                    '_token': $('meta[name="csrf-token"]').attr('content')
                },
            },
            onkeyup: false
        },
        phone: {
            required: true,
            phoneValid: true
        }
    },
    resetPassword: {
        password: {
            required: true,
            minlength: 8
        },
        password_confirmation: {
            required: true,
            minlength: 8,
            equalTo: "#password"
        },
        email: {
            required: true,
            email: true
        }
    },
    profile: {
        name: {
            required: true,
            minlength: 3,
            lettersOnly: true
        },
        phone: {
            required: true,
            phoneValid: true
        }
    },
    updatePassword: {
        currentPassword : {
            required : true
        },
        password : {
            required : true,
        },
        password_confirmation : {
            required : true,
            equalTo : "#password"
        }
    }
};

/**
 * @type {{profile: {phone: {required: string, phoneValid: string}, name: {minlength: string, required: string}}, login: {password: {minlength: string, required: string}, email: {required: string, email: string}}, register: {password: {minlength: string, required: string}, password_confirmation: {minlength: string, equalTo: string, required: string}, phone: {required: string, phoneValid: string}, name: {minlength: string, required: string}, email: {remote: string, required: string, email: string}}}}
 */
let messages = {
    login: {
        password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 8 characters long"
        },
        email: {
            required: "Please enter your email address.",
            email: "Please enter a valid email address.",
        }
    },
    forgotPassword: {
        email: {
            required: "Please enter your email address.",
            email: "Please enter a valid email address.",
        }
    },
    register: {
        name: {
            required: "Please enter name",
            minlength: "Your name must consist of at least 3 characters"
        },
        password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 8 characters long"
        },
        password_confirmation: {
            required: "Please provide a password",
            minlength: "Your password must be at least 8 characters long",
            equalTo: "Please enter the same password as above"
        },
        email: {
            required: "Please enter your email address.",
            email: "Please enter a valid email address.",
            remote: "The email you enter is already in use please choose another!"
        },
        phone: {
            required: "Please enter phone number",
            phoneValid: "Please enter a valid phone number"
        },
    },

    resetPassword: {
        password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 8 characters long"
        },
        password_confirmation: {
            required: "Please provide a password",
            minlength: "Your password must be at least 8 characters long",
            equalTo: "Please enter the same password as above"
        },
        email: {
            required: "Please enter your email address.",
            email: "Please enter a valid email address."
        }
    },
    profile: {
        name: {
            required: "Please enter name",
            minlength: "Your name must consist of at least 3 characters"
        },
        phone: {
            required: "Please enter phone number",
            phoneValid: "Please enter a valid phone number"
        },
    },
    updatePassword: {
        currentPassword: {
            required: "Please enter current password",
        },
        password: {
            required: "Please provide new password",
            minlength: "Your password must be at least 8 characters long"
        },
        password_confirmation: {
            required: "Re-enter password",
            minlength: "Your password must be at least 8 characters long",
            equalTo: "Please enter the same password as above"
        }
    }
};
