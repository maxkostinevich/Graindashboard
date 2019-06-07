@extends('layouts.grain-auth')

@section('title', __('Login'))

@section('content')
<div class="container-fluid pb-5">

	<div class="row justify-content-md-center">
		<div class="card-wrapper col-12 col-md-4 mt-5">
			<div class="brand text-center mb-3">
				<a href="/"><img src="{{ asset('img/logo.png') }}"></a>
			</div>
			<div class="card">
				<div class="card-body">
					<h4 class="card-title">{{ __('Login') }}</h4>
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
						<div class="form-group">
							<label for="email">{{ __('E-Mail Address') }}</label>
							<input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>
							@if ($errors->has('email'))
								<span class="invalid-feedback" role="alert">
									<strong>{{ $errors->first('email') }}</strong>
								</span>
							@endif
						</div>

						<div class="form-group">
							<label for="password">{{ __('Password') }}
							</label>
							<input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

							@if ($errors->has('password'))
								<span class="invalid-feedback" role="alert">
									<strong>{{ $errors->first('password') }}</strong>
								</span>
							@endif
							@if (Route::has('password.request'))
							<div class="text-right">
								<a href="{{ route('password.request') }}" class="small">
									{{ __('Forgot Your Password?') }}
								</a>
							</div>
							@endif
						</div>

						<div class="form-group">
							<div class="form-check position-relative mb-2">
							  <input type="checkbox" class="form-check-input d-none" id="remember" name="remember" {{ old('remember') ? 'checked' : '' }}>
							  <label class="checkbox checkbox-xxs form-check-label ml-1" for="remember"
									 data-icon="&#xe936">{{ __('Remember Me') }}</label>
							</div>
						</div>

						<div class="form-group no-margin">
							<button type="submit" class="btn btn-primary btn-block">
								{{ __('Sign In') }}
							</button>
						</div>
						@if (Route::has('register'))
						<div class="text-center mt-3 small">
							{{ __('Don\'t have an account?') }} <a href="{{ route('register') }}">{{ __('Sign Up') }}</a>
						</div>
						@endif
					</form>
				</div>
			</div>
			@include('auth.components.footer')
		</div>
	</div>

</div>	
@endsection