<?php get_header(); ?>

	<?php include("includes/menu.php"); ?>

	<?php 
	// PROJECTS ON HOME PAGE 
	lh_get_projects(); 
	?>

	<?php 
	// EDITOR FUNCTION
	include("includes/editor.php"); ?>
	?>

<?php get_footer(); ?>