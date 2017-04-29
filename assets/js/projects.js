var Projects = {

	init: function () {

		console.log("Projects.init");

		this.imagesInit();

	},

	imagesInit: function () {

		console.log("Projects.imagesInit");

		var self = this;

		// LOAD ONLY FIRST TWO SECTIONS
		this.sectionLoad( $("section").eq(0) );
		setTimeout( function (){
			self.sectionLoad( $("section").eq(1) );
		}, 2000 );
		

		// RECORD SECTION MARKERS
		App.sectionMarkers();

	},

	sectionLoad: function ( section ) {

		console.log("Projects.sectionLoad", section.attr("id") );

		var self = this;

		// GET NO. OF IMAGES
		var imgs = section.find("img").length,
			i = 0;

		// LOOP THROUGH IMGS, WAIT TO LOAD BEFORE PROCEDING
		function imgLoad () {
			
			self.imgCalc( section.find("img").eq(i) );
			
			section.find("img").eq(i).on("load", function (){
				
				// FADE IN IMAGE
				section.find("img").eq(i).css("opacity","1").addClass("image_loaded");

				i++;
				if ( section.find("img").eq(i).length ) {
					imgLoad();
				} else {
					console.log("Section loaded.");
					section.addClass("loaded");
				}
			});

		}	
		// IMG TRIGGER
		imgLoad();			

	},

	imgCalc: function ( img ) {

		console.log("Projects.imgCalc");

		// GET SAVED VALUES
		var width 	= parseFloat( $(img[0]).attr("data-width") ) || 15,
			ratio  	= parseFloat( $(img[0]).attr("data-ratio") ),
			top 	= parseFloat( $(img[0]).attr("data-top") ) || 0,
			left	= parseFloat( $(img[0]).attr("data-left") ) || 0,
			z_index = parseFloat( $(img[0]).attr("data-zindex") ) || 1,
			src,
			position;

		// CONVERT WIDTH TO LONGEST SIDE OF IMG
		if ( ratio > 1 ) {
			// PORTRAIT
			pxWidth	= ( width * $(window).width() / 100 ) * ratio;
		} else {
			// LANDSCAPE
			pxWidth	= width * $(window).width() / 100;		
		}

		// SRC BASED ON WIDTH
		if ( pxWidth < 300 ) { // THUMB
			src = $(img[0]).attr("data-thm");
		} else if ( pxWidth > 300 && pxWidth <= 600 ) { // MEDIUM
			src = $(img[0]).attr("data-med");
		} else if ( pxWidth > 600 && pxWidth <= 900 ) { // LARGE
			src = $(img[0]).attr("data-lrg");
		} else if ( pxWidth > 900 && pxWidth <= 1200 ) { // EXTRALARGE
			src = $(img[0]).attr("data-xlg");
		} else { // ULTRALARGE
			src = $(img[0]).attr("data-ulg");
		}

		// FALLBACK
		if ( isNaN(top) || top === 0 ) {
			position = "relative";
		} else {
			position = "absolute";		
		}

		$(img[0]).resizable({
			aspectRatio: true
		});

		// SET CSS BASED ON SAVED VALUES
		$(img[0]).attr( "src", src ).parent(".ui-wrapper").css({
			"display"	: "inline-block",
			"position"	: position, 
			"width" 	: width + "%",
			"height" 	: width * ratio + "vw",
			"top" 		: top + "%",
			"left"		: left + "%",
			"z-index"	: z_index
		});

		$(img[0]).parent(".ui-wrapper").addClass("collection_item").draggable();
		// DISABLE INTERACTIONS
		$(img[0]).parent(".ui-wrapper").draggable("disable");
		$(img[0]).resizable("disable");

	}

}