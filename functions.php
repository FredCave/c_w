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
 
    wp_enqueue_script('jquery-ui', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js', array('jquery'), true);
    wp_enqueue_script('all-scripts', get_template_directory_uri() . '/js/scripts.min.js', array('jquery'), true);

	// LOCALIZE DATA FOR SCRIPT – AUTHENTIFICATION FOR REST API
	wp_localize_script( 'all-scripts', 'LH_SCRIPT', array(
			'root' => esc_url_raw( rest_url() ),
			'nonce' => wp_create_nonce( 'wp_rest' ),
			'success' => __( 'Images saved.', 'your-text-domain' ),
			'failure' => __( 'Error. Images not saved.', 'your-text-domain' ),
			'current_user_id' => get_current_user_id()
		)
	);

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
add_image_size( 'ultralarge', 1600, 1600 );

// IMAGE OBJECT

function lh_image_object( $image, $title, $saved_width, $saved_top, $saved_left, $saved_z_index ) {
    if( !empty($image) ): 
        $width = $image['sizes'][ 'thumbnail-width' ];
        $height = $image['sizes'][ 'thumbnail-height' ];
        $thumb = $image['sizes'][ "thumbnail" ]; // 300
        $medium = $image['sizes'][ "medium" ]; // 600
        $large = $image['sizes'][ "large" ]; // 900
        $extralarge = $image['sizes'][ "extralarge" ]; // 1200
        $ultralarge = $image['sizes'][ "ultralarge" ]; // 1200
        $id = $image["id"];

        echo "<img id='" . $id . "' 
        	class='image' 
            alt='Lola Hakimian – " . $title . "' 
            data-width='" . $saved_width . "' 
            data-ratio='" . $height / $width . "' 
            data-top='" . $saved_top . "' 
            data-left='" . $saved_left . "' 
            data-zindex='" . $saved_z_index . "' 
            data-thm='" . $thumb . "' 
            data-med='" . $medium . "' 
            data-lrg='" . $large . "' 
            data-xlg='" . $extralarge . "' 
            data-ulg='" . $ultralarge . "' 
            src='' />";
    endif;
}

// GET PROJECTS FOR MENU

function lh_get_projects () {
    $projects_query = new WP_Query( "post_type=projects" ); 
    if ( $projects_query->have_posts() ) :
        while ( $projects_query->have_posts() ) : $projects_query->the_post(); 
    		if ( have_rows("images") ) : ?>
			<section id="<?php the_ID(); ?>" data-title="<?php the_title(); ?>">
				<ul>
					<?php 
					$i = 1;
					while ( have_rows("images") ) : the_row();
						$image 			= get_sub_field("image");
						$saved_width 	= get_sub_field("saved_width");
						$saved_top 		= get_sub_field("saved_top");
						$saved_left		= get_sub_field("saved_left");
						$saved_z_index	= get_sub_field("saved_z_index");
						lh_image_object( $image, get_the_title(), $saved_width, $saved_top, $saved_left, $saved_z_index );
						$i++;
					endwhile; ?>
				</ul>
			</section>
			<?php 
			endif;
        endwhile; //  POST WHILE
    endif;    
}

?>