<?php

// EDITOR FUNCTION

if ( is_user_logged_in() ) { ?>

	<div id="editor_bar">

		<div id="editor_toggle">Enter editor mode.</div>

		<div id="editor_values">
			<div id="values_width">Width: <span class="value"></span></div>
			<div id="values_top">Top: <span class="value"></span></div>
			<div id="values_left">Left: <span class="value"></span></div>
			<div id="values_zindex">Index: <span class="value"></span></div>
			<div id="values_section_height">Section Height: <input id="section_height_input" class="value"  value=""></div>
		</div>

		<div id="editor_reset">Reset</div>

		<div id="editor_save">Save</div>

	</div>

<?php } ?>