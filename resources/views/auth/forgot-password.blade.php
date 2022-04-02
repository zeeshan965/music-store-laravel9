@section('extra_css')
    <link href="{{ asset ( 'css/auth.css' ) }}" rel="stylesheet">
    <style>

    </style>
@endsection

@section( 'extra_js' )
    <!-- Jquery Validate -->
    <script src="{{ asset ( 'js/jquery.validate.min.js' ) }}"></script>
    <script src="{{ asset ( 'js/form_validation.js' ) }}"></script>
    <script src="{{ asset ( 'js/auth.js' ) }}"></script>

@endsection

<x-guest-layout>
    <x-slot name="page_title">{{ __('Forgot Password') }}</x-slot>
    <x-auth-card>
        <x-slot name="authLabel">Forgot Password</x-slot>

        <form id="forgot-form" method="POST" action="{{ route('password.email') }}" class="bg-color1 auth-form"
              autocomplete="false">
            <input type="hidden" name="_token" value="{{ csrf_token () }}"/>

            <div class="form-text-label">
                {{ __('Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}
            </div>

            <!-- Email Address -->
            <div class="form-group">
                <x-label for="email" :value="__('Email')"/>
                <x-input id="email" class="form-control" type="email" name="email" :value="old('email')" required autofocus/>
            </div>

            <div class="form-group">
                <!-- Session Status -->
                <x-auth-session-status class="text-left" :status="session('status')"/>
                <!-- Validation Errors -->
                <x-auth-validation-errors class="text-left" :errors="$errors"/>
            </div>

            <div class="form-group">
                <button class="btn btn-dark btn-icon" type="submit">
                    <i class="fa fa-sign-in"></i>
                    <span>{{ __('Email Password Reset Link') }}</span>
                </button>
            </div>
        </form>

    </x-auth-card>
</x-guest-layout>
