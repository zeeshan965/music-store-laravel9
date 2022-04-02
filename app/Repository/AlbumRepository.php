<?php

namespace App\Repository;

use App\Interfaces\AlbumRepositoryInterface;
use App\Models\Album;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class AlbumRepository extends BaseRepository implements AlbumRepositoryInterface
{
    /**
     * @param Album $model
     */
    public function __construct(Album $model)
    {
        parent::__construct($model);
    }

    /**
     * @return integer
     */
    public function total(): int
    {
        return $this->model->count();
    }

    /**
     * @param Request $request
     * @param int $total
     * @return LengthAwarePaginator
     */
    public function paginate(Request $request, int $total = 10): LengthAwarePaginator
    {
        return $this->model->where(function (Builder $query) use ($request) {
            if ($request->has('search')) $query->where('title', 'like', '%' . $request->get('search') . '%');
        })->where('status', 1)->paginate($total);
    }

}
