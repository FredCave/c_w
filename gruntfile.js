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
				files: ['assets/css/*.css'], 
				tasks: [ "cssmin:dist" ]
			}
		},
		cssmin: {
			dist: {
				files: {
					'style.min.css': ['assets/css/*.css']
				}
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	// Register tasks
	grunt.registerTask("default", ["uglify:dev"]);

}