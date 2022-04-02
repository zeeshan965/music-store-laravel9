@section('extra_css')
    <!-- Sweet Alert -->
    <link href="{{ asset ( 'css/sweetalert.css' ) }}" rel="stylesheet">
    <!-- Ladda style -->
    <link href="{{ asset ( 'css/ladda-themeless.min.css' ) }}" rel="stylesheet">
    <link href="{{ asset ( 'css/auth.css' ) }}" rel="stylesheet">

@endsection

@section( 'extra_js' )
    <!-- Sweet alert -->
    <script src="{{ asset ( 'js/sweetalert.min.js' ) }}"></script>

    <!-- Jquery Validate -->
    <script src="{{ asset ( 'js/jquery.validate.min.js' ) }}"></script>
    <script src="{{ asset ( 'js/additional-methods.min.js' ) }}"></script>
    <!-- Ladda -->
    <script src="{{ asset ( 'js/spin.min.js' ) }}"></script>
    <script src="{{ asset ( 'js/ladda.min.js' ) }}"></script>
    <script src="{{ asset ( 'js/ladda.jquery.min.js' ) }}"></script>
    <script src="{{ asset ( 'js/api.js' ) }}"></script>
    <script src="{{ asset ( 'js/form_validation.js' ) }}"></script>
    <script src="{{ asset ( 'js/auth.js' ) }}"></script>

@endsection

<x-guest-layout>
    <x-slot name="page_title">{{ __('Login') }}</x-slot>

    <x-auth-card>
        <x-slot name="authLabel">Login</x-slot>
        <form id="login-form" method="POST" action="{{ route('login') }}" class="bg-color1 auth-form" autocomplete="false">
            <div class="form-text-label">
                <span>New to Music Store? <a href="{{ route ( 'register' ) }}"><b>Sign Up</b></a></span>
            </div>

            <input type="hidden" name="_token" value="{{ csrf_token () }}"/>

            <!-- Email Address -->
            <div class="form-group">
                <x-input type="email" class="form-control" id="email" placeholder="Enter email" name="email"
                         :value="old('email')" required autofocus/>
            </div>

            <!-- Password -->
            <div class="form-group">
                <x-input type="password" class="form-control" id="password" placeholder="Enter password"
                         name="password" required autocomplete="current-password"/>
            </div>

            <div class="form-group">
                <!-- Session Status -->
                <x-auth-session-status class="text-left" :status="session('status')"/>
                <!-- Validation Errors -->
                <x-auth-validation-errors class="text-left" :errors="$errors"/>
            </div>

            <div>
                @if (Route::has('password.request'))
                    <a class="underline text-sm text-gray-600 hover:text-gray-900"
                       href="{{ route('password.request') }}">
                        {{ __('Forgot your password?') }}
                    </a>
                @endif
                <div class="form-group">
                    <button class="btn btn-dark btn-icon ladda-button ladda-button-demo"
                            data-style="zoom-in" type="submit">
                        <i class="fa fa-sign-in"></i>
                        <span class="ladda-spinner"></span>
                        <span class="ladda-label ">LOGIN</span>
                    </button>
                </div>
            </div>
        </form>

    </x-auth-card>
</x-guest-layout>
