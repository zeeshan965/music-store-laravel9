@section('extra_css')
    <style>
        #home {
            padding-top: 10rem;
        }
    </style>
@endsection

@section( 'extra_js' )
@endsection

<x-app-layout>
    <x-slot name="page_title">{{ __('Dashboard') }}</x-slot>

    <!-- BEGIN HOME SECTION -->
    <section id="home">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="section-title center">Dashboard</h1>
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div class="alert alert-info">
                                Dashboard Items.
                            </div>
                            <div class="row pg-entitylist-row">
                                <div class="col-sm-2 col-xs-3 text-center">
                                    <img src="{{ asset( '/img/tshirt1.png' ) }}"
                                         style="width: 55px;height: 55px;border-radius: 50px; padding: 5px; border: 1px solid" />
                                </div>
                                <div class="col-sm-5 col-xs-9 pg-col-name">
                                    <strong class="h-strong">Item for:</strong>
                                    <a href="http://local.gestr.com/trains">
                                        <h4>565</h4>
                                    </a>
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider-bottom-1">
            <div class="tt"></div>
        </div>
    </section>
    <!-- END HOME SECTION -->
</x-app-layout>
