let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */
 

mix.setPublicPath('public')
mix.options({
  processCssUrls: false
});

// Copy Fonts
mix.copyDirectory('resources/graindashboard/gd-icons', 'public/graindashboard/css');

// CSS
mix.sass('resources/graindashboard/sass/graindashboard.scss', 'public/graindashboard/css');

// JS
mix.js(
  'resources/graindashboard/js/graindashboard.js',
  'public/graindashboard/js'
);

// JS Components
mix.scripts(
  [
    // Components
    'resources/graindashboard/js/components/gd.malihu-scrollbar.js',
    'resources/graindashboard/js/components/gd.side-nav.js',
    'resources/graindashboard/js/components/gd.unfold.js',
	// Init components
    'resources/graindashboard/js/components.js',

  ],
  'public/graindashboard/js/graindashboard.vendor.js'
);


