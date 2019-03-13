module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            dist: {
                base_path: 'dist'
            },
            app: {
                root_path: '.',
                base_path: 'app',
                assets_path: 'assets'
            },

            app_path: 'app/**/*.js'
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: '0.0.0.0',
                    base: '.',
                    directory: null,
                    keepalive: false,
                    livereload: true
                }
            }
        },
        watch: {
            js: {
                files: "<%= config.app.base_path %>/**/*.js",
                options: { livereload: true }
            },
            html: {
                files: 'app/views/**/*.html',
                options: { livereload: true }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('serve', ['connect', 'watch']);

};

