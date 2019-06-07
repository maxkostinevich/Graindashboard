@extends('layouts.grain-auth')

@section('title', __('Reset Password'))

@section('content')
<div class="container-fluid pb-5">

	<div class="row justify-content-md-center">
		<div class="card-wrapper col-12 col-md-4 mt-5">
			<div class="brand text-center mb-3">
				<a href="/"><img src="{{ asset('img/logo.png') }}"></a>
			</div>
			<div class="card">
				<div class="card-body">
					<h4 class="card-title">{{ __('Reset Password') }}</h4>
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <form method="POST" action="{{ route('password.email') }}">
                        @csrf
						<div class="form-group">
							<label for="email">{{ __('E-Mail Address') }}</label>
							<input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>

							@if ($errors->has('email'))
								<span class="invalid-feedback" role="alert">
									<strong>{{ $errors->first('email') }}</strong>
								</span>
							@endif
						</div>

						<div class="form-group no-margin">
							<button type="submit" class="btn btn-primary btn-block">
								{{ __('Send Password Reset Link') }}
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