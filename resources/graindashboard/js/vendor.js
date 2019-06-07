try {
	window.Popper = require('popper.js').default;
	window.jQuery = window.$ = require('jquery');
	require.resolve('jquery-migrate');
	require('webpack-jquery-ui');
	require('bootstrap');
	require('jquery-mousewheel');
	require('malihu-custom-scrollbar-plugin');
} catch (e) {}

