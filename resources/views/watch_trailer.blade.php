@section('extra_css')
    <link href="{{ asset ( 'css/auth.css' ) }}" rel="stylesheet">
    <link rel="stylesheet" href=" {{ asset('css/plyr.css') }}">
    <link rel="stylesheet" href=" {{ asset('css/library.min.css') }}">
    <style>
        .sorting-form-wrapper {
            width: 80%;
            margin: 0 auto;
        }

        .plyr__poster {
        }
    </style>
@endsection

@section( 'extra_js' )
    <script src="{{ asset ( 'js/plyr.min.js' ) }}"></script>

    <script type="text/javascript">
        $(".video_player").css("opacity", 0);
        const player = new Plyr('{{ $media->media_type == "video" ? 'video': 'audio' }}', {captions: {active: true}});
        window.player = player;

        $(".plyr__control, .plyr__control--overlaid").on("click", e => {
            $(".video_player").css("opacity", 1);
        });
    </script>
@endsection

<x-guest-layout>
    <x-slot name="page_title">{{ $media->title ?? "" }}</x-slot>
    <section id="home">
        <div class="container">
            <div class="row">
                <div id="form-wrap" class="col-sm-12">
                    <h1 class="section-title center">{{ $media->title ?? "" }}</h1>
                    <div class="bg-color1 auth-form">
                        <div class="sorting-form-wrapper">
                            @if($media->media_type == "video")
                                <video class="video_player" controls playsinline data-poster="{{ $media->cover }}">
                                    <source src="{{ $media->trailer_url }}">

                                    <!-- Fallback for browsers that don't support the <video> element -->
                                    <a href="{{ $media->trailer_url }}" download>Download</a>
                                </video>
                            @else
                                <audio playsinline>
                                    <source src="{{ $media->trailer_url }}" type="audio/mp3">
                                </audio>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</x-guest-layout>
