@section('extra_css')
    <!-- Sweet Alert -->
    <link href="{{ asset ( 'css/sweetalert.css' ) }}" rel="stylesheet">
    <!-- Ladda style -->
    <link href="{{ asset ( 'css/ladda-themeless.min.css' ) }}" rel="stylesheet">
    <link href="{{ asset ( 'css/auth.min.css' ) }}" rel="stylesheet">
    <link rel="stylesheet" href= " {{ asset('tel-input/css/intlTelInput.min.css') }}">

@endsection

@section( 'extra_js' )
    <script>
        var utilsScript = "{{ asset('/tel-input/js/utils.js') }} "
    </script>

    <!-- Sweet alert -->
    <script src="{{ asset ( 'js/sweetalert.min.js' ) }}"></script>

    <!-- Jquery Validate -->
    <script src="{{ asset ( 'js/jquery.validate.min.js' ) }}"></script>
    <script src="{{ asset ( 'js/additional-methods.min.js' ) }}"></script>
    <!-- Ladda -->
    <script src="{{ asset ( 'js/spin.min.js' ) }}"></script>
    <script src="{{ asset ( 'js/ladda.min.js' ) }}"></script>
    <script src="{{ asset ( 'js/ladda.jquery.min.js' ) }}"></script>
    <script src = "{{ asset('/tel-input/js/intlTelInput.min.js') }} "></script>

    <script src="{{ asset ( 'js/api.js' ) }}"></script>
    <script src="{{ asset ( 'js/form_validation.js' ) }}"></script>
    <script src="{{ asset ( 'js/auth.js' ) }}"></script>

@endsection

<x-app-layout>
    <x-slot name="page_title">{{ __("Profile") }}</x-slot>
    <section id="home">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="section-title center">Update Profile</h1>

                    <div id="form-wrap" class="col-sm-5 center">
                        <form id="user-profile" method="POST" action="{{ route('profile') }}" class="bg-color1 auth-form"
                              autocomplete="false">

                            <input type="hidden" name="_token" value="{{ csrf_token () }}"/>

                            <!-- Name -->
                            <div class="form-group">
                                <x-label for="name" :value="__('Name')"/>
                                <x-input type="text" class="form-control" id="name" placeholder="Enter Name"
                                         name="name" value="{{ $user -> name }}"
                                         required autofocus/>
                            </div>

                            <!-- Email Address -->
                            <div class="form-group">
                                <x-label for="email" :value="__('Email')"/>
                                <x-input type="email" class="form-control" id="email" placeholder="Enter email"
                                         value="{{ $user -> email }}" readonly autofocus/>
                            </div>

                            <!-- Phone Address -->
                            <div class="form-group">
                                <x-label for="phone" :value="__('Phone')"/>
                                <x-input type="text" class="form-control" id="phone" placeholder="Enter phone"
                                         name="phone" value="{{ $user -> phone }}" required autofocus/>
                            </div>

                            <div class="form-group">
                                <label for="Password" class="control-label">Password</label>
                                <div>
                                    <button type="button" id="btn-change-password" class="btn btn-default">
                                        Change Password
                                    </button>
                                </div>
                            </div>

                            <div class="form-group">
                                <!-- Session Status -->
                                <x-auth-session-status class="text-left" :status="session('status')"/>
                                <!-- Validation Errors -->
                                <x-auth-validation-errors class="text-left" :errors="$errors"/>
                            </div>

                            <div class="form-group">
                                <button class="btn btn-dark btn-icon"
                                        data-style="zoom-in" type="submit">
                                    <i class="fa fa-pencil-square-o"></i>
                                    <span>Update Profile</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="modal fade" id="password-modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id="update-password" action="" method="post" class="form-horizontal" autocomplete="off">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Change Password</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="CurrentPassword" class="col-sm-4 pass-label">Current password</label>
                            <div class="col-sm-7">
                                <input type="password" class="form-control" id="currentPassword" name="currentPassword"
                                       placeholder="Current password" required="" aria-required="true">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="Password" class="col-sm-4 pass-label">New password</label>
                            <div class="col-sm-7">
                                <input type="password" class="form-control" id="password" name="password"
                                       placeholder="New password" required="" aria-required="true">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="Password2" class="col-sm-4 pass-label">Re-enter</label>
                            <div class="col-sm-7">
                                <input type="password" class="form-control" id="password_confirmation" name="password_confirmation"
                                       placeholder="Re-enter new password" required="" aria-required="true">
                            </div>
                        </div>
                        <div id="pg-password-status" class="alert hidden"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary btn-password-save">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</x-app-layout>
