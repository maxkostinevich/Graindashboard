<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
	
    public function __construct()
	{
        $this->middleware('auth');
    }
	
    public function edit()
	{
        return view('profile.edit');
    }
	
    public function update(Request $request)
    {
		$user = auth()->user();
		
		
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
			'old_password' => ['sometimes', 'nullable', 'required_with:password',
				function ($attribute, $value, $fail) use ($user) {
					if (!password_verify($value, $user->password)) {
						return $fail(__('The current password is incorrect.'));
					}
				}
			],
			'password' => 'sometimes|nullable|required_with:old_password|string|min:6|confirmed',
        ]);
		
		
		$user->name = $request->input('name');
		$user->email = $request->input('email');
		
		if($request->input('password')){
			$user->password = bcrypt($request->input('password'));
		}
		
		$user->save();
        
        return redirect()
            ->back()
            ->with('status', 'Your profile has been updated successfully.');
    }
}
