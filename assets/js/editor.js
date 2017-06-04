var Editor = {

	editMode: false,

	imageSelected: false,

	init: function () {

		console.log("Editor.init");

		// CHECK IF USER LOGGED IN, IN PREPARATION FOR EDITMODE TOGGLE
		if ( $("#editor_bar").length ) {
			this.bindEvents();

			$("#section_height_input").spinner({
				min: 0, 
				change: function( event, ui ) {
					Editor.updateSectionHeight( event.target.value );
				},
				spin: function (event, ui) {
					Editor.updateSectionHeight( ui.value );
				}
			});

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

		$(".image").on("mousedown", function (e) {
			
			// IF GLOBAL EDIT MODE ENABLED 
			if ( self.editMode ) {
				self.imageHighlight( $(this) );
			} 

		});

		// ON MOUSEUP SO THAT IT GETS FINAL VALUES AFTER DRAG AND POSITIONING
		$(".image").on("mouseup", function (){
			if ( self.editMode ) {
				self.imageValues( $(this) );
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

		$("#editor_values input").keyup( function(e) {
		    if ( e.keyCode == 13 ) {
		        
		    	var value = $(this).val(),
		    		name = $(this).attr("name").split("_")[1];

		    	// console.log( 83, name, value );

		    	// IF SECTION HEIGHT
		    	if ( name === "sectionheight" ) {
		    		
		    		if ( value >= 100 ) {
			        	Editor.updateSectionHeight( value );	
			        } else {
			        	alert("Value must be more than 100.");
			        }

		    	} else {

		    		Editor.updateImageValue( name, value );

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

		// IF RELATIVE: STORE CURRENT VALUES
		// FOR EACH TO PREVENT OTHER RELATIVES SHIFTING
		$(".selected").parents("ul").find(".collection_item").each( function(){

			$(this).attr( "data-top", $(this).position().top );
			$(this).attr( "data-left", $(this).position().left );
			$(this).css({
				"top" 		: parseInt( $(this).attr( "data-top") ),
				"left" 		: parseInt( $(this).attr( "data-left") )
			});

		});
		
		$(".selected").parents("ul").find(".collection_item").css("position","absolute");

		var current = parseInt( $(".selected").css( "z-index") ) || 1;
		$("#editor_zindex").text( "Index = " + current );

		this.imageSelected = true;

	},

	imagesUnhighlight: function () {

		console.log("Editor.imagesUnhighlight");

		$(".selected").removeClass("selected");
		$("#editor_values").not("#values_section_height").find(".value").text("");
		$("#values_section_height input").val("");
		
	},

	imageValues: function ( img ) {

		console.log("Editor.imageValues");

		var self = this;

		$("#values_height .value").val( img.height() );
		$("#values_top .value").val( img.parent(".collection_item").position().top );
		$("#values_left .value").val( img.parent(".collection_item").position().left );
		$("#values_zindex .value").val( img.parent(".collection_item").css("z-index") );

		// console.log( "Top:", img.parent(".collection_item").position().top / img.parents("section").height() );

		var parentHeight = $("#" + App.currentProject).attr("data-height") || 100;
		$("#values_section_height input").val( parentHeight );

		$("#editor_values input").each( function(){

			self.updateImageValue( $(this).attr("name").split("_")[1], $(this).val() );

			$(this).spinner({
				// change: function (event, ui) {
				// 	self.updateImageValue( event, ui );
				// 	console.log( 157, "change" );	
				// }, 
				spin: function (event, ui) {
					// console.log( 175, event, ui );
					var param = $(event.target).attr("name").split("_")[1],
						value = ui.value;
					self.updateImageValue( param, value );
				}
			});

		});

	},

	updateImageValue: function ( param, value ) {

		console.log("Editor.updateImageValue");

		var percValue;

		// CONVERT VALUE TO PERC
		// HEIGHT, TOP, LEFT
		if ( param === "top" ) {
			percValue = parseFloat( ( value / $(".selected").parents("section").height() * 100 ).toFixed(2) ) + "%";
		} else if ( param === "left" ) {
			percValue = parseFloat( ( value / $(window).width() * 100 ).toFixed(2) ) + "%";
			console.log( 195, percValue );
		} else {
			percValue = value;
		}

		console.log( param, percValue );

		$(".selected").css( param, percValue );

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
			$("#values_zindex .value").text( newCurrent );

		}

	},

	imagesReset: function () {

		console.log("Editor.imagesReset");

		var currSec = $( "#"+ App.currentProject );
		currSec.find(".ui-wrapper").css({
			"position" : "relative",
			"width" : "15%",
			"height" : "auto",
			"top" : "0",
			"left" : "0", 
			"display" : "inline-block"
		});
		setTimeout( function(){
			currSec.find(".ui-wrapper").each( function(){
				// GET CURRENT VALUES
				var thisTop = $(this).position().top,
					thisLeft = $(this).position().left,
					thisWidth = $(this).width();
				$(this).attr({
					"data-top" : thisTop,
					"data-left" : thisLeft
				});
				$(this).css({
					"position" : "absolute",
					"top" : this.attr("data-top"),
					"left" : this.attr("data-left"),
					"width" : thisWidth
				});		
			});			
		}, 500 );

	},

	imagesSave: function ( id ) {

		console.log("Editor.imagesSave");

		var self = this;

		// GET PROJECT JSON FROM SERVER

		$.ajax({
            method: "GET",
            url: LH_SCRIPT.root + 'acf/v3/projects/' + id,
            success : function( response ) { 
                
            	// console.log( 196, response );

                postImages = response.acf.images;                

                // LOOP THROUGH IMAGES
                var arrayLength = postImages.length;
				for (var i = 0; i < arrayLength; i++) {
				    // FIND IMG ON PAGE
				    var postImg = postImages[i].image,
				    	pageImg = $("#" + postImg.ID).parent(".ui-wrapper");
				    
				    // STORE STATE IN IMAGE OBJECT
				    postImages[i].saved_width		= parseFloat( ( pageImg.width() / App.winW * 100 ).toFixed(2) ) || 0,
				    postImages[i].saved_height		= parseFloat( ( pageImg.height() / App.winH * 100 ).toFixed(2) ) || 0,
				    postImages[i].saved_top			= parseFloat( ( pageImg.position().top / pageImg.parents("section").height() * 100 ).toFixed(2) ) || 0, // TOP AS PERC OF WRAPPER (WIN)
					postImages[i].saved_left		= parseFloat( ( pageImg.position().left / App.winW * 100 ).toFixed(2) ) || 0, // LEFT AS PERC OF WRAPPER (WIN)
					postImages[i].saved_z_index 	= parseFloat( pageImg.css("z-index") ) || 1;
				}

				// GET SECTION HEIGHT FROM PAGE AS VH
				sectionHeight = parseInt( $("#" + id).attr("data-height") ) || 100;
				// console.log( 217, $("#" + id).height(), App.winH, sectionHeight );

				var data = {
					"fields": {
						"images": postImages,
						"section_height": sectionHeight
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
		                console.log( "Error.", response );
		                alert( LH_SCRIPT.failure );
		            }

		        });

            },
            fail : function( response ) {
                console.log( response );
            }

        });

	},

	updateSectionHeight: function ( value ) {

		console.log("Editor.updateSectionHeight", value );

		// UPDATE SECTION HEIGHT ON PAGE + STORED VALUE
		$("#" + App.currentProject).css( "height", value + "vh" ).attr("data-height",value);

		// UPDATE SECTION MARKERS
		App.sectionMarkers();

	},

	editorToggle: function () {

		console.log("Editor.editorToggle", this.editMode );

		if ( this.editMode ) {

			this.editMode = false;

			// DISABLE RESIZABLE + DRAGGABLE
			$(".collection_item .image").resizable("disable");
			$(".collection_item").draggable("disable");

			$("section").css( "border", "" );

			$("#editor_bar div").not("#editor_toggle").fadeOut();

			$("#editor_toggle").text("Enter editor mode.");

		} else {

			this.editMode = true;

			$("#editor_bar div").css("display","inline-block");
			$("#editor_values div").css("display","block");

			$("section").css( "border-bottom", "2px dashed #bbb" );

			// ENABLE RESIZABLE + DRAGGABLE
			$(".collection_item .image").resizable("enable");
			$(".collection_item").draggable("enable");

			$("#editor_toggle").text("Exit editor mode.");

		}

	}

}