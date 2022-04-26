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
    <title>{{ config('app.name', "Gian’s Music") }}</title>

    <!--======================================================== Header CSS Files =========================================================-->
    @include('vendor.multiauth.layouts.head')

    <!--======================================================== Extra CSS Files =========================================================-->
    @yield('extra_css')

    <script type="text/javascript">
        var userId = "{{ request () -> user () === null ? 'null' : request () -> user () -> id }}";
        var loggedInUser = JSON.parse('@php echo request () -> user () === null ? 'null' : request () -> user () -> toJson() @endphp');
        localStorage.setItem("userId", userId);
        var base_url = '{{ config('app.url')  }}'
        var csrf_token = '{{ csrf_token() }}'
        var appName = '{{config('app.name', 'Laravel')}}';
        var userType = '{{ ucfirst(config('multiauth.prefix')) }}';
    </script>

</head>
<body class="hold-transition dark-mode sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">

    @include('multiauth::message')

    @include('vendor.multiauth.layouts.header')
    <main class="py-4">
        @yield('content')
    </main>

    <!-- Page Footer -->
    @include('vendor.multiauth.layouts.footer')

    <!--======================================================== Extra JS Files =========================================================-->
    @yield('extra_js')

</body>
</html>
