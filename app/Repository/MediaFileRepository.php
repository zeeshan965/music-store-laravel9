<?php

namespace App\Repository;

use App\Interfaces\MediaFileRepositoryInterface;
use App\Models\MediaFile;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class MediaFileRepository extends BaseRepository implements MediaFileRepositoryInterface
{
    /**
     * @param MediaFile $model
     */
    public function __construct(MediaFile $model)
    {
        parent::__construct($model);
    }

    /**
     * @param int $number
     * @param string $orderBy
     * @param string $type
     * @param array $columns
     * @return Collection
     */
    public function take(
        int    $number = 10,
        string $orderBy = "id",
        string $type = "DESC",
        array  $columns = ['id', 'title', 'thumbnail', 'price']
    ): Collection
    {
        return $this->model->take($number)->orderBy($orderBy, $type)->select($columns)->get();
    }

    /**
     * @param int $number
     * @param int $limit
     * @param string $orderBy
     * @param string $type
     * @param array $columns
     * @return Collection
     */
    public function offset(
        int    $number = 10,
        int    $limit = 10,
        string $orderBy = "id",
        string $type = "DESC",
        array  $columns = ['id', 'title', 'thumbnail', 'price']
    ): Collection
    {
        return $this->model->offset($number)->orderBy($orderBy, $type)->limit($limit)->select($columns)->get();
    }

    /**
     * @param int $limit
     * @param string $orderBy
     * @param string $type
     * @param array $columns
     * @return Collection
     */
    public function topFive(
        int    $limit = 10,
        string $orderBy = "id",
        string $type = "DESC",
        array  $columns = ['id', 'title', 'thumbnail', 'price']
    ): Collection
    {
        return $this->model->orderBy($orderBy, $type)->limit($limit)->select($columns)->get();
    }

    /**
     * @return integer
     */
    public function total(): int
    {
        return $this->model->count();
    }

    /**
     * @param int $total
     * @param Request $request
     * @return LengthAwarePaginator
     */
    public function paginate(Request $request, int $total = 12): LengthAwarePaginator
    {
        return $this->model->where(function (Builder $query) use ($request) {
            if ($request->has('album')) $query->where('album_id', $request->get('album'));
            if ($request->has('search')) $query->where('title', 'like', '%' . $request->get('search') . '%');
        })->where('status', 1)->paginate($total);
    }

}
