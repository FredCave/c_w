<?php get_header(); ?>

	<?php $post_id = 107; ?>

	<div id="page_wrapper" class="info_wrapper">

		<div id="columns_wrapper">

			<div class="column">

				<?php if ( get_field( "info_portfolio", $post_id ) ) : ?>
					<div id="info_portfolio">
						Télécharger portfolio :
						<?php $portfolio = get_field( "info_portfolio", $post_id ); ?>
						<a target="_blank" href="<?php echo $portfolio["url"]; ?>">
							<?php echo $portfolio["filename"]; ?>
						</a>
					</div>
				<?php endif; ?>

				<?php if ( get_field( "info_cv", $post_id ) ) : ?>
					<div id="info_cv">
						<?php the_field( "info_cv", $post_id ); ?>
					</div>
				<?php endif; ?>

				<?php if ( get_field( "info_texts", $post_id ) ) : ?>
					<div id="info_texts">
						<?php /*
						if ( have_rows("info_texts") ): 
							while ( have_rows("info_texts") ) : the_row();
								the_sub_field("text");
							endwhile;
						endif; */
						?>
					</div>
				<?php endif; ?>

			</div><!-- END OF LEFT COLUMN -->

			<div class="column">
				<?php if ( get_field( "info_bio", $post_id ) ) : ?>
					<div id="info_bio">
						<?php the_field( "info_bio", $post_id ); ?>
					</div>
				<?php endif; ?>

				<?php if ( get_field( "info_news", $post_id ) ) : ?>
					<div id="info_news">
						<?php
						if ( have_rows( "info_news", $post_id ) ): 
							echo "<h1>Actualités</h1>";
							while ( have_rows( "info_news", $post_id ) ) : the_row(); ?>
								<div class="news_item"><?php the_sub_field("news"); ?></div>
							<?php
							endwhile;
						endif;
						?>
					</div>
				<?php endif; ?>
			</div><!-- END OF RIGHT COLUMN -->

		</div>

		<div id="credit">
			Website: <a target="_blank" href="http://fredcave.com">Fred Cave</a>
		</div>

	</div><!-- END OF #PAGE_WRAPPER -->



<?php get_footer(); ?>