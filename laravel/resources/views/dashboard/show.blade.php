@extends('layouts.grain')

@section('title', 'Dashboard')

@section('content')

@include('components.notification')

<div class="mb-3 mb-md-4 d-flex justify-content-between">
	<div class="h3 mb-0">Dashboard</div>
</div>

<div class="py-2">Welcome, {{ auth()->user()->name }}!</div>

<div class="row">
	<div class="col-md-6 col-xl-4 mb-3 mb-xl-4">
		<!-- Widget -->
		<div class="card flex-row align-items-center p-3 p-md-4">
			<div class="icon icon-lg bg-soft-primary rounded-circle mr-3">
				<i class="gd-bar-chart icon-text d-inline-block text-primary"></i>
			</div>
			<div>
				<h4 class="lh-1 mb-1">75%</h4>
				<h6 class="mb-0">Conversion Rate</h6>
			</div>
			<i class="gd-arrow-up icon-text d-flex text-success ml-auto"></i>
		</div>
		<!-- End Widget -->
	</div>

	<div class="col-md-6 col-xl-4 mb-3 mb-xl-4">
		<!-- Widget -->
		<div class="card flex-row align-items-center p-3 p-md-4">
			<div class="icon icon-lg bg-soft-secondary rounded-circle mr-3">
				<i class="gd-wallet icon-text d-inline-block text-secondary"></i>
			</div>
			<div>
				<h4 class="lh-1 mb-1">$18,000.00</h4>
				<h6 class="mb-0">Total Sales</h6>
			</div>
			<i class="gd-arrow-down icon-text d-flex text-danger ml-auto"></i>
		</div>
		<!-- End Widget -->
	</div>

	<div class="col-md-6 col-xl-4 mb-3 mb-xl-4">
		<!-- Widget -->
		<div class="card flex-row align-items-center p-3 p-md-4">
			<div class="icon icon-lg bg-soft-warning rounded-circle mr-3">
				<i class="gd-money icon-text d-inline-block text-warning"></i>
			</div>
			<div>
				<h4 class="lh-1 mb-1">$10,000.00</h4>
				<h6 class="mb-0">Net Revenue</h6>
			</div>
			<i class="gd-arrow-up icon-text d-flex text-success ml-auto"></i>
		</div>
		<!-- End Widget -->
	</div>
</div>
@endsection