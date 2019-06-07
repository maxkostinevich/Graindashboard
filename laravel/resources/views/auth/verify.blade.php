@extends('layouts.grain-auth')

@section('title', __('Verify Your Email Address'))

@section('content')
<div class="container-fluid pb-5">

	<div class="row justify-content-md-center">
		<div class="card-wrapper col-12 col-md-6 mt-5">
			<div class="brand text-center mb-3">
				<a href="/"><img src="{{ asset('img/logo.png') }}"></a>
			</div>
			<div class="card">
				<h4 class="card-title">{{ __('Verify Your Email Address') }}</h4>
                <div class="card-body">
                    @if (session('resent'))
                        <div class="alert alert-success" role="alert">
                            {{ __('A fresh verification link has been sent to your email address.') }}
                        </div>
                    @endif

                    {{ __('Before proceeding, please check your email for a verification link.') }}
                    {{ __('If you did not receive the email') }}, <a href="{{ route('verification.resend') }}">{{ __('click here to request another') }}</a>.
                </div>
			</div>
			@include('auth.components.footer')
		</div>
	</div>

</div>
@endsection