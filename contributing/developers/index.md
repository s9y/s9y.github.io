---
title: Code primer
---

**TODO: See how to best split this up into multiple files**
**TODO: How to build a table of contents?**

# Code Primer

To get started with developing Serendipity, here's a few things to get you kickstarted.

The first thing you need is an installation of Serendipity, and FTP/SSH/file access to that installation. It's easy to setup a local Apache server with PHP and MySQL on all Linux, MacOS or Windows systems. Of course the best thing would be if you use github to check out our core code, so you can easily contribute patches or update your installation to the latest code version.

Now here are the most basic concepts you need to know. Those assume you have some basic PHP knowledge, and you are comfortable with reading the PHP code of the files alongside. The best way is always learning-by-doing when working with an existing system, so our goal is not to teach you all the basics - but rather to get you to know the basic workflows, so that you can check them out easily on your own, and know where to find what.

All our core PHP functions (serendipity_XXX) have phpDoc style comments which explain the parameters and functionality of each function, so be sure to read those. We currently have no automatted Code documentation, but you should be able to use any phpDoc compiler on our code yourself.

## The "core"

### Initializing the Framework: serendipity_config(_local).inc.php

The user configuration for the most basic settings required to start the framework lies in **serendipity_config_local.inc.php**. It sets up the basic array **$serendipity**, and configure database credentials and the used Serendipity version.

The file **serendipity_config.inc.php** is the heart of our framework. It sets default variables, checks the PHP environment, loads the user configuration, includes the required files.

Whenever you want to do "something" with the Serendipity framework, all you need to do is include that file **serendipity_config.inc.php** in your code, and you can immediately access most of the Serendipity function calls, like this:

```
<?php
include 'serendipity_config.inc.php';
$entries = serendipity_fetchEntries();
print_r($entries);
?>
```

The defined variables in this file by default are:

* $serendipity['versionInstalled']: Current version number
* $serendipity['dbName']: Database name
* $serendipity['dbPrefix']: Database prefix (prepended before internal table names)
* $serendipity['dbHost']: Database host
* $serendipity['dbUser']: Database user
* $serendipity['dbPass']: Database password
* $serendipity['dbType']: Database type (=layer)
* $serendipity['dbPersistent']: Whether to use persistant connections

On top of that, certain variables that are not included in the Serendipity Configuration panel can be configured in this file; if they are not present, the Serendipity defaults will be used. Such variables are:

* $serendipity['dashboardCommentsLimit']: How many comments to show in the dashboard overview (default 5)
* $serendipity['dashboardLimit']: How many entries to show in dashboard (default 5)
* $serendipity['dashboardDraftLimit']: How many of those dashboard entries are filled up with draft entries (default 5)
* $serendipity['production']: If set to "false" you can evoke extra debugging output when errors occur. If set to "debug", it will be extra-verbose. (default: based on version, RC and alpha/betas default to false)
* $serendipity['allowDateManipulation']: If set to true (default), users can change the date of entries
* $serendipity['max_last_modified']: Amount of seconds how fresh an article must be, so that a comment to an entry will modify its LastModified-timestamp (default: 7 days)
* $serendipity['max_fetch_limit']: In RSS-Feeds, how many entries can be fetched (default 50)
* $serendipity['trackback_filelimit']: How large may an URL be to check for incoming trackback links (default 150kb)
* $serendipity['fetchLimit']: How many entries to display (default 15)
* $serendipity['RSSfetchLimit']: How many entries to display within RSS feed (default 15)
* $serendipity['use_PEAR']: By default, Serendipity will use externally provided PEAR files (if existing). To force using the PEAR libraries bundled with Serendipity, set this variable to FALSE.
* $serendipity['useHTTP-Auth']: If enabled (on by default, requires mod_php), users can log in to the blog by specifying user/password in the URL like http://user:password@example.com/serendipity_admin.php (default true)
* $serendipity['cacheControl'] (default true)
* $serendipity['expose_s9y']: Whether to expose Serendipity version number (default true)
* $serendipity['forceBase64']: When enabled, mails are encoded with base64 instead of imap_8bit (default false)
* $serendipity['use_iframe']: When enabled, uses an iframe to save entries in the backend to prevent timeouts (default true)
* $serendipity['autolang']: Default language, when autodetection fails (default "en")
* $serendipity['defaultTemplate']: Which template directory to use for fallback chaining (see below) (default "2k111")
* $serendipity['template_backend']: Which backend template to use when none is configured (default "2k11")
* $serendipity['languages']: Holds an array of available languages
* $serendipity['calendars']: Holds an array of available calendar types (gregorian and persian by default)
* $serendipity['charsets']: Holds an array of supported charsets (native and UTF-8 by default)
* $serendipity['use_autosave']: Whether to use local-browser autosaving feature (default true)
* $serendipity['imagemagick_thumb_parameters']: Otpional parameters passed to imagemagick when creating thumbnails (default empty)
* $serendipity['logLevel']: If set, enables using the Katzgrau KLogger (writes to templates_c/). If set to "debug", be extra verbose (default: 'Off')

### .htaccess

This file holds simple, central mod_rewrite RewriteRules (when URL-Rewriting is enabled) to match all permalink patters back to index.php (see the "Routing"-Part below).

### serendipity.css.php

This file is usally called through the URL RewriteRules, and dynamically assembles the CSS statements for a selected theme as well as all plugins that have distinct CSS output.

### deployment directory

Serendipity supports the concept of a "shared installation". This keeps Serendipity as a kind of library in a central directory outside the DocumentRoot. Each blog will then only use stub-files which actually include that library file. The deployment-Directory contains exactly those stubs that point back to the library (through simply "include" calls). Note that the file names are exactly those that the core actually uses.
For more information, see "Setting up a shared installation" **TODO: Link**

### Composer / Bundled-Libs

The directory **bundled-libs** holds all of our internally used libraries that ship together with Serendipity. Using composer, we are able to update those libraries (in part). However, note that composer is NOT required to develop with Serendipity, since the libraries are all contained in our source code repository.

We currently bundle:

* **PEAR** for some legacy libraries:
  * **PEAR::Cache** for some easy File/function caching
  * **PEAR::HTTP** for some basic HTTP Request and Response classes
  * **PEAR::Net** for some basic HTTP operations, related to PEAR::HTTP
  * **PEAR::Text** for basic Text/Wiki operations
  * **PEAR::XML** for XML operations
* **Onyx** for RSS parsing
* **simplepie* for advanced Atom and RSS parsing
* **Smarty** for our templating infrastructure
* **composer** for library maintenance
* **katzgrau/klogger**, **psr** as a central low-level logging facility
* **zendframework/zend-db/** as an (optional) database layer intermediate
* **create_release.sh** is the script we use to bundle releases
* **serendipity_generateFTPChecksums.php* is the code used by the create_release.sh to create the **checksums.inc.php* file

### Internationalization

Serendipity's translations are handled through easy .php include files inside the **lang/** subdirectory. Each language has its own file according to its countrycode.

Translation files can have a "local charset" file and a UTF-8 variant in the UTF-8 subdirectory.

The file "addlang.txt" is meant for developers to hold new strings; by running "addlang.sh" this list can be integrated into each language file.

Some special constants / variables inside the language files are these:

* $i18n_filename_from: Holds an array of character replacements, which will replaced with ASCII characters when they occur within a URL. This can be used to translate umlauts etc. to "readable" variants of those, like a german "Ü" gets translated to "Ue".
* $i18n_filename_to: This holds the actual character replacement values.
* LANG_CHARSET: Central constant that indicates the used charset of a language. Many plugins etc. use this to deduce which 
* SQL_CHARSET: Default charset for database connection
* DATE_LOCALES: Used locales for a language
* DATE_FORMAT_ENTRY: The dateformat used in the language
* DATE_FORMAT_SHORT: A short dateformat used in the language
* WYSIWYG_LANG: Which language file include is used by CKEditor
* NUMBER_FORMAT_DECIMALS, NUMBER_FORMAT_DECPOINT, NUMBER_FORMAT_THOUSANDS: Some default number formatting rules
* LANG_DIRECTION: Indicates if a language uses rtl or ltr spelling

Certain language constants can use placeholders like "%s" (standard PHP Sprintf()) for later variable inclusion.

The proper language in the codeflow is loaded through "include/lang.inc.php". This file is called twice; once for the central routine to only detect the proper language, and then a second time to actually load all language constants for the currently-logged in user.

### Other files and directories

There are a couple of other files in the Serendipity root that are basic stubs which all reference the core framework:

* **index.php**: Frontend (see below)
* **.htaccess**: Webserver configuration (see above)
* **serendipity_admin.php**: Backend (see below)
* **serendipity_config.inc.php**: Framework initializing (see above)
* **serendipity_config_local.inc.php**: Basic configuration of the blog
* **comment.php**, **wfwcomment.php**: Used to accept and process a comment or trackback made to blog entries
* **checksums.inc.php**: A checksum file that holds information about the files that belong to the current Serendipity version; it is used to verify the integrity of an installation to find modified files.
* **exit.php**: A tracking script used for external links
* **rss.php**: The RSS feeds are routed through this
* **serendipity_admin_image_selector.php**: A mediadatabase popup screen that is called from within the backend
* **serendipity_xmlrpc.php*: A basic stub for XML-RPC calls made to the blog, the actual XML-RPC client is provided through a plugin

The subdirectories contain:

* **archives/**: A temporary directory used to hold static files
* **uploads/**: Directory to contain user/media files
* **bundled-libs/**: External libraries like Smarty and other (see above)
* **deployment/**: Stub directory for shared installations (see above)
* **docs/**: ChangeLog and other documentation
* **htmlarea/**: Bundled CKEditor WYSIWYG
* **include/**: Internal code libraries
* **include/admin/**: Code workflow used for backend (see below)
* **include/admin/importers/**: Data export/import modules (see below)
* **include/db/**: Code libraries for database layers
* **include/tpl/**: Configuration templates for backend functionality
* **lang/**: PHP language files (using simple constants)
* **plugins/**: Plugin files
* **sql/**: SQL database creation files
* **templates/**: Theme files
* **templates_c/**: Compile directory for cached templates (and other temporary data)
* **tests/**: Draft ideas for unit tests

### Database structure and layers

The database layer offers a central framework trough *include/db/db.inc.php*. Serendipity uses plain SQL statements for its queries. We try to use database-agnostic standard SQL wherever possible, so that it runs on most servers.

If that is not possible, certain code-forks are deployed to use specific queries for specific database layers; however, those places are very few. The advantage of using central SQL is that it also creates very readable, easy SQL.

Core functions available globally across all database layers are:

* serendipity_db_update: Perform a query to updat ethe data of a certain table row
* serendipity_db_insert: Perform a query to insert an associative array into a specific SQL table
* serendipity_db_bool: Check whether an input value corresponds to a TRUE/FALSE option in the SQL database.
* serendipity_db_get_interval: Return a SQL statement for a time interval or timestamp, specific to certain SQL backends
* serendipity_db_implode: Operates on an array to prepare it for SQL usage.

We offer those database layers, which all implement an identical interface accross all layers:

* generic: zendframework-DB adapter
* mysql: MySQL databases
* mysqli: MySQL databases (PHP 5.5+ compatible backend, better performance)
* pdo-postgres: PDO-Postgresql driver (requires PHP PDO extension)
* pdo-sqlite: PDO-sqlite driver (requires PHP PDO extension)
* postgres: native postgresql driver (requires PHP extension)
* sqlite: native sqlite driver (requires PHP sqlite extension)
* sqlite3: native sqlite3 driver (requires PHP sqlite3 extension)
* sqlite3oo: native sqlite3 driver using Object-Oriented interface (requires PHP sqlite3 extension)
* sqlrelay: DB adapter using sqlrcon PHP extension

Those layers implement these central functions:

* serendipity_db_query: Perform a DB Layer SQL query.
* serendipity_db_escape_string: Returns a escaped string, so that it can be safely included in a SQL string encapsulated within quotes, without allowing SQL injection.
* serendipity_db_limit: Returns the option to a LIMIT SQL statement, because it varies accross DB systems
* serendipity_db_limit_sql: Return a LIMIT SQL option to the DB Layer as a full LIMIT statement
* serendipity_db_schema_import: Prepares a Serendipty query input to fully valid SQL. Replaces certain "template" variables.
* serendipity_db_connect: Connect to the configured Database
* serendipity_db_probe: Try to connect to the configured Database (during installation)
* serendipity_db_reconnect: Reconnect to the configured Database
* serendipity_db_insert_id: Returns the latest INSERT_ID of an SQL INSERT INTO command, for auto-increment columns
* serendipity_db_affected_rows: Returns the number of affected rows of a SQL query
* serendipity_db_updated_rows: Returns the number of updated rows in a SQL query
* serendipity_db_matched_rows: Returns the number of matched rows in a SQL query
* serendipity_db_begin_transaction: Tells the DB Layer to start a DB transaction.
* serendipity_db_end_transaction: Tells the DB Layer to end a DB transaction.
* serendipity_db_in_sql: Assemble and return SQL condition for a "IN (...)" clause
* serendipity_db_concat: Returns the SQL code used for concatenating strings

### Important variables and constants

Core variables are:

* S9Y_DATA_PATH: If a shared installation is used, points to the directory where Serendipity keeps its per-user files
* S9Y_INCLUDE_PATH: Path to the core installation of Serendipity
* S9Y_PEAR_PATH: Path to the bundled PEAR libraries of Serendipity
* IS_installed: Boolean variable to indicate if Serendipity is properly installed
* IN_serendipity: Boolean variable to indicate if the Serendipity Framework is loaded
* IS_up2date: Boolean variable to indicate if the current Serendipity version matches the local files
* PATH_SMARTY_COMPILE: Path to the folder where temporary Smarty files are kept
* USERLEVEL_ADMIN (255), USERLEVEL_CHIEF (1), USERLEVEL_EDITOR (0): Constants for user permission levels
* $serendipity['rewrite']: Indicates which URL rewriting method is used (none, apache errorhandling, mod_rewrite, ...)
* $serendipity['serendipityPath']: Contains the path to the current Serendipity installation
* $serendipity['serendipityHTTPPath']: Contains the URL path to the current Serendipity installation
* $serendipity['baseURL']: Contains the absolute URL to the current Serendipity installation
* $serendipity['serendipityAuthedUser']: Boolean variable which indicates if a user is logged in
* $serendipity['user']: The ID of the currently logged-in user
* $serendipity['email']: The email address of the currently logged-in user
* $serendipity['smarty']: The central Smarty object
* $serendipity['logger']: The central logger object (only exists if logging is enabled)
* $serendipity['uriArguments']: Contains the currently parsed URI arguments to a page call
* $serendipity['lang']: Which language is currently loaded
* $serendipity['charset']: Which charset is currently loaded

Some important URL variables (note that if those specific variables are submitted via POST they get automatically merged into the GET array and acts like a $_REQUEST superglobal):

* $serendipity['GET']['action']: Indicates which action on the frontend shall be executed (i.e. "read", "search", "comments", "archives", ...) and is evaluated by include/genpage.inc.php.
* $serendipity['GET']['adminModule']: Indicates which module of the backend shall be executed (i.e. "maintenance", "comments", "entries", ...) and is evaluated by serendipity_admin.php, which includes the specific module from include/admin/.
* $serendipity['GET']['adminAction']: Indicates which action of a requested module on the frontend shall be executed; the performed action is evaluated by the specific module that it is a part of.
* $serendipity['GET']['id']: If supplied, applies to a specific entry ID (both backend and frontend)
* $serendipity['GET']['page']: Indicates the page number (for listing entries) for the frontend
* $serendipity['GET']['lang_selected']: Allows to change the frontend/backend language (ie "en", "de" language keys)
* $serendipity['GET']['token']: Some modules require token hashes to prevent XSS attacks
* $serendipity['GET']['category']: Affects displaying entries, showing entries only belonging to this category ID (multiple categories separated by ";").
* $serendipity['GET']['hide_category']: Affects displaying entries, hide entries belonging to this category ID (multiple categories separated by ";").
* $serendipity['GET']['viewAuthor']: Affects displaying entries, only showing entries by this specific author ID (multiple authors separated by ";")..
* $serendipity['GET']['range']: Affects displaying entries, only showing entries by this date range 
* $serendipity['GET']['subpage']: Can execute frontend plugins (if not using their own rewrite-URL or external_plugin URL)
* $serendipity['GET']['searchTerm']: If search is executed, holds the search term
* $serendipity['GET']['fullFeed']: Boolean to indicate whether the full RSS feed is displayed (for rss.php)
* $serendipity['GET']['noBanner']: Boolean to indicate if the backend should show the banner
* $serendipity['GET']['noSidebar']: Boolean to indicate if the backend should show the menu sidebar
* $serendipity['GET']['noFooter']: Boolean to indicate if the backend should show the footer

Note that a parameter like index.php?serendipity[subpage]=XXX gets converted to $serendipity['GET']['subpage']=XXX. But index.php?subpage=YYY will not exist in $serendipity['GET'] due to it's missing prefix.

On top of that, some global and user-specific configuration is passed through options saved in the database table serendipity_config. Those variables are defined in include/tpl/config_local.inc.php and include/tpl/config_personal.inc.php:

#### Local configuration

* $serendipity['dbNames']: Boolean whether to use "SET NAMES" charset directive in database layer
* $serendipity['uploadPath']: Path to "uploads" directory
* $serendipity['templatePath']: Path to "templates" directory"
* $serendipity['uploadHTTPPath']: URL-path to "uploads" directory
* $serendipity['autodetect_baseURL']: Boolean whether to enable autodetection of HTPP host name
* $serendipity['defaultBaseURL']: When HTTP-Hostname autodetection is turned off, contains the default URL to Serendipity
* $serendipity['indexFile']: Name to index.php (used for "Embedded Installation", see **TODO**)
* $serendipity['permalinkStructure']: Permalink for archives/ patterns
* $serendipity['permalinkAuthorStructure']: Permalink for authors/ patterns
* $serendipity['permalinkCategoryStructure']: Permalink for categories/ patterns
* $serendipity['permalinkFeedAuthorStructure']: Permalink for feeds/authors/ patterns
* $serendipity['permalinkFeedCategoryStructure']: Permalink for feeds/categories/ patterns
* $serendipity['permalinkArchivesPath']: URL path for "archives view" detection
* $serendipity['permalinkArchivePath']: URL path for "single entry" detection
* $serendipity['permalinkCategoriesPath']: URL path for "category view" detection
* $serendipity['permalinkFeedsPath']: URL path for "RSS feed" detection
* $serendipity['permalinkPluginPath']: URL path for "external plugin" detection
* $serendipity['permalinkSearchPath']: URL path for "search" detection
* $serendipity['permalinkAdminPath']: URL path for "administration" detection
* $serendipity['permalinkAuthorsPath']: URL path for "author view" detection
* $serendipity['permalinkCommentsPath']: URL path for "comments" detection
* $serendipity['permalinkUnsubscribePath']: URL path for "unsubscribe comment" detection
* $serendipity['permalinkDeletePath']: URL path for "delete comment" detection
* $serendipity['permalinkApprovePath']: URL path for "approve comment" detection

* $serendipity['blogTitle']: Title of blog
* $serendipity['blogDescription']: Subtitle of blog
* $serendipity['blogMail']: E-Mail address of blog (sending/receiving)
* $serendipity['allowSubscriptions']: Boolean whether to allow users to subscribe to comments via email
* $serendipity['allowSubscriptionsOptIn']: Boolean whether comment subscription requires opt-in confirmation
* $serendipity['useCommentTokens']: Boolean whether to allow approving/deleting comments to the author of entries via email
* $serendipity['calendar']: Which calendar to use
* $serendipity['lang_content_negotiation']: Boolean whether user's browser-language is used
* $serendipity['enablePluginACL']: Boolean whether configuration of plugins applies permission checks
* $serendipity['updateCheck']: Boolean whether performing update checks is allowed
* $serendipity['archiveSortStable']: Boolean whether pagination URLs start with the pages enumberated from first or last page
* $serendipity['searchsort']: Default sort order for sorting search results
* $serendipity['enforce_RFC2616']: Boolean whether for RSS feeds Conditional Get may be used (see **TODO**)
* $serendipity['useGzip']: Boolean whether gzip'ing pages is enabled
* $serendipity['enablePopup']: Boolean whether Popups are used in the frontend (depends on the theme)
* $serendipity['embed']: Boolean whether embedded mode is enabled (see **TODO**)
* $serendipity['top_as_links']: Boolean whether links outputted by exit/referrer tracking are clickable (anti-spam)
* $serendipity['trackReferer']: Boolean whether referrer tracking is enabled
* $serendipity['blogReferer']: List of referrer URL patters that shall be blocked
* $serendipity['useServerOffset']: Boolean whether the timezone of the server and the authors differs
* $serendipity['serverOffsetHours']: How many hours timezone difference are between server and authors
* $serendipity['showFuturEentries']: Whether to show entries from the future
* $serendipity['enableACL']: Boolean whether access-control checks are performed for entries, categorie and media database items
* $serendipity['feedFull']: Affects how entries are displayed in RSS feeds
* $serendipity['feedBannerURL']: SYNDICATION_PLUGIN_BANNERURL
* $serendipity['feedBannerWidth']: Width of banner image
* $serendipity['feedBannerHeight']: Height of banner image
* $serendipity['feedShowMail']: Whether to reveal authors email adress in feeds
* $serendipity['feedManagingEditor']: Specify the managing editor of the feeds
* $serendipity['feedWebmaster']: Specify the webmaster of the feeds
* $serendipity['feedTtl']: Specify the "time to live" on how often content gets updated
* $serendipity['feedPubDate']: Whether to embed the publication date of a feed
* $serendipity['feedCustom']: URL of a location to redirect feedreaders to
* $serendipity['feedForceCustom']: Whether to force visitors to the redirected feed location even if they call the internal rss.php file
* $serendipity['magick']: Boolean whether to use imagemagick for converting images
* $serendipity['convert']: Path to imagemagick binary
* $serendipity['thumbSuffix']: Suffix to append to converted image thumbnails
* $serendipity['thumbSize']: Maximum Thumbnail dimension
* $serendipity['thumbConstraint']: What to apply the maximum thumbnail dimension to
* $serendipity['maxFileSize']: Maximum file size of uploaded files
* $serendipity['maxImgWidth']: Maximum width for uploaded images
* $serendipity['maxImgHeight']: Maximum height for uploaded images
* $serendipity['uploadResize']: Boolean whether to resize images to maximum size before uploading
* $serendipity['onTheFlySynch']: Boolean whether every call to the media database checks for updated files
* $serendipity['dynamicResize']: Whether to allow frontend visitors to resize thumbnails on demand
* $serendipity['mediaExif']: Whether to parse EXIF information of uploaded files
* $serendipity['mediaProperties']: Which meta information shall be available in the media database
* $serendipity['mediaKeywords']: Specifies a list of available keywords to tag media files with

#### Personal Configuration

* $serendipity['wysiwyg']: Whether to use WYSIWYG editor
* $serendipity['wysiwygToolbar']: Defines the toolbar palette of the WYSIWYG editor
* $serendipity['mail_comments']: Boolean whether a user receives comments to his entries via mail
* $serendipity['mail_trackbacks']: Boolean whether a user receives trackbacks to his entries via mail
* $serendipity['no_create']: If set, the author has no write permissions to anything in the backend
* $serendipity['right_publish']: Boolean to indicate if an author may publish entries (or only drafts)
* $serendipity['simpleFilters']: Boolean whether simplified media and entry filter toolbars are shown
* $serendipity['enableBackendPopup']: Boolean whether popups in the backend are shown inline or as "real" popups
* $serendipity['moderateCommentsDefault']: Boolean to indicate if new entries are moderated by default
* $serendipity['allowCommentsDefault']: Boolean to indicate if new entries are able to be commented by default
* $serendipity['publishDefault']: Indicates if new entries are saved as drafts or publish
* $serendipity['showMediaToolbar']: Boolean whether to show toolbars for media library even in "picker" mode
* $serendipity['use_autosave']: Boolean to indicate if browser's autosave feature is used for entries

### Important API functions

We have created seperate bundles for specific API functions, and a snippet of most relevant functions defined in those files:

* *include/functions.inc.php*: Most basic functions, includes bundles below.
  * serendipity_strftime: Date output function, uses local timezone offset (if configured)
  * serendipity_fetchTemplateInfo: Get information about a specific theme
  * serendipity_walkRecursive: Recursively walks an 1-dimensional array to map parent IDs and depths, depending on the nested array set.
  * serendipity_fetchUsers: Fetch the list of Serendipity Authors
  * serendipity_fetchAuthor: Fetch user data for a specific Serendipity author
  * serendipity_sendMail: Sends a Mail with Serendipity formatting
  * serendipity_utf8_encode: Encode a string to UTF-8, if not already in UTF-8 format.
* *include/compat.inc.php*: Evaluates PHP runtime environment, operate on core variables (i.e. POST/GET short vars, magic quotes), define the error handler.
  * serendipity_die: Outputs a fatal error
  * errorToExceptionHandler: Handles PHP errors
  * serendipity_specialchars: Drop-in replacement of htmlspecialchars() to deal with different charsets
  * serendipity_entities: Drop-in replacement of htmlentities()
  * serendipity_entity_decode: Drop-in replacement of html_entity_decode()
* *include/functions_calenders.inc.php*: Calendar / time calculation
* *include/functions_comments*: Comment functionality
  * serendipity_displayCommentForm: Display the Comment form for entries
  * serendipity_fetchComments: Fetch an array of comments to a specific entry id
  * serendipity_generateCommentList: Create a HTML SELECT dropdown field which represents all hierarchical comments
  * serendipity_printComments: Print a list of comments to an entry
  * serendipity_insertComment, serendipity_saveComment: Store the comment made by a visitor in the database
  * serendipity_sendComment: Send a comment notice to the admin/author of an entry
* *include/functions_config.inc.php*: Central functions for user-specific actions and internal routing / authentication
  * serendipity_set_config_var: Sets a configuration value for the Serendipity Configuration
  * serendipity_get_config_var: Retrieve a global configuration value for a specific item of the current Serendipity Configuration
  * serendipity_get_user_config_var: Retrieve an author-specific configuration value for an item of the Serendipity Configuration stored in the DB
  * serendipity_get_user_var: Retrieves an author-specific account value
  * serendipity_set_user_var: Updates data from the author-specific account
  * serendipity_getTemplateFile: Gets the full filename and path of a template file
  * serendipity_load_configuration: Loads all configuration values and imports them to the $serendipity array
  * serendipity_logout: Perform logout functions (destroys session data)
  * serendipity_login: Perform login to Serendipity
  * serendipity_authenticate_author: Perform user authentication routine
  * serendipity_userLoggedIn: Check if a user is logged in
  * serendipity_setCookie: Set a Cookie via HTTP calls, and update $_COOKIE plus $serendipity['COOKIE'] array.
  * serendipity_getPermissions: Retrieves an array of applying permissions to an author
  * serendipity_getPermissionNames: Returns the list of available internal Serendipity permission field names
  * serendipity_checkPermission: Checks if a permission is granted to a specific author
  * serendipity_getAllGroups: Returns all authorgroups that are available
  * serendipity_fetchGroup: Fetch the permissions of a certain group
  * serendipity_getGroups: Gets all groups a user is a member of
  * serendipity_getGroupUsers: Gets all author IDs of a specific group
  * serendipity_ACLGrant:  Allow access to a specific item (category or entry) for a specific usergroup
  * serendipity_ACLGet: Checks if a specific item (category or entry) can be accessed by a specific usergroup
  * serendipity_ACLCheck: Checks if a specific item (category or entry) can be accessed by a specific Author
  * serendipity_checkFormToken: Prevent XSRF attacks by checking for a form token
  * serendipity_setFormToken: Prevent XSRF attacks by setting a form token within HTTP Forms
  * serendipity_loadThemeOptions: Load available/configured options for a specific theme (through config.inc.php of a template directory) into an array.
  * serendipity_loadGlobalThemeOptions: Load global available/configured options for a specific theme into an array.
  * serendipity_hash: Return the SHA1 (with pre-hash) of a value (for storing passwords)
* *include/functions_entries.inc.php*: Central functions for entry-related actions
  * serendipity_fetchCategoryInfo: Return the category properties of a specific category
  * serendipity_fetchEntryCategories: Fetch a list of all category properties to a specific entry ID
  * serendipity_fetchEntries: Fetch a list of entries
  * serendipity_fetchEntry: Fetch a single entry by a specific condition
  * serendipity_fetchEntryData: Fetch special entry data and attach it to a superarray of entries.
  * serendipity_fetchEntryProperties: Fetches additional entry properties for a specific entry ID
  * serendipity_fetchCategories: Fetch a list of available categories for an author
  * serendipity_printEntries: Passes the list of fetched entries from serendipity_fetchEntries() on to the Smarty layer
  * serendipity_updertEntry: Inserts a new entry into the database or updates an existing entry
  * serendipity_deleteEntry:  Delete an entry and everything that belongs to it (comments)
* *include/functions_entries_admin.inc.php*: Central functions for operating on entries in the backend
  * serendipity_printEntryForm: Prints the form for editing/creating new blog entries
  * serendipity_emit_htmlarea_code: Emits the WYSIWYG code for plugins and entries in the backend
* *include/functions_images.inc.php*: Central functions for media/image handling
  * serendipity_fetchImagesFromDatabase: Gets a list of media items from our media database
  * serendipity_fetchImageFromDatabase: Fetch a specific media item from the mediadatabase
  * serendipity_updateImageInDatabase: Update a media item
  * serendipity_deleteImage: Delete a media item
  * serendipity_fetchImages: Open a directory and fetch all existing media items
  * serendipity_insertImageInDatabase: Insert a media item in the database
  * serendipity_makeThumbnail: Create a thumbnail for an image
  * serendipity_generateThumbs: Creates thumbnails for all images in the upload dir
  * serendipity_syncThumbs: Check all existing thumbnails if they are the right size, insert missing thumbnails
  * serendipity_functions_gd: Wrapper for GDLib functions
  * serendipity_calculate_aspect_size: Calculate new size for an image, considering aspect ratio and constraint
  * serendipity_displayImageList: Display the list of images in our database
  * serendipity_killPath: Recursively delete a directory tree
  * serendipity_traversePath: Recursively walk a directory tree
  * serendipity_getImageData: Given a relative path to an image, construct an array containing all relevant information about that image in the file structure.
  * serendipity_showMedia: Prints a media item
* *include/functions_installer.inc.php*: Central functions for installer/configuration
  * serendipity_updateLocalConfig, serendipity_installFiles: Writes .htaccess and serendipity_config_local.inc.php
  * serendipity_query_default: Check a default value of a config item from the configuration template files
  * serendipity_parseTemplate: Parse a configuration template file
  * serendipity_printConfigTemplate: Parses the configuration array and displays the configuration screen
* *include/functions_permalinks.inc.php*: Central functions for handling URL patterns
  * serendipity_makeFilename: Converts a string into a filename that can be used safely in HTTP URLs
  * serendipity_searchPermalink: Search the reference to a specific permalink
  * serendipity_rewriteURL: Uses logic to figure out how the URI should look, based on current rewrite rule
  * serendipity_makePermalink:  Format a permalink according to the configured format
  * serendipity_archiveURL, serendipity_authorURL, serendipity_categoryURL, serendipity_feedCategoryUrl, serendipity_feedAuthorURL: Create a permalink for specific permalink type
  * serendipity_currentURL: Returns the URL to the current page that is being viewed
  * serendipity_getUriArguments: Get the URI Arguments for the current HTTP Request
* *include/functions_plugins_admin.inc.php*: Central functions for handling the plugins management backend
  * serendipity_plugin_config: Show the plugin configuration, parses all available configuration types
* *include/functions_rss.inc.php*: Central function for feed handling
  * serendipity_printEntries_rss: Parses entries to display them for RSS/Atom feeds to be passed on to generic Smarty templates
* include/serendipity_smarty_class.inc.php: Serendipity Smarty Framework, see below
* *include/functions_smarty.inc.php*: Serendipity Smarty functions, see below
  * serendipity_smarty_init: Central function to initialize Smarty framework and pass along parameters
  * serendipity_smarty_fetchPrintEntries: Fetch and print a single or multiple entries
  * serendipity_smarty_showPlugin: Be able to include the output of a sidebar plugin within a smarty template
  * serendipity_smarty_hookPlugin: Be able to execute the hook of an event plugin and return its output
  * serendipity_smarty_show: Render a smarty-template
* *include/functions_trackbacks.inc.php*: Central functions for trackback handling
  * add_trackback: Receive a trackback
  * serendipity_handle_references: Search through link body, and automagically send a trackback ping.
* *include/functions_upgrader.inc.php*: Central functions for upgrader, holds list of deprecated files and functions and other conversion functions when migrating from older versions
  * serendipity_removeDeadFiles_SPL: Empty a given directory recursively using the Standard PHP Library (SPL) iterator
* *include/plugin_api.inc.php*: Plugin API framework, see below
  * serendipity_plugin_api_core_event_hook: Central function with which the Serendipity core can act as a plugin on it's own and "listen" on specific events.
  * *serendipity_plugin_api*: Central class for operating the plugin API
    * serendipity_plugin_api::create_plugin_instance: Create an instance of a plugin.
    * serendipity_plugin_api::enum_plugins: Searches for installed plugins based on specific conditions
    * serendipity_plugin_api::probePlugin: Auto-detect a plugin and see if the file information is given, and if not, detect it.
    * serendipity_plugin_api::load_plugin: Instantiates a plugin class
    * serendipity_plugin_api::getPluginInfo: Gets cached properties/information about a specific plugin, auto-loads a cache of all plugins
    * serendipity_plugin_api::generate_plugins: Get a list of Sidebar plugins and pass them to Smarty
    * serendipity_plugin_api::hook_event: Executes a specific Eventhook by checking all plugins that listen on the specified event
  * *serendipity_property_bag*: Central class for making key/value stores available to plugins
    * serendipity_property_bag::get: Getter
    * serendipity_property_bag::set: Setter
  * *serendpity_plugin*: Central core class for plugins
    * serendipity_plugin::performConfig: Perform configuration routines. Called by Serendipity when the plugin is being configured.
    * serendipity_plugin::install: Perform install routines
    * serendipity_plugin::uninstall: Perform uninstall routines
    * serendipity_plugin::cleanup: Garbage Collection, called by serendipity after insertion of a config item
    * serendipity_plugin::introspect: The introspection function of a plugin, to setup properties
    * serendipity_plugin::introspect_config_item: Introspection of a plugin configuration item
    * serendipity_plugin::validate: Validate plugin configuration options.
    * serendipity_plugin::generate_content: Output plugin's contents (Sidebar plugins)
    * serendipity_plugin::get_config: Get a config value of the plugin
    * serendipity_plugin::set_config: Sets a configuration value for a plugin
    * serendipity_plugin::register_dependencies: Auto-Register dependencies of a plugin
    * serendipity_plugin::parseTemplate: Parses a smarty template file
  * *serendipity_event*: Class for event plugins
    * serendipity_event::event_hook: Main logic for making a plugin "listen" to an event
* *include/plugin_api_extension.inc.php*: Extended Plugin API framework
  * prepareReorder: Prepare a given one dimension array for reordering
  * doReorder: Update table for re-ordering records
  * isEmail: Check if a string is a valid email
* *include/template_api.inc.php*: Template API, see below
* *include/genpage.inc.php*: Smarty workflow intermediate, see below


### Error-Handling

By default, Serendipity sets the PHP error_reporting() to E_ALL without E_NOTICE and E_STRICT to prevent unnecessary PHP error output. When $serendipity['production'] is set to "Debug", E_STRICT errors will be shown.

Serendipity uses a default errorhandler (configured as $serendipity['errorhandler'], by default set to "errorToExceptionHandler" (defined in include/compat.inc.php). This will take care of emitting all error messages, and also ignore specific warnings that can be dealt with.

You can overwrite such an errorhandler in your serendipity_config_local.inc.php file by implementing your own function.


## Frontend-Routing (index.php)

All of our frontend routing is performed through the "index.php" file. Its code flow is like this:

1. Load serendipity_config.inc.php to initiate the frontend (load functions, languages, database layers, central configuration, user configuration)
2. Initialize Permalink patterns and lookup routines (serendipity_initPermalinks() and serendipity_permalinkPatterns()).
3. Check what the current URL looks like and perform wanted action, parsing available parameters. Possibly execute plugins
4. Call include/genpage.inc.php to setup the output for the required Smarty templates
5. Initialize Smarty Framework, output template file

Some examples:

### Archive view

The blog's url http://www.example.com/archives/2019/10/28.html is called by the visitor.

Through the .htaccess file, index.php get assigned to this page call. The index.php file instantiates the Serendipity framework by including the serendipity_config.inc.php file. It sets a view headers and sets up a few variables.

Now the central URL that was called is stored in $uri, and additional parameters (like the date: 2019-10-28) get evaluated and stored in $serendipity['uriArguments'].

Now, multiple regular expressions check the $uri for each possible scenario that could happen. This means, the central PAT_ARCHIVES rule will evaluate true, and execute its workflow.

Inside this if-statement, the $serendipity['uriArguments'] are parsed and operated on, so that possible categories, authors, week formats, pagination numbers or others are recognized. Those variables are stored in parameters like $seredipity['GET']['page'] (pagination) for example.

In our case, the list only contains "2019", "10" and "28". Those are stored in the variables $year, $month and $day. According to the selected calendar (gregorian or persian) these variables are evaluated and passed along to $ts and $te. Those hold timestamps of the passed date minumum and maximum (here: 2019-10-28 00:00 to 2019-10-28 23:59).

Once all variables are setup, include/genpage.inc.php is called to create the usual frontend view. This file checks based on $serendipity['view'] which output and smarty template files it needs to call, executes possible event plugins that listen on events, and after that, assign all data to the requested smarty template.

This output is then emitted as $data from index.php to the browser.

### External plugin

The routing for executing a plugin like http://www.example.com/pages/a-pagetitle.html to match a staticpage plugin's output is very similar to the example above.

The difference is that in this case the usual routing in index.php finds no specific pattern, and then goes to the "404" routing view. Once include/genpage.inc.php operates on that page, the plugin API event hook "genpage" is executed. The staticpage plugin has registered this event hook, and performs routines on its database tables to see if there is an entry that matches the currentl url. If that is the case, it adjusts the serendipity output and passes over its content.

## Backend (serendipity_admin.php)

For the Serendipity backend, all HTTP calls are routed through serendipity_admin.php. This file instantiates the Serendipity framework, sets up a couple of variables and then performs a central lookup on the URL GET (or POST) variable ?serendipity[adminModule]=XXX. Before each module is included from the file in include/admin/XXX.inc.php, Serendipity performs permission checks to see if the user is authorized to access the given module.

Each of the modules (see below) performs their specific actions and evaluate the URL variable ?serendipity[adminAction] to see, which action is performed (like creating an entry, updating an entry, viewing entries, etc.).

Each module passes its output and rendering data to a backend smarty template file, which gets saved in $main_content through output-buffering and finally assigns this output to Smarty and displays the admin/index.tpl template file.

### Backend Modules

The list of modules that are routable are:

* *catgegory.inc.php*: Category management
* *comments.inc.php*: Comment management
* *configuration.inc.php: Blog configuration
* *entries.inc.php*: Single Entry management
* *entries_ovewview.inc.php*: Entry overview
* *groups.inc.php*: Group / Access mangement
* *images.inc.php*: Media database
* *import.inc.php*: Import/Export
* *maintenance.inc.php*: Maintenance of the blog
* *overview.inc.php*: The central dashboard
* *personal.inc.php*: Personal preferences
* *plugins.inc.php*: Plugin management
* *templates.inc.php*: Theme management
* *upgrader.inc.php*: Upgrader functionality
* *users.inc.php*: User management

### Importers / Exporters

Serendipity supports importing from a lot of different systems. Each system is handled through a unified process put into their own files in the include/admin/importers/ directory.

Each of those files is named like the system they stem from:

* *b2evolution.inc.php*
* *bblog.inc.php*
* *blogger.inc.php*
* *bmachine.inc.php*
* *geeklog.inc.php*
* *lifetype.inc.php*
* *livejournal.inc.php*
* *moveabletype.inc.php*
* *nucleus.inc.php*
* *nuke.inc.php*
* *old_blogger.inc.php*
* *phpbb.inc.php*
* *pivot.inc.php*
* *pmachine.inc.php*
* *serendipity.inc.php*
* *smf.inc.php*
* *sunlog.inc.php*
* *textpattern.inc.php*
* *voodoopad.inc.php*
* *wordpress-pg.inc.php*
* *wordpress.inc.php*
* *generic.inc.php*: Import through a generic RSS feed

All files simple implement their own Class that extends from Serendipity_Import and uses those methods. A good example is the serendipity.inc.php file for a Serendipity importer.

* getImportNotes: Displays specific information about what the importer does
* Serendipity_Import_Serendipity (Constructor): Defines input GET/POST data as $this->data and popuplates $this->inputFields with a list of configuration options that the importer offers
* validateData: Checks if all fields are popuplated
* getInputFields: Wrapper function to return $this->inputFields (or custom variables)
* import: Central function that is called, can access input data through $this->data.

A class can now implement as many helper functions as it needs; the Serendipity importer uses one method for each kind of metadata it imports: import_cat, import_groups, import_authors and so on. All data is popuplated through another helper function import_table that performs the SQL queries for copying over data.

Please see **TODO:Link** for the database structure if you need to know how to read/write to the Serendipity core tables.

## Plugins

**TODO: Describe additional_plugins symlinks!**
**TODO: Plugin-API
	https://www.onli-blogging.de/876/Rohform-eines-Serendipity-Plugins.html 
	https://www.onli-blogging.de/879/Einfuehrung-Serendipity-Plugins-schreiben.html**
** TODO: serendipity_plugin_api_core_event_hook

** TODO: Example on how to create a plugin that hooks in the admin menu via: backend_sidebar_entries_event_display_XXX**
** TODO: Example on how to do "smoething" when an entry is saved**
** TODO: Example on how to create a plugin that does something on Frontend_display

### Important event hooks:

The easiest way to see how to implement any given event hook is to search in the .php files for:

```
hook_event('XXX')
```

where you replace 'XXX' with the name of the even thook you want to look up. There you can also easily see which $eventData is passed to the hook.

* css: Frontend CSS generation
* css_backend: Backend CSS generation
* js: Additional javascript frontend
* js_backend: Additional javascript backend
* frontend_configure: Performed when frontend is initialized
* backend_configure: Performed when backend is initialized
* backend_publish: Performed when an entry is published
* backend_save: Performed when an entry is saved (also for drafts!)
* entry_display: Performed when multiple entries are displayed in the frontend
* external_plugin: Execution of external plugins that take over complete page flow
* frontend_display: Performed when a single entry is displayed in the frontend
* genpage: Performed when smarty framework was initilizaed
* frontend_display:rss-2.0:namespace: RSS feed namespace
* frontend_display:atom-1.0:namespace: RSS feed namespace
* frontend_display:rss-2.0:per_entry: Single entry display in RSS feed
* frontend_display:atom-1.0:per_entry: Single entry display in Atom feed

### Other event hooks:

Most of these event hooks have self-explanatory names. You can easily look them up in the codebase by searching for those names, they usually only occur once at a specific place in code.

* backend_approvecomment
* backend_auth
* backend_cache_entries
* backend_cache_purge
* backend_category_addNew
* backend_category_delete
* backend_category_showForm
* backend_category_update
* backend_comments_top
* backend_delete_entry
* backend_deletecomment
* backend_directory_create
* backend_directory_delete
* backend_entry_iframe
* backend_entry_presave
* backend_entry_toolbar_body
* backend_entry_updertEntry
* backend_entryform
* backend_entryform_smarty
* backend_entryproperties
* backend_frontpage_display
* backend_http_request
* backend_image_add
* backend_image_addHotlink
* backend_import_entry
* backend_login
* backend_loginfail
* backend_media_check
* backend_media_delete
* backend_media_makethumb
* backend_media_path_exclude_directories
* backend_media_rename
* backend_pluginlisting_header
* backend_pluginlisting_header_upgrade
* backend_plugins_event_header
* backend_plugins_fetchlist
* backend_plugins_fetchplugin
* backend_plugins_install
* backend_plugins_new_instance
* backend_plugins_sidebar_header
* backend_plugins_update
* backend_preview
* backend_sendcomment
* backend_sendmail
* backend_sidebar_entries_event_display_XXX: Custom menu items for plugins to hook into.
* backend_sidebar_entries_event_display_profiles
* backend_staticpages_insert
* backend_staticpages_showform
* backend_staticpages_update
* backend_templates_configuration_bottom
* backend_templates_configuration_none
* backend_templates_configuration_top
* backend_templates_fetchlist
* backend_templates_fetchtemplate
* backend_templates_globalthemeoptions
* backend_templates_install
* backend_thumbnail_filename_select
* backend_trackback_check
* backend_trackbacks
* backend_updatecomment
* backend_users_add
* backend_users_delete
* backend_users_edit
* backend_view_comment
* backend_wysiwyg
* backend_wysiwyg_nuggets
* cronjob
* cronjob_XXX: Executed on cronjob interval, i.e. cronjob_5min, cronjob_30min, ...
* entry_groupdata
* fetch_images_sql
* fetchcomments
* frontend_calendar
* frontend_display:html_layout
* frontend_display:rss-1.0:once
* frontend_display:html:per_entry
* frontend_display_cache
* frontend_entries_rss
* frontend_entryproperties
* frontend_entryproperties_query
* frontend_fetchentries
* frontend_fetchentry
* frontend_generate_plugins
* frontend_media_showitem
* frontend_media_showitem_init
* frontend_rss
* frontend_saveComment
* frontend_saveComment_finish
* frontend_sidebar_plugins
* frontend_xmlrpc
* media_getproperties
* media_getproperties_cached
* media_showproperties
* plugin_dashboard_updater
* quicksearch_plugin

### Creating new event hooks

If there is an event hook missing in the current Serendipity code, a single line is sufficient to add new events. Please let our developers know when you think a specific event is missing (**TODO: Link to "Contributing"**).

## Themes

Historically, Serendipity used the term "Theme", "Template" or "Style" to express the same term. We have tried to completely remove the term "Style", and now use "Theme" to describe a collection of single smarty template files.

So whenever we say "Theme", we mean that what an end-user selects to affect output. And when we say "Template", we refer to an actual, single file.

Our themes are built upon single Smarty template files. Each file is responsible for a specific aspect of frontend or backend display. Serendipity implements both frontend and backend themes, so that you can basically build your own backend. The drawback to building a custom backend of course is, that anytime we add new functionality, we only add this to our internal default theme. We suggest to only make visual changes on the CSS side of things, unless you know what you are doing.

**TODO: Template API (xml, php alternatives)

### Supported filenames

**TODO**

### config.inc.php
**TODO**
**TODO: Plugin hooks serendipity_plugin_api_XXX(...)**

### Smarty methods
**TODO: functions_smarty.inc.php, serendipity_smarty_class.inc.php**

### "Fallback"-Chaining, Default-Templates

**TODO**

### user.css (frontend and backend)

### jQuery

**TODO**

### Smarty variables

**TODO: Check all *.php files for "->assign" to get a list
**TODO**

# Database structure / Entity-Relationship Model

The database structure of Serendipity tries to be self-explanatory. Those are the core tables created by serendipity:

## serendipity_authors

Holds the users/authors. Columns are:

* authorid: Primary ID
* realname: The full author name
* username: The loginname
* password: Hashed password
* email: E-Mail
* userlevel: User level (0,1,255) of the user
* right_publish: Whether author is allowed to publish
* hashtype: Used password hash (0: old md5, 1: sha1)
* mail_comments: Configuration option "receive mail notifications for comments"
* mail_trackbacks: Configuration option "receive mail notifications for trackbacks"

## serendipity_groups

Holds the user groups

* id: Primary ID
* Name: Name of the group

## serendipity_groupconfig

Holds ACL configuration data of usergroups

* id: Foreign key of serendipity_groups.id
* property: Property name
* value: Property value

## serendipity_authorgroups

Holds n:m associations for users to groups

* groupid: Foreign key of serendipity_groups.id
* authorid: Foreign key of serendipity_authors.authorid

## serendipity_access

Holds access control lists for any kind of stored data (entries, categories, entries) to indicate which author is allowed to access what. Access is granted on a usergroup level.

* groupid: Foreign key of serendipity_groups
* artifact_id: Foreign key of the item that gets controlled
* artifact_type: Type of the item (entry, category, ...)
* artifact_mode: Read or write
* artifact_index: Possible additional data for an item

## serendipity_comments

Holds the comments to entries

* id: Primary ID
* entry_id: Foreign key of serendipity_entries.id
* parent_id: For threaded comments holds the foreign key of serendipity_comments.id
* timestamp: Time of the comment
* title: Title of a comment (trackbacks)
* author: Author of a comment
* email: E-Mail of the comment's author
* url: URL of the comment
* ip: IP of the comment's author
* body: The comment body
* type: Comment type (trackback, comment, pingback)
* subscribed: Whether the comment's author wants subscription notifications of more comments
* status: Whether the comment is approved/pending
* referer: URL of the referrer

## serendipity_entries

Holds the blog entries

* id: Primary ID
* title: Entry title
* timestamp: Entry timestamp
* body: Entry body
* comments: Number of comments for this entry
* trackbacks: Number of trackbacks for this entry
* extended: Extended entry body
* exflag: Boolean to indicate if entry has extended body
* author: Name of the entry's author
* authorid: Foreign key to serendipity_authors.id
* isdraft: Boolean to indicate if entry is a draft
* allow_comments: Boolean to indicate if comments are allowed
* last_modified: Timestamp of last modification
* moderate_comments: Boolean to indicate if comments are moderated

## serendipity_references

Holds parsed references within a blog entry

* id: Primary ID
* entry_id: Foreign key to serendipity_entries.id
* link: The link that is references
* name: Link title
* type: Link type

## serendipity_exits

Holds external URLs that are captured through exit tracking

* entry_id: Foreign key to serendipity_entries.id where the URL was linked from
* day: Timestamp of when a link was clicked
* count: Number of clicks
* scheme: URL scheme
* host: URL host
* port: URL port
* path: URL path
* query: URL query part

## serendipity_referrers

Holds external URLs that reference to blog entries

* entry_id: Foreign key to serendipity_entries.id where the URL was linked to
* day: Timestamp of when a link was incoming
* count: Number of clicks
* scheme: URL scheme
* host: URL host
* port: URL port
* path: URL path
* query: URL query part

## serendipity_config

Holds the central serendipity configuration options

* name: Name of the config option
* value: Value of the config option
* authorid: 0 if global, or reference to the authorid that the configuration option is valid for

## serendipity_options

Holds template options.

* name: Name of the config option
* value: Value of the config option
* okey: Key/ID of the template the config option belongs to

## serendipity_suppress

Holds URLs that are blocked from exit-tracking

* ip: Incoming IP
* scheme: URL scheme
* host: URL host
* port: URL port
* path: URL path
* query: URL query part
* last: Last access

## serendipity_plugins

Holds the list of enabled plugins

* name: Name of the plugin
* placement: Type of plugin (event, sidebar, hidden, ...)
* sort_order: Sort order ID of the plugin
* authorid: Owner of the plugin
* path: Path to plugin directory

## serendipity_category

Holds the categories of a blog.

* categoryid: Primary ID
* category_name: Category name
* category_icon: A category icon
* category_description: Description of Category
* authorid: Owner of category
* category_left: Nested Set ID of next category for hierarchy
* category_right: Nested Set ID of previous category for hierarchy
* parentid: Parent category for hierarchy
* sort_order: Sort order of a category within parent hierarchy
* hide_sub: Boolean whether subcategories are hidden

## serendipity_images

Holds media items of the database

* id: Primary ID
* name: Name of media file
* extension: Extension of media file
* mime: Mime-Type of media file
* size: Filesize
* dimensions_width: Image dimensions (width)
* dimensions_height: Image dimensions (height)
* date: Upload date
* thumbnaul_name: Thumbnail extension name
* authorid: Owner of media file
* path: Storage directory of media file
* hotlink: Whether media file is hotlinked (comes from foreign server)
* realname: Full media file

## serendipity_entrycat

Holds n:m associations of entries to categories

* entryid: Foreign key to serendipity_entries.id
* categoryid: Foreign key to serendipity_category.categoryid

## serendipity_entryproperties

Holds additional entry properties

* entryid: Foreign key to serendipity_entries.id
* property: Property name
* value: Property value

## serendipity_mediaproperties

Holds additional properties of media files

* mediaid: Foreign key to serendipity_images.id
* property: Property name
* property_group: Property main group
* property_subgroup: Property sub group
* value: Property value

## serendipity_permalinks

Holds the created permalinks for articles, authors and categories for lookup purposes.

* permalink: The URL
* entry_id: The ID of an item
* type: The typ eof an item (entry, author, category, ...)
* data: Additional data

## serendipity_plugincategories

Holds categorization information for available plugins

* class_name: Plugin class name
* category: Name of category the plugin belongs to

## serendipity_pluginlist

Holds information about all available plugins

* plugin_file: Plugin filename
* class_name: Plugin class name with identifier
* plugin_class: Normal plugin class name
* pluginPath: Directory for plugin file
* name: Name of plugin
* description: Description of plugin
* version: Version of plugin
* upgrade_version: Repository version of plugin
* plugintype: Type of plugin (event/sidebar)
* pluginlocation: storage location of plugin
* stackable: Whether plugin is installable multiple times
* author: Author of plugin
* requirements: Installation requirements
* website: Author of plugin
* last_modified: Time of last plugin update

# Coding Gudelines

Serendipity has been around since 2002, and code has been gradually built upon the same core. This has advantages (stability, adaptibility, compatibility), and also disadvantages ("old flair", mixed code patterns).

Most notably it shows that Serendipity does not use specific object-oriented patterns (asside from the Plugin API), and adheres to functional approaches. This has the advantage of being really easy to understand and read.

This also means, we only have a few strict rules:

* Use 4 spaces to indent code
* Put opening braces on the same line like the preceding logic, put closing braces on a new line:
```
if (condition) {
    // code
}

function serendipity_function($var1, $var2, $var3) {
    // code
}    
```
* Add spaces after commas, add spaces before and after string concatenation ($var = $var1 . $var2)
* Use easy-to-read IF-statements, try to only use ternary IFs where it's well readable
* Use single-quotes for array keys and strings
* Indent SQL statements with newlines for readability
* Add phpDoc style inline code documentation for function parameters etc.
* Prefix framework function names with serendipity_ and after that, use camelCase naming
* Try to use camelCase naming for new variables (currently, there is a mixture of function/variable names with underscore characters and camelCasing)
* Always escape HTML output of unsafe user input with serendipity_specialchars()
* Always escape database input of unsafe user input with either implicit typecasting (int)$_REQUEST['var'] or serendipity_db_escape_string()
* Write database-agnostic standard SQL wherever possible; if you require database-specific SQL, add codeforks with a switch($serendipity['dbType']) statement.
**TODO: Check for more coding guidelines**