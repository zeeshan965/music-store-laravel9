/**
 * Jquery Validation
 * Form Validation Handler
 * Rules | Messages | Error placement | Highlight/Un Highlight | Success | Submit handler
 * @param form
 * @param type
 */
var input = document.querySelector ( "#phones" )
if ( input !== null ) {
    var iti = window.intlTelInput ( input, {
        utilsScript : utilsScript
    } );
}

jQuery.validator.addMethod ( "noSpace", function ( value, element ) {
    return value.trim () != "";
}, "No space please and don't leave it empty" );

jQuery.validator.addMethod("noHTMLtags", function(value, element){
    if(value.trim () != ""){
        if(this.optional(element) || /<\/?[^>]+(>|$)/g.test(value)){
            return false;
        } else {
            return true;
        }
    }else{
        return true;
    }

}, "HTML tags are Not allowed.");

/**
 *Int - Tel input method for international phone validation
 * @param value , element
 * @returns bool
 */

jQuery.validator.addMethod ( "phoneValid", function ( value, element ) {

    if ( input.value.trim () ) {
        if ( iti.isValidNumber () ) {
            element.value = iti.getNumber (); //assign international format number to element
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}, "Invalid Phone Number" );

let validate = function ( form, type ) {
    let error = $ ( '.alert-danger', form );
    let success = $ ( '.alert-success', form );
    let ignoreRule = (type == 'formRecorder') ? ":not(:visible)" : [];
    form.validate ( {
        onkeyup : function ( element ) { //turn off onkeyup validation for ajax checking fields
            var element_id = $ ( element ).attr ( 'name' );
            if ( ! ( element_id == 'email' && type == 'register' ) ) return;
            if ( this.settings.rules[ element_id ].onkeyup !== false )
                $.validator.defaults.onkeyup.apply ( this, arguments );
        },
        /*onfocusout: function (element, event) {
            if (element.class === "stepTitleInput") {
                return false;
            }
        },*/
        focusInvalid : false, // do not focus the last invalid input
        ignore : ignoreRule,
        rules : rules[ type ],
        messages : messages[ type ],
        invalidHandler : function ( event, validator ) { //display error alert on form submit
            success.hide ();
            error.show ();
        },
        errorPlacement : function ( error, element ) {
            errorPlacement ( error, element );
        },
        highlight : function ( element ) { // high light error inputs

            if ( $ ( element ).hasClass ( "question-input" ) == true ) $ ( element ).parent ().addClass ( 'has-error' );
            $ ( element ).closest ( '.form-field' ).addClass ( 'has-error' ); // set error class to the control group
            $ ( element ).closest ( '.form-group' ).addClass ( 'has-error' ); // set error class to the control group
            if ( typeof ( CKEDITOR ) != 'undefined' ) {
                var instance = CKEDITOR.instances[ $ ( element ).attr ( 'id' ) ]; // update textarea
                if ( instance )
                    instance.updateElement ();
            }
        },
        unhighlight : function ( element ) { // revert the change done by hightlight
            if ( $ ( element ).hasClass ( "question-input" ) == true ) $ ( element ).parent ().removeClass ( 'has-error' );
            $ ( element ).parent ().find ( '.error' ).remove ()
            $ ( element ).parent ().find ( '.has-error' ).remove ()
            $ ( element ).closest ( '.form-field' ).removeClass ( 'has-error' ); // set error class to the control group
            $ ( element ).closest ( '.form-group' ).removeClass ( 'has-error' ); // set error class to the control group
        },
        success : function ( label ) {
            label.closest ( '.form-field' ).removeClass ( 'has-error' ); // set success class to the control group
            label.closest ( '.form-group' ).removeClass ( 'has-error' ); // set success class to the control group
        },
        submitHandler : function ( form ) {
            if ( type === 'register' ) filledForm = false;
            submitForm ( form );
        }
    } );
}

/**
 * Validation error placement
 * @param error
 * @param element
 */
function errorPlacement ( error, element ) {
    if ( ! $ ( element ).hasClass ( 'select2' ) ) error.insertAfter ( element );
    if ( $ ( element ).hasClass ( "multi-tags" ) ) error.insertAfter ( $ ( element ).parent ().find ( ".tagsinput" ) );
    if( $( element ).hasClass('form_type_check') ) error.insertAfter ( $ ( element ).parent () );
    if ( $ ( element ).hasClass ( "boot-date-picker" ) ) error.insertAfter ( $ ( element ).parent () );
    else if ( $ ( element ).hasClass ( "ck-editor" ) ) error.insertAfter ( $ ( element ).parent ().find ( ".cke" ) );
    else if ( $ ( element ).parent ().hasClass ( "cp" ) ) error.insertAfter ( $ ( element ).parent () );
    else if ( typeof ( $ ( element ).attr ( 'name' ) ) !== 'undefined' && $ ( element ).attr ( 'name' ) === 'postBody' ) error.insertAfter ( $ ( element ).parent () );
    else error.insertAfter ( $ ( element ).parent ().find ( "span.select2-container" ) );

}

/**
 * Submit form after validation
 * @param form
 */
function submitForm ( form ) {
    let id = $ ( form ).attr ( 'id' );
    let modalname = $ ( form ).attr ( 'modalname' );
    let formClass = $ ( form ).attr ( 'class' );
    if ( id == 'register' ) registerUser ( form );
    else if ( id == 'branding' ) saveBrandings ( form );
    else if ( id == 'branding_design' ) saveDesign ();
    else if ( id == 'video-recorder' ) saveRecorder ( form );
    else if ( id == 'mentors' ) saveMentors ( form );
    else if ( id == 'add_champions_form' ) saveChampionsForm ( form );
    else if ( id == 'importUser' ) saveImportUser ( form );
    else if ( id == 'add_instructor_form' ) saveInstructorsForm ( form );
    else if ( modalname == 'emails' ) sendEmail ( $ ( form ) );
    else if ( id == 'emailsettings' ) addContentInBody ( form, id );
    else if ( id == 'testemail' ) addContentInBody ( form, id );
    else if ( id == 'createCampaignList' ) GetSelected ( form, id );
    else if ( id == 'workSettings' ) workflowSettings ( form, id );
    else if ( id == 'wfnoti' ) storeSmsOrNoti ( form, id );
    else if ( id == 'wfsms' ) storeSmsOrNoti ( form, id );
    else if ( id == 'listingFilters' ) listingFilters ( form, id );
    else if ( id == 'createListFromRecorder' ) newList ( form, id );
    else if ( id == 'groupForm' && $ ( '#edit_group' ).val () == 0 ) saveGroupForm ( form );
    else if ( id == 'groupForm' && $ ( '#edit_group' ).val () == 1 ) updateGroupForm ( form );
    else if ( id == 'postForm' ) savePostForm ( form );
    else if ( id == 'zoomForm' ) saveZoomForm ( form );
    else if ( id == 'updatePostForm' ) updatePostForm ( form );
    else if ( id == 'updateZoomForm' ) updateZoomForm ( form );
    else if ( id == 'inviteUserForm' ) inviteGroupUser ( form );
    else if ( id == 'secondaryEmailForm' ) saveSecondaryEmail ( form );
    else if ( id == 'goalForm' ) saveGoalForm ( form );
    else if ( id == 'updateGoalForm' ) updateGoalForm ( form );
    else if ( id == 'outcomeForm' ) saveOutcome ( form );
    else if ( id == 'editOutcomeForm' ) updateOutcome ( form );
    else if ( formClass == 'stepsForm' ) saveOutcomeStep ( form );
    else if ( id == 'editOutcomeStepForm' ) updateOutcomeStep ( form );
    else if ( id == 'companyHeaderForm' ) saveCompanyHeaderInformation ( form );
    else if ( id == 'memberChecklistForm' ) saveMemberChecklist ( form );
    else if ( id == 'championChecklistForm' ) saveChampionChecklist ( form );
    else if ( id == 'citChecklistForm' ) saveCitChecklist ( form );
    else if ( modalname ) saveData ( $ ( form ), $ ( form ).attr ( 'mid' ), $ ( form ).attr ( 'modalname' ) );
    else if ( id == 'set_password' || id == 'mentor_status' || id == 'accept_match' || id == 'new_smart_match_notification') saveEditableEmailSettings ( form );
    else if ( id == 'group_list_desc') saveGroupListDescription ( form );
    else if ( id == 'resourcesListDesc') saveResourcesDescription ( form );
    else if ( id == 'connectionsListDesc') saveConnectionsDescription ( form );
    else if ( id == 'championLabelForm') saveChampionLabelForm ( form );
    else if ( id == 'memberLabelForm') saveMemberLabelForm ( form );
    else if ( id == 'member_champion_ratio' ) saveMemberAndChampionRatio( form )
    else if ( id == 'saveFieldsData' ) saveFieldsData( form )
    else if ( id == 'resourceCategoryForm' ) saveResourceCategory ( form );
    else form.submit ();
}

/**
 * Custom validation
 * letter only a-z
 */
$.validator.addMethod ( "lettersOnly", function ( value, element ) {
    return this.optional ( element ) || /^[a-z]+$/i.test ( value );
}, "Letters only please" );

/**
 * Validation fields
 * @type {{mentors : {user_consent : {required : (function(*) : boolean)}, btn_txt : {required : boolean}, form_name : {required : boolean}}, branding : {zip : {required : boolean}, country : {required : boolean}, website : {required : boolean, url : boolean}, city : {required : boolean}, address_1 : {required : boolean}, company_name : {minlength : number, required : boolean}, company_email : {required : boolean, email : boolean}, state : {required : boolean}, site_style : {required : boolean}}, login : {password : {minlength : number, required : boolean}, email : {required : boolean, email : boolean}}, videoRecorder : {list_id : {required : boolean}, widgetBtnText : {required : boolean}, userConsent : {required : (function(*) : boolean)}, widgetFontFamily : {required : boolean}, lang_id : {required : boolean}, widgetContent : {required : (function(*) : boolean)}, postWidgetContent : {required : (function(*) : boolean)}, transcribe_keywords : {required : boolean}, recorder_name : {required : boolean}, tags : {required : boolean}, privacy_chk : {required : boolean}}, branding_design : {link_color : {required : boolean}, feature_color : {required : boolean}, font_size : {required : boolean}, dashboard_color : {required : boolean}, text_color : {required : boolean}, site_style : {required : boolean}}, register : {password : {minlength : number, required : boolean}, password_confirmation : {minlength : number, equalTo : string, required : boolean}, phone : {minlength : number, maxlength : number, required : boolean}, subscription_package : {required : boolean}, last_name : {minlength : number, required : boolean, lettersOnly : boolean}, first_name : {minlength : number, required : boolean, lettersOnly : boolean}, email : {onkeyup : boolean, remote : {data : {_token : (*|jQuery|undefined)}, type : string, url : string}, required : boolean, email : boolean}}}}
 */
let rules = {
    login : {
        password : {
            required : true,
            minlength : 8
        },
        email : {
            required : true,
            email : true,
        },
    },
    register : {
        first_name : {
            required : true,
            minlength : 3,
            lettersOnly : true
        },
        last_name : {
            required : true,
            minlength : 3,
            lettersOnly : true
        },
        password : {
            required : true,
            minlength : 8
        },
        password_confirmation : {
            required : true,
            minlength : 8,
            equalTo : "#password"
        },
        email : {
            required : true,
            email : true,
            remote : {
                url : "check_email",
                type : "post",
                data : {
                    '_token' : $ ( 'meta[name="csrf-token"]' ).attr ( 'content' )
                },
            },
            onkeyup : false
        },
        name_on_card : {
            required : true,
        },
        card_number : {
            required : true
        },
        cvc_num : {
            required : true,
            minlength : 3,
            maxlength : 4
        },
        subscription_package : {
            required : true
        },
        agree : {
            required : true
        }
    },
    formRecorder : {
        recorder_form_type : {
            required : true
        },
        form_name : {
            required : true
        },
        postBtnTxt : {
            required: function(element){
                return $("#postBtnCheck").is(":checked");
            }
        },
        postBtnUrl : {
            required: function(element){
                return $("#postBtnCheck").is(":checked");
            },
            // url: true
        }
    },
    videoRecorder : {},
    mentors : {
        form_name : {
            required : true
        },
        btn_txt : {
            required : true
        },
        tags : {
            required : true,
        },
        widgetFontFamily : {
            required : true,
        },
        user_consent : {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            }
        }
    },
    branding : {
        company_name : {
            required : true,
            minlength : 3,
        },
        company_email : {
            required : true,
            email : true,
        },
        address_1 : {
            required : true
        },
        city : {
            required : true
        },
        state : {
            required : true
        },
        country : {
            required : true
        },
        zip : {
            required : true
        },
        website : {
            //required : true,
            url : true
        },
        site_style : {
            required : true
        }
    },
    branding_design : {
        sidebar_background : {
            required : true,
        },
        email_footer_color : {
            required : true,
        },
        email_header_color : {
            required : true,
        },
    },
    meets : {
        summary : {
            required : {
                depends : function () {
                    $ ( this ).val ( $.trim ( $ ( this ).val () ) );
                    return true;
                }
            },
        },
        start : {
            required : true,
        },
        end : {
            required : true,
        },
        location : {
            required : {
                depends : function () {
                    $ ( this ).val ( $.trim ( $ ( this ).val () ) );
                    return true;
                }
            },
        },
        attendees : {
            required : {
                depends : function () {
                    $ ( this ).val ( $.trim ( $ ( this ).val () ) );
                    return true;
                }
            },
        },
        description : {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            }
        },
        timezone : {
            required: function() {
                return $('#timezoneSelect').val() == '' || $('#timezoneSelect').val() == null;
            }
        }
    },
    tasks : {
        task_name : {
            required : {
                depends : function () {
                    $ ( this ).val ( $.trim ( $ ( this ).val () ) );
                    return true;
                }
            },
        },
        due_date : {
            required : true,
        },
        notes : {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            }
        },
    },
    notes : {
        notes : {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            }
        },
    },
    emails : {
        to : {
            required : {
                depends : function () {
                    $ ( this ).val ( $.trim ( $ ( this ).val () ) );
                    return true;
                }
            },
            email : true
        },
        subject : {
            required : {
                depends : function () {
                    $ ( this ).val ( $.trim ( $ ( this ).val () ) );
                    return true;
                }
            },
        },
        body : {
            required : function ( textarea ) {
                if ( CKEDITOR.instances[ textarea.id ] )
                    CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            }
        },
    },
    emailsettings : {
        from : {
            required : true,
            email : true
        },
        subject : {
            required : true,
        },
        name : {
            required : true,
        },
        desc : {
            required : true,
        },
        from_name : {
            required : true,
        }
    },
    testEmail : {
        to : {
            required : true,
            email : true
        },
        subject : {
            required : true,
        },
    },
    createCampaignList : {
        title : {
            required : true,
        },
    },
    workflow : {
        name : {
            required : true,
        },
    },
    zooms : {
        agenda : {
            required : {
                depends : function () {
                    $ ( this ).val ( $.trim ( $ ( this ).val () ) );
                    return true;
                }
            },
        },
        topic : {
            required : {
                depends : function () {
                    $ ( this ).val ( $.trim ( $ ( this ).val () ) );
                    return true;
                }
            },
        },
        "users[]" : {
            required : true
        },
        start_time : {
            required : true
        }
    },
    smss : {
        to : {
            required : {
                depends : function () {
                    $ ( this ).val ( $.trim ( $ ( this ).val () ) );
                    return true;
                }
            },
        },
        body : {
            required : {
                depends : function () {
                    $ ( this ).val ( $.trim ( $ ( this ).val () ) );
                    return true;
                }
            },
        },
    },
    workSettings : {},
    workflowNoti : {
        title : {
            required : true,
        },
        text : {
            required : true,
        },
    },
    workflowSms : {
        title : {
            required : true,
        },
        text : {
            required : true,
        },
    },
    listFilters : {
        'name[]' : {
            required : true,
        },
        'value[]' : {
            required : true,
        },
        'operator[]' : {
            required : true,
        },
    },
    import_user_form : {
        file : {
            required : true,
        }
    },
    champions_form : {
        first_name : {
            required : true,
            minlength : 3,
        },
        last_name : {
            required : true,
            minlength : 3,
        },
        age : {
            required : true
        },
        phone : {
            required : true,
            phoneValid : true
        },
        email : {
            required : true,
            email : true
        },
    },
    instructors_form : {
        first_name : {
            required : true,
            minlength : 3,
            maxlength : 50,
            noSpace : true
        },
        last_name : {
            required : true,
            minlength : 3,
            maxlength : 50,
            noSpace : true
        },
        phone : {
            required : true,
            phoneValid : true
        },
        email : {
            required : true,
            email : true
        },
    },
    courseForm : {
        title : {
            required : true,
            minlength : 3,
            maxlength : 50,
            noSpace : true
        }
    },
    chapterForm : {
        title : {
            required : true,
            minlength : 3,
            maxlength : 50,
            noSpace : true
        }
    },
    lessonForm : {
        title : {
            required : true,
            minlength : 3,
            maxlength : 50,
            noSpace : true
        },
        description : {
            required : function ( textarea ) {
                console.log("HELLO");
                console.log(textarea.id);
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            },
            minlength : 3,
            noSpace : true
        },
        zoom_url : {
            url : true,
            noSpace : true
        },
        zoom_date : {
            required : true,
            noSpace : true
        }


    },
    lessonQuizForm : {
        title : {
            required : true,
            minlength : 3,
            maxlength : 50,
            noSpace : true
        },
        description : {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            },
            minlength : 3,
            maxlength : 1000,
            noSpace : true
        }
    },
    saveFieldsData : {

    },
    quizForm : {
        questions : {
            required : true
        }
    },
    descriptionForm : {
        description : {
            required : true,
            minlength : 3,
            maxlength : 250,
            noSpace : true
        }
    },
    settingForm : {
        title : {
            required : true,
            minlength : 3,
            maxlength : 50,
            noSpace : true
        },
        instructor_id : {
            required : true
        }

    },
    userProfile : {
        first_name : {
            required : true,
            minlength : 3,
        },
        last_name : {
            required : true,
            minlength : 3,
        },
        age : {
            required : true,
            min : 5,
        },
        phone : {
            required : true,
            phoneValid : true
        },
        gender : {
            required : true,
        }
    },
    secondaryEmails : {
        email : {
            required : true,
            email : true,
            remote : {
                url : "/company/users/check_secondary_email",
                type : "post",
                data : {
                    '_token' : $ ( 'meta[name="csrf-token"]' ).attr ( 'content' )
                },
                async : false
            },
            onkeyup : false
        }
    },
    companyHeader : {
        image : {
            /*required: function(element){
                return $("#oldImage").val() == "";
            },*/
            accept : 'image/*'
        },
        title : {
            //required : true,
            noHTMLtags : true,
            maxlength: 1024
        },
        body : {
            //required : true,
            noHTMLtags : true,
            maxlength: 1024
        },
    },
    memberChecklist : {
        'checklists[0]': {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            },
            maxlength: 1024
        },
        'checklists[1]': {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            },
            maxlength: 1024
        },
        'checklists[2]': {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            },
            maxlength: 1024
        },
        'checklists[3]': {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            },
            maxlength: 1024
        }
    },
    championChecklist : {
        'checklists[0]': {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            },
            maxlength: 1024
        },
        'checklists[1]': {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            },
            maxlength: 1024
        },
        'checklists[2]': {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            },
            maxlength: 1024
        },
        'checklists[3]': {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            },
            maxlength: 1024
        }
    },
    citChecklist : {
        'checklists[0]': {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            },
            maxlength: 1024
        },
        'checklists[1]': {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            },
            maxlength: 1024
        },
        'checklists[2]': {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            },
            maxlength: 1024
        },
        'checklists[3]': {
            required : function ( textarea ) {
                CKEDITOR.instances[ textarea.id ].updateElement (); // update textarea
                var editorcontent = textarea.value.replace ( /<[^>]*>/gi, '' ); // strip tags
                return editorcontent.length === 0;
            },
            maxlength: 1024
        }
    },
    createListFromRecorder : {
        title : {
            required : true,
        },
    },
    createPost : {
        postBody : {
            required : true
        }
    },
    createZoom : {
        postTitle : {
            required : true
        },
        start_date : {
            required : true
        },
        timezone : {
            required : true
        }
    },
    createGroup : {
        group_name : {
            required : true
        },
        group_category : {
            required : true
        },
        capacity_value : {
            required : function () {
                return $("input[type='radio'][name='is_capacity']:checked").val() == 1;
            },
            min : 1,
            max : 999
        }
    },
    inviteUser : {
        user_members : {
            required : true
        }
    },
    test_form : {
        phone : {
            required : true,
            phoneValid : true
        },
        first_name : {
            required : true,
        },
        last_name : {
            required : true,
        },
        age : {
            required : true,
        },
    },
    createGoal : {
        title : {
            required : true,
            maxlength : 250
        }
    },
    outcomeForm : {
        title : {
            required : true,
            minlength : 3,
            maxlength : 250,
            noSpace : true,
            remote : {
                url : "outcomes/check_title",
                type : "post",
                data : {
                    '_token' : $ ( 'meta[name="csrf-token"]' ).attr ( 'content' )
                },
            }
        }
    },
    editOutcomeForm : {
        outcome_id : {
            required : true
        },
        title : {
            required : true,
            minlength : 3,
            maxlength : 250,
            noSpace : true,
            remote : {
                url : "outcomes/check_title",
                type : "post",
                data : {
                    '_token' : $ ( 'meta[name="csrf-token"]' ).attr ( 'content' ),
                    'outcome_id' : function () {
                        return $ ( '#editOutcomeModal' ).find ( '#outcomeId' ).val ();
                    }
                },
            }
        }
    },
    outcomeStepForm : {
        title : {
            required : true,
            minlength : 3,
            maxlength : 250,
            noSpace : true,
            remote : {
                url : "outcomes/check_step_title",
                type : "post",
                data : {
                    '_token' : $ ( 'meta[name="csrf-token"]' ).attr ( 'content' ),
                    'outcome_id' : function () {
                        return $ ( '#outcomeIdHF' ).val ();
                    }
                },
            }
        }
    },
    editOutcomeStepForm : {
        step_id : {
            required : true
        },
        title : {
            required : true,
            minlength : 3,
            maxlength : 250,
            noSpace : true,
            remote : {
                url : "outcomes/check_step_title",
                type : "post",
                data : {
                    '_token' : $ ( 'meta[name="csrf-token"]' ).attr ( 'content' ),
                    'outcome_id' : function () {
                        return $ ( '#outcomeIdHF' ).val ();
                    },
                    'step_id' : function () {
                        return $ ( '#editStepModal' ).find ( '#stepId' ).val ();
                    }
                },
            }
        }
    },
    set_password_email : {
        subject : {
            required : true
        },
        body : {
            required: function()
            {
                CKEDITOR.instances['set_password_body'].updateElement();
            },
            minlength:1
        }
    },
    group_list_desc : {
        body : {
            minlength: function()
            {
                CKEDITOR.instances['group_list_desc_body'].updateElement();
            }
        }
    },
    resourcesListDesc : {
        body : {
            minlength: function()
            {
                CKEDITOR.instances['resourcesListDescBody'].updateElement();
            }
        }
    },
    connectionsListDesc : {
        body : {
            minlength: function()
            {
                CKEDITOR.instances['connectionsListDescBody'].updateElement();
            }
        }
    },
    championLabelForm : {
        champion_label : {
            maxlength : 100,
        },
    },
    memberLabelForm : {
        member_label : {
            maxlength : 100,
        },
    },
    mentor_status_email : {
        subject : {
            required : true
        },
        body : {
            required: function()
            {
                CKEDITOR.instances['mentor_status_body'].updateElement();
            },
            minlength:1
        }
    },
    accept_match_email : {
        subject : {
            required : true
        },
        body : {
            required: function()
            {
                CKEDITOR.instances['accept_match_body'].updateElement();
            },
            minlength:1
        }
    },
    new_smart_match_notification_email : {
        subject : {
            required : true
        },
        body : {
            required: function()
            {
                CKEDITOR.instances['new_smart_match_notification_body'].updateElement();
            },
            minlength:1
        }
    },
    member_champion_ratio:{
        champion_ratio : {
            required : true,
            min : 1,
            max : 30
        },
        member_ratio : {
            required : true,
            min : 1,
            max : 30
        }
    },
    resourceCategoryForm : {
        name : {
            required : true,
            maxlength : 150,
            noSpace : true,
            remote : {
                url : "resources/category/isUniqueName",
                type : "post",
                data : {
                    '_token' : $ ( 'meta[name="csrf-token"]' ).attr ( 'content' ),
                    'resource_category_id' : function () {
                        return $ ( '#categoryModal' ).find ( 'input[name="resource_category_id"]' ).val ();
                    }
                },
            }
        },
        choose_visibility : {
            required : function () {
                return !($('input[name="is_visible_to_champion"]').is(':checked') || $('input[name="is_visible_to_cit"]').is(':checked') || $('input[name="is_visible_to_member"]').is(':checked'));
            }
        },
    }
};

/**
 *
 * @type {string | ((regexp: (string | RegExp)) => number) | ((searcher: {[Symbol.search](string: string) : number}) => number)}
 */
const queryString = window.location.search, urlParams = new URLSearchParams ( queryString ),
    plan_id = urlParams.get ( 'plan' )
if ( plan_id == 3 || plan_id == 4 ) rules.register[ 'phone' ] = { required : true }

/**
 * Validation messages
 * @type {{mentors : {btn_txt : {required : string}, userConsent : {required : string}, form_name : {required : string}}, branding : {zip : {required : string}, country : {required : string}, website : {required : string, url : string}, city : {required : string}, address_1 : {required : string}, company_name : {required : string}, company_email : {remote : string, required : string, email : string}, state : {required : string}}, login : {password : {minlength : string, required : string}, email : {required : string, email : string}}, videoRecorder : {list_id : {required : string}, widgetBtnText : {required : string}, widgetFontFamily : {required : string}, userConsent : {required : string}, lang_id : {required : string}, postBtnTxt : {required : string}, widgetContent : {required : string}, postWidgetContent : {required : string}, postBtnUrl : {required : string, url : string}, recorder_name : {required : string}, tags : {required : string}, privacy_chk : {required : string}}, branding_design : {link_color : {required : string}, feature_color : {required : string}, dashboard_color : {required : string}, text_color : {required : string}, site_style : {required : string}}, register : {password : {minlength : string, required : string}, password_confirmation : {minlength : string, equalTo : string, required : string}, phone : {minlength : string, phone : string, maxlength : string, required : string}, subscription_package : {subscription_package : string, required : string}, last_name : {minlength : string, required : string}, first_name : {minlength : string, required : string}, email : {remote : string, required : string, email : string}}}}
 */
let messages = {
    login : {
        password : {
            required : "Please provide a password",
            minlength : "Your password must be at least 8 characters long"
        },
        email : {
            required : "Please enter your email address.",
            email : "Please enter a valid email address.",
        }
    },
    register : {
        first_name : {
            required : "Please enter first name",
            minlength : "Your firstname must consist of at least 3 characters"
        },
        last_name : {
            required : "Please enter last name",
            minlength : "Your lastname must consist of at least 3 characters"
        },
        password : {
            required : "Please provide a password",
            minlength : "Your password must be at least 8 characters long"
        },
        password_confirmation : {
            required : "Please provide a password",
            minlength : "Your password must be at least 8 characters long",
            equalTo : "Please enter the same password as above"
        },
        email : {
            required : "Please enter your email address.",
            email : "Please enter a valid email address.",
            remote : "The email you enter is already in use please choose another!"
        },
        subscription_package : {
            required : "Please select plan",
            subscription_package : "Please select plan",
        },
        phone : {
            required : "Please enter phone number",
            phone : "Please enter phone number"
        },
    },
    formRecorder : {
        recorder_form_type : {
            required : 'Please Select Form Type'
        },
        form_name : {
            required : 'Please Enter Form Name'
        },
        postBtnTxt : {
            required : 'Please Enter Button Text'
        },
        postBtnUrl : {
            required : 'Please Enter Redirect URL'
        },
    },
    videoRecorder : {
        widgetBtnText : {
            required : "Please enter form button text"
        },
        list_id : {
            required : "Please select list"
        },
        recorder_name : {
            required : "Please enter recorder name"
        },
        tags : {
            required : "Please enter 1 or more tags"
        },
        widgetContent : {
            required : "Please enter widget content"
        },
        lang_id : {
            required : "Please select language"
        },
        privacy_chk : {
            required : "Please enter 1 or more privacy checks"
        },
        widgetFontFamily : {
            required : "Please select font family"
        },
        userConsent : {
            required : "Please enter user consent content"
        },
        postWidgetContent : {
            required : "Please enter post recorder Thank you page content"
        },
        postBtnTxt : {
            required : "Please enter post recorder Thank you page content"
        },
        postBtnUrl : {
            required : "Please enter post button URL",
            url : "Please enter valid url"
        },
    },
    mentors : {
        form_name : {
            required : "Please enter recorder name"
        },
        userConsent : {
            required : "Please enter user consent content"
        },
        btn_txt : {
            required : "Please enter submit button text"
        },
        widgetFontFamily : {
            required : "Please select font family"
        },

    },
    branding : {
        company_name : {
            required : "Please enter company name"
        },
        company_email : {
            required : "Please enter company email address.",
            email : "Please enter a valid email address.",
            remote : "It seems that this company already existed in our system please choose another!"
        },

        address_1 : {
            required : "Please enter address"
        },
        city : {
            required : "Please enter city"
        },
        state : {
            required : "Please enter state"
        },
        country : {
            required : "Please enter country"
        },
        zip : {
            required : "Please enter zip"
        },
        website : {
            //required : "Please enter your website address",
            url : "Please enter valid url"
        }
    },
    branding_design : {
        site_style : {
            required : "Please select font style",
        },
        text_color : {
            required : "Please enter or select text color",
        },
        dashboard_color : {
            required : "Please enter or select dashboard color",
        },
        feature_color : {
            required : "Please enter or select feature color",
        },
        link_color : {
            required : "Please enter or select link color",
        }
    },
    workflowNoti : {
        title : {
            required : "Please enter notification title",
        },
        text : {
            required : "Please enter notification text",
        },
    },
    workflowSms : {
        title : {
            required : "Please enter sms title",
        },
        text : {
            required : "Please enter sms text",
        },
    },
    champions_form : {
        first_name : {
            required : "Please enter first name",
            minlength : "Your firstname must consist of at least 3 characters"
        },
        last_name : {
            required : "Please enter last name",
            minlength : "Your lastname must consist of at least 3 characters"
        },
        email : {
            required : "Please enter your email address.",
            email : "Please enter a valid email address.",
        },
        phone : {
            required : "Please enter phone number",
            phone : "Please enter phone number",
        },
    },
    instructors_form : {
        first_name : {
            required : "Please enter first name",
            minlength : "Your firstname must consist of at least 3 characters"
        },
        last_name : {
            required : "Please enter last name",
            minlength : "Your lastname must consist of at least 3 characters"
        },
        email : {
            required : "Please enter your email address.",
            email : "Please enter a valid email address.",
        },
        phone : {
            required : "Please enter phone number",
            phone : "Please enter phone number",
        },
    },
    courseForm : {
        title : {
            required : "Please enter course name",
            minlength : "Your course name must consist of at least 3 characters"
        }
    },
    chapterForm : {
        title : {
            required : "Please enter chapter name",
            minlength : "Your chapter name must consist of at least 3 characters"
        }
    },
    descriptionForm : {
        description : {
            required : "Please enter description",
            minlength : "Your characters must consist of at least 3"
        }
    },
    settingForm : {
        title : {
            required : "Please enter course name",
            minlength : "Your chapter name must consist of at least 3 characters"
        },
        instructor_id : {
            required : "Please Select any one instructor"
        }
    },
    lessonForm : {
        title : {
            required : "Please enter lesson name",
            minlength : "Your lesson name must consist of at least 3 characters"
        },
        zoom_url : {
            required : "Please enter zoom url",
            url : "Please enter valid url"
        },
        zoom_date : {
            required : "Please select date and time",
            minlength : "Your zoom url must consist of at least 3 characters"
        },
        description : {
            required : "Please enter description",
            minlength : "Your characters must consist of at least 3",
            maxlength : "Please enter no more than 1000 characters"
        }
    },
    lessonQuizForm : {
        title : {
            required : "Please enter lesson name",
            minlength : "Your lesson name must consist of at least 3 characters"
        },
        description : {
            required : "Please enter description",
            minlength : "Your characters must consist of at least 3"
        }
    },
    quizForm : {
        questions : {
            required : "Question is required"
        }
    },
    userProfile : {
        age : {
            min : "Minimum age should be 5 years old."
        }
    },
    secondaryEmails : {
        email : {
            required : "Please enter your secondary email address.",
            email : "Please enter a valid email address.",
            remote : "The email you enter is already existed please choose another!"
        }
    },
    companyHeader : {
        image : {
            required : "Please choose header image.",
        }
    },
    createPost : {
        postBody : {
            required : "Please write some description of post",
        }
    },
    createGroup : {
        group_name : {
            required : "Please group name.",
        },
        group_category : {
            required : "Please select category.",
        },
        capacity_value : {
            min : "Please enter a number between 1 and 999",
            max : "Please enter a number between 1 and 999"
        }
    },
    inviteUser : {
        user_members : {
            required : "Please select one or more user to invite",
        }
    },
    createGoal : {
        title : {
            required : 'Please provide the title for this goal',
            maxlength : 'Goal title can be of maximum 250 characters in length'
        }
    },
    outcomeForm : {
        title : {
            required : "Please enter outcome title",
            minlength : "Your outcome title must consist of at least 3 characters",
            remote : "The title has already been taken."
        }
    },
    editOutcomeForm : {
        title : {
            required : "Please enter outcome title",
            minlength : "Your outcome title must consist of at least 3 characters",
            remote : "The title has already been taken."
        }
    },
    outcomeStepForm : {
        title : {
            required : "Please enter outcome step title",
            minlength : "Your outcome step title must consist of at least 3 characters",
            remote : "The title has already been taken."
        }
    },
    editOutcomeStepForm : {
        title : {
            required : "Please enter outcome step title",
            minlength : "Your outcome step title must consist of at least 3 characters",
            remote : "The title has already been taken."
        }
    },
    resourceCategoryForm : {
        name : {
            required : "Please enter category name",
            remote : "The name has already been taken."
        },
        choose_visibility : {
            required : "Please choose 1 or more visibility checks"
        }
    },
    member_champion_ratio:{
        champion_ratio : {
            min : 'Please enter a value between 1 and 30',
            max : 'Please enter a value between 1 and 30'
        },
        member_ratio : {
            min : 'Please enter a value between 1 and 30',
            max : 'Please enter a value between 1 and 30'
        }
    },
};

/**
 * Additional validation handle
 * error classes toggle
 */
$ ( "input,select" ).on ( "change", function () {
    if ( $ ( this ).val () !== '' ) {
        $ ( this ).parent ().removeClass ( 'has-error' )
        $ ( this ).parent ().find ( 'label.error' ).remove ();
    }
} )
