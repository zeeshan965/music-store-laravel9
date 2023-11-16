(function () {
    validate($('#login-form'), 'login');
    validate($('#user-profile'), 'profile');
    validate($('#register-form'), 'register');
    validate($('#forgot-form'), 'forgotPassword');
    validate($('#reset-password-form'), 'resetPassword');
    validate($('#update-password'), 'updatePassword');
    $('#btn-change-password').on("click", function (e) {
        $('#password-modal').modal({
            show: true,
            keyboard: false,
            backdrop: 'static'
        });
    })
})();

/**
 * @returns {FormData}
 */
function prepareData() {
    const formData = new FormData();
    formData.append("name", $('#name').val());
    formData.append("email", $('#email').val());
    formData.append("phone", $('#phone').val());
    formData.append("password", btoa($('#password').val()));
    formData.append("password_confirmation", btoa($('#password_confirmation').val()));
    return formData;
}

/**
 * @param form
 */
function dispatchLogin(form) {
    showLoader();
    const formData = new FormData();
    formData.append("email", $('#email').val());
    formData.append("password", $('#password').val());
    sendAjaxRequest('login', 'post', formData).then((response) => {
        hideLoader();
        if (typeof (response.status) !== 'undefined' && response.status == 'success') {
            successMessage("Logged in successfully.", response.intended)
        } else {
            //validation errors
            errorMessage(response);
        }
    }).catch(err => {
        hideLoader();
        showErrors(err);
    });
}

/**
 * @param form
 */
function dispatchRegister(form) {
    showLoader();
    let formData = prepareData();
    sendAjaxRequest('register', 'post', formData).then((response) => {
        hideLoader();
        if (typeof (response.status) !== 'undefined' && response.status == 'success') {
            successMessage("Logged in successfully.", response.intended)
        } else {
            //validation errors
            errorMessages(response);
        }
    }).catch(err => {
        hideLoader();
        showErrors(err)
    });
}

/**
 * @param form
 */
function dispatchUpdatePassword(form) {
    showLoader();
    const formData = new FormData ();
    formData.append ( "currentPassword", btoa ( $ ( '#currentPassword' ).val () ) );
    formData.append ( "password", btoa ( $ ( '#password' ).val () ) );
    formData.append ( "password_confirmation", btoa ( $ ( '#password_confirmation' ).val () ) );

    sendAjaxRequest('update_password', 'post', formData).then((response) => {
        hideLoader();
        if (typeof (response.status) !== 'undefined' && response.status == 'success') {
            successMessage ( response.message, window.location.origin + "/dashboard" )
            form.reset ();
            $ ( '#password-modal' ).modal ( "toggle" );
        } else {
            //validation errors
            errorMessages(response);
        }
    }).catch(err => {
        hideLoader();
        showErrors(err)
    });
}
