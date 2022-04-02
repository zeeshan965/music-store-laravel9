<?php

namespace App\Http\Controllers;

use App\Interfaces\MediaFileRepositoryInterface;
use App\Interfaces\UserRepositoryInterface;
use App\Models\MediaFile;
use App\Repository\MediaFileRepository;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /** @var UserRepositoryInterface $userRepository */
    private UserRepositoryInterface $userRepository;

    /** @var MediaFileRepositoryInterface $mediaFileRepository */
    private MediaFileRepositoryInterface $mediaFileRepository;

    /**
     * @param UserRepositoryInterface $userRepository
     * @param MediaFileRepositoryInterface $mediaFileRepository
     */
    public function __construct(UserRepositoryInterface $userRepository, MediaFileRepositoryInterface $mediaFileRepository)
    {
        $this->userRepository = $userRepository;
        $this->mediaFileRepository = $mediaFileRepository;
    }

    /**
     * @param Request $request
     * @return Application|Factory|View
     */
    public function __invoke(Request $request): View|Factory|Application
    {
        $media_files['last_ten'] = $this->mediaFileRepository->take();
        $media_files['offset_ten'] = $this->mediaFileRepository->offset();
        $media_files['top_five'] = $this->mediaFileRepository->topFive();

        return view('index', compact('media_files'));
    }
}
