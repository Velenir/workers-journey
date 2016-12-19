const path = require('path');

const merge = require('webpack-merge');

const validate = require('webpack-validator');

const parts = require('./libs/parts');

const stylelint = require('stylelint');
const autoprefixer = require('autoprefixer');

const mila = require('markdown-it-link-attributes');
const miin = require('markdown-it-include');
const mif = require('markdown-it-footnote');

// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const PATHS = {
	app: path.join(__dirname, 'app'),
	style: path.join(__dirname, 'app', 'main.scss'),
	build: path.join(__dirname, 'build'),
	images: path.join(__dirname, 'app', 'images')
};


const common = {
	module: {
		// preLoaders are executed before loaders, postLoaders -- after
		preLoaders: [
			{
				test: /\.jsx?$/,
				loaders: ['eslint'],
				include: PATHS.app
			},
			{
				test: /\.s?css$/,
				loaders: ['postcss?pack=linter'],
				include: PATHS.app
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				// Enable caching for improved performance during development
				// It uses default OS directory by default. If you need
				// something more custom, pass a path to it.
				// I.e., babel?cacheDirectory=<path>
				loaders: ['babel?cacheDirectory'],
				// Parse only app files! Without this it will go through
				// the entire project. In addition to being slow,
				// that will most likely result in an error.
				include: PATHS.app
			},
			{
				test: /\.svg$/,
				loaders: [
					'file?name=img/[name].[hash].[ext]'
				],
				include: PATHS.images
			},
			{
				test:   /\.md$/,
				loader: 'html!markdown-it'
			}
		]
	},
	postcss: function () {
		return {
			linter: [stylelint({
				configFile: '.stylelintrc'
			})],
			defaults: [autoprefixer]
		};
	},
	
	'markdown-it': {
		preset: 'default',
		typographer: true,
		linkify: true,
		html: true,
		use: [
			mif,
			[miin, 'app/marked'],
			[mila, {
				target: '_blank',
				rel: 'noopener noreferrer'
			}]
		]
	},

	// Entry accepts a path or an object of entries.
	// We'll be using the latter form given it's
	// convenient with more complex configurations.
	entry: {
		style: PATHS.style,
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: 'js/[name].js',
		publicPath: '/'	// FIX this may break later on, but for now I need it for react-router + browserHistory in nested routes
	},

	// Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
	resolve: {
		extensions: ['', '.js', '.jsx']
	},

	plugins: [
		// new FaviconsWebpackPlugin("./app/logo.svg")
	]
};


let config;
const  indexTemplateOpts = {
	title: 'Worker\'s Journey',
	template: '!!pug!./app/index.pug',
	inject: false,
	mobile: true,
	appMountId: ["app", "footer-mount"]
};

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
case 'build':
case 'stats':
	config = merge(
		common,
		{
			devtool: 'source-map',
			output: {
				path: PATHS.build,
				// Tweak this to match your GitHub project name
				// publicPath: '/template_project/',
				filename: 'js/[name].[chunkhash].js',
				// This is used for require.ensure. The setup
				// will work without but this is useful to set.
				chunkFilename: '[chunkhash].js'
			}
		},

		parts.clean(PATHS.build),

		// NODE_ENV = 'production' allows for many react and uglify optimisations
		parts.setFreeVariables({
			'process.env.NODE_ENV': 'production'
		}),

		parts.extractBundle({
			name: 'vendor',
			entries: ['react']
		}),
		parts.minify(),
		parts.indexTemplate(
			indexTemplateOpts,
			{
				// inline: 'style',	// inline files from "style" chunk
				// excludeJSWithCSS: true,	// don't include any chunks with css in scripts (when .js is a byproduct of already extracted .css)
				excludeJSChunks: ['style']	// don't include specific chunks in scripts (when .js is a byproduct of already extracted .css)
			}
		),
		parts.extractCSS(PATHS.style),
		parts.optimizeImages(PATHS.images),
		parts.deduplicate()
	);
	break;
default:
	config = merge(
		common,
		{
			devtool: 'eval-source-map'
		},

		parts.indexTemplate(indexTemplateOpts),
		parts.setupCSS(PATHS.style),
		parts.displayImages(PATHS.images),
		parts.devServer({
			// Customize host/port here if needed
			host: process.env.HOST,
			port: process.env.PORT
		})
	);
}

const {Joi} = validate;
const markdownLoaderSchema = Joi.object({
  // this would just allow the property and doesn't perform any additional validation
	"markdown-it": Joi.any(),
});

// Run validator in quiet mode to avoid output in stats
module.exports = validate(config, {
	quiet: true,
	schemaExtension: markdownLoaderSchema
});
