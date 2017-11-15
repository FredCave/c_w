// VERSION ONE 

var PageOne = {
	
	prevX: 0,

	prevY: 0,

	sliding: false, 

	init: function () {

		console.log("PageOne.init");

		var self = this;

		if ( $("#version_two").length ) {
			console.log("Version Two. Returning.");
			return;
		}

		this.bindEvents();

		this.slideInit();

	},

	bindEvents: function () {

		console.log("PageOne.bindEvents");

		var self = this;

		$("#images_wrapper").on("mousemove", _.throttle( function(e){

			self.customCursor( e.clientX, e.clientY );

		}, 100 ));

		$("#images_wrapper").on("mouseenter", function(e){

			console.log("Mouse enter.");
			$(".cursor").show();

		});

		$("#text_wrapper").on("mouseenter", function(e){

			console.log("Mouse out.");
			$(".cursor").hide();

		});

		// $(window).on("mousemove", _.throttle( function(e){

		// 	self.customCursor( e.clientX, e.clientY );
		// 	// self.calcShift( e.clientX, e.clientY );

		// }, 10 ));

		$("#images_wrapper").on( "click", function(e){

			// CALC POSITION
			self.calcClickPos( e.clientX, e.clientY );

		});

		$(window).on( "resize", _.throttle( function(){

			$("#images_wrapper img").each( function(){
				self.imgSizeCalc( $(this).find("img") );
			});

		}, 500 ));

	},

	calcShift: function ( x, y ) {

		console.log("PageOne.calcShift", x, y );

		// if ( this.sliding ) {
		// 	console.log( 55, "sliding" );
		// 	return;
		// }

		// GET POSITION RELATIVE TO CENTRE
		var posX = x - ( $(window).width() / 2 ),
			posY = y - ( $(window).height() / 2 );

		// console.log( 41, posX, posY );

		// COMPARE CURRENT POS (RELATIVE TO CENTRE) TO PREVIOUS
		var diffX = posX - this.prevX,
			diffY = posY - this.prevY;

		console.log( 45, diffX, diffY );

		this.mouseShiftImages( diffX, diffY );

		// STORE PREVIOUS VALUES
		self.prevX = posX;
		self.prevY = posY;

	},

	mouseShiftImages: function ( shiftX, shiftY ) {

		console.log("PageOne.shiftImages", shiftX, shiftY );

		// GET CURRENT POSITION
		var currX = parseInt( $("#images_wrapper ul").attr("data-curr-x") ) || 0,
			currY = parseInt( $("#images_wrapper ul").attr("data-curr-y") ) || 0;

		// CALCULATE NEW IMAGE POSITION
		var newX = 0 - ( currX + shiftX ) / 12,
			newY = 0 - ( currY + shiftY ) / 12;

		console.log( 78, newX, newY );

		$("#images_wrapper img").css({
			"transform" : "translate( " + newX + "px, " + newY + "px )"
		});

		// STORE NEW POSITION
		$("#images_wrapper ul").attr({
			"data-curr-x" : newX,
			"data-curr-y" : newY
		});

	},

	slideInit: function () {

		console.log("PageOne.slideInit");

		var self = this;

		// LOAD FIRST IMG FIRST
		var firstImg = $("#images_wrapper li").first().find("img"), 
			firstImgSrc = firstImg.attr("src");

		firstImg.attr("src",firstImgSrc).on("load", function(){
			
			// CALC FIRST IMAGE SIZE
			self.imgSizeCalc( firstImg );

			// THEN MAKE VISIBLE
			$("#images_wrapper li").first().addClass("visible");

			// LOAD FOLLOWING IMAGES
			_.defer( function(){
				$("#images_wrapper li").each( function(i){
					// IGNORE FIRST IMG
					if ( i !== 0 ) {
						self.imgSizeCalc( $(this).find("img") );
					}
				});				
			});

		});

		this.interval = setInterval( function(){
			self.slideForward();
		}, 12000 ); 

	},

	imgSizeCalc: function ( img ) {

		console.log("PageOne.imgSizeCalc", img);

		if ( img === undefined ) {
			return;
		}

		// GET IMG WIDTH
		var imgW = img.width();
		if ( img.hasClass("portrait") ) {
			imgW = img.height();
		}

		if ( imgW === 0 ) {
			imgW = 2000;
		}
	
		if ( imgW <= 300 ) { // THUMBNAIL
			newSrc = img.attr("data-thm");
		} else if ( imgW > 300 && imgW <= 600 ) { // MEDIUM
			newSrc = img.attr("data-med");
		} else if ( imgW > 600 && imgW <= 768 ) { // MEDIUM_LARGE
			newSrc = img.attr("data-mdl");
		} else if ( imgW > 768 && imgW <= 1024 ) { // LARGE
			newSrc = img.attr("data-lrg");
		} else if ( imgW > 1024 && imgW <= 1600 ) { // EXTRALARGE
			newSrc = img.attr("data-xlg");
		} else { // ULTRALARGE
			newSrc = img.attr("data-ulg");
		}

		// console.log( 167, imgW, newSrc );	

		// IF NEWSRC NOT SAME AS CURRENT SRC
		if ( newSrc !== img.attr("src") ) {
			img.attr( "src", newSrc )
			console.log( 170, "Src changed." );				
		}

	},

	// positionImages: function () {

	// 	console.log("PageOne.positionImages");

	// 	$("#images_wrapper li").each( function(){

	// 		// GET MAX DISTS
	// 		var img = $(this).find("img"),
	// 			imgW = img.width(),
	// 			imgH = img.height() || 0.35 * $(window).width(), 
	// 			maxX = $(this).width() - imgW,
	// 			maxY = $(this).height() - imgH;

	// 		img.css({
	// 			"margin-top" 	: Math.random() * maxY,
	// 			"margin-left" 	: Math.random() * maxX
	// 		});

	// 		console.log( 108, imgW, imgH, maxX, maxY );

	// 	});

	// },

	customCursor: function ( x, y ) {

		console.log("PageOne.customCursor", x, y );

		$(".cursor").css({
			"top"  : y,
			"left" : x
 		});

	},

	calcClickPos: function ( x, y ) {

		console.log("PageOne.calcClickPos");

		if ( x ) {
						// self.slideForward();

		} else {
			self.slideBack();
		}

	},

	slideForward: function () {

		console.log("PageOne.slideForward");

		var self = this;

		if ( this.sliding ) {
			console.log( 55, "sliding" );
			return;
		}

		this.sliding = true;

		// SHOW NEXT
		if ( $(".visible").next().length ) {
			$(".visible").next().addClass("next_in_line");
		} else {
			$("#images_wrapper li").first().addClass("next_in_line");
		}

		// VISIBLE SLIDES TO THE LEFT
		$(".visible").css({
			"left" : "-50vw"
		});

		// AFTER ANIMATION
		_.delay( function(){

			$(".next_in_line").removeClass("next_in_line");

			// IF NEXT
			if ( $(".visible").next().length ) {
				$(".visible").removeClass("visible").css({
					"left" : ""
				}).next().addClass("visible");
			// ELSE BACK TO BEGINNING
			} else {
				$(".visible").removeClass("visible").css({
					"left" : ""
				});
				$("#images_wrapper li").first().addClass("visible");
			}

			self.sliding = false;
			console.log( 235, self.sliding );

		}, 1000 );

	},

	// slideBack: function () {

	// 	console.log("Page");

	// }

}

// VERSION TWO

// var PageTwo = {
	
// 	prevX: 0,

// 	prevY: 0,

// 	init: function () {

// 		console.log("PageTwo.init");

// 		var self = this;

// 		if ( $("#version_one").length ) {
// 			console.log("Version One. Returning.");
// 			return;
// 		}		

// 		this.bindEvents();

// 		this.slideInit();

// 	},

// 	bindEvents: function () {

// 		console.log("PageTwo.bindEvents");

// 		var self = this;

// 		$(document).on("mousemove", _.throttle( function(e){

// 			self.calcShift( e.clientX, e.clientY );

// 		}, 100 ));

// 	},

// 	calcShift: function ( x, y ) {

// 		console.log("PageTwo.calcShift", x, y );

// 			// GET POSITION RELATIVE TO CENTRE
// 			var posX = x - ( $(window).width() / 2 ),
// 				posY = y - ( $(window).height() / 2 );

// 			// console.log( 41, posX, posY );

// 			// COMPARE CURRENT POS (RELATIVE TO CENTRE) TO PREVIOUS
// 			var diffX = posX - this.prevX,
// 				diffY = posY - this.prevY;

// 			console.log( 45, diffX, diffY );

// 			this.mouseShiftImages( diffX, diffY );

// 			// STORE PREVIOUS VALUES
// 			self.prevX = posX;
// 			self.prevY = posY;

// 	},

// 	mouseShiftImages: function ( shiftX, shiftY ) {

// 		console.log("PageTwo.shiftImages", shiftX, shiftY );

// 		// GET CURRENT POSITION
// 		var currX = parseInt( $("#images_wrapper ul").attr("data-curr-x") ) || 0,
// 			currY = parseInt( $("#images_wrapper ul").attr("data-curr-y") ) || 0;

// 		// CALCULATE NEW IMAGE POSITION
// 		var newX = 0 - ( currX + shiftX ) / 12,
// 			newY = 0 - ( currY + shiftY ) / 12;

// 		$("#images_wrapper ul").css({
// 			"transform" : "translate( " + newX + "px, " + newY + "px )"
// 		});

// 		// STORE NEW POSITION
// 		$("#images_wrapper ul").attr({
// 			"data-curr-x" : newX,
// 			"data-curr-y" : newY
// 		});

// 	},

// 	slideInit: function () {

// 		console.log("PageTwo.slideInit");

// 		var self = this;

// 		this.positionImages();

// 		this.interval = setInterval( function(){

// 			self.horizShift();

// 		}, 12000 );

// 	},

// 	positionImages: function () {

// 		console.log("PageTwo.positionImages");

// 		$("#images_wrapper li").each( function(){

// 			// GET MAX DISTS
// 			var img = $(this).find("img"),
// 				imgW = img.width(),
// 				imgH = img.height() || 0.35 * $(window).width(), 
// 				maxX = $(this).width() - imgW,
// 				maxY = $(this).height() - imgH;

// 			img.css({
// 				"margin-top" 	: Math.random() * maxY,
// 				"margin-left" 	: Math.random() * maxX
// 			});

// 			console.log( 108, imgW, imgH, maxX, maxY );

// 		});

// 	},

// 	horizShift: function () {

// 		console.log("PageTwo.horizShift");

// 		// GET SHIFT DISTANCE
// 		var distX = $("#images_wrapper li").width();

// 		var shift = 0 - distX;

// 		// SHIFT VISIBLE LI distX TO THE LEFT
// 		$("#images_wrapper").animate({
// 			"margin-left" : shift
// 		}, 2000 );

// 		// AFTER ANIM:
// 			// MOVE FIRST TO END & RESET VALUES
// 		setTimeout( function(){
			
// 			$("#images_wrapper li").first().appendTo( $("#images_wrapper ul") );
// 			$("#images_wrapper").css({
// 				"margin-left" : ""
// 			});

// 		}, 3000);

// 	}

// }

$(document).on("ready", function(){
	
	PageOne.init();
	// PageTwo.init();

});