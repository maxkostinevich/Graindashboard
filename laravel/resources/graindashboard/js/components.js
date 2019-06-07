$(window).on('load', function () {
	// initialization of custom scroll
	$.GDCore.components.GDMalihuScrollBar.init($('.js-custom-scroll'));

	// initialization of sidebar navigation component
	$.GDCore.components.GDSideNav.init('.js-side-nav');

	// initialization of dropdown component
	$.GDCore.components.GDUnfold.init($('[data-unfold-target]'));
});