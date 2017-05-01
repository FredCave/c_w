<div id="menu_bg"></div>

<?php // ADD CLASS ON PROOJECTS PAGE SO THAT MENU STARTS AS INVISIBLE ?>
<ul id="menu" <?php if ( is_page("projets") ) { echo "class='projects'"; } ?> >

	<li <?php lh_get_current("info"); ?> >
		<a href="<?php bloginfo('url'); ?>/info">Lola Hakimian</a>
	</li>
	<li <?php lh_get_current("projets"); ?> >
		<a href="<?php bloginfo('url'); ?>">Projets</a>
		<span class="menu_project_title">
			— <span class="current_title">Pas un souffle de vent</span>
		</span>
	</li>
	<li <?php lh_get_current("installations"); ?> >
		<a href="<?php bloginfo('url'); ?>/installations">Installations</a>
	</li>
	<li <?php lh_get_current("commandes"); ?> >
		<a href="<?php bloginfo('url'); ?>/_commandes">Commandes</a>
	</li>
	
</ul>