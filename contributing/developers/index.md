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

* S9Y_DATA_PATH
* S9Y_INCLUDE_PATH
* S9Y_PEAR_PATH
* IS_installed
* IN_serendipity
* IS_up2date
* PATH_SMARTY_COMPILE
* USERLEVEL_ADMIN (255), USERLEVEL_CHIEF (1), USERLEVEL_EDITOR (0)
* $serendipity['rewrite']
* $serendipity['serendipityPath']
* $serendipity['serendipityHTTPPath']
* $serendipity['baseURL']
* $serendipity['serendipityAuthedUser']
* $serendipity['user']
* $serendipity['email']
* $serendipity['smarty']
* $serendipity['logger']
* **TODO: Describe variables**

Some important URL variables:

* $serendipity['GET']['action']
* $serendipity['GET']['adminAction']
* $serendipity['GET']['searchTerm']
* **TODO: Describe variables, check for more**

On top of that, some global and user-specific configuration is passed through options saved in the database table serendipity_config. Those variables are:

* $serendipity['embed']
* $serendipity['useServerOffset']
* **TODO: List all parameters of include/tpl/config_local|personal.inc.php**
* **TODO: Describe variables, check for more**

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

**TODO:**
* include/functions_entries.inc.php
* include/functions_entries_admin.inc.php
* include/functions_images.inc.php
* include/functions_installer.inc.php
* include/functions_permalinks.inc.php
* include/functions_plugins_admin.inc.php
* include/functions_rss.inc.php
* include/functions_smarty.inc.php: Serendipity Smarty functions, see below
* include/functions_trackbacks.inc.php
* include/functions_upgrader.inc.php
* include/plugin_api.inc.php: Plugin API framework, see below
* include/plugin_api_extension.inc.php: Extended Plugin API framework, see below
* include/serendipity_smarty_class.inc.php: Serendipity Smarty Framework, see below
* include/template_api.inc.php: Template API, see below
* include/genpage.inc.php: Smarty workflow intermediate, see below


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

**TODO: A few examples for entry-detail and entry-overview and 404?**

## Backend (serendipity_admin.php)

**TODO: Core backend**

### Modules: X, Y, ...

**TODO: list include/admin/**

### Importers / Exporters

**TODO: list include/admin/importers/**

## Plugins

**TODO: Describe additional_plugins symlinks!**
**TODO: Plugin-API
	https://www.onli-blogging.de/876/Rohform-eines-Serendipity-Plugins.html 
	https://www.onli-blogging.de/879/Einfuehrung-Serendipity-Plugins-schreiben.html**

Important event hooks:

* frontend_configure
**TODO: Search for hook_event(...) in all Code files**

## Themes

Historically, Serendipity used the term "Theme", "Template" or "Style" to express the same term. We have tried to completely remove the term "Style", and now use "Theme" to describe a collection of single smarty template files.

So whenever we say "Theme", we mean that what an end-user selects to affect output. And when we say "Template", we refer to an actual, single file.

Our themes are built upon single Smarty template files. Each file is responsible for a specific aspect of frontend or backend display. Serendipity implements both frontend and backend themes, so that you can basically build your own backend. The drawback to building a custom backend of course is, that anytime we add new functionality, we only add this to our internal default theme. We suggest to only make visual changes on the CSS side of things, unless you know what you are doing.

**TODO: Template API (xml, php alternatives)

### Supported filenames

**TODO**

### config.inc.php
**TODO**

### Smarty methods
**TODO: functions_smarty.inc.php, serendipity_smarty_class.inc.php**

### "Fallback"-Chaining, Default-Templates

**TODO**

### user.css (frontend and backend)

### jQuery

**TODO**

**TODO**

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