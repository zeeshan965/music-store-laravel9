@if(in_array(Request::segment(2),$allowedPages) || in_array(Request::segment(3),$allowedPages))
    <div class="wrapper">
        <footer class="main-footer">
            <strong>Copyright &copy; 2022
                <a href="{{ config('app.url')  }}">  {{config('app.name', 'Laravel')}} </a>.
            </strong>
            All rights reserved.
            <div class="float-right d-none d-sm-inline-block">
                <b>Version</b> 1.0
            </div>
        </footer>
    </div>
@endif



<script src="{{ asset( 'plugins/jquery/jquery.min.js' ) }}"></script>
<!-- Bootstrap -->
<script src="{{ asset( 'plugins/bootstrap/js/bootstrap.bundle.min.js' ) }}"></script>
<!-- overlayScrollbars -->
<script src="{{ asset( 'plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js' ) }}"></script>
<!-- AdminLTE App -->
<script src="{{ asset( 'dist/js/adminlte.js' ) }}"></script>

