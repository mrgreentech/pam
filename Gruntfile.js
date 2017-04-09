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
    		dist: {
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
    		dist: ['dist/']
    	},


    	// Copy
        // ===================================================================

    	copy: {
    		build: {
    			cwd: 'src',
    			src: ['**/*.less'],
    			dest: 'build',
    			expand: true,
    		},

    		dist: {
    			cwd: 'build',
    			src: ['less/**/*.less', 'styleguide/**'],
    			dest: 'dist',
    			expand : true
    		},

            styleguide: {
                files: [
                    {
                        expand: true, flatten: true, src: [
                            'build/pam.css',
                            'src/styleguide/*.*'
                        ],
                        dest: 'build/styleguide'
                    },
                    {
                        expand: true,
                        cwd: 'src/styleguide',
                        src: 'sg-assets/*.svg',
                        dest: 'build/styleguide',
                    }
                ]
            }
    	},


    	// Concat
        // ===================================================================

    	concat: {
    		build: {
    			files: [
    				{'build/less/base.less': [
    					'bower_components/normalize-css/normalize.css',
    					'build/less/base.less'
    				]}
    			]
    		},

    		base: {
    			files: {
    				'build/less/base.less': [
    					'build/less/font.less',
    					'build/less/base.less'
    				]
    			}
    		}
    	},


    	// LESS Config
        // ===================================================================

    	less: {
    		development: {
    			src: 'build/less/pam.less',
    			dest: 'build/',
    			expand : true,
    			flatten: true,
    			ext: '.css'
    		}
    	},


        // postcss
        // ===================================================================

        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: [
                            'Chrome >= 35',
                            'Firefox >= 38',
                            'Edge >= 12',
                            'Explorer >= 10',
                            'iOS >= 8',
                            'Safari >= 8'
                        ]
                    })
                ]
            },
            dist: {
                src: 'build/*.css'
            },
            lint: {
                options: {
                    map: false,
                    processors: [
                        require('stylelint')(),
                        require("postcss-reporter")({ clearMessages: true })
                    ],
                    syntax: require('postcss-less')
                },
                src: 'src/less/buttons.less'
            },
            test: {
                options: {
                    map: false,
                    processors: [
                        require('autoprefixer')({
                            browsers: ['> 2%', 'last 2 versions']
                        })
                    ],
                    syntax: require('postcss-less')
                },
                src: 'src/less/buttons.less'
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
    		dist: {
    			options: {
    				archive: 'dist/<%= bower.name %>-<%= bower.version %>.tar.gz'
    			},

    			expand : true,
    			flatten: true,
    			src: 'build/pam-min.css'
    		}
    	},


    	// License
        // ===================================================================

    	license: {
    		yahoo: {
    			options: {
    				banner: [
    					'/*!',
    					'Pure v0.6.0',
    					'Copyright 2014 Yahoo! Inc. All rights reserved.',
    					'Licensed under the BSD License.',
    					'https://github.com/yahoo/pure/blob/master/LICENSE.md',
    					'*/\n'
    				].join('\n')
    			},

                expand: true,
                cwd: 'build/less',
                src: ['base.less']
    		},

    		pam: {
    			options: {
    				banner: [
    					'/*!',
    					'Pam v<%= bower.version %>',
    					'Copyright 2016 Mr Green! Inc. All rights reserved.',
    					'Licensed under the BSD License.',
    					'https://github.com/mrgreentech/pam/blob/master/LICENSE.md',
    					'*/\n'
    				].join('\n')
    			},

    			expand: true,
    			cwd: 'build/less',
    			src: ['base.less']
    		}
    	}
    });

    // ===================================================================
    // Tasks
    // ===================================================================


    // Npm Tasks
    // ===================================================================

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');


    // Local tasks
    // ===================================================================

    grunt.loadTasks('tasks/');


    // Register Tasks
    // ===================================================================

    grunt.registerTask('default', ['import', 'build']);
    grunt.registerTask('import', ['bower_install']);
    grunt.registerTask('build', [
    	'clean:build',
    	'copy:build',
        'concat:build',
    	'license',
    	'concat:base',
    	'less',
        'postcss:dist',
    	'cssmin',
        // 'copy:styleguide'
    ]);

    grunt.registerTask('build_bs', [
        'clean:build_files',
        'copy:build',
        'concat:build',
        'license',
        'concat:base',
        'less',
        'postcss:dist',
        'cssmin',
        // 'copy:styleguide'
    ]);

    grunt.registerTask('build_styleguide', [
        'copy:styleguide'
    ]);

    grunt.registerTask('dist', [
    	'clean:dist',
    	'copy:dist',
    	'compress:dist'
    ]);
};