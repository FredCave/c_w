<?php

// EDITOR FUNCTION

if ( is_user_logged_in() ) { ?>

	<div id="editor_bar">

		<div id="editor_toggle">Enter editor mode.</div>

		<div id="editor_values">
			<div id="values_height">
				Height: <input id="image_height_input" class="value" name="image_height" value="">
			</div>
			<div id="values_top">
				Top: <input id="image_top_input" class="value" name="image_top" value="">
			</div>
			<div id="values_left">
				Left: <input id="image_left_input" class="value" name="image_left" value="">
			</div>
			<div id="values_zindex">
				Index: <input id="image_zindex_input" class="value" name="image_z-index" value="">
			</div>
			<div id="values_section_height">
				Section Height: <input id="section_height_input" class="value" name="input_sectionheight" value="">
			</div>
		</div>

		<div id="editor_reset">Reset</div>

		<div id="editor_save">Save</div>

	</div>

<?php } ?>