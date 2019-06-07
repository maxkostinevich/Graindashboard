@extends('layouts.grain')

@section('title', 'Dashboard')

@section('content')

@include('components.notification')

<div class="card mb-3 mb-md-4">

	<div class="card-body">
		<!-- Breadcrumb -->
		<nav class="d-none d-md-block" aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item active" aria-current="page">Profile Settings</li>
			</ol>
		</nav>
		<!-- End Breadcrumb -->

		<div class="mb-3 mb-md-4 d-flex justify-content-between">
			<div class="h3 mb-0">Update Profile</div>
		</div>


		<!-- Form -->
		<div>
			<form action="{{ route('profile.update') }}" method="POST">
				@csrf
				<div class="form-row">
					<div class="form-group col-12 col-md-6">
						<label for="name">Name</label>
						<input type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" value="{{ old('name', auth()->user()->name) }}" id="name" name="name" >
					</div>
					<div class="form-group col-12 col-md-6">
						<label for="email">Email</label>
						<input type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" value="{{ old('email', auth()->user()->email) }}" id="email" name="email">
					</div>
				</div>
				<div class="form-row border p-2 mb-3">
					<div class="col-12">
						<div class="font-weight-semi-bold h5 mb-3">Change Password</div>
					</div>
					<div class="form-group col-12 col-md-4">
						<label for="old_password">Current Password</label>
						<input type="password" class="form-control{{ $errors->has('old_password') ? ' is-invalid' : '' }}" id="old_password" name="old_password" placeholder="Current Password">
					</div>
					<div class="form-group col-12 col-md-4">
						<label for="password">New Password</label>
						<input type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" id="password" name="password" placeholder="New Password">
					</div>
					<div class="form-group col-12 col-md-4">
						<label for="password_confirmation">Confirm New Password</label>
						<input type="password" class="form-control{{ $errors->has('password_confirmation') ? ' is-invalid' : '' }}" id="password_confirmation" name="password_confirmation" placeholder="Confirm New Password">
					</div>
				</div>
				<button type="submit" class="btn btn-primary float-right">Update</button>
			</form>
		</div>
		<!-- End Form -->
	</div>
</div>
@endsection