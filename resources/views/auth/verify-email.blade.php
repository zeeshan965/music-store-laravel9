@section('extra_css')
    <link href="{{ asset ( 'css/auth.css' ) }}" rel="stylesheet">
    <style>
        #register-form{
            color: #FFFFFF;
        }
    </style>
@endsection

<x-guest-layout>
    <x-slot name="page_title">{{ __('Email Verification') }}</x-slot>
    <x-auth-card>
        <x-slot name="authLabel">Email Verification</x-slot>
        <div id="register-form" class="auth-form">
            {{ __('Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.') }}

            @if (session('status') == 'verification-link-sent')
                <div style="margin-top: 10px">
                    {{ __('A new verification link has been sent to the email address you provided during registration.') }}
                </div>
            @endif

            <form method="POST" action="{{ route('verification.send') }}">
                @csrf
                <button type="submit" class="btn btn-default">
                    {{ __('Resend Verification Email') }}
                </button>
            </form>

            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="btn btn-primary">
                    {{ __('Log Out') }}
                </button>
            </form>

        </div>
    </x-auth-card>
</x-guest-layout>
