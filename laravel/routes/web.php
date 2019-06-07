<?php

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

Route::get('/', function () {
    return view('welcome');
});

// Redirect from /home to /dashboard
Route::get('/home', function () {
    return redirect()->route('dashboard');
});

Auth::routes();


// App Routes

Route::get('/dashboard', 'DashboardController@show')->name('dashboard');

// Users
Route::get('/users', 'UserController@index')->name('user.index');
Route::get('/users/create', 'UserController@create')->name('user.create');
Route::post('/users/create', 'UserController@store')->name('user.store');
Route::get('/users/{user}', 'UserController@edit')->name('user.edit');
Route::patch('/users/{user}', 'UserController@update')->name('user.update');
Route::delete('/users/{user}', 'UserController@destroy')->name('user.destroy');

// Profile
Route::get('/profile', 'ProfileController@edit')->name('profile.edit');
Route::post('/profile', 'ProfileController@update')->name('profile.update');