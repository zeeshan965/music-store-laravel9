<?php

namespace App\Providers;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Paginator::useBootstrapThree();
        View::composer('*', function ($view) {
            $bladePages = [
                'roles',
                'show',
                'password',
                'register',
                'edit',
                'role'
            ];

            $view->with(['allowedPages' => $bladePages]);
        });
    }
}
