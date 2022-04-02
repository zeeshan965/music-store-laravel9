<!-- BEGIN HEADER -->
<header id="header">
    <section class="nav-section">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <a href="{{ route ( 'home' ) }}" class="nav-logo">
                        <img src="{{ asset( 'img/logo@2x.png' ) }}" alt="" height="51"/>
                    </a>

                    <!-- BEGIN MAIN MENU -->
                    <x-navbar name="navbar"></x-navbar>
                </div>
            </div>
        </div>
    </section>
</header>
<!-- END HEADER -->
