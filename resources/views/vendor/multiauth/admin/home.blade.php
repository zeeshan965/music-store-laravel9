@extends('multiauth::layouts.app')

@section('extra_js')
    <script src="{{asset('js/app.js')}}"></script>
@endsection
@section('content')

    <noscript>
        <strong>We're sorry but this page doesn't work properly without JavaScript enabled. Please
            enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    @csrf
@endsection
