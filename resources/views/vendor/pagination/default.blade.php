@if ($paginator->hasPages())
    <nav>
        <ul class="pagination">
            {{-- Previous Page Link --}}
            @if ($paginator->onFirstPage())
                <li class="disabled" aria-disabled="true" aria-label="@lang('pagination.previous')">
                    <span aria-hidden="true">&lsaquo;</span>
                </li>
            @else
                <li>
                    @if(\Illuminate\Support\Facades\Request::has('album'))
                        <a href="{{ $paginator->previousPageUrl()."&album=".\Illuminate\Support\Facades\Request::get('album') }}"
                           rel="prev" aria-label="@lang('pagination.previous')">&lsaquo;</a>
                    @else
                        <a href="{{ $paginator->previousPageUrl() }}" rel="prev"
                           aria-label="@lang('pagination.previous')">&lsaquo;</a>
                    @endif

                </li>
            @endif

            {{-- Pagination Elements --}}
            @foreach ($elements as $element)
                {{-- "Three Dots" Separator --}}
                @if (is_string($element))
                    <li class="disabled" aria-disabled="true"><span>{{ $element }}</span></li>
                @endif

                {{-- Array Of Links --}}
                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        @if ($page == $paginator->currentPage())
                            <li class="active" aria-current="page"><span>{{ $page }}</span></li>
                        @else
                            <li>
                                @if(\Illuminate\Support\Facades\Request::has('album'))
                                    <a href="{{ $url."&album=".\Illuminate\Support\Facades\Request::get('album') }}">{{ $page }}</a>
                                @else
                                    <a href="{{ $url }}">{{ $page }}</a>
                                @endif
                            </li>
                        @endif
                    @endforeach
                @endif
            @endforeach

            {{-- Next Page Link --}}
            @if ($paginator->hasMorePages())
                <li>
                    @if(\Illuminate\Support\Facades\Request::has('album'))
                        <a href="{{ $paginator->nextPageUrl()."&album=".\Illuminate\Support\Facades\Request::get('album') }}"
                           rel="next" aria-label="@lang('pagination.next')">&rsaquo;</a>
                    @else
                        <a href="{{ $paginator->nextPageUrl() }}" rel="next" aria-label="@lang('pagination.next')">&rsaquo;</a>
                    @endif
                </li>
            @else
                <li class="disabled" aria-disabled="true" aria-label="@lang('pagination.next')">
                    <span aria-hidden="true">&rsaquo;</span>
                </li>
            @endif
        </ul>
    </nav>
@endif
