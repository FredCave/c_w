<!DOCTYPE html>
<html <?php language_attributes(); ?> style="margin-top: 0px !important" data-scroll="0">

<head>
	<title><?php bloginfo('title'); ?></title>
    <meta name="description" content="<?php bloginfo('description'); ?>">
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta property="og:url" content="<?php bloginfo('url'); ?>" />
    <meta property="og:type" content="Website" />
    <meta property="og:title" content="<?php bloginfo('title'); ?>" />
    <meta property="og:description" content="<?php bloginfo('description'); ?>" />
    <meta property="og:image" content="" />

    <!-- TWITTER -->
    <meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="<?php bloginfo('url'); ?>">
	<meta name="twitter:description" content="<?php bloginfo('description'); ?>">
	<meta name="twitter:title" content="<?php bloginfo('title'); ?>">
	<meta name="twitter:image" content="">

	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url') ?>/style.css">
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url') ?>/style.min.css">
	
	<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon.png" />

	<script>
		// FIX IE CONSOLE ERRORS
		if (!window.console) console = {log: function() {}}; 
		// SET ROOT
		var ROOT = '<?= get_bloginfo("url"); ?>';
	</script>

	<?php wp_head(); ?>

	<script>
		// ANALYTICS
		
		// FACEBOOK

	</script>

</head>

<body>
