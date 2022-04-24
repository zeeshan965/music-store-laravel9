<nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">



        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left Side Of Navbar -->
            <ul class="navbar-nav mr-auto">

            </ul>

            <!-- Right Side Of Navbar -->
            <ul class="navbar-nav ml-auto">
                <!-- Authentication Links -->
                @guest('admin')
                    <li class="nav-item">
                        <a class="nav-link" href="{{route('admin.login')}}">{{ ucfirst(config('multiauth.prefix'))
                                }} Login</a>
                    </li>
                @else
                    <li class="nav-item dropdown">
                        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                            {{ auth('admin')->user()->name }} <span class="caret"></span>
                        </a>

                        <div style="display: block" class="dropdown-menu dropdown-menu-right"
                             aria-labelledby="navbarDropdown">
                            @admin('super')
                            <a class="dropdown-item" href="{{ route('admin.show') }}">{{
                                    ucfirst(config('multiauth.prefix')) }}</a>
                            @permitToParent('Role')
                            <a class="dropdown-item" href="{{ route('admin.roles') }}">Roles</a>
                            @endpermitToParent
                            @endadmin
                            <a class="dropdown-item" href="{{ route('admin.password.change') }}">Change Password</a>
                            <a class="dropdown-item" href="/admin/logout" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                {{ __('Logout') }}
                            </a>
                            <form id="logout-form" action="{{ route('admin.logout') }}" method="POST"
                                  style="display: none;">
                                @csrf
                            </form>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('admin/products') }}">Products</a>
                    </li>
                @endguest
            </ul>
        </div>
    </div>
</nav>
