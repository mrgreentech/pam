module.exports = function (grunt) {

/* ===================================================================
    Config
=================================================================== */

    grunt.initConfig({

    	pkg: grunt.file.readJSON('package.json'),
    	bower: grunt.file.readJSON('bower.json'),


    	// bower.json
        // ===================================================================

    	bower_json: {
    		release: {
    			values: {
    				main: 'pam.less'
    			},
    			dest: ''
    		}
    	},


    	// Clean
        // ===================================================================

    	clean: {
            build: ['build/'],
    		build_files: ['build/*.css'],
    		release: ['release/']
    	},


    	// Copy
        // ===================================================================

    	copy: {
    		build: {
    			cwd: 'src',
    			src: ['**/*.less'],
    			dest: 'build/less',
    			expand: true,
    		},

    		release: {
    			cwd: 'build',
    			src: ['less/**/*.less', 'styleguide/*.*'],
    			dest: 'release',
    			expand : true
    		},

            lesshat: {
                src: ['bower_components/lesshat/build/lesshat-prefixed.less'],
                dest: 'build/less/mixins',
                flatten: true,
                expand : true
            },

            styleguide: {
                files: [
                    { expand: true, flatten: true, src: [
                        'build/pam-responsive.css',
                        'src/styleguide/favicon.png',
                        'bower_components/styledown-skins/dist/Default/styleguide.css',
                        'bower_components/styledown-skins/dist/Default/styleguide.js'
                    ], dest: 'build/styleguide' }
                ]
            }
    	},


    	// Concat
        // ===================================================================

    	concat: {
    		build: {
    			files: [
    				{'build/less/core/base.less': [
    					'bower_components/normalize-css/normalize.css',
    					'build/less/core/base.less'
    				]},

                    {'build/less/core/forms-responsive.less': [
                        'build/less/core/forms.less',
                        'build/less/core/forms-r.less'
                    ]},

                    {'build/less/core/grids-responsive.less': [
                        'build/less/core/grids.less',
                        'build/less/core/grids-r.less'
                    ]}
    			]
    		},

    		base: {
    			files: {
    				'build/less/core/base.less': [
    					'build/less/core/font.less',
    					'build/less/core/base.less'
    				]
    			}
    		}
    	},


    	// LESS Config
        // ===================================================================

    	less: {
    		development: {
    			src: 'build/**/*.less',
    			dest: 'build/',
    			expand : true,
    			flatten: true,
    			ext: '.css'
    		}
    	},


    	// LESSLint
        // ===================================================================

    	lesslint: {
    		options: {
    			csslint: {
    				csslintrc: '.csslintrc'
    			}
    		},
    		core: ['build/less/core/*.less'],
    		components: ['build/less/components/*.less']
    	},


        // postcss
        // ===================================================================

        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: ['> 2%', 'last 3 versions']
                    })
                ]
            },
            dist: {
                src: 'build/*.css'
            }
        },

    	// CSSMin
        // ===================================================================

    	cssmin: {
    		options: {
    			noAdvanced: true
    		},

    		files: {
    			expand: true,
    			src: 'build/*.css',
    			ext: '-min.css'
    		}
    	},


    	// Compress
        // ===================================================================

    	compress: {
    		release: {
    			options: {
    				archive: 'release/<%= bower.name %>-<%= bower.version %>.tar.gz'
    			},

    			expand : true,
    			flatten: true,
    			src: 'build/pam-min.css'
    		}
    	},


    	// License
        // ===================================================================

    	license: {
    		normalize: {
    			options: {
    				banner: [
    					'/*!',
    					'normalize.css v<%= bower.devDependencies["normalize-css"] %> | MIT License | git.io/normalize',
    					'Copyright (c) Nicolas Gallagher and Jonathan Neal',
    					'*/\n'
    				].join('\n')
    			},

    			expand: true,
    			cwd: 'build/less',
    			src: ['core/base*.less', 'core/<%= pkg.name %>*.less']
    		},

    		yahoo: {
    			options: {
    				banner: [
    					'/*!',
    					'Pure v<%= pkg.version %>',
    					'Copyright 2014 Yahoo! Inc. All rights reserved.',
    					'Licensed under the BSD License.',
    					'https://github.com/yahoo/pure/blob/master/LICENSE.md',
    					'*/\n'
    				].join('\n')
    			},

    			expand: true,
    			src: ['build/less/core/base.less']
    		},

    		pam: {
    			options: {
    				banner: [
    					'/*!',
    					'Pam v<%= bower.version %>',
    					'Copyright 2014 Mr Green! Inc. All rights reserved.',
    					'Licensed under the BSD License.',
    					'https://[url]/LICENSE.md',
    					'*/\n'
    				].join('\n')
    			},

    			expand: true,
    			cwd: 'build/less',
    			src: ['core/base*.less', 'core/<%= pkg.name %>*.less']
    		}
    	},


    	// Watch/Observe
        // ===================================================================

    	observe: {
    		src: {
    			files: 'src/**/*.less',
    			tasks: ['build_bs'],

    			options: {
    				interrupt: true
    			}
    		}
    	},


    	// BrowserSync
        // ===================================================================

    	browserSync: {
    		bsFiles: {
    			src: ['build/*.css', 'src/components/*.html', 'src/core/*.html']
    		},
    		options: {
    			server: {
    				baseDir: "./",
    				index: 'src/index.html'
    			},
    			//tunnel: "manualtests",
    			watchTask: true
    		}
    	},


        // Styledown
        // ===================================================================

        styledown: {
            build: {
                files: {
                    'build/styleguide/index.html': ['src/core/*.less', 'src/components/*.less']
                },
                options: {
                    title: 'PAM',
                    config: 'src/styleguide/config.md'
                }
            },
        }
    });

    // ===================================================================
    // Tasks
    // ===================================================================


    // Npm Tasks
    // ===================================================================

    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-lesslint');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-stripmq');
    grunt.loadNpmTasks('grunt-styledown');


    // Local tasks
    // ===================================================================

    grunt.loadTasks('tasks/');


    // Register Tasks
    // ===================================================================

    grunt.registerTask('default', ['import', 'build']);
    grunt.registerTask('import', ['bower_install']);
    grunt.registerTask('test', ['lesslint']);
    grunt.registerTask('build', [
    	'clean:build',
    	'copy:build',
        'copy:lesshat',
        'lesslint',
        'concat:build',
    	'license',
    	'concat:base',
    	'less',
        'postcss:dist',
    	'cssmin',
        'copy:styleguide',
        'styledown'
    ]);

    grunt.registerTask('build_bs', [
        'clean:build_files',
        'copy:build',
        'copy:lesshat',
        'concat:build',
        'license',
        'concat:base',
        'less',
        'postcss:dist',
        'cssmin',
        'copy:styleguide',
        'styledown'
    ]);

    grunt.registerTask('build_styleguide', [
        'copy:styleguide',
        'styledown'
    ]);

    // Makes the `watch` task run a build first.
    grunt.renameTask('watch', 'observe');
    grunt.registerTask('watch', ['build_bs', 'observe']);
    grunt.registerTask('tests', ["browserSync", "watch"]);

    grunt.registerTask('release', [
    	'default',
    	'clean:release',
    	'copy:release',
    	'bower_json:release',
    	'compress:release'
    ]);
};