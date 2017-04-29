var App = {

	currentProject: "",

	lightboxVisible: false,

	init: function () {

		console.log("App.init");

		// SCROLL TO TOP
		$("html,body").animate({
			scrollTop : 0
		} );

		this.bindEvents();

		Editor.init();
		Projects.init();

		this.initCurrentProject();

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

		// TODO: CLICK OR SWIPE OR SCROLL DOWN TO ADVANCE
		$("#lightbox_wrapper").on("click", ".image", function (){
			self.lightboxForward();
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
			self.sectionMarkers();
			self.imagesResize();
			if ( self.lightboxVisible ) {
				self.lightboxSizeCheck();
			}	
		}, 1000 ));

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

		console.log("App.imgCalc" );

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
		$("#editor_current").text( title );
		this.currentProject = $("section").first().attr("id");

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

		// IF NEXT EXISTS
		if ( current.next(".collection_item").length ) {
			current.next(".collection_item").addClass("lightboxed");
			current.next(".collection_item").find("img").clone().css({
				"width"		: "",
				"height"	: "",
				"position"	: ""
			}).appendTo( $("#lightbox_wrapper") );
			this.imgCalc( $("#lightbox_wrapper img") );
		} else {
			// BACK TO BEGINNING
			current.parents("ul").find(".collection_item").first().addClass("lightboxed");
			current.parents("ul").find(".collection_item").first().find("img").clone().css({
				"width"		: "",
				"height"	: "",
				"position"	: ""
			}).appendTo( $("#lightbox_wrapper") );
			this.imgCalc( $("#lightbox_wrapper img") );
		}

	},

	lightboxSizeCheck: function () {

		console.log("App.lightboxSizeCheck");

		var img = $("#lightbox_wrapper img"),
			wrapperRatio = $("#lightbox_wrapper").height() / $("#lightbox_wrapper").width(),
			imgRatio = parseFloat( img.attr("data-ratio") );

		if ( img.hasClass("portrait") ) {
			// COMPARE IMG WIDTH TO WRAPPER
			if ( wrapperRatio > imgRatio ) {
				img.removeClass("portrait").addClass("landscape");
			}
		} else if ( img.hasClass("landscape") ) {
			// COMPARE IMG HEIGHT TO WRAPPER
			if ( wrapperRatio < imgRatio ) {
				img.removeClass("landscape").addClass("portrait");
			}
		}

	}

}

$(document).on( "ready", function (){

	console.log("Ready");

	App.init();

});