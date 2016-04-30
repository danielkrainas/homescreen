module.exports = function (grunt) {
	var babel = require('rollup-plugin-babel');
	var nodeResolve = require('rollup-plugin-node-resolve');
	var commonjs = require('rollup-plugin-commonjs');
	var riot = require('rollup-plugin-riot');
	var ruReplace = require('rollup-plugin-replace');

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		rollup: {
			options: {
				entry: 'app/index.js',

				plugins: [
					riot(),

					nodeResolve({
						main: true,
						jsnext: true,
						browser: true
					}),

					ruReplace({
						'process.env.NODE_ENV': JSON.stringify('production')
					}),

					commonjs({
						ignoreGlobal: true
					}),

					babel({
						exclude: './node_modules/**',
						presets: ['es2015-rollup']
					})
				]
			},

			files: {
				src: 'app/index.js',
				dest: 'build/app.js'
			}
		}
	});

	grunt.registerTask('build', ['rollup']);
};