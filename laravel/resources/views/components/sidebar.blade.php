<!-- Sidebar Nav -->
<aside id="sidebar" class="js-custom-scroll side-nav">
<ul id="sideNav" class="side-nav-menu side-nav-menu-top-level mb-0">
  <!-- Title -->
  <li class="sidebar-heading h6">Dashboard</li>
  <!-- End Title -->

  <!-- Dashboard -->
  <li class="side-nav-menu-item {{ Request::is('dashboard') ? 'active' : '' }}">
	<a class="side-nav-menu-link media align-items-center" href="{{ route('dashboard') }}">
	  <span class="side-nav-menu-icon d-flex mr-3">
		<i class="gd-dashboard"></i>
	  </span>
	  <span class="side-nav-fadeout-on-closed media-body">Dashboard</span>
	</a>
  </li>
  <!-- End Dashboard -->
  
  <!-- Title -->
  <li class="sidebar-heading h6">Users</li>
  <!-- End Title -->
  
  <!-- Users -->
  <li class="side-nav-menu-item side-nav-has-menu {{ Request::is('user') ? 'active' : '' }}">
	<a class="side-nav-menu-link media align-items-center" href="#"
	   data-target="#subLayouts">
	  <span class="side-nav-menu-icon d-flex mr-3">
		<i class="gd-user"></i>
	  </span>
	  <span class="side-nav-fadeout-on-closed media-body">Users</span>
	  <span class="side-nav-control-icon d-flex">
		<i class="gd-angle-right side-nav-fadeout-on-closed"></i>
	  </span>
	  <span class="side-nav__indicator side-nav-fadeout-on-closed"></span>
	</a>

	<!-- Users: sub -->
	<ul id="subLayouts" class="side-nav-menu side-nav-menu-second-level mb-0">
	  <li class="side-nav-menu-item {{ Request::is('user') ? 'active' : '' }}">
		<a class="side-nav-menu-link" href="{{ route('user.index') }}">All Users</a>
	  </li>
	</ul>
	<!-- Users: sub -->
  </li>
  <!-- End Users -->
  
</ul>
</aside>
<!-- End Sidebar Nav -->