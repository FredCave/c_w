<?php get_header(); ?>

	<?php 
	// PROJECTS ON HOME PAGE 
	lh_get_projects(); ?>

	<?php 
	// LIGHTBOX
	include("includes/lightbox.php"); ?>
	
	<?php 
	// EDITOR FUNCTION
	include("includes/editor.php"); ?>

<?php get_footer(); ?>