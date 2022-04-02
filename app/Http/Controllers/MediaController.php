<?php

namespace App\Http\Controllers;

use App\Interfaces\AlbumRepositoryInterface;
use App\Interfaces\MediaFileRepositoryInterface;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;

class MediaController extends Controller
{
    /** @var MediaFileRepositoryInterface $mediaFileRepository */
    private MediaFileRepositoryInterface $mediaFileRepository;

    /** @var AlbumRepositoryInterface $albumRepository */
    private AlbumRepositoryInterface $albumRepository;

    /**
     * @param MediaFileRepositoryInterface $mediaFileRepository
     * @param AlbumRepositoryInterface $albumRepository
     */
    public function __construct(MediaFileRepositoryInterface $mediaFileRepository, AlbumRepositoryInterface $albumRepository)
    {
        $this->mediaFileRepository = $mediaFileRepository;
        $this->albumRepository = $albumRepository;
    }

    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return Application|Factory|View
     */
    public function index(Request $request): Application|Factory|View
    {
        $album = $request->get('album') ? $this->albumRepository->findById($request->get('album'), ['id', 'title']) : null;
        $media_files = $this->mediaFileRepository->paginate($request);
        $link = $request->fullUrl();

        return view('library', compact('media_files', 'album', 'link'));
    }

    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return Application|Factory|View
     */
    public function albums(Request $request): Application|Factory|View
    {
        $link = $request->fullUrl();
        $albums = $this->albumRepository->paginate($request);
        return view('albums', compact('albums', 'link'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Application|Factory|View
     */
    public function show(int $id): View|Factory|Application
    {
        $media = $this->mediaFileRepository->findById($id);
        return view('media_detail', compact('media', 'id'));
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Application|Factory|View
     */
    public function watchTrailer(int $id): View|Factory|Application
    {
        $media = $this->mediaFileRepository->findById($id, ['*'], ['album']);
        return view('watch_trailer', compact('media', 'id'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
