<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="{{ url('/admin') }}" class="brand-link">
        <img src="{{ asset( 'dist/img/AdminLTELogo.png' ) }}" alt="AdminLTE Logo"
             class="brand-image img-circle elevation-3" style="opacity: 0.8;"/>
        <span class="brand-text font-weight-light">AdminLTE 3</span>
    </a>
    <div class="sidebar">
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                data-accordion="false">
                <li class="nav-item">
                    <a href="{{ url( '/admin/users' ) }}" class="nav-link">
                        <i class="nav-icon far fa-image"></i>
                        <p>Users</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="pages/gallery.html" class="nav-link">
                        <i class="nav-icon far fa-image"></i>
                        <p>
                            Subscriptions
                        </p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="pages/gallery.html" class="nav-link">
                        <i class="nav-icon far fa-image"></i>
                        <p>
                            Albums
                        </p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="pages/gallery.html" class="nav-link">
                        <i class="nav-icon fas fa-photo-video"></i>
                        <p>
                            Media
                        </p>
                    </a>
                </li>
                <li class="nav-item @if(Request::segment(2) == 'show' || Request::segment(2) == 'register') menu-is-opening menu-open @endif">
                    <a href="{{ url( 'admin/show' ) }}" class="nav-link">
                        <i class="nav-icon fas fa-users fa-fw"></i>
                        <p>Manage Admins</p>
                    </a>
                </li>
                <li class="nav-item @if(Request::segment(2) == 'roles' || Request::segment(2) == 'role') menu-is-opening menu-open @endif">
                    <a class="nav-link" href="{{ url( 'admin/roles' ) }}">
                        <i class="nav-icon fas fa-user-tag fa-fw"></i>
                        <p>Manage Roles</p>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</aside>
