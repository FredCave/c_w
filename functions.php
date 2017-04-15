<?php

// // SECURITY: HIDE USERNAMES
// add_action(‘template_redirect’, ‘bwp_template_redirect’);
// function bwp_template_redirect() {
//     if ( is_author() ) {
//         wp_redirect( home_url() ); 
//         exit;
//     }
// }

// // HIDE VERSION OF WORDPRESS
// function wpversion_remove_version() {
//     return '';
//     }
// add_filter('the_generator', 'wpversion_remove_version');

// ENQUEUE CUSTOM SCRIPTS
function enqueue_lola_scripts() {
  
    wp_deregister_script( 'jquery' );
	wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js');
// //    wp_register_script( 'jquery', get_template_directory_uri() . '/js/_jquery.js');
	wp_enqueue_script( 'jquery' );  
    
//    wp_enqueue_script('jquery', get_template_directory_uri() . '/js/_jquery.js', true);
    wp_enqueue_script('all-scripts', get_template_directory_uri() . '/js/scripts.min.js', array('jquery'), true);

}
add_action('wp_enqueue_scripts', 'enqueue_lola_scripts');

// // ADD CUSTOM POST TYPES
// add_action( 'init', 'create_post_types' );
// function create_post_types() {
//     register_post_type( 'news',
//     array(
//         'labels' => array(
//             'name' => __( 'News' )
//         ),
//         'public' => true,
//         'show_in_rest' => true,
//         // 'taxonomies' => array('archive-cat'),
//         'has_archive' => true,
//         'supports' => array('editor','title'),
//         'menu_position' => 5
//         )
//     );
//     register_post_type( 'projects',
//     array(
//         'labels' => array(
//             'name' => __( 'Projects' )
//         ),
//         'public' => true,
//         'show_in_rest' => true,
//         // 'taxonomies' => array('category'),
//         'has_archive' => true,
//         'supports' => array('editor','title'),
//         'menu_position' => 6
//         )
//     );
//     register_post_type( 'concerts',
//     array(
//         'labels' => array(
//             'name' => __( 'Concerts' )
//         ),
//         'public' => true,
//         'show_in_rest' => true,
//         // 'taxonomies' => array('category'),
//         'has_archive' => true,
//         'supports' => array('editor','title'),
//         'menu_position' => 7
//         )
//     );
//     register_post_type( 'albums',
//     array(
//         'labels' => array(
//             'name' => __( 'Albums' )
//         ),
//         'public' => true,
//         'show_in_rest' => true,
//         // 'taxonomies' => array('category'),
//         'has_archive' => true,
//         'supports' => array('editor','title'),
//         'menu_position' => 8
//         )
//     );
// }

// // IMAGE OBJECT

//     // ADD CUSTOM IMAGE SIZES
// add_theme_support( 'post-thumbnails' );
// add_image_size( 'extralarge', 1200, 1200 );

// // function image_object( $image ) {
// //     if( !empty($image) ): 
// //         $width = $image['sizes'][ 'thumbnail-width' ];
// //         $height = $image['sizes'][ 'thumbnail-height' ];
// //         $thumb = $image['sizes'][ "thumbnail" ]; // 300
// //         $medium = $image['sizes'][ "medium" ]; // 600
// //         $large = $image['sizes'][ "large" ]; // 900
// //         $extralarge = $image['sizes'][ "extralarge" ]; // 1200
// //         $id = $image["id"];
// //         // DEFAULT IS FULL WIDTH
// //         if ( $height / $width >= 0.5 && $height / $width < 1 ) {
// //             $class = "two-thirds";
// //         } else if ( $height / $width >= 1 ) {
// //             $class = "one-third";
// //             // PORTRAIT MODE
// //             $thumb = $image['sizes'][ "medium" ];
// //             $medium = $image['sizes'][ "large" ];
// //             $large = $image['sizes'][ "extralarge" ]; 
// //         } else {
// //             $class = "full-width"; 
// //         }
// //         echo "<img class='" . $class . " ' 
// //             alt='Le Ton Vertical' 
// //             width='" . $width . "' 
// //             height='" . $height . "' 
// //             data-thm='" . $thumb . "' 
// //             data-med='" . $medium . "' 
// //             data-lrg='" . $large . "' 
// //             data-xlg='" . $extralarge . "' 
// //             src=' " . $thumb . "' />";
// //     endif;
// // }

// // REST API ENDPOINTS

// function upcoming_concerts () {
//     $agenda_query = new WP_Query( "post_type=concerts" );
//     $data = array();
//     // LOOP THROUGH POSTS
//     if ( $agenda_query->have_posts() ) :
//         $i = 0;
//         while ( $agenda_query->have_posts() ) : $agenda_query->the_post(); 
//             // FILTER USING ISPAST FILTER
//             if ( !isPast( get_field("concert_date") ) ) {
//                 $data[] = array(
//                     'title' => get_the_title(),
//                     'date' => get_field("concert_date"),
//                     'link' => get_field("concert_venue_link"),
//                     'group' => get_field("concert_group")
//                 );
//             }
//         endwhile;
//         wp_reset_postdata();
//     endif;
//     // RETURN DATA
//     if ( empty( $data ) ) {
//         return null;
//     }    
//     return $data;
// }

// function previous_concerts () {
//     $agenda_query = new WP_Query( "post_type=concerts" );
//     $data = array();
//     // LOOP THROUGH POSTS
//     if ( $agenda_query->have_posts() ) :
//         $i = 0;
//         while ( $agenda_query->have_posts() ) : $agenda_query->the_post(); 
//             // FILTER USING ISPAST FILTER
//             if ( isPast( get_field("concert_date") ) ) {
//                 $data[] = array(
//                     'title' => get_the_title(),
//                     'date' => get_field("concert_date"),
//                     'link' => get_field("concert_venue_link"),
//                     'group' => get_field("concert_group")
//                 );
//             }
//         endwhile;
//         wp_reset_postdata();
//     endif;
//     // RETURN DATA
//     if ( empty( $data ) ) {
//         return null;
//     }    
//     return $data;
// }

// add_action( 'rest_api_init', function () {
//     register_rest_route( 'custom/v1', '/upcoming/', array(
//         'methods' => 'GET',
//         'callback' => 'upcoming_concerts',
//     ) );
//     register_rest_route( 'custom/v1', '/previous/', array(
//         'methods' => 'GET',
//         'callback' => 'previous_concerts',
//     ) );
// } );




// // AGENDA / ARCHIVE

//     // DATE CHECKER

// function isPast ( $date ) {
//     // CURRENT DATE
//     $today = explode( "/", date("d/m/Y") );
//     $today_day = $today[0];
//     $today_month = $today[1];
//     $today_year = $today[2];
//     // INPUT DATE
//     // FORMAT: 2017-03-31 19:00:00
//     $show = explode( "–", $date );
//     $show_year = $show[0];
//     $show_month = $show[1];
//     $show_day = $show[2];

//     $past = false;
//     // IF YEAR IS IN PAST
//     if ( $show_year < $today_year ) {
//         $past = true;
//     // IF YEAR IS CURRENT
//     } else if ( $show_year === $today_year ) {
//         // IF MONTH IS IN PAST
//         if ( $show_month < $today_month ) {
//             $past = true;
//         } else if ( $show_month === $today_month ) {
//             // IF DAY IS IN PAST
//             if ( $show_day < $today_day ) {
//                 $past = true; 
//             }
//         } 
//     } 
//     return $past;
// }

// // function get_future_concerts () {
// //     $agenda_query = new WP_Query( "post_type=concerts" );
// //     if ( $agenda_query->have_posts() ) :
// //         $data = array();
// //         while ( $agenda_query->have_posts() ) : $agenda_query->the_post(); 
// //             if ( !isPast( get_field("concert_date") ) ) {
// //                 $data[] = json_decode( json_encode( $post ), true );
// //             }
// //         endwhile;
// //         wp_reset_postdata();
// //         return $data;
// //     endif;
// // }

// // function get_past_concerts () {
// //     $agenda_query = new WP_Query( "post_type=concerts" );
// //     if ( $agenda_query->have_posts() ) :
// //         $data = array();
// //         while ( $agenda_query->have_posts() ) : $agenda_query->the_post(); 
// //             if ( isPast( get_field("concert_date") ) ) {
// //                 $data[] = json_decode( json_encode( $post ), true );
// //             }
// //         endwhile;
// //         wp_reset_postdata();
// //         return $data;
// //     endif;
// // }

// // GET PROJECTS FOR MENU

// function get_projects () {
//     $projects_query = new WP_Query( "post_type=projects" ); 
//     if ( $projects_query->have_posts() ) :
//         while ( $projects_query->have_posts() ) : $projects_query->the_post(); 
//             <li><a href="#_projects/<?php the_ID(); "></a></li>

//         endwhile;  
//     endif;    
// }

?>