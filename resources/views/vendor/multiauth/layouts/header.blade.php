<nav class="main-header navbar navbar-expand navbar-dark">
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button">
                <i class="fas fa-bars"></i>
            </a>
        </li>
    </ul>

    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown user-menu">
            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">

                <img src="{{ asset( 'dist/img/user2-160x160.jpg' ) }}" class="user-image img-circle elevation-2"
                     alt="User Image"/>
                <span class="d-none d-md-inline">{{ Auth::user()->name }}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right">

                <li class="user-header bg-primary">
                    <img src="{{ asset( 'dist/img/user2-160x160.jpg' ) }}"
                         class="img-circle elevation-2" alt="User Image"/>
                    <p>
                        {{ Auth::user()->name }} - {{ ucfirst(config('multiauth.prefix')) }}
                    </p>
                </li>

                <li class="user-footer">
                    <a href="{{ url( 'admin/password/change' ) }}" class="btn btn-default btn-flat">Change Password</a>
                    <a href="{{ url( 'admin/logout' ) }}" onClick={logout} class="btn btn-default btn-flat float-right">Sign
                        out</a>

                    <form id="logout-form" action="{{ url( 'admin/logout' ) }}" method="POST" style="display: none;">
                        <input type="hidden" name="_token" value={props.token}/>
                    </form>
                </li>
            </ul>
        </li>
    </ul>
</nav>
