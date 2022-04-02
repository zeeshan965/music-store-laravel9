@section('extra_css')
    <link href="{{ asset ( 'css/auth.min.css' ) }}" rel="stylesheet">
    <link rel="stylesheet" href=" {{ asset('css/library.min.css') }}">
    <style>
        .auth-form ul.video-library li span, .gallery-scroller li span {
            height: 100%;
        }
    </style>
@endsection

@section( 'extra_js' )
    <script>
        var utilsScript = "{{ asset('/tel-input/js/utils.js') }} "
    </script>
    <!-- Sweet alert -->
    <script src="{{ asset ( 'js/sweetalert.min.js' ) }}"></script>

    <!-- Jquery Validate -->
    <script src="{{ asset ( 'js/jquery.validate.min.js' ) }}"></script>
    <script src="{{ asset ( 'js/additional-methods.min.js' ) }}"></script>
    <!-- Ladda -->
    <script src="{{ asset ( 'js/spin.min.js' ) }}"></script>
    <script src="{{ asset ( 'js/ladda.min.js' ) }}"></script>
    <script src="{{ asset ( 'js/ladda.jquery.min.js' ) }}"></script>
    <script src="{{ asset('/tel-input/js/intlTelInput.min.js') }} "></script>

    <script src="{{ asset ( 'js/api.js' ) }}"></script>
    <script src="{{ asset ( 'js/form_validation.js' ) }}"></script>
    <script src="{{ asset ( 'js/auth.js' ) }}"></script>


@endsection

<x-guest-layout>
    <x-slot name="page_title">{{ __('Library') }}</x-slot>
    <section id="home">
        <div class="container">
            <div class="row">
                <div id="form-wrap" class="col-sm-12">
                    <h1 class="section-title center">Available To Watch</h1>
                    <div class="bg-color1 auth-form">
                        <div class="sorting-form-wrapper">
                            <form class="form-search form-horizontal custom-search-form"
                                  action="{{ $link }}">
                                <div class="library-search">
                                    <input type="text" class="search-query" name="search" placeholder="Search"
                                           value="{{ \Illuminate\Support\Facades\Request::get('search') }}">
                                    <button type="submit" class="btn"><i class="fa fa-search"></i></button>
                                </div>
                            </form>
                        </div>

                        <ul class="video-library album" @if($albums->count() === 0) style="text-align: center;" @endif>
                            @forelse($albums as $album)
                                <li>
                                    <a href="javascript:;"
                                       title="{{ $album->title }}"><span></span><i class="hover-icon"></i></a>
                                    <div class="rent-button">
                                        <a href="{{ url("media?album=$album->id") }}" class="btn btn-default">View Album</a>
                                    </div>
                                    <img src="{{ $album->thumbnail }}"/>
                                </li>
                            @empty
                                <li style="height: 12.9em">
                                    <p>No videos available.</p>
                                </li>
                            @endforelse
                        </ul>

                        <div class="col-md-12 text-center">
                            {{ $albums->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</x-guest-layout>
