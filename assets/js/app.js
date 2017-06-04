var App = {

	currentProject: "",

	lightboxVisible: false,

	winW: $(window).width(),

	winH: $(window).height(),

	init: function () {

		console.log("App.init");

		// SCROLL TO TOP
		$("html,body").animate({
			scrollTop : 0
		} );

		// FONT BUG WORKAROUND
		$('body').width( $('body').width()+1 ).width('auto');

		this.bindEvents();

		this.menuCheck();

		if ( $("section").length ) {
			Editor.init();
			Projects.init();
			this.initCurrentProject();
		} else {
			this.otherPageInit();
		}

	},

	bindEvents: function () {

		console.log("App.bindEvents");

		var self = this;

		$(".image").on("click", function(){
			// LIGHTBOX
			if ( !Editor.editMode ) {
				self.lightboxInit( $(this) );
			}	
		});

		$("#lightbox_wrapper").on("click", ".image", function (){
			self.lightboxForward();
		});

		// CLICK OUTSIDE TO CLOSE
		$("#lightbox_bg").on("click", function () {
			self.lightboxClose();
		});

		$("#lightbox_close").on("click", function (){
			self.lightboxClose();
		});

		// ON SCROLL DOWN: SHOW CURRENT PROJECT
		$(window).on("scroll", _.throttle( function(){
			var winScroll = $(window).scrollTop();
			self.updateCurrentProject( winScroll );
		}, 500 ));

		$(window).on("resize", _.throttle( function(){
			
			if ( $("section").length ) {
				self.sectionMarkers();
			}	
			self.imagesResize();
			if ( self.lightboxVisible ) {
				self.lightboxSizeCheck();
			}

			// UPDATE WINDOW HEIGHT + WIDTH
			self.winH = $(window).height();
			self.winW = $(window).width(); 

		}, 1000 ));

	},

	menuCheck: function () {

		console.log("App.menuCheck");

		var self = this;

		if ( Modernizr.touchevents ) {
			$("body").addClass("touch");
		} 

		if ( $("#menu").hasClass("projects") ) {
			
			if ( this.winW <= 600 || $("body").hasClass("touch") ) {

				// TITLE + MENU BUTTON
				
					// CLONE PROJECT TITLE
				$(".current-page").clone().appendTo( "#mobile_menu" );

				$("#mobile_menu").append("<div class='menu_toggle'>Menu</div>");

				$("#mobile_menu").fadeIn();

			} else {

				$("#menu").fadeIn().css({"display":"flex"});

			}

		} else {

			$("#menu").fadeIn().css({"display":"flex"});
			
		}

	},

	sectionMarkers: function () {

		console.log("App.sectionMarkers");

		// LOOP THROUGH PROJECTS
		$("section").each( function(){

			var thisTop = $(this).offset().top,
				thisBottom = thisTop + $(this).height();

			$(this).attr({
				"data-top" : Math.ceil(thisTop),
				"data-bottom" : Math.ceil(thisBottom)
			});

		});

	},

	imgCalc: function ( img ) {

		console.log("App.imgCalc");

		// GET WIDTH AND RATIO
		var width = img.width(),
			height = img.height();

		if ( height > width ) {
			pxWidth = height;
		} else {
			pxWidth = width;
		}

		// SRC BASED ON WIDTH
		if ( pxWidth < 300 ) { // THUMB
			src = img.attr("data-thm");
		} else if ( pxWidth > 300 && pxWidth <= 600 ) { // MEDIUM
			src = img.attr("data-med");
		} else if ( pxWidth > 600 && pxWidth <= 900 ) { // LARGE
			src = img.attr("data-lrg");
		} else if ( pxWidth > 900 && pxWidth <= 1200 ) { // EXTRALARGE
			src = img.attr("data-xlg");
		} else { // ULTRALARGE
			src = img.attr("data-ulg");
		}

		img.attr( "src", src );

	},

	imagesResize: function () {

		console.log("App.imagesResize");

		var images = $("img.image_loaded"),
			i = 0,
			self = this;

		function imgLoad () {
			
			if ( images.length ) {

				self.imgCalc( $(images[i]) );
				
				$(images[i]).on("load", function (){
					i++;
					if ( i < images.length ) {
						imgLoad();
					} else {
						console.log("Images loaded.");
					}
				});

			}

		}

		imgLoad();

	},

	initCurrentProject: function () {

		console.log("App.initCurrentProject");

		// GET
		var title = $("section").first().attr("data-title");
		
		// SET
		$(".current_title").text( title );
		this.currentProject = $("section").first().attr("id");

		$("#values_section_height .value").text( $("section").first().attr("data-height") );

	},

	updateCurrentProject: function ( scrollTop ) {

		// console.log("App.updateCurrentProject", scrollTop );

		var self = this;

		// LOOP THROUGH PROJECTS
		$("section").each( function(){

			if ( ( scrollTop + ( self.winH / 4 ) ) > $(this).attr("data-top") && scrollTop <= $(this).attr("data-bottom") ) {

				$(".current_title").text( $(this).attr("data-title") );
				$("#values_section_height .value").text( $(this).attr("data-height") );

				App.currentProject = $(this).attr("id");

				// // IF PROJECT HAS UNIFORM MODE HIGHLIGHT BUTTON
				// if ( $(this).hasClass("uniform") ) {
				// 	$("#values_uniform").addClass("uniform_selected");
				// } else {
				// 	$("#values_uniform").removeClass("uniform_selected");
				// }

				// LOAD NEXT
				if ( !$(this).next().hasClass("loaded") ) {
					Projects.sectionLoad( $(this).next() );
				}		

			}

		});		

	},

	lightboxInit: function ( img ) {

		console.log("App.lightboxInit");

		this.lightboxVisible = true;

		// SHOW BG
		$("#lightbox_bg").fadeIn(1000);
		$("#lightbox_close").fadeIn(1000);

		// ADD CLICKED IMG TO WRAPPER

		img.parent(".collection_item").addClass("lightboxed");
		img.clone().css({
			"width"		: "",
			"height"	: "",
			"position"	: "",
			"opacity"	: 0
		}).appendTo( $("#lightbox_wrapper") );
		// RESIZE SRC
		$("#lightbox_wrapper").show();
		// $("#lightbox_wrapper img").show();
		this.imgCalc( $("#lightbox_wrapper img") );
		this.lightboxSizeCheck();
		// FADE IN
		$("#lightbox_wrapper img").css("opacity","1");

	},

	lightboxClose: function ( img ) {

		console.log("App.lightboxClose");

		this.lightboxVisible = false;

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

		console.log("App.lightboxForward");

		// FIND LIGHTBOXED SELECTOR
		var current = $(".image_collection .lightboxed");

		$(".image_collection .lightboxed").removeClass("lightboxed");

		// EMPTY WRAPPER
		$("#lightbox_wrapper").empty();

		var targetImg;

		// IF NEXT EXISTS
		if ( current.next(".collection_item").length ) {
			
			targetImg = current.next(".collection_item");

		} else {

			// BACK TO BEGINNING
			targetImg = current.parents("ul").find(".collection_item").first();

		}
		
		targetImg.addClass("lightboxed")
			.find("img").clone().css({
				"width"		: "",
				"height"	: "",
				"position"	: ""
		}).appendTo( $("#lightbox_wrapper") );

		this.lightboxSizeCheck();
		this.imgCalc( $("#lightbox_wrapper img") );

	},

	lightboxSizeCheck: function () {

		console.log("App.lightboxSizeCheck");

		var img = $("#lightbox_wrapper img"),
			wrapperRatio = $("#lightbox_wrapper").height() / $("#lightbox_wrapper").width(),
			imgRatio = parseFloat( img.attr("data-ratio") );

		// console.log( 295, wrapperRatio, imgRatio );

		if ( img.hasClass("portrait") ) {
			// COMPARE IMG WIDTH TO WRAPPER
			if ( wrapperRatio > imgRatio ) {
				img.removeClass("portrait").addClass("landscape");
			}
		} else if ( img.hasClass("landscape") ) {
			// COMPARE IMG HEIGHT TO WRAPPER
			console.log( 359, "Image is landscape." );
			if ( wrapperRatio < imgRatio ) {
				console.log( 359, "Image is now portrait." );
				img.removeClass("landscape").addClass("portrait");
			}
		}

	},

	otherPageInit: function () {

		console.log("App.otherPageInit");

		var imgW,
			self = this;

		// LOOP THROUGH IMAGES
		$(".image").each( function(){

			// CALC SIZE + SET SRC
			self.imgCalc( $(this) );
			
			// ADD CLASS FOR WINDOW RESIZE FUNCTION + FADE IN
			$(this).addClass("image_loaded").css({"opacity":"1"});

		});

	}

}

$(document).on( "ready", function (){

	console.log("Ready");

	App.init();

});