<?php get_header(); ?>

	<div id="page_wrapper" class="commandes">

		<?php 
		$commande_query = new WP_Query("post_type=commandes");
		if ( $commande_query->have_posts() ) :
			while ( $commande_query->have_posts() ) : $commande_query->the_post(); ?>
			
				<div class="commandes_item">

					<h1><?php the_title(); ?></h1>

					<div class="commandes_intro">
						<?php the_field("commande_intro"); ?>
					</div>

					<div class="commandes_images">
						<?php 
						if ( have_rows("commande_images") ) : ?>
							<ul class="image_collection">
							<?php while ( have_rows("commande_images") ) : the_row(); ?>

								<li class="collection_item">
									<?php $image = get_sub_field("commande_image");
									lh_image_object( $image ); ?>
								</li>

							<?php endwhile; ?>
							</ul>
						<?php
						endif;
						?>
					</div>

				</div>
			
			<?php	
			endwhile;
		endif;
		?>

	</div>

	<?php 
	// LIGHTBOX
	include("includes/lightbox.php"); 
	?>

<?php get_footer(); ?>

