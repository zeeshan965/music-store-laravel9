@section('extra_css')
    <style>
        .margin-auto {
            margin: 0 auto;
        }

        .album {
            margin-top: 0;
            margin-bottom: 0;
            width: 100%;
        }

        .album .album-info p {
            margin-bottom: 15px;
        }

        .album .album-info p:last-child {
            margin-bottom: 0;
        }

        #contacts {
            padding-bottom: 0;
        }

        .album .album-img .album-img-wrap img {
            width: auto;
        }

        .auth-form ul.video-library li span, .gallery-scroller li span {
            height: 100%;
        }
    </style>

@endsection

<x-app-layout>
    <x-slot name="page_title">{{ __('Home') }}</x-slot>

    <!-- BEGIN HOME SECTION -->
    <section id="home">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <a href="#home" id="logo" class="nav-logo">
                        <img src="{{ asset( '/img/logo.png' ) }}" alt="" width="379" height="205"/>
                    </a>
                </div>
            </div>
        </div>
    </section>
    <!-- END HOME SECTION -->

    <!-- BEGIN THE BAND SECTION -->
    <section id="theband" class="has-divider-bg">
        <div class="container">
            <div class="row">
                <div class="col-sm-4">
                    <h1 class="section-title">Album Adore</h1>
                    <p class="section-desc">
                        Album ADORE is going to be released on April 2022… <br>
                        10 wonderful songs with great lyrics and contemporary sounds!
                        <br/><br/><br/>
                        <a href="" class="btn btn-dark btn-icon open-overlay" data-overlay-id="theband-overlay">
                            <i class="fa fa-file-text-o"></i><span>More About us</span></a>
                    </p>
                </div>
                <img src="{{ asset( 'img/adore_cover.png' ) }}" alt="" id="bandImage" class="col-sm-8"/>
            </div>
        </div>
        <div class="divider-bottom-2">
            <div class="tt"></div>
        </div>
    </section>
    <!-- END THE BAND SECTION -->

    <!-- Begin About Band Page Overlay -->
    <div class="page-overlay" id="theband-overlay">
        <i class="fa fa-times-circle-o close-overlay"></i>
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="center">We are the Beat Band!</h1>

                    <div class="band-elem col-sm-4">
                        <div class="band-elem-img">
                            <img src="{{ asset( "/img/band_member1.jpg" ) }}" alt=""/>
                            <h3>John Doe<span> - Lead vocalist</span></h3>
                        </div>
                        <p>Pellentesque elementum libero enim, eget gravida nunc laoreet et. Nullam ac enim auctor,
                            fringilla risus at, imperdiet turpis. Mauris ut tristique odio. Aenean diam ipsum, ultricies
                            sed
                            consequat sed, faucibus et tellus. Nam ut sollicitudin lacus. Nulla id imperdiet purus, id
                            tristique erat.</p>
                    </div>
                    <div class="band-elem col-sm-4">
                        <div class="band-elem-img">
                            <img src="{{ asset( "/img/band_member2.jpg" ) }}" alt=""/>
                            <h3>John Doe<span> - Lead vocalist</span></h3>
                        </div>
                        <p>Pellentesque elementum libero enim, eget gravida nunc laoreet et. Nullam ac enim auctor,
                            fringilla risus at, imperdiet turpis. Mauris ut tristique odio. Aenean diam ipsum, ultricies
                            sed
                            consequat sed, faucibus et tellus. Nam ut sollicitudin lacus. Nulla id imperdiet purus, id
                            tristique erat.</p>
                    </div>
                    <div class="band-elem col-sm-4">
                        <div class="band-elem-img">
                            <img src="{{ asset( "/img/band_member3.jpg" ) }}" alt=""/>
                            <h3>John Doe<span> - Lead vocalist</span></h3>
                        </div>
                        <p>Pellentesque elementum libero enim, eget gravida nunc laoreet et. Nullam ac enim auctor,
                            fringilla risus at, imperdiet turpis. Mauris ut tristique odio. Aenean diam ipsum, ultricies
                            sed
                            consequat sed, faucibus et tellus. Nam ut sollicitudin lacus. Nulla id imperdiet purus, id
                            tristique erat.</p>
                    </div>

                    <h1 class="center">Our Albuns</h1>

                    <div class="album">
                        <div class="album-img col-sm-4">
                            <div class="album-img-wrap">
                                <div class="title">New</div>
                                <img src="{{ asset( "/img/album1.jpg" ) }}" alt=""/>
                            </div>
                        </div>
                        <div class="album-info col-sm-8">
                            <h3 class="color">The New Album<br/><span>2013</span></h3>
                            <p>Pellentesque elementum libero enim, eget gravida nunc laoreet et. Nullam ac enim auctor,
                                fringilla risus at, imperdiet turpis. Mauris ut tristique odio. Aenean diam ipsum,
                                ultricies
                                sed consequat sed, faucibus et tellus. Nam ut sollicitudin lacus. Nulla id imperdiet
                                purus,
                                id tristique erat.</p>
                            <ol>
                                <li><span>Lorem Ipsum</span> <span class="time">02:20</span></li>
                                <li class="darker"><span>Dolor Sit Amet</span> <span class="time">03:05</span></li>
                                <li class="darker"><span>Sed Iaculis Lectus</span> <span class="time">02:45</span></li>
                                <li><span>Sed Molestie</span> <span class="time">04:00</span></li>
                                <li><span>Fusce</span> <span class="time">02:15</span></li>
                                <li class="darker"><span>Cras Elit Tortor</span> <span class="time">03:00</span></li>
                                <li class="darker"><span>Donec Est Risus Posuere</span> <span class="time">03:35</span>
                                </li>
                                <li><span>Sed Lorem Est</span> <span class="time">04:20</span></li>
                                <li><span>Elementum</span> <span class="time">02:50</span></li>
                            </ol>
                        </div>
                    </div>

                    <div class="album">
                        <div class="album-img col-sm-4">
                            <div class="album-img-wrap">
                                <img src="{{ asset( "/img/album2.jpg" ) }}" alt=""/>
                            </div>
                        </div>
                        <div class="album-info col-sm-8">
                            <h3 class="color">The First Album<br/><span>2011</span></h3>
                            <p>Pellentesque elementum libero enim, eget gravida nunc laoreet et. Nullam ac enim auctor,
                                fringilla risus at, imperdiet turpis. Mauris ut tristique odio. Aenean diam ipsum,
                                ultricies
                                sed consequat sed, faucibus et tellus. Nam ut sollicitudin lacus. Nulla id imperdiet
                                purus,
                                id tristique erat.</p>
                            <ol>
                                <li><span>Lorem Ipsum</span> <span class="time">02:20</span></li>
                                <li class="darker"><span>Dolor Sit Amet</span> <span class="time">03:05</span></li>
                                <li class="darker"><span>Sed Iaculis Lectus</span> <span class="time">02:45</span></li>
                                <li><span>Sed Molestie</span> <span class="time">04:00</span></li>
                                <li><span>Fusce</span> <span class="time">02:15</span></li>
                                <li class="darker"><span>Cras Elit Tortor</span> <span class="time">03:00</span></li>
                                <li class="darker"><span>Donec Est Risus Posuere</span> <span class="time">03:35</span>
                                </li>
                                <li><span>Sed Lorem Est</span> <span class="time">04:20</span></li>
                                <li><span>Elementum</span> <span class="time">02:50</span></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End About Band Page Overlay -->

    <!-- BEGIN GALLERY SECTION -->
    <section id="gallery">

        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="section-title center">Video To Watch</h1>
                </div>
            </div>
        </div>
        <div class="gallery-scroller">
            <ul>
                @foreach($media_files['last_ten'] as $file)
                    <li>
                        <a href="{{ route("media.show", $file->id) }}"
                           title="{{ $file->title }}"><span></span><i class="hover-icon"></i></a>
                        @if($file->user->first())
                            <div class="rent-button">
                                <button type="button" class="btn btn-default"
                                        onclick="window.location.href='{{ route('media.show', $file->id) }}'">
                                    <i class="fas fa-play"></i> Watch
                                </button>
                            </div>
                        @else
                            <div class="trailer-button">
                                <button type="button" class="btn"><i class="fa fa-play"></i> Watch Trailer</button>
                            </div>
                            <div class="rent-button">
                                <button type="button" class="btn btn-default"><i class="fas fa-credit-card"></i>
                                    Rent ${{ $file->price }}</button>
                            </div>
                        @endif

                        <img src="{{ $file->thumbnail }}"/>
                    </li>
                @endforeach
            </ul>
            <ul>
                @foreach($media_files['offset_ten'] as $offset_file)
                    <li>
                        <a href="{{ route("media.show", $offset_file->id) }}"
                           title="{{ $offset_file->title }}"><span></span><i class="hover-icon"></i></a>
                        @if($offset_file->user->first())
                            <div class="rent-button">
                                <button type="button" class="btn btn-default"
                                        onclick="window.location.href='{{ route('media.show', $offset_file->id) }}'">
                                    <i class="fas fa-play"></i> Watch
                                </button>
                            </div>
                        @else
                            <div class="trailer-button">
                                <button type="button" class="btn"><i class="fa fa-play"></i> Watch Trailer</button>
                            </div>
                            <div class="rent-button">
                                <button type="button" class="btn btn-default"><i class="fas fa-credit-card"></i>
                                    Rent ${{ $offset_file->price }}</button>
                            </div>
                        @endif
                        <img src="{{ $offset_file->thumbnail }}"/>
                    </li>
                @endforeach
            </ul>
        </div>
    </section>
    <!-- END GALLERY SECTION -->

    <!-- BEGIN STORE SECTION -->
    <section id="store" class="has-divider-bg">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="section-title center">Gian’s Music</h1>
                </div>
            </div>
        </div>

        <div class="flexslider">
            <ul class="slides">
                @foreach($media_files['top_five'] as $item)
                    <li>
                        <img src="{{ $item->thumbnail }}" alt=""/>
                        <h3 class="color">{{ $item->title }}</h3>
                        <h2>${{ $item->price }}</h2>
                        <a href="#" class="btn btn-default btn-icon"><i
                                class="fa fa-shopping-cart"></i><span>Rent Now!</span></a>
                    </li>
                @endforeach
                <li>
                    <img src="{{ asset('/html/img/tshirt1.png') }}" alt=""/>
                    <h3 class="color">Beat T-Shirt - White Version</h3>
                    <h2>$10</h2>
                    <a href="#" class="btn btn-default btn-icon"><i
                            class="fa fa-shopping-cart"></i><span>Buy Now!</span></a>
                </li>
                <li>
                    <img src="{{ asset('/html/img/tshirt2.png') }}" alt=""/>
                    <h3 class="color">Beat Mug</h3>
                    <h2>$7</h2>
                    <a href="#" class="btn btn-default btn-icon"><i
                            class="fa fa-shopping-cart"></i><span>Buy Now!</span></a>
                </li>
                <li>
                    <img src="{{ asset('/html/img/cd1.png') }}" alt=""/>
                    <h3 class="color">Beat - First Album</h3>
                    <h2>$19</h2>
                    <a href="#" class="btn btn-default btn-icon"><i
                            class="fa fa-shopping-cart"></i><span>Buy Now!</span></a>
                </li>
                <li>
                    <img src="{{ asset('/html/img/cd2.png') }}" alt=""/>
                    <h3 class="color">Beat - DVD</h3>
                    <h2>$39</h2>
                    <a href="#" class="btn btn-default btn-icon"><i
                            class="fa fa-shopping-cart"></i><span>Buy Now!</span></a>
                </li>
            </ul>
        </div>

        <div class="divider-bottom-4">
            <div class="tt"></div>
        </div>
    </section>
    <!-- END STORE SECTION -->

    <!-- BEGIN ABOUT SECTION -->
    <section id="contacts" class="bg-color2">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="section-title center">About Us</h1>
                    <div class="album">
                        <div class="album-img col-sm-3">
                            <div class="album-img-wrap">
                                <img src="{{ asset( '/img/about.png' ) }}" alt="">
                            </div>
                        </div>
                        <div class="album-info col-sm-8">
                            <p>
                                Gian Carlo Villatoro is prolific designer and software engineer, writer,
                                speaker, singer, and producer. As a software engineer he developed over
                                300 applications. As a writer he has written 25 ebooks available on iTunes.
                                As a producer he has produced 9 Audiobooks on iTunes. Gian has filmed
                                and produced over 1.5k videos, they have over 200k views per month
                                on Vimeo, Youtube, Facebook, Instagram, TikTok and his websites
                                <a href="https://vchurch.us">vchurch.us</a> and <a href="https://mygiancarlo.com">mygiancarlo.com</a>
                            </p>
                            <p>
                                His most recent production the Musical THE BEST REVENGE. 1 hour
                                musical. 15 songs. An international production that tells the story of
                                Simon in Dallas, TX. The Best Revenge is the story with the music and
                                lyrics that will touch your heart! The Best Revenge is the kind of musical
                                that you want to listen again and again…
                                The Best Revenge, an international production of a profound story of
                                some millennials who overcame pain in life! The Best Revenge, a
                                compilation of songs that will tear apart your heart…
                            </p>
                            <p>
                                The Best Revenge is created to become a LIVE PERFORMANCE musical
                                for Theater Companies, Schools, Youth Ministries, etc. You will be able to
                                purchase the music, lyrics and all materials to make this a phenomenal
                                event to even raise funds for special purposes in your local community.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- END ABOUT SECTION -->

    <!-- BEGIN CONTACTS SECTION -->
    <section id="contacts" class="bg-color2">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="section-title center">Contact us</h1>
                    <div id="form-wrap" class="col-sm-8 center">
                        <div class="bg-color1 auth-form">

                            <h4>You can contact Gian via email :</h4>
                            <p><a class="underline" href="mailto:info@mygiancarlo.com">info@mygiancarlo.com</a></p>
                            <h4>Or call :</h4>
                            <p><a href="tel:+14326149798">+1(432)614-9798</a></p>
                            <h4>Or WhatsApp at :</h4>
                            <p><a href="https://api.whatsapp.com/send?phone=14324380699" target="_blank">
                                    <i class="fa fa-whatsapp" aria-hidden="true"> </i>&nbsp;+1(432)614-9798</a></p>
                            <h4>Or mail at :</h4>
                            <p>2400 West 81st Street Odessa TX 79764</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- END CONTACTS SECTION -->

</x-app-layout>
