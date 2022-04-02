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
    <title>{{ $page_title }} - {{ config('app.name', "Gian’s Music") }}</title>

    <!--======================================================== Header CSS Files =========================================================-->
    @include('components.head')

    <!--======================================================== Extra CSS Files =========================================================-->
    @yield('extra_css')

    <script type="text/javascript">
        var userId = "{{ request () -> user () === null ? 'null' : request () -> user () -> id }}";
        localStorage.setItem("userId", userId);
        var base_url = '{{ config('app.url')  }}'
        var csrf_token = '{{ csrf_token() }}'
    </script>

</head>
<body>

    <noscript>
        <strong>We're sorry but this page doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <script src="{{asset('js/app.js')}}"></script>

</body>
</html>
