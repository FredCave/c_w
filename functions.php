<?php

// SECURITY: HIDE USERNAMES
add_action(‘template_redirect’, ‘bwp_template_redirect’);
function bwp_template_redirect() {
    if ( is_author() ) {
        wp_redirect( home_url() ); 
        exit;
    }
}

// HIDE VERSION OF WORDPRESS
function wpversion_remove_version() {
    return '';
    }
add_filter('the_generator', 'wpversion_remove_version');

// ENQUEUE CUSTOM SCRIPTS
function enqueue_lola_scripts() {
  
    wp_deregister_script( 'jquery' );
	wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js');
// //    wp_register_script( 'jquery', get_template_directory_uri() . '/js/_jquery.js');
	wp_enqueue_script( 'jquery' );  
    
    wp_enqueue_script('all-scripts', get_template_directory_uri() . '/js/scripts.min.js', array('jquery'), true);

}
add_action('wp_enqueue_scripts', 'enqueue_lola_scripts');

// ADD CUSTOM POST TYPES
add_action( 'init', 'create_post_types' );
function create_post_types() {
    register_post_type( 'projects',
    array(
        'labels' => array(
            'name' => __( 'Projects' )
        ),
        'public' => true,
        'show_in_rest' => true,
        // 'taxonomies' => array('category'),
        'has_archive' => true,
        'supports' => array('editor','title'),
        'menu_position' => 5
        )
    );
}

// ADD CUSTOM IMAGE SIZES
add_theme_support( 'post-thumbnails' );
add_image_size( 'extralarge', 1200, 1200 );

// IMAGE OBJECT

function lh_image_object( $image, $title ) {
    if( !empty($image) ): 
        $width = $image['sizes'][ 'thumbnail-width' ];
        $height = $image['sizes'][ 'thumbnail-height' ];
        $thumb = $image['sizes'][ "thumbnail" ]; // 300
        $medium = $image['sizes'][ "medium" ]; // 600
        $large = $image['sizes'][ "large" ]; // 900
        $extralarge = $image['sizes'][ "extralarge" ]; // 1200
        $id = $image["id"];
        // DEFAULT IS FULL WIDTH
        if ( $height / $width >= 0.5 && $height / $width < 1 ) {
            $class = "two-thirds";
        } else if ( $height / $width >= 1 ) {
            $class = "one-third";
            // PORTRAIT MODE
            $thumb = $image['sizes'][ "medium" ];
            $medium = $image['sizes'][ "large" ];
            $large = $image['sizes'][ "extralarge" ]; 
        } else {
            $class = "full-width"; 
        }
        echo "<img id='" . $id . "' 
        	class='" . $class . " ' 
            alt='Lola Hakimian – " . $title . "' 
            width='" . $width . "' 
            height='" . $height . "' 
            data-thm='" . $thumb . "' 
            data-med='" . $medium . "' 
            data-lrg='" . $large . "' 
            data-xlg='" . $extralarge . "' 
            src=' " . $thumb . "' />";
    endif;
}

// GET PROJECTS FOR MENU

function lh_get_projects () {
    $projects_query = new WP_Query( "post_type=projects" ); 
    if ( $projects_query->have_posts() ) :
        while ( $projects_query->have_posts() ) : $projects_query->the_post(); 
    		if ( have_rows("images") ) : ?>
			<section id="<?php the_ID(); ?>">
				<ul>
					<?php 
					$i = 1;
					while ( have_rows("images") ) : the_row();
						$image = get_sub_field("image");
						lh_image_object( $image, get_the_title() );
						$i++;
					endwhile; ?>
				</ul>
			</section>
			<?php 
			endif;
        endwhile; //  POST WHILE
    endif;    
}

// EDITOR FUNCTION

function lh_editor () {

	if ( is_user_logged_in() ) { ?>

		<buttton id="editor_save">Save</buttton>

	<?php }

}

?>