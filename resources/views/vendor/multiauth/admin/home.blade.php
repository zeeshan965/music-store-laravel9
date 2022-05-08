@extends('multiauth::layouts.app')

@section('extra_css')
    <link rel="stylesheet" href="{{ asset( 'plugins/datatables-bs4/css/dataTables.bootstrap4.min.css' ) }}">
    <link rel="stylesheet" href="{{ asset( 'plugins/datatables-responsive/css/responsive.bootstrap4.min.css' ) }}">
    <link rel="stylesheet" href="{{ asset( 'plugins/datatables-buttons/css/buttons.bootstrap4.min.css' ) }}">

@endsection

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
