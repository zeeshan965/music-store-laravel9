@extends('multiauth::layouts.guest')
@section('extra_css')
    <style>
        .login-card-body .input-group .is-invalid {
            border-right: 1px solid #dc3545;
            border-top-right-radius: .25rem !important;
            border-bottom-right-radius: .25rem !important;
        }
        .invalid-feedback{
            display: block;
        }
    </style>
@endsection
@section('content')
    <div class="login-box">
        <div class="login-logo">
            <a href="javascript:;"><b>Gian's Music</b> Admin</a>
        </div>
        <!-- /.login-logo -->
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">{{ ucfirst(config('multiauth.prefix')) }} Login</p>
                <form method="POST" action="{{ route('admin.login') }}" aria-label="{{ __('Admin Login') }}">
                    @csrf
                    <div class="input-group mb-3">
                        <input id="email" type="email" placeholder="Email"
                               class="form-control {{ $errors->has('email') ? ' is-invalid' : '' }}"
                               name="email" value="{{ old('email') }}"
                               required autofocus/>
                        @if (!$errors->has('email'))
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        @endif


                        <div class="col-md-12">
                            @if ($errors->has('email'))
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                            @endif
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input id="password" type="password" placeholder="Password"
                               class="form-control {{ $errors->has('password') ? ' is-invalid' : '' }}"
                               name="password" required/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                        <div class="col-md-12">
                            @if ($errors->has('password'))
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                            @endif
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <div class="icheck-primary">
                                <input type="checkbox" name="remember"
                                       id="remember" {{ old( 'remember') ? 'checked' : '' }}>
                                <label for="remember">
                                    Remember Me
                                </label>
                            </div>
                        </div>
                        <!-- /.col -->
                        <div class="col-4">
                            <button type="submit" class="btn btn-primary btn-block">Login</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>


                <p class="mb-1">
                    <a href="{{ route('admin.password.request') }}">
                        {{ __('Forgot Your Password?') }}
                    </a>
                </p>
            </div>
            <!-- /.login-card-body -->
        </div>
    </div>
@endsection
