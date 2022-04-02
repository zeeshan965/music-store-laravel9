@section('extra_css')
    <link href="{{ asset ( 'css/auth.css' ) }}" rel="stylesheet">
@endsection

@section( 'extra_js' )
    <!-- Jquery Validate -->
    <script src="{{ asset ( 'js/jquery.validate.min.js' ) }}"></script>
    <script src="{{ asset ( 'js/form_validation.js' ) }}"></script>
    <script src="{{ asset ( 'js/auth.js' ) }}"></script>

@endsection

<x-guest-layout>
    <x-slot name="page_title">{{ __('Reset Password') }}</x-slot>
    <x-auth-card>
        <x-slot name="authLabel">Reset Password</x-slot>

        <form id="reset-password-form" method="POST" action="{{ route('password.update') }}" class="bg-color1 auth-form" autocomplete="false">

            <input type="hidden" name="_token" value="{{ csrf_token () }}"/>

            <!-- Password Reset Token -->
            <input type="hidden" name="token" value="{{ $request->route('token') }}">

            <!-- Email Address -->
            <div class="form-group mb-0">
                <x-label for="email" :value="__('Email')"/>
                <x-input id="email" class="form-control" type="email" name="email" :value="old('email', $request->email)" readonly/>
            </div>

            <!-- Password -->
            <div class="form-group mb-0">
                <x-label for="password" :value="__('Password')"/>
                <x-input id="password" class="form-control" type="password" name="password" required/>
            </div>

            <!-- Confirm Password -->
            <div class="form-group mb-0">
                <x-label for="password_confirmation" :value="__('Confirm Password')"/>
                <x-input id="password_confirmation" class="form-control" type="password" name="password_confirmation" required/>
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
                    <span>{{ __('Reset Password') }}</span>
                </button>
            </div>
        </form>

    </x-auth-card>
</x-guest-layout>
