<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return View
     */
    public function create(): View
    {
        return view('auth.register');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator ( array $data ): \Illuminate\Contracts\Validation\Validator
    {
        return Validator ::make ( $data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [ 'required', 'confirmed', Rules\Password ::defaults () ],
        ] );
    }

    /**
     * Handle an incoming registration request.
     *
     * @param Request $request
     * @return RedirectResponse | JsonResponse
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        if ($request->ajax()) {
            $validator = $this->validator($request->all());
            if ($validator->fails())
                return response()->json(['status' => 'error', 'messages' => $validator->getMessageBag()->toArray()], 500);
        } else {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make(base64_decode($request->password)),
        ]);

        event(new Registered($user));
        Auth::login($user);

        if ($request->ajax()) {
            return response()->json([
                'status' => 'success',
                'data' => Auth::user(),
                'intended' => URL::to(RouteServiceProvider::HOME)
            ]);
        } else {
            return redirect(RouteServiceProvider::HOME);
        }

    }
}
