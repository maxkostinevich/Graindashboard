@if ($paginator->hasPages())
<div class="card-footer d-block d-md-flex align-items-center d-print-none">
  <div class="d-flex mb-2 mb-md-0">Showing {{ $paginator->firstItem() }} to {{ $paginator->lastItem() }} of {{ $paginator->total() }} Entries</div>

  <nav class="d-flex ml-md-auto d-print-none" aria-label="Pagination">
	<ul class="pagination justify-content-end font-weight-semi-bold mb-0">	
		{{-- Previous Page Link --}}
		@if ($paginator->onFirstPage())
		<li class="page-item disabled">				
			<a class="page-link" href="#" aria-label="Previous">
				<i class="gd-angle-left icon-text icon-text-xs d-inline-block"></i>
			</a>
		</li>
		@else
		<li class="page-item">				
			<a class="page-link" href="{{ $paginator->previousPageUrl() }}" aria-label="Previous">
				<i class="gd-angle-left icon-text icon-text-xs d-inline-block"></i>
			</a>
		</li>
		@endif
		
		{{-- Pagination Elements --}}
		@foreach ($elements as $element)
			{{-- "Three Dots" Separator --}}
			@if (is_string($element))
				<li class="page-item disabled"><a class="page-link" href="#">{{ $element }}</a></li>
			@endif

			{{-- Array Of Links --}}
			@if (is_array($element))
				@foreach ($element as $page => $url)
					@if ($page == $paginator->currentPage())
						<li class="page-item d-none d-md-block">
							<a id="datatablePaginationPage0" class="page-link active" href="{{ $url }}">{{ $page }}</a>
						</li>
					@else
						<li class="page-item d-none d-md-block">
							<a id="datatablePaginationPage0" class="page-link" href="{{ $url }}">{{ $page }}</a>
						</li>
					@endif
				@endforeach
			@endif
		@endforeach


		{{-- Next Page Link --}}
		@if ($paginator->hasMorePages())
		<li class="page-item">				
			<a class="page-link" href="{{ $paginator->nextPageUrl() }}" aria-label="Next">
				<i class="gd-angle-right icon-text icon-text-xs d-inline-block"></i>
			</a>				
		</li>	
		@else
		<li class="page-item disabled">				
			<a class="page-link" href="#" aria-label="Next">
				<i class="gd-angle-right icon-text icon-text-xs d-inline-block"></i>
			</a>				
		</li>	
		@endif
			
	</ul>
  </nav>
</div>
@endif