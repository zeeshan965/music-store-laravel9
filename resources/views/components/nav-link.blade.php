@props(['name', 'link_type'])

@if($name == 'drop_down')
    <li class="active dropdown">
        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
            {{ Auth::user()->name }} &nbsp;<span class="caret"></span>
        </a>
        <ul class="dropdown-menu dropdown-menu-right" role="menu">
            <li><a href="{{ route ( 'dashboard' ) }}">Dashboard</a></li>
            <li><a href="{{ route ( 'profile' ) }}">Account</a></li>
            <li class="divider"></li>
            <li>
                <form method="POST" action="{{ route( 'logout' ) }}">
                    @csrf
                    <a href="{{ route( 'logout' ) }}"
                       onclick="event.preventDefault();this.closest( 'form' ).submit();">
                        Sign Out
                    </a>
                </form>
            </li>
        </ul>
    </li>
@elseif(isset($link_type) && $link_type == 'icon')
    <li>
        <a {{ $attributes->merge(['target' => '_blank']) }}> <i class="{{ $name }}"></i> </a>
    </li>
@elseif(isset($link_type) && $link_type == 'svg-icon')
    <li>
        <a {{ $attributes->merge(['target' => '_blank']) }}> {{ $slot }} </a>
    </li>
@else
    <li>
        <a {{ $attributes }}> {{ $slot }} </a>
    </li>
@endif
