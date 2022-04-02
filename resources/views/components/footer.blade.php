<!-- BEGIN FOOTER -->
<footer id="footer" class="bg-color2">
    <!-- BEGIN SOCIAL ICONS -->
    <ul class="sn-icons">
        <x-social-icons></x-social-icons>
    </ul>

    <!-- END SOCIAL ICONS -->
    <p>Copyright &copy; 2021 <a href="{{ url("/") }}" target="_self">Gian’s Music</a>. All rights
        reserved.
        <a aria-current="page" class="e1do3jfm0 css-knrfof active" data-test="nav-link" title="iHeart" href="/"></a>
    </p>
</footer>
<!-- END FOOTER -->

<!-- BEGIN TEMPLATE SETTINGS PANEL -->
<div id="template-settings">
    <i class="fa fa-cog"></i>

    <h4>Theme:</h4>
    <select name="theme">
        <option value="darkversion">Dark Theme</option>
        <option value="lightversion">Light Theme</option>
    </select>

    <h4>Color: *</h4>
    <input class="minicolors" type="text" name="color-picker" value="3f9f97"/>

    <div>* May not be fully accurate!</div>
</div>
<!-- END TEMPLATE SETTINGS PANEL -->

<!-- Libs -->
<script src="{{ asset( '/js/jquery-1.9.1.min.js' ) }}"></script>
<script>window.jQuery || document.write('<script src="js/jquery-1.9.1.min.js"><\/script>')</script>

<script src="{{ asset( 'js/bootstrap.min.js' ) }}"></script>
<script src="{{ asset( 'js/fontawesome.min.js' ) }}"></script>

<script src="{{ asset( 'js/jquery.nicescroll.min.js' ) }}"></script>
<script src="{{ asset( 'js/retina.min.js' ) }}"></script>

<script src="{{ asset( 'js/plugins.min.js' ) }}" type="text/javascript"></script>
<script src="{{ asset( 'js/slideshow/slideshow.min.js' ) }}" type="text/javascript"></script>

<script src="{{ asset( 'js/jquery.minicolors.min.js' ) }}"></script>
<script src="{{ asset( 'js/template.settings.min.js' ) }}"></script>
<script src="{{ asset( 'js/scripts.min.js' ) }}"></script>
