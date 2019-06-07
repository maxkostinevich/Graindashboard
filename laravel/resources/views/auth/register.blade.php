@extends('layouts.grain-auth')

@section('title', __('Create new account'))

@section('content')
<div class="container-fluid pb-5">

	<div class="row justify-content-md-center">
		<div class="card-wrapper col-12 col-md-4 mt-5">
			<div class="brand text-center mb-3">
				<a href="/"><img src="{{ asset('img/logo.png') }}"></a>
			</div>
			<div class="card">
				<div class="card-body">
					<h4 class="card-title">{{ __('Create new account') }}</h4>
                    <form method="POST" action="{{ route('register') }}">
                        @csrf
						<div class="form-group">
							<label for="name">{{ __('Name') }}</label>
							<input id="name" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" required autofocus>

							@if ($errors->has('name'))
								<span class="invalid-feedback" role="alert">
									<strong>{{ $errors->first('name') }}</strong>
								</span>
							@endif
						</div>

						<div class="form-group">
							<label for="email">{{ __('E-Mail Address') }}</label>
							<input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>

							@if ($errors->has('email'))
								<span class="invalid-feedback" role="alert">
									<strong>{{ $errors->first('email') }}</strong>
								</span>
							@endif
						</div>

						<div class="form-row">
							<div class="form-group col-md-6">
								<label for="password">{{ __('Password') }}</label>
                                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
							</div>
							<div class="form-group col-md-6">
								<label for="password-confirm">{{ __('Confirm Password') }}</label>
								<input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
							</div>
						</div>


						<div class="form-group no-margin">
							<button type="submit" class="btn btn-primary btn-block">
								{{ __('Sign Up') }}
							</button>
						</div>
						<div class="text-center mt-3 small">
							{{ __('Already have an account?') }} <a href="{{ route('login') }}">{{ __('Sign In') }}</a>
						</div>
					</form>
				</div>
			</div>
			@include('auth.components.footer')
		</div>
	</div>

</div>
@endsection