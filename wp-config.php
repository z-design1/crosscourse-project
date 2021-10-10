<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */
define( 'HEADLESS_MODE_CLIENT_URL', 'https://jino.no/wordpress' );
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'jinonjqx_wpdb' );

/** MySQL database username */
define( 'DB_USER', 'jinonjqx_jinonjqx' );

/** MySQL database password */
define( 'DB_PASSWORD', 'Je+l242YZc*N' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '>](1lgj:A{AD?+63LS&QAwM,%>EQxYyB6b~]]SDWRE8G%g?;2[+)Oi6+dgw{a<yG' );
define( 'SECURE_AUTH_KEY',  'RI/qA5LF>R%rM%[.fbJk[.du)x*twYpM{@FFvA7<V?KW~;b{vV6#^N/kgP%C;zK!' );
define( 'LOGGED_IN_KEY',    '6or@N@?3Q`b&9&Z|o]MeU4ekb?,Z^}eyV4=9x@uTrG.L5}:?r_{j%UhL$~w[d.cJ' );
define( 'NONCE_KEY',        'lLaHFunkq=zvcr<6eQ#[!]4%#*1+p%iH{.)n1@?rHhj%vI`M+Pc!(q^G~cjNBAhC' );
define( 'AUTH_SALT',        'z#beCzwL^[n;h1|_pQrmun8C$fa^M!cP>sL1+y~q5mGP-@7xhalzwQd}J2LJCmJ0' );
define( 'SECURE_AUTH_SALT', 'XN*E4q(?pEr/hvL>[/`D.,6*GQTq{-m-uHlcp|Y_g_o}/Z;J8J<B;.AeY`RgEa(C' );
define( 'LOGGED_IN_SALT',   '!u*$7]:x6zx$[V<bXYD;x25nTNs]!gGx#&ybfANy&XqGk{F+t`b%~RjfEkf%9vO{' );
define( 'NONCE_SALT',       'O5$33iZv`>9{H+[;60apxEUU&Z<:<ILdN85ZpuF)yX.Qygw@Hsjp:)=p7O2os+KJ' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'tblwp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
