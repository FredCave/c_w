var App = {

	currentProject: "",

	init: function () {

		console.log("App.init");

		this.bindEvents();

		Editor.init();
		Projects.init();

		this.initCurrentProject();

	},

	bindEvents: function () {

		console.log("App.bindEvents");

		var self = this;

		// ON SCROLL DOWN: SHOW CURRENT PROJECT
		$(window).on("scroll", _.throttle( function(){
			var winScroll = $(window).scrollTop();
			self.updateCurrentProject( winScroll );
		}, 500 ));

		$(window).on("resize", _.throttle( function(){
			self.sectionMarkers();
		},1000 ));

	},

	sectionMarkers: function () {

		console.log("App.sectionMarkers");

		// LOOP THROUGH PROJECTS
		$("section").each( function(){

			var thisTop = $(this).offset().top,
				thisBottom = thisTop + $(this).height();

			// console.log( 53, thisTop, thisBottom );

			$(this).attr({
				"data-top" : Math.ceil(thisTop),
				"data-bottom" : Math.ceil(thisBottom)
			});

		});

	},

	initCurrentProject: function () {

		console.log("App.initCurrentProject");

		// GET
		var title = $("section").first().attr("data-title");
		
		// SET
		$("#editor_current").text( title );
		this.currentProject = $("section").first().attr("id");

		console.log( 68, $("section").first().attr("id"), this.currentProject );

	},

	updateCurrentProject: function ( scrollTop ) {

		// console.log("App.updateCurrentProject", scrollTop );

		var self = this;

		// LOOP THROUGH PROJECTS
		$("section").each( function(){

			if ( ( scrollTop + ( Editor.winH / 3 ) ) > $(this).attr("data-top") && scrollTop <= $(this).attr("data-bottom") ) {

				$("#editor_current").text( $(this).attr("data-title") );
				App.currentProject = $(this).attr("id");

				// LOAD NEXT
				if ( !$(this).next().hasClass("loaded") ) {
					Projects.sectionLoad( $(this).next() );
				}		

			}

		});		

	}

}

$(document).on( "ready", function (){

	console.log("Ready");

	App.init();

});