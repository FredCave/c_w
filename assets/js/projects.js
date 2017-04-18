var Projects = {

	init: function () {

		console.log("Projects.init");

		this.imagesInit();

		this.bindEvents();

	},

	bindEvents: function () {

		console.log("Projects.bindEvents");

		var self = this;

		$(".image").on("click", function(){

			// LIGHTBOX
			if ( !Editor.editMode ) {
				self.lightboxInit( $(this) );
			}	

		});

		// TODO: CLICK OR SWIPE OR SCROLL DOWN TO ADVANCE
		$("#lightbox_wrapper").on("click", ".image", function (){

			self.lightboxForward();

		});

		$("#lightbox_close").on("click", function (){

			self.lightboxClose();

		});

	},

	imagesInit: function () {

		console.log("Projects.imagesInit");

		// LOAD ONLY FIRST TWO SECTIONS
		this.sectionLoad( $("section").eq(0) );
		this.sectionLoad( $("section").eq(1) );

		// RECORD SECTION MARKERS
		App.sectionMarkers();

	},

	sectionLoad: function ( section ) {

		console.log("Projects.sectionLoad", section );

		var self = this;

		// GET NO. OF IMAGES
		var imgs = section.find("img").length,
			i = 0;

		// LOOP THROUGH IMGS, WAIT TO LOAD BEFORE PROCEDING
		function imgLoad () {
			
			self.imgCalc( section.find("img").eq(i) );
			
			section.find("img").eq(i).on("load", function (){
				
				// FADE IN IMAGE
				section.find("img").eq(i).css("opacity","1");

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
		});

		$(img[0]).parent(".ui-wrapper").addClass("collection_item").draggable();
		// DISABLE INTERACTIONS
		$(img[0]).parent(".ui-wrapper").draggable("disable");
		$(img[0]).resizable("disable");

	},

	lightboxInit: function ( img ) {

		console.log("Projects.lightboxInit");

		// SHOW BG
		$("#lightbox_bg").fadeIn(1000);
		$("#lightbox_close").fadeIn(1000);

		// ADD CLICKED IMG TO WRAPPER

		img.parent(".collection_item").addClass("lightboxed");
		img.clone().css({
			"width"		: "",
			"height"	: "",
			"position"	: ""
		}).appendTo( $("#lightbox_wrapper") );
		$("#lightbox_wrapper").fadeIn();

	},

	lightboxClose: function ( img ) {

		console.log("Projects.lightboxClose");

		$(".lightboxed").removeClass("lightboxed");

		// HIDE BG
		$("#lightbox_bg").fadeOut(1000);
		$("#lightbox_close").fadeOut(1000);

		// ADD CLICKED IMG TO WRAPPER

		$("#lightbox_wrapper").fadeOut();
		setTimeout( function(){
			$("#lightbox_wrapper").empty();
		}, 1000);

	},

	lightboxForward: function () {

		console.log("Projects.lightboxForward");

		// FIND LIGHTBOXED SELECTOR
		var current = $(".image_collection .lightboxed");
		console.log( 160, current );

		$(".image_collection .lightboxed").removeClass("lightboxed");

		// EMPTY WRAPPER
		$("#lightbox_wrapper").empty();

		// IF NEXT EXISTS
		if ( current.next(".collection_item").length ) {
			current.next(".collection_item").addClass("lightboxed");
			current.next(".collection_item").find("img").clone().css({
				"width"		: "",
				"height"	: "",
				"position"	: ""
			}).appendTo( $("#lightbox_wrapper") );
		} else {
			// BACK TO BEGINNING
			current.parents("ul").find(".collection_item").first().addClass("lightboxed");
			current.parents("ul").find(".collection_item").first().find("img").clone().css({
				"width"		: "",
				"height"	: "",
				"position"	: ""
			}).appendTo( $("#lightbox_wrapper") );
		}


	}

}