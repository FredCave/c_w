<?php get_header(); ?>

	<div id="page_wrapper" class="installations">

		<?php 

		$post_id = 123;
		if ( get_field( "installations", $post_id ) ) :

			if ( have_rows( "installations", $post_id ) ): 

				while ( have_rows( "installations", $post_id ) ) : the_row(); ?>

					<div class="installation_row">
						<?php 
						$image = get_sub_field("installation_image"); 
						lh_image_object( $image ); 
						?>
						<span class="caption">
							<?php the_sub_field("installation_caption"); ?>
						</span>
					</div>

				<?php
				endwhile;

			endif;
		
		endif; ?>

	</div>

<?php get_footer(); ?>