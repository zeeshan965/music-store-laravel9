<?php

namespace App\Interfaces;


use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

interface MediaFileRepositoryInterface extends EloquentRepositoryInterface
{
    /**
     * @param int $number
     * @param string $orderBy
     * @param string $type
     * @param array $columns
     * @return Collection
     */
    public function take(int $number = 10, string $orderBy = "id", string $type = "DESC", array $columns = ['*']): Collection;

    /**
     * @param int $number
     * @param int $limit
     * @param string $orderBy
     * @param string $type
     * @param array $columns
     * @return Collection
     */
    public function offset(int $number = 10, int $limit = 10, string $orderBy = "id", string $type = "DESC", array $columns = ['*']): Collection;

    /**
     * @param int $limit
     * @param string $orderBy
     * @param string $type
     * @param array $columns
     * @return Collection
     */
    public function topFive(int $limit = 10, string $orderBy = "id", string $type = "DESC", array $columns = ['*']): Collection;

    /**
     * @return integer
     */
    public function total(): int;

    /**
     * @param int $total
     * @param Request $request
     * @return LengthAwarePaginator
     */
    public function paginate(Request $request, int $total = 12): LengthAwarePaginator;

}
