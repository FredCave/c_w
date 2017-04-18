var Editor = {

	editMode: false,

	winW: $(window).width(),

	winH: $(window).height(),

	imageSelected: false,

	init: function () {

		console.log("Editor.init");

		// CHECK IF EDITOR FUNCTION ENABLED
		if ( $("#editor_bar").length ) {

			this.bindEvents();

			// MAKE SECTION RESIZABLE
			// if ( this.editMode ) {
			// 	$("section").resizable();
			// }

		}

	}, 

	bindEvents: function () {

		console.log("Editor.bindEvents");

		var self = this;

		// EXIT EDITOR MODE // TMP
		$("#editor_toggle").on("click", function(){
			self.editorToggle();
		});

		$("#editor_save").on("click", function (){
			// GET STATE OF IMAGES
			self.imagesSave( App.currentProject );
		});

		$(".image").on("mousedown", function (){
			if ( self.editMode ) {
				self.imageHighlight( $(this) );
			}
		});

		// CLICK OUTSIDE TO CLOSE
		$("section").click( function (event) { 
		    if ( self.editMode && !$(event.target).closest('.ui-wrapper').length ) {
		        self.imagesUnhighlight();
		    }        
		});

		$(window).on("keydown", function (){
			if ( self.editMode ) {
				if ( event.which === 39 ) {
					self.zIndexShift("up");
				} else if ( event.which === 37 ) {
					self.zIndexShift("down");
				}
			}
		});

		// RESET IMAGES
		$("#editor_reset").on("click", function(){
			self.imagesReset();
		});

	},

	imageHighlight: function ( click ) {

		console.log("Editor.imageHighlight");

		// DE-SELECT ALL OTHER IMAGES
		$(".selected").removeClass("selected");
		click.parent(".ui-wrapper").addClass("selected");

		var current = parseInt( $(".selected").css( "z-index") ) || 1;
		$("#editor_zindex").text( "Index = " + current );

		this.imageSelected = true;

	},

	imagesUnhighlight: function () {

		console.log("Editor.imagesUnhighlight");

		$(".selected").removeClass("selected");
		$("#editor_zindex").text("");

	},

	zIndexShift: function ( direction ) {

		if ( this.imageSelected ) {
 
			console.log("Editor.zIndexShift");

			var current = parseInt( $(".selected").css( "z-index") ) || 1,
				newCurrent;

			if ( direction === "up" ) {

				newCurrent = current + 1;

			} else if (  direction === "down" ) {

				newCurrent = current - 1;

			}

			$(".selected").css( "z-index", newCurrent );
			$("#editor_zindex").text( "Index = " + newCurrent );

		}

	},

	imagesReset: function () {

		console.log("Editor.imagesReset");

		var currSec = $( "#"+ App.currentProject );
		currSec.find(".ui-wrapper").css({
			"position" : "relative",
			"width" : "25%",
			"height" : "auto",
			"top" : "0",
			"display" : "inline-block"
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

		                $("#editor_save").text("Saved").css("background-color","LightGreen");

		                setTimeout( function(){
		                	$("#editor_save").text("Save").css("background-color","");
		                }, 3000 );

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

	},

	editorToggle: function () {

		console.log("Editor.editorToggle", this.editMode );

		if ( this.editMode ) {

			this.editMode = false;

			// DISABLE RESIZABLE + DRAGGABLE
			$(".collection_item .image").resizable("disable");
			$(".collection_item").draggable("disable");

			$("#editor_bar div").not("#editor_toggle").fadeOut();

			$("#editor_toggle").text("Enter editor mode.");

		} else {

			this.editMode = true;

			$("#editor_bar div").css("display","inline-block");

			// ENABLE RESIZABLE + DRAGGABLE
			$(".collection_item .image").resizable("enable");
			$(".collection_item").draggable("enable");

			$("#editor_toggle").text("Exit editor mode.");

		}

	}

}