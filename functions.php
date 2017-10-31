<?php

// SECURITY: HIDE USERNAMES
add_action('template_redirect', 'bwp_template_redirect');
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
function enqueue_maud_scripts() {
  
    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js');
    // wp_register_script( 'jquery', get_template_directory_uri() . '/js/_jquery.min.js');
	wp_enqueue_script( 'jquery' );  

}
add_action('wp_enqueue_scripts', 'enqueue_maud_scripts');

// ADD CUSTOM IMAGE SIZES
add_theme_support( 'post-thumbnails' );
add_image_size( 'extralarge', 1200, 1200 );
add_image_size( 'ultralarge', 1600, 1600 );

// IMAGE OBJECT

function image_object( $image ) {
    if( !empty($image) ): 
        $width = $image['sizes'][ 'thumbnail-width' ];
        $height = $image['sizes'][ 'thumbnail-height' ];
        $thumb = $image['sizes'][ "thumbnail" ]; // 300
        $medium = $image['sizes'][ "medium" ]; // 600
        $large = $image['sizes'][ "large" ]; // 1024
        $extralarge = $image['sizes'][ "extralarge" ]; // 1200
        $ultralarge = $image['sizes'][ "ultralarge" ]; // 1600
        $id = $image["id"];
        $class = "landscape";
        if ( $height > $width ) {
        	$class = "portrait";	
        }

        echo "<img id='" . $id . "' 
        	class='image " . $class . "' 
            alt='Cave/Wolewinski – " . $title . "' 
            data-thm='" . $thumb . "' 
            data-med='" . $medium . "' 
            data-lrg='" . $large . "' 
            data-xlg='" . $extralarge . "' 
            data-ulg='" . $ultralarge . "' 
            src='" . $thumb . "' />";
    endif;
}

// GET TEXT 

function get_text () {

    $text_query = new WP_Query("name=text");
    if ( $text_query->have_posts() ) :
        while ( $text_query->have_posts() ) : $text_query->the_post();
            the_field("main_text");
        endwhile;
        wp_reset_postdata();
    endif;

}

// GET IMAGES

function get_images () {
 
    $img_query = new WP_Query("name=images");
    if ( $img_query->have_posts() ) :
        while ( $img_query->have_posts() ) : $img_query->the_post();
            // LOOP THROUGH IMAGES
            if ( have_rows("images") ) : ?>
                <ul>
                <?php while ( have_rows("images") ) : the_row("image");
                    $image = get_sub_field("image"); ?>
                    <li>
                        <?php image_object( $image ); ?>    
                    </li>
                <?php 
                endwhile; ?>
                </ul>
            <?php endif; // END OF LOOP THROUGH IMAGES
        endwhile;
        wp_reset_postdata();
    endif;

}

?>