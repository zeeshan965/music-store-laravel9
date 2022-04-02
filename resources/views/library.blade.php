@section('extra_css')
    <!-- Sweet Alert -->
    <link href="{{ asset ( 'css/sweetalert.css' ) }}" rel="stylesheet">
    <link href="{{ asset ( 'css/auth.min.css' ) }}" rel="stylesheet">
    <link rel="stylesheet" href=" {{ asset('css/library.min.css') }}">
    <style>

        .modal {
            text-align: center;
            padding: 0 !important;
        }

        .modal:before {
            content: '';
            display: inline-block;
            height: 100%;
            vertical-align: middle;
            margin-right: -4px;
        }

        .modal-dialog {
            display: inline-block;
            text-align: left;
            vertical-align: middle;
        }

        #smart-button-container {
            width: 60%;
            margin: 0 auto;
        }

        .modal-content{
            background-color: #e2e2e2;
        }

        .modal-header{
            border-color: #2c3136;
        }

    </style>
@endsection

@section( 'extra_js' )
    <!-- Sweet alert -->
    <script src="{{ asset ( 'js/sweetalert.min.js' ) }}"></script>
    <script src="{{ asset ( 'js/api.js' ) }}"></script>
    <script
        src="https://www.paypal.com/sdk/js?client-id=Ad0qWPlwun1UHx8MtnZ2xA4U-cbXTksUV9jIXBiCpTiL7nh5_5GLTZ_2JJ0WTATRlLfQioJvFENAvQ7s&currency=USD&disable-funding=paylater"></script>
    <script src="{{ asset ( 'js/checkout.min.js' ) }}"></script>

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
                                    <input type="hidden" name="album" value="{{ $album->id ?? "" }}">
                                    <button type="submit" class="btn"><i class="fa fa-search"></i></button>
                                </div>
                            </form>
                        </div>
                        @if(isset($album->title))
                            <div class="col-md-12 text-center" style="margin-bottom: 2em;">
                                <h2>Album: {{ $album->title }}</h2>
                            </div>
                        @endif
                        <ul class="video-library album"
                            @if($media_files->count() === 0) style="text-align: center;" @endif>
                            @forelse($media_files as $file)
                                <li>
                                    <a href="javascript:;"
                                       title="{{ $file->title }}"><span></span><i class="hover-icon"></i></a>
                                    <img src="{{ $file->thumbnail }}"/>
                                    <div class="action-buttons">
                                        <button type="button" class="btn"
                                                onclick="window.location.href='{{ route("media.watch_trailer", $file->id) }}'">
                                            <i class="fa fa-play"></i> Trailer
                                        </button>
                                        <button type="button" class="btn btn-default rent-music"
                                                data-cover="{{ $file->cover }}" data-thumbnail="{{ $file->thumbnail }}"
                                                data-title="{{ $file->title }}" data-id="{{ $file->id }}"
                                                data-price="{{ $file->price }}">
                                            <i class="fas fa-credit-card"></i>
                                            Rent ${{ $file->price }}</button>
                                    </div>
                                </li>
                            @empty
                                <li style="height: 12.9em">
                                    <p>No videos available.</p>
                                </li>
                            @endforelse
                        </ul>

                        <div class="col-md-12 text-center">
                            {{ $media_files->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="modal fade" id="rent-music-modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                    <h2 class="modal-title text-center"></h2>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            @if(\Illuminate\Support\Facades\Auth::check())

                                <h2 class="text-center mb-4">Choose your payment method</h2>
                                <div class="img-responsive mb-4" style="margin: 0 auto; max-width: 15em;">
                                    <img src=""/>
                                </div>
                                <div class="col-md-12 mb-4 text-center">Rent: <strong id="rent-price"></strong></div>


                                <div id="smart-button-container">
                                    <div style="text-align: center;">
                                        <div id="paypal-button-container"></div>
                                    </div>
                                </div>
                            @else
                                <div class="form-text-label">
                                    <span>Please
                                        <a href="{{ route( 'login' ) }}">Login</a> or
                                        <a href="{{ route( 'register' ) }}">Sign Up</a> to proceed with the purchase.</span>
                                </div>
                                <div class="img-responsive" style="margin: 0 auto; max-width: 15em;">
                                    <img src=""/>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-guest-layout>
