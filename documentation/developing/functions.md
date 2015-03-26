---
title: Important API functions
---

We have created seperate bundles for specific API functions. An overview of most relevant functions and where they are defined can be found here:

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
