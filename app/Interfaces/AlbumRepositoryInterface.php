<?php

namespace App\Interfaces;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

interface AlbumRepositoryInterface extends EloquentRepositoryInterface
{
    /**
     * @return integer
     */
    public function total(): int;

    /**
     * @param Request $request
     * @param int $total
     * @return LengthAwarePaginator
     */
    public function paginate(Request $request, int $total = 10): LengthAwarePaginator;

}
