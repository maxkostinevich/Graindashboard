<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
	
    public function __construct()
	{
        $this->middleware('auth');
    }
	
	// Show all users
    public function index()
    {
		$users = User::paginate(25);
		return view('user.index', compact('users'));
    }
	
	// Show the form to create new user
    public function create()
    {
        $user = new User();
        return $this->edit($user);
    }
	
    // Show the form for editing the specified user
    public function edit(User $user){
        return view('user.edit', compact('user'));
    }
	
    // Save a newly created user
    public function store(Request $request){
        $user = new User();
        return $this->update($request, $user);
    }
    // Update the specified website
    public function update(Request $request, User $user){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ]);
		
		if($user->id){
			$request->validate([
				'name' => 'required',
				'email' => 'required|email|unique:users,email,' . $user->id
			]);
		}
		
		if(!$user->id){
			$request->validate([
				'password' => 'required|string|min:6|confirmed',
			]);
		}

        $user->name = $request->input('name');
        $user->email = $request->input('email');

		if($request->input('password')){
			$user->password = bcrypt($request->input('password'));
		}
		
        $message = $user->id ? 'User has been updated successfully' : 'User has been created successfully';
        $user->save();
		
        return redirect()
            ->route('user.index')
            ->with('status', $message);
    }
	
    // Delete the specified user
    public function destroy(User $user)
    {
        if($user->id == auth()->user()->id){
            return abort(401);
        }
		
        $user->delete();
        return redirect()
            ->route('user.index')->with('status', 'User has been deleted successfully');
    }
	
}
