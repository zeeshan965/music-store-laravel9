<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">

    <meta name="keywords" content=""/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>

    <!-- Mobile Meta Tag -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!--======================================================== Title =========================================================-->
    <title>{{ $page_title }} - {{ config('app.name', 'Music Store') }}</title>

    <!--======================================================== Header CSS Files =========================================================-->
    @include('components.head')

    <!--======================================================== Extra CSS Files =========================================================-->
    @yield('extra_css')

</head>
<body>
    <!-- Page Header -->
    @include('components.header')

    <!-- Page Content -->
    <main>
        {{ $slot }}
    </main>

    <!-- Page Footer -->
    @include('components.footer')

    <!--======================================================== Extra JS Files =========================================================-->
    @yield('extra_js')

</body>
</html>
