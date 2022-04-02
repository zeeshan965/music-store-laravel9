<?php

namespace App\Providers;

use App\Interfaces\AlbumRepositoryInterface;
use App\Interfaces\EloquentRepositoryInterface;
use App\Interfaces\MediaFileRepositoryInterface;
use App\Interfaces\UserRepositoryInterface;
use App\Repository\AlbumRepository;
use App\Repository\BaseRepository;
use App\Repository\MediaFileRepository;
use App\Repository\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(MediaFileRepositoryInterface::class, MediaFileRepository::class);
        $this->app->bind(AlbumRepositoryInterface::class, AlbumRepository::class);

    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
