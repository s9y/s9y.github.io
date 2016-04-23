---
layout: docs
title: Code primer
---

<h2>Code primer</h2>

* TOC
{:toc}

To get started with developing Serendipity, here's a few things to get you kickstarted.

The first thing you need is an installation of Serendipity, and FTP/SSH/file access to that installation. It's easy to setup a local Apache server with PHP and MySQL on all Linux, MacOS or Windows systems. Of course the best thing would be if you use github to check out our core code, so you can easily contribute patches or update your installation to the latest code version.

Now here are the most basic concepts you need to know. Those assume you have some basic PHP knowledge, and you are comfortable with reading the PHP code of the files alongside. The best way is always learning-by-doing when working with an existing system, so our goal is not to teach you all the basics - but rather to get you to know the basic workflows, so that you can check them out easily on your own, and know where to find what.

All our core PHP functions (serendipity_XXX) have phpDoc style comments which explain the parameters and functionality of each function, so be sure to read those. We currently have no automatted Code documentation, but you should be able to use any phpDoc compiler on our code yourself.

### The "core"

#### Initializing the Framework: serendipity_config.inc.php and serendipity_config_local.inc.php

The user configuration for the most basic settings required to start the framework lies in **serendipity_config_local.inc.php**. It sets up the basic array **$serendipity**, and configure database credentials and the used Serendipity version.

The file **serendipity_config.inc.php** is the heart of our framework. It sets default variables, checks the PHP environment, loads the user configuration, includes the required files.

Whenever you want to do "something" with the Serendipity framework, all you need to do is include that file **serendipity_config.inc.php** in your code, and you can immediately access most of the Serendipity function calls, like this:

    <?php
    include 'serendipity_config.inc.php';
    $entries = serendipity_fetchEntries();
    print_r($entries);
    ?>

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
* $serendipity['useHTTP-Auth']: If enabled (on by default, requires mod_php), users can log in to the blog by specifying user/password in the URL like `http://user:password@example.com/serendipity_admin.php` (default true)
* $serendipity['cacheControl']: (default true)
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

#### .htaccess

This file holds simple, central mod_rewrite RewriteRules (when URL-Rewriting is enabled) to match all permalink patters back to index.php (see the "Routing"-Part below).

#### serendipity.css.php

This file is usally called through the URL RewriteRules, and dynamically assembles the CSS statements for a selected theme as well as all plugins that have distinct CSS output.

#### deployment directory

Serendipity supports the concept of a "shared installation". This keeps Serendipity as a kind of library in a central directory outside the DocumentRoot. Each blog will then only use stub-files which actually include that library file. The deployment-Directory contains exactly those stubs that point back to the library (through simply "include" calls). Note that the file names are exactly those that the core actually uses.

For more information, see [Setting up a shared installation](/docs/users/getting-started/shared-installation.html).

#### Composer / Bundled-Libs

The directory **bundled-libs** holds all of our internally used libraries that ship together with Serendipity. Using composer, we are able to update those libraries (in part). However, note that composer is NOT required to develop with Serendipity, since the libraries are all contained in our source code repository.

We currently bundle:

* **PEAR** for some legacy libraries:
  * **PEAR::Cache** for some easy File/function caching
  * **PEAR::HTTP** for some basic HTTP Request and Response classes
  * **PEAR::Net** for some basic HTTP operations, related to PEAR::HTTP
  * **PEAR::Text** for basic Text/Wiki operations
  * **PEAR::XML** for XML operations
* **Onyx** for RSS parsing
* **simplepie** for advanced Atom and RSS parsing
* **Smarty** for our templating infrastructure
* **composer** for library maintenance
* **katzgrau/klogger**, **psr** as a central low-level logging facility
* **zendframework/zend-db/** as an (optional) database layer intermediate
* **create_release.sh** is the script we use to bundle releases
* **serendipity_generateFTPChecksums.php** is the code used by the create_release.sh to create the **checksums.inc.php* file

#### Internationalization

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

#### Other files and directories

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

#### Database layers

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

The database structure of Serendipity tries to be self-explanatory. For a list of all Serendipity database tables check out our [Database structure documentation](/docs/developers/database.html).

#### Important variables and constants

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

##### Local configuration

* $serendipity['dbNames']: Boolean whether to use "SET NAMES" charset directive in database layer
* $serendipity['uploadPath']: Path to "uploads" directory
* $serendipity['templatePath']: Path to "templates" directory"
* $serendipity['uploadHTTPPath']: URL-path to "uploads" directory
* $serendipity['autodetect_baseURL']: Boolean whether to enable autodetection of HTPP host name
* $serendipity['defaultBaseURL']: When HTTP-Hostname autodetection is turned off, contains the default URL to Serendipity
* $serendipity['indexFile']: Name to index.php (used for [Embedded Installation](/docs/users/getting-started/embedding.html))
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
* $serendipity['enforce_RFC2616']: Boolean whether for RSS feeds Conditional Get may be used (see [Configuration](/docs/users/using/configuration.html#appearance-and-options))
* $serendipity['useGzip']: Boolean whether gzip'ing pages is enabled
* $serendipity['enablePopup']: Boolean whether Popups are used in the frontend (depends on the theme)
* $serendipity['embed']: Boolean whether embedded mode is enabled (see [Configuration](/docs/users/using/configuration.html#appearance-and-options))
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

##### Personal Configuration

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

#### Important API functions

We have created seperate bundles for specific API functions. An overview of most relevant functions and where they are defined can be found here:

[List of Important API functions](/docs/developers/functions.html)

#### Error-Handling

By default, Serendipity sets the PHP error_reporting() to E_ALL without E_NOTICE and E_STRICT to prevent unnecessary PHP error output. When $serendipity['production'] is set to "Debug", E_STRICT errors will be shown.

Serendipity uses a default errorhandler (configured as $serendipity['errorhandler'], by default set to "errorToExceptionHandler" (defined in include/compat.inc.php). This will take care of emitting all error messages, and also ignore specific warnings that can be dealt with.

You can overwrite such an errorhandler in your serendipity_config_local.inc.php file by implementing your own function.

### Frontend-Routing: index.php

All of our frontend routing is performed through the "index.php" file. Its code flow is like this:

1. Load serendipity_config.inc.php to initiate the frontend (load functions, languages, database layers, central configuration, user configuration)
2. Initialize Permalink patterns and lookup routines (serendipity_initPermalinks() and serendipity_permalinkPatterns()).
3. Check what the current URL looks like and perform wanted action, parsing available parameters. Possibly execute plugins
4. Call include/genpage.inc.php to setup the output for the required Smarty templates
5. Initialize Smarty Framework, output template file

Some examples:

#### Archive view

The blog's url http://www.example.com/archives/2019/10/28.html is called by the visitor.

Through the .htaccess file, index.php get assigned to this page call. The index.php file instantiates the Serendipity framework by including the serendipity_config.inc.php file. It sets a view headers and sets up a few variables.

Now the central URL that was called is stored in $uri, and additional parameters (like the date: 2019-10-28) get evaluated and stored in $serendipity['uriArguments'].

Now, multiple regular expressions check the $uri for each possible scenario that could happen. This means, the central PAT_ARCHIVES rule will evaluate true, and execute its workflow.

Inside this if-statement, the $serendipity['uriArguments'] are parsed and operated on, so that possible categories, authors, week formats, pagination numbers or others are recognized. Those variables are stored in parameters like `$serendipity['GET']['page']` (pagination) for example.

In our case, the list only contains "2019", "10" and "28". Those are stored in the variables $year, $month and $day. According to the selected calendar (gregorian or persian) these variables are evaluated and passed along to $ts and $te. Those hold timestamps of the passed date minumum and maximum (here: 2019-10-28 00:00 to 2019-10-28 23:59).

Once all variables are setup, include/genpage.inc.php is called to create the usual frontend view. This file checks based on $serendipity['view'] which output and smarty template files it needs to call, executes possible event plugins that listen on events, and after that, assign all data to the requested smarty template.

This output is then emitted as $data from index.php to the browser.

#### External plugin

The routing for executing a plugin like http://www.example.com/pages/a-pagetitle.html to match a staticpage plugin's output is very similar to the example above.

The difference is that in this case the usual routing in index.php finds no specific pattern, and then goes to the "404" routing view. Once include/genpage.inc.php operates on that page, the plugin API event hook "genpage" is executed. The staticpage plugin has registered this event hook, and performs routines on its database tables to see if there is an entry that matches the currentl url. If that is the case, it adjusts the serendipity output and passes over its content.

### Backend-Routing: serendipity_admin.php

For the Serendipity backend, all HTTP calls are routed through serendipity_admin.php. This file instantiates the Serendipity framework, sets up a couple of variables and then performs a central lookup on the URL GET (or POST) variable ?serendipity[adminModule]=XXX. Before each module is included from the file in include/admin/XXX.inc.php, Serendipity performs permission checks to see if the user is authorized to access the given module.

Each of the modules (see below) performs their specific actions and evaluate the URL variable ?serendipity[adminAction] to see, which action is performed (like creating an entry, updating an entry, viewing entries, etc.).

Each module passes its output and rendering data to a backend smarty template file, which gets saved in $main_content through output-buffering and finally assigns this output to Smarty and displays the admin/index.tpl template file.

#### Backend Modules

The list of modules that are routable are:

* **catgegory.inc.php**: Category management
* **comments.inc.php**: Comment management
* **configuration.inc.php**: Blog configuration
* **entries.inc.php**: Single Entry management
* **entries_ovewview.inc.php**: Entry overview
* **groups.inc.php**: Group / Access mangement
* **images.inc.php**: Media database
* **import.inc.php**: Import/Export
* **maintenance.inc.php**: Maintenance of the blog
* **overview.inc.php**: The central dashboard
* **personal.inc.php**: Personal preferences
* **plugins.inc.php**: Plugin management
* **templates.inc.php**: Theme management
* **upgrader.inc.php**: Upgrader functionality
* **users.inc.php**: User management

#### Importers / Exporters

Serendipity supports importing from a lot of different systems. Each system is handled through a unified process put into their own files in the include/admin/importers/ directory.

Each of those files is named like the system they stem from:

* **b2evolution.inc.php**
* **bblog.inc.php**
* **blogger.inc.php**
* **bmachine.inc.php**
* **geeklog.inc.php**
* **lifetype.inc.php**
* **livejournal.inc.php**
* **moveabletype.inc.php**
* **nucleus.inc.php**
* **nuke.inc.php**
* **old_blogger.inc.php**
* **phpbb.inc.php**
* **pivot.inc.php**
* **pmachine.inc.php**
* **serendipity.inc.php**
* **smf.inc.php**
* **sunlog.inc.php**
* **textpattern.inc.php**
* **voodoopad.inc.php**
* **wordpress-pg.inc.php**
* **wordpress.inc.php**
* **generic.inc.php**: Import through a generic RSS feed

All files simple implement their own Class that extends from Serendipity_Import and uses those methods. A good example is the serendipity.inc.php file for a Serendipity importer.

* getImportNotes: Displays specific information about what the importer does
* Serendipity_Import_Serendipity (Constructor): Defines input GET/POST data as $this->data and popuplates $this->inputFields with a list of configuration options that the importer offers
* validateData: Checks if all fields are popuplated
* getInputFields: Wrapper function to return $this->inputFields (or custom variables)
* import: Central function that is called, can access input data through $this->data.

A class can now implement as many helper functions as it needs; the Serendipity importer uses one method for each kind of metadata it imports: import_cat, import_groups, import_authors and so on. All data is popuplated through another helper function import_table that performs the SQL queries for copying over data.

### Plugins

Serendipity can easily be enhanced by plugins. We have coined two different terms for two kinds of plugins.

**Event-Plugins** are plugins that perform functionality based on events which are "fired" from the core on specific places, like when an entry is displayed, when an entry is saved and so on.

**Sidebar-Plugins** are simple output plugins that are displayed on the frontend of your blog within a sidebar or footer, or header.

Both kinds of plugins can be enabled through the Admin interface, and they can be put into a custom order. For sidebar plugins the order simply visually arranges the output of plugins. For event plugins, the order indicates which plugin gets executed first, which can in turn influence the "pipeline" of plugins coming after that. This is mostly important for Markup plugins that affect the rendering of blog entries: If one event plugin takes care of translating glossary terms to full links, and another plugin is used to mark internal and external links graphically, it would be important the the glossary plugin gets executed first, so that the link-marking plugin can also take care of glossary links. There is no "proper" order of plugins, it all depends on the specific combination of these.

A plugin is defined by the files in the plugins/ subdirectory. Each plugin has its own distinct directory name which must conform to a prefix "serendipity_plugin_XXX" for sidebar plugins and "serendipity_event_XXX" for event plugins. The same name must then be repeated as the filename of the .php file within that directory.

Plugin files within those directories are then only loaded, if you have activated/installed that plugin through the Admin interface.

To see how the plugin files must be coded, please refer to our [Plugin API Documentation](/docs/developers/plugin-api.html).

### Themes

Historically, Serendipity used the term "Theme", "Template" or "Style" to express the same term. We have tried to completely remove the term "Style", and now use "Theme" to describe a collection of single smarty template files.

So whenever we say "Theme", we mean that what an end-user selects to affect output. And when we say "Template", we refer to an actual, single file.

Our themes are built upon single Smarty template files. Each file is responsible for a specific aspect of frontend or backend display. Serendipity implements both frontend and backend themes, so that you can basically build your own backend. The drawback to building a custom backend of course is, that anytime we add new functionality, we only add this to our internal default theme. We suggest to only make visual changes on the CSS side of things, unless you know what you are doing.

A description for how themes are built, which variables they refer to please check the [Theme Documentation](/docs/developers/themes.html).

### Coding Guidelines

Serendipity has been around since 2002, and code has been gradually built upon the same core. This has advantages (stability, adaptibility, compatibility), and also disadvantages ("old flair", mixed code patterns).

Most notably it shows that Serendipity does not use specific object-oriented patterns (asside from the Plugin API), and adheres to functional approaches. This has the advantage of being really easy to understand and read.

This also means, we only have a few strict rules:

* Use 4 spaces to indent code
* Use the proper [versioning](/docs/versioning.html)] on plugins
* Put opening braces on the same line like the preceding logic, put closing braces on a new line:

    if (condition) {
        // code
    }

    function serendipity_function($var1, $var2, $var3) {
        // code
    }

* Add spaces after commas, add spaces before and after string concatenation ($var = $var1 . $var2)
* Use easy-to-read IF-statements, try to only use ternary IFs where it's well readable
* Use single-quotes for array keys and strings
* Indent SQL statements with newlines for readability
* Add phpDoc style inline code documentation for function parameters etc.
* Prefix framework function names with serendipity_ and after that, use camelCase naming
* Try to use camelCase naming for new variables (currently, there is a mixture of function/variable names with underscore characters and camelCasing)
* Always escape HTML output of unsafe user input with serendipity_specialchars()
* If your code/plugin uses administrative tasks in the backend, make sure you use the serendipityFormToken() functions to protect against XSRF.
* Always escape database input of unsafe user input with either implicit typecasting (int)$_REQUEST['var'] or serendipity_db_escape_string()
* Write database-agnostic standard SQL wherever possible; if you require database-specific SQL, add codeforks with a switch($serendipity['dbType']) statement.
* Try to cache results that come from foreign URLs. If your plugins displays an RSS feed, it shouldn't be fetched each execution cycle of the plugin, but rather only every X minutes. Provide a configuration option to let the user configure his own caching period.
* Always abstract any output messages with language constants. Always include an english language file of your plugin.
* If you enhance functionality of a plugin, please add a file called "ChangeLog" documenting changes. If you fix core code or add new functionality in the core, document this in docs/NEWS.
* If you bundle foreign code, make sure you indicate the right licensing of your plugins. By default, a s9y plugin is BSD licensed.
* If your plugin has foreign code dependencies, either include those in the plugin or make sure, your plugin does not bail out with a fatal error otherwise. It should always alarm the user what's missing.
* Closing Words: Take a look at existing plugins. What has worked in the past, might work out for you as a draft for your own plugin.
