@section('extra_css')
    <!-- Sweet Alert -->
    <link href="{{ asset ( 'css/sweetalert.css' ) }}" rel="stylesheet">
    <!-- Ladda style -->
    <link href="{{ asset ( 'css/ladda-themeless.min.css' ) }}" rel="stylesheet">
    <link href="{{ asset ( 'css/auth.css' ) }}" rel="stylesheet">
    <link rel="stylesheet" href=" {{ asset('tel-input/css/intlTelInput.min.css') }}">

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
    <script src="{{ asset('/tel-input/js/intlTelInput.min.js') }} "></script>

    <script src="{{ asset ( 'js/api.js' ) }}"></script>
    <script src="{{ asset ( 'js/form_validation.js' ) }}"></script>
    <script src="{{ asset ( 'js/auth.js' ) }}"></script>


@endsection

<x-guest-layout>
    <x-slot name="page_title">{{ __('Sign Up') }}</x-slot>
    <x-auth-card>
        <x-slot name="authLabel">Sign Up</x-slot>
        <form id="register-form" method="POST" action="{{ route('register') }}" class="bg-color1 auth-form"
              autocomplete="false">
            <div class="form-text-label">
                <span>Already have an Account? <a href="{{ route ( 'login' ) }}"><b>Sign In</b></a></span>
            </div>

            <input type="hidden" name="_token" value="{{ csrf_token () }}"/>

            <!-- Name -->
            <div class="form-group mb-0">
                <x-label for="name" :value="__('Name')"/>
                <x-input id="name" class="form-control" type="text" name="name" :value="old('name')" required
                         autofocus/>
            </div>

            <!-- Email Address -->
            <div class="form-group mb-0">
                <x-label for="email" :value="__('Email')"/>
                <x-input id="email" class="form-control" type="email" name="email" :value="old('email')" required/>
            </div>

            <!-- Phone Address -->
            <div class="form-group">
                <x-label for="phone" :value="__('Phone')"/>
                <x-input type="text" class="form-control" id="phone" name="phone" required autofocus/>
            </div>

            <!-- Password -->
            <div class="form-group mb-0">
                <x-label for="password" :value="__('Password')"/>
                <x-input id="password" class="form-control" type="password" name="password" required
                         autocomplete="new-password"/>
            </div>

            <!-- Confirm Password -->
            <div class="form-group mb-0">
                <x-label for="password_confirmation" :value="__('Confirm Password')"/>
                <x-input id="password_confirmation" class="form-control" type="password" name="password_confirmation"
                         required/>
            </div>

            <div class="form-group">
                <!-- Session Status -->
                <x-auth-session-status class="text-left" :status="session('status')"/>
                <!-- Validation Errors -->
                <x-auth-validation-errors class="text-left" :errors="$errors"/>
            </div>

            <div class="form-group">
                <button class="btn btn-dark btn-icon ladda-button ladda-button-demo"
                        data-style="zoom-in" type="submit">
                    <i class="fa fa-sign-in"></i>
                    <span class="ladda-spinner"></span>
                    <span class="ladda-label ">Sign Up</span>
                </button>
            </div>

        </form>
    </x-auth-card>
</x-guest-layout>
