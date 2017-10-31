var Page = {
	
	prevX: 0,

	prevY: 0,

	init: function () {

		console.log("Page.init");

		var self = this;

		this.bindEvents();

		this.slideInit();

	},

	bindEvents: function () {

		console.log("Page.bindEvents");

		var self = this;

		$(document).on("mousemove", _.throttle( function(e){

			self.calcShift( e.clientX, e.clientY );

		}, 100 ));

	},

	calcShift: function ( x, y ) {

		console.log("Page.calcShift", x, y );

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

		console.log("Page.shiftImages", shiftX, shiftY );

		// GET CURRENT POSITION
		var currX = parseInt( $("#images_wrapper ul").attr("data-curr-x") ) || 0,
			currY = parseInt( $("#images_wrapper ul").attr("data-curr-y") ) || 0;

		// CALCULATE NEW POSITION
		var newX = 0 - ( currX + shiftX ) / 12,
			newY = 0 - ( currY + shiftY ) / 12;

		$("#images_wrapper ul").css({
			"transform" : "translate( " + newX + "px, " + newY + "px )"
		});

		// STORE NEW POSITION
		$("#images_wrapper ul").attr({
			"data-curr-x" : newX,
			"data-curr-y" : newY
		});

	},

	slideInit: function () {

		console.log("Page.slideInit");

		var self = this;

		this.positionImages();

		this.interval = setInterval( function(){

			self.horizShift();

		}, 5000 );

	},

	positionImages: function () {

		console.log("Page.positionImages");

		$("#images_wrapper li").each( function(){

			// GET MAX DISTS
			var img = $(this).find("img"),
				maxX = $(this).width() - img.width(),
				maxY = $(this).height() - img.height();

			img.css({
				"margin-top" 	: Math.random() * maxY,
				"margin-left" 	: Math.random() * maxX
			});

			console.log( 108, maxX, maxY );

		});

	},

	horizShift: function () {

		console.log("Page.horizShift");

		// GET SHIFT DISTANCE
		var distX = $("#images_wrapper li").width();

		var shift = 0 - distX;

		// SHIFT VISIBLE LI distX TO THE LEFT
		$("#images_wrapper").animate({
			"margin-left" : shift
		}, 2000 );

		// AFTER ANIM:
			// MOVE FIRST TO END & RESET VALUES
		setTimeout( function(){
			
			$("#images_wrapper li").first().appendTo( $("#images_wrapper ul") );
			$("#images_wrapper").css({
				"margin-left" : ""
			});

		}, 3000);

	}

}

$(document).on("ready", function(){
	
	Page.init();

});