<!-- BEGIN MAIN MENU -->
<nav id="nav">
    <ul>
        @if(request()->routeIs('home'))
            <x-nav-link :href="'#home'" :name="__('home')">
                {{ __('Home') }}
            </x-nav-link>
        @else
            <x-nav-link :href="route('home')" :name="__('home')">
                {{ __('Home') }}
            </x-nav-link>
        @endif

        <x-nav-link :href="route('albums')" :name="__('albums')">
            {{ __('Albums') }}
        </x-nav-link>
        <x-nav-link :href="route('media.index')" :name="__('media')">
            {{ __('Library') }}
        </x-nav-link>
        @if(request()->routeIs('home'))
            <x-nav-link :href="'#gallery'" :name="__('gallery')">
                {{ __('Videos To Watch') }}
            </x-nav-link>
            <x-nav-link :href="'#store'" :name="__('store')">
                {{ __('Store') }}
            </x-nav-link>
            <x-nav-link :href="'#contacts'" :name="__('contacts')">
                {{ __('Contact Us') }}
            </x-nav-link>
        @else
            <x-nav-link :href="'/#gallery'" :name="__('gallery')">
                {{ __('Videos To Watch') }}
            </x-nav-link>
            <x-nav-link :href="'/#store'" :name="__('store')">
                {{ __('Store') }}
            </x-nav-link>
            <x-nav-link :href="'/#contacts'" :name="__('contacts')">
                {{ __('Contact Us') }}
            </x-nav-link>
        @endif

        @if( ! \Illuminate\Support\Facades\Auth::check () )
            <x-nav-link :href="route('login')" :name="__('member_login_list')">
                {{ __('Login') }}
            </x-nav-link>
        @endif
        @if( \Illuminate\Support\Facades\Auth::check () )
            <x-nav-link :href="route('login')" :name="__('drop_down')"></x-nav-link>
        @endif
    </ul>
</nav>
<!-- END MAIN MENU -->

<!-- BEGIN SOCIAL ICONS -->
{{--<ul class="sn-icons">--}}
{{--    <x-social-icons></x-social-icons>--}}
{{--</ul>--}}
<!-- END SOCIAL ICONS -->
