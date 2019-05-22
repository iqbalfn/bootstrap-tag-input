module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            docs: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/css/',
                        src: [
                            'bootstrap-tag-input.css',
                            'bootstrap-tag-input.css.map'
                        ],
                        dest: 'docs/css/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/js/',
                        src: [
                            'bootstrap-tag-input.js',
                            'bootstrap-tag-input.js.map'
                        ],
                        dest: 'docs/js/'
                    }
                ]
            }
        },

        run: {
            css_compile: {
                cmd: 'npm', args: ['run','css-compile']
            },
            css_minify: {
                cmd: 'npm', args: ['run','css-minify']
            },
            css_prefix: {
                cmd: 'npm', args: ['run','css-prefix']
            },
            js_compile: {
                cmd: 'npm', args: ['run','js-compile']
            },
            js_minify: {
                cmd: 'npm', args: ['run','js-minify']
            }
        },

        watch: {
            bootstrap: {
                files: [
                    'src/scss/*.scss',
                    'src/js/*.js'
                ],
                tasks: [
                    'run:css_compile',
                    'run:js_compile',
                    'copy:docs'
                ]
            },
            css: {
                files: [
                    'src/scss/*.scss',
                ],
                tasks: [
                    'run:css_compile',
                    'copy:docs'
                ]
            },
            js: {
                files: [
                    'src/js/*.js'
                ],
                tasks: [
                    'run:js_compile',
                    'copy:docs'
                ]
            }
        }
    })

    grunt.loadNpmTasks('grunt-run')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-watch')
}