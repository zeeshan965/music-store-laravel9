<?php

namespace App\Models;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\UrlGenerator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class MediaFile extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * @param $value
     * @return Application|UrlGenerator|string
     */
    public function getTrailerUrlAttribute($value): string|UrlGenerator|Application
    {
        return $value;
    }

    /**
     * @return BelongsTo
     */
    public function album(): BelongsTo
    {
        return $this->belongsTo(Album::class, 'album_id', 'id');
    }

    /**
     * @return BelongsToMany
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'media_file_user', 'media_id', 'user_id')
            ->withTimestamps();
    }

    /**
     * @return BelongsToMany
     */
    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'media_file_user', 'media_id', 'user_id')
            ->where('user_id', Auth::id())
            ->withTimestamps();
    }
}
