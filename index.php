<?php get_header(); ?>

	<div id="version_one">

		<div id="images_wrapper">
			<?php get_images(); ?>	
			<div class="cursor"><img src="<?php bloginfo('template_url'); ?>/assets/img/cursor.svg" /></div>	
		</div>

		<div id="text_wrapper">
			<?php get_text(); ?>
		</div>

	</div>

<?php get_footer(); ?>