<?php

namespace App\Http\Controllers;

use App\Interfaces\AlbumRepositoryInterface;
use App\Interfaces\MediaFileRepositoryInterface;
use App\Mail\ChangePasswordMailable;
use App\Models\MediaFile;
use App\Models\PaymentHistory;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;

class UserController extends Controller
{

    /** @var MediaFileRepositoryInterface $mediaFileRepository */
    private MediaFileRepositoryInterface $mediaFileRepository;

    /**
     * @param MediaFileRepositoryInterface $mediaFileRepository
     */
    public function __construct(MediaFileRepositoryInterface $mediaFileRepository)
    {
        $this->mediaFileRepository = $mediaFileRepository;
    }

    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json(['users' => User::all()], 200);
    }

    /**
     * @return Application|Factory|View
     */
    public function profile(): Factory|View|Application
    {
        $user = Auth::user();
        return view('profile', compact('user'));
    }

    /**
     * @param Request $request
     * @return string
     */
    public function check_email(Request $request): string
    {
        $validator = Validator::make($request->all(), ['email' => 'unique:users',]);
        if ($validator->fails()) {
            return 'false';
        } else {
            return 'true';
        }
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function update(Request $request): RedirectResponse
    {
        $user = User::find(Auth::id());
        $user->name = $request->post('name');
        $user->phone = $request->post('phone');
        $user->save();
        return redirect()->back()->with('status', 'Your profile updated successfully!');
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function update_password(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'messages' => $validator->getMessageBag()->toArray()], 500);
        $user = User::find(Auth::id());
        $password = base64_decode($request->currentPassword);
        if (!Hash::check($password, $user->password))
            return response()->json(['status' => 'error', 'messages' => ['password' => ['Current password is not correct!']]], 500);
        if (Hash::check(base64_decode($request->password), $user->password))
            return response()->json(['status' => 'error', 'messages' => ['password' => ['Please choose different password, Cannot use old password!']]], 500);
        $user->password = Hash::make(base64_decode($request->password));
        $user->save();
        return response()->json(['status' => 'success', 'message' => 'Password changed successfully']);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function payment(Request $request): JsonResponse
    {
        if (!$request->has("payment_data"))
            return response()->json(['status' => 'error', 'message' => 'Something went wrong, Please contact support!'], 419);

        $paymentData = json_decode($request->post('payment_data'), true);
        $media_file = $this->mediaFileRepository->findById($request->post('id'));
        PaymentHistory::savePaymentDetails($paymentData, $media_file);
        return response()->json(['status' => 'success'], 200);
    }
}
