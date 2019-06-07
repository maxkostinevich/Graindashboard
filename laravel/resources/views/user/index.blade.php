@extends('layouts.grain')

@section('title', 'Users')

@section('content')

@include('components.notification')

<div class="card mb-3 mb-md-4">

	<div class="card-body">
		<!-- Breadcrumb -->
		<nav class="d-none d-md-block" aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item active" aria-current="page">Users</li>
			</ol>
		</nav>
		<!-- End Breadcrumb -->

		<div class="mb-3 mb-md-4 d-flex justify-content-between">
			<div class="h3 mb-0">Users</div>
			<a href="{{ route('user.create') }}" class="btn btn-primary">
				Add new
			</a>
		</div>


		<!-- Users -->
		<div class="table-responsive-xl">
			<table class="table text-nowrap mb-0">
				<thead>
				<tr>
					<th class="font-weight-semi-bold border-top-0 py-2">#</th>
					<th class="font-weight-semi-bold border-top-0 py-2">Name</th>
					<th class="font-weight-semi-bold border-top-0 py-2">Email</th>
					<th class="font-weight-semi-bold border-top-0 py-2">Registration Date</th>
					<th class="font-weight-semi-bold border-top-0 py-2">Actions</th>
				</tr>
				</thead>
				<tbody>
				@forelse($users as $user)
				<tr>
					<td class="py-3">{{ $user->id }}</td>
					<td class="align-middle py-3">
						<div class="d-flex align-items-center">
							<div class="position-relative mr-2">
								<span class="indicator indicator-lg indicator-bordered-reverse indicator-top-left indicator-success rounded-circle"></span>
								<!--img class="avatar rounded-circle" src="#" alt="{{ $user->name }}"-->
								<span class="avatar-placeholder mr-md-2">{{ substr($user->name, 0, 1) }}</span>
							</div>
							{{ $user->name }}
						</div>
					</td>
					<td class="py-3">{{ $user->email }}</td>
					<td class="py-3">{{ $user->created_at->diffForHumans() }}</td>
					<td class="py-3">
						<div class="position-relative">
							<a class="link-dark d-inline-block" href="{{ route('user.edit', $user) }}">
								<i class="gd-pencil icon-text"></i>
							</a>
							@if($user->id != auth()->user()->id)
							<a class="link-dark d-inline-block" href="#" onclick="if(confirm('Delete this record?')){document.getElementById('delete-entity-{{ $user->id }}').submit();return false;}">
								<i class="gd-trash icon-text"></i>
							</a>
							<form id="delete-entity-{{ $user->id }}" action="{{ route('user.destroy', $user) }}" method="POST">
								<input type="hidden" name="_method" value="DELETE">
								@csrf
							</form>
							@endif
						</div>
					</td>
				</tr>
				@empty
				<tr>
					<td colspan="5" class="align-center">
						<strong>No records found</strong><br>
					</td>
				</tr>
				@endforelse

				</tbody>
			</table>
			
			{{ $users->links('components.pagination') }}
			
		</div>
		<!-- End Users -->
	</div>
</div>
@endsection