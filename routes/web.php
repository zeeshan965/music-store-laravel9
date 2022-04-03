<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MediaController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', HomeController::class)->name('home');
Route::get('/albums', [MediaController::class, 'albums'])->name('albums');
Route::get('/media', [MediaController::class, 'index'])->name('media.index');
Route::post('/check_email', [UserController::class, 'check_email'])->name('check_email');
Route::prefix('media')->group(function () {
    Route::get('/{media_id}/watch_trailer', [MediaController::class, 'watchTrailer'])->name('media.watch_trailer');
});

Route::group(['middleware' => ['verified', 'auth']], function () {
    Route::get('profile', [UserController::class, 'profile'])->name('profile');
    Route::post('profile', [UserController::class, 'update'])->name('profile.update');
    Route::post('update_password', [UserController::class, 'update_password'])->name('profile.update_password');
    Route::get('/dashboard', [HomeController::class, 'dashboard'])->name('dashboard');
    Route::post('payment', [UserController::class, 'payment'])->name('payment');
    Route::resource('media', MediaController::class, ['only' => ['show']]);
});

require __DIR__ . '/auth.php';
