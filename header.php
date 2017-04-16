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
	
	<!--
	<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
	<link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194">
	<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
	<link rel="manifest" href="/manifest.json">
	<meta name="msapplication-TileColor" content="#da532c">
	<meta name="msapplication-TileImage" content="/mstile-310x310.png">
	<meta name="theme-color" content="#ffffff">
	-->

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
