module.exports = function(grunt) {
    var babel = require('rollup-plugin-babel');
    var nodeResolve = require('rollup-plugin-node-resolve');
    var commonjs = require('rollup-plugin-commonjs');
    var riot = require('rollup-plugin-riot');
    var uglify = require('rollup-plugin-uglify');
    var ruReplace = require('rollup-plugin-replace');
    var modRewrite = require('connect-modrewrite');
    var serveStatic = require('serve-static');
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            client: {
                files: ['client/scripts/*.js', 'client/scripts/**/*.tag', 'client/scripts/**/*.js'],
                tasks: ['build']
            }
        },

        concurrent: {
            watchrun: ['connect:dev:keepalive', 'watch']
        },

        connect: {
            options: {
                port: 7890,
                hostname: '0.0.0.0',
                livereload: 6543
            },

            dev: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            serveStatic('.tmp'),
                            /*connect().use(
                                '/client',
                                serveStatic('./client')
                            ),*/
                            serveStatic('./client')
                        ];
                    }
                }
            }
        },

        rollup: {
            options: {
                entry: './client/scripts/app.js',

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

                    commonjs(),

                    babel({
                        exclude: 'node_modules/**',
                        presets: ['es2015-rollup']
                    })//,

                    /*uglify({
                        wrap: true
                    })*/
                ]
            },

            files: {
                src: 'client/scripts/app.js',
                dest: '.tmp/build/app.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-rollup');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('build', ['rollup']);
    grunt.registerTask('serve', ['build', 'concurrent:watchrun']);
};