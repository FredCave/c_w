var Editor = {

	winW: $(window).width(),

	winH: $(window).height(),

	currentProject: "",

	init: function () {

		console.log("Editor.init");

		// CHECK IF EDITOR FUNCTION ENABLED
		if ( $("#editor_bar").length ) {

			this.bindEvents();

		}

	}, 

	bindEvents: function () {

		console.log("Editor.bindEvents");

		var self = this;

		$("#editor_save").on("click", function (){

			// GET STATE OF IMAGES
			self.imagesSave( self.currentProject );

		});

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

		console.log("Editor.sectionMarkers");

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

	updateCurrentProject: function ( scrollTop ) {

		// console.log("Editor.updateCurrentProject", scrollTop );

		var self = this;

		// LOOP THROUGH PROJECTS
		$("section").each( function(){

			if ( ( scrollTop + ( Editor.winH / 3 ) ) > $(this).attr("data-top") && scrollTop <= $(this).attr("data-bottom") ) {

				$("#editor_current").text( $(this).attr("data-title") );
				self.currentProject = $(this).attr("id");

			}

		});		

	},

	imagesSave: function ( id ) {

		console.log("Editor.imagesSave");

		// PROJECT BY PROJECT

		var self = this;

		// GET PROJECT JSON FROM SERVER

		console.log( 98, LH_SCRIPT.root + 'acf/v3/projects/' + id );

		$.ajax({
            method: "GET",
            url: LH_SCRIPT.root + 'acf/v3/projects/' + id,
            success : function( response ) { 
                
                postImages = response.acf.images;                

                console.log( 105, response );

                // LOOP THROUGH IMAGES
                var arrayLength = postImages.length;
				for (var i = 0; i < arrayLength; i++) {
				    // FIND IMG ON PAGE
				    var postImg = postImages[i].image,
				    	pageImg = $("#" + postImg.ID).parent(".ui-wrapper");
				    
				    console.log( 114, pageImg.position().top, pageImg.position().left );

				    // STORE STATE IN IMAGE OBJECT
				    postImages[i].saved_width		= parseFloat( ( pageImg.width() / self.winW * 100 ).toFixed(2) ) || 0,
				    postImages[i].saved_top			= parseFloat( ( pageImg.position().top / self.winW * 100 ).toFixed(2) ) || 0, // TOP AS PERC OF WRAPPER (WIN)
					postImages[i].saved_left		= parseFloat( ( pageImg.position().left / self.winW * 100 ).toFixed(2) ) || 0, // LEFT AS PERC OF WRAPPER (WIN)
					postImages[i].saved_z_index 	= parseFloat( pageImg.css("z-index") ) || 1;
				}

				var data = {
					"fields": {
						"images": postImages
					}
				}

				// UPDATE POST ON SERVER
		        $.ajax({
		            method: "PUT",
		            url: LH_SCRIPT.root + 'acf/v3/projects/' + id,
		            data: data,
		            dataType: 'json',
		            beforeSend: function ( xhr ) {
		                xhr.setRequestHeader( 'X-WP-Nonce', LH_SCRIPT.nonce );
		            },
		            success : function( response ) {
		                console.log( "Success", response );
		                // alert( LH_SCRIPT.success );
		            },
		            fail : function( response ) {
		                console.log( "Fail", response );
		                alert( LH_SCRIPT.failure );
		            }

		        });

            },
            fail : function( response ) {
                console.log( response );
            }

        });

	}

}

var Projects = {

	init: function () {

		console.log("Projects.init");

		this.loadImages();

	},

	imgCalc: function ( img ) {

		console.log("Projects.imgCalc", img );

		// GET SAVED VALUES
		var width 	= parseFloat( $(img[0]).attr("data-width") ),
			ratio  	= parseFloat( $(img[0]).attr("data-ratio") ),
			top 	= parseFloat( $(img[0]).attr("data-top") ),
			left	= parseFloat( $(img[0]).attr("data-left") ),
			z_index = parseFloat( $(img[0]).attr("data-zindex") ),
			src,
			position;

		// SRC BASED ON WIDTH
		if ( width < 300 ) { // THUMB
			src = $(img[0]).attr("data-thm");
		} else if ( width > 300 && width <= 600 ) { // MEDIUM
			src = $(img[0]).attr("data-med");
		} else if ( width > 600 && width <= 900 ) { // LARGE
			src = $(img[0]).attr("data-lrg");
		} else if ( width > 900 && width <= 1200 ) { // EXTRALARGE
			src = $(img[0]).attr("data-xlg");
		} else { // ULTRALARGE
			src = $(img[0]).attr("data-ulg");
		}

		// FALLBACK
		// console.log( 196, top );
		if ( isNaN(top) ) {
			position = "relative";
		} else {
			position = "absolute";			
		}

		// MAKE RESIZABLE
		$(img[0]).resizable({
			aspectRatio: true
		});

		// SET CSS BASED ON SAVED VALUES
		$(img[0]).attr( "src", src ).parent(".ui-wrapper").css({
			"position"	: position, 
			"width" 	: width + "%",
			"height" 	: width * ratio + "vw",
			"top" 		: top + "%",
			"left"		: left + "%",
			"z-index"	: z_index
		}).draggable();

		// console.log( 213, width * ratio );

	},

	loadImages: function () {

		console.log("Projects.loadImages");

		var self = this;

		var sectionIndex = 0;

		function sectionLoad () {

			// console.log("sectionLoad");

			// GET NO. OF IMAGES
			var currSec = $("section").eq(sectionIndex), 
				imgs = $(this).find("img").length,
				i = 0;
			// LOOP THROUGH IMGS, WAIT TO LOAD BEFORE PROCEDING

			function imgLoad () {

				// console.log("imgLoad");
				
				self.imgCalc( currSec.find("img").eq(i) );
				
				currSec.find("img").eq(i).on("load", function (){
					// console.log("Loaded");
					i++;
					if ( currSec.find("img").eq(i).length ) {
						imgLoad();
					} else {
						sectionIndex++;

						// IF NEXT: LOAD NEXT
						if ( $("section").eq(sectionIndex).length ) {
							
							sectionLoad();
						
						} else {
							
							// RECORD SECTION MARKERS
							Editor.sectionMarkers();

						}

					}
				});

			}	

			imgLoad();			

		}

		// TRIGGER
		sectionLoad();

	}

}

$(document).on( "ready", function (){

	console.log("Ready");

	Editor.init();
	Projects.init();

});