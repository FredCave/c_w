module.exports = function ( grunt ) {

	// Configure tasks
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		uglify: {
			dev: {
				beautify: true,
				src: "assets/js/*.js",
				dest: "js/scripts.min.js"
			}
		},
		watch: {
			js: {
				files: ["assets/js/**"],
				tasks: ["uglify:dev"]
			},
			grunt: { files: ['gruntfile.js'] },
			css: {
				files: 'assets/css/*.scss',
				tasks: ['sass',"cssmin"]
			}
		},
		sass: {
			dist: {
			    options: {
			      style: 'expanded',
			      lineNumbers: true, // 1
			      sourcemap: 'none'
			    },
			    files: [{
			      expand: true, // 2
			      cwd: 'assets/css/',
			      src: [ '**/*.scss' ],
			      dest: 'assets/css',
			      ext: '.css'
			    }]
			}
		},
		cssmin: {
			my_target: {
			    files: [{
			      expand: true,
			      cwd: 'assets/css/',
			      src: [ '*.css', '!*.min.css' ], // 1
			      dest: '',
			      ext: '.min.css'
			    }]
			  }
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	// Register tasks
	grunt.registerTask("default", ["uglify:dev"]);

}