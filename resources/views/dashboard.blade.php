@section('extra_css')
    <link href="{{ asset ( 'css/auth.min.css' ) }}" rel="stylesheet">
    <link rel="stylesheet" href=" {{ asset('css/library.min.css') }}">
@endsection

@section( 'extra_js' )
@endsection

<x-app-layout>
    <x-slot name="page_title">{{ __('Dashboard') }}</x-slot>

    <!-- BEGIN HOME SECTION -->
    <section id="home">
        <div class="container">
            <div class="row">
                <div id="form-wrap" class="col-sm-12">
                    <h1 class="section-title center">Dashboard</h1>
                    <div class="bg-color1 auth-form">
                        <ul class="video-library album"
                            @if($media_files->count() === 0) style="text-align: center;" @endif>
                            @forelse($media_files as $file)
                                <li>
                                    <a href="javascript:;"
                                       title="{{ $file->title }}"><span></span><i class="hover-icon"></i></a>
                                    <img src="{{ $file->thumbnail }}"/>
                                    <div class="action-buttons full-width">
                                        <button type="button" class="btn btn-default"
                                                onclick="window.location.href='{{ route('media.show', $file->id) }}'">
                                            <i class="fas fa-play"></i> Watch
                                        </button>
                                    </div>
                                </li>
                            @empty
                                <li style="height: 12.9em">
                                    <p>No videos available.</p>
                                </li>
                            @endforelse
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- END HOME SECTION -->
</x-app-layout>
