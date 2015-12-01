---
layout: docs
title: Plugin API
---

### TOC

* Plugin API
  * Important event hooks
  * Creating new event hooks

### Plugin API

The general meaning of Plugins for Serendipity is described in the section [Plugins](/contributing/developers/index.md#Plugins) of our "Getting started" documentation.

This page provides more in depth description of the inner workings.

All plugins in Serendipity are objects that are inherited from the base class as defined in `include/plugin_api.inc.php`. This offers the layout of a simple `serendipity_event` or `serendipity_plugin` class. If you extend your plugin from this class, you can customize it with its own methods.

Internally, Serendipity uses the plugin API to get a list of all installed plugins, loads them into one large array, iterates on all plugin files to query their configuration. Through the use of the `serendipity_plugin_api::hook_event()` static method, the core can fire events at a specific part in the code flow.

Once this method is called, it checks the list of all loaded plugins if any plugin is interested to "react" on a given event. If so, the method "hook_event()" of a plugin is executed, and gets passed the $eventData and $addData on which it can operate and return output or modified variables.

Sidebar plugins operate a bit simpler, because basically there only is one single generate_content() method call for when the output of a sidebar plugin is presented.

This might sound more complicated than it is, so let's create the most simple form of a plugin there is:

#### Creating a simple sidebar plugin

1. Create a new directory like "serendipity_plugin_myfirstplugin" in the "plugins" subdirectory of Serendipity. Note that sidebar plugins always need to be prefixed with "serendipity_plugin_"!
2. Create a new file "serendipity_plugin_myfirstplugin.php" in the directory you created earlier. Note that the plugin filename needs to exactly match the directory name.
3. Now use this code for the created file:

    <?php

    // This line makes sure that plugins can only be called from the Serendipity Framework.
    if (IN_serendipity !== true) {
        die ("Don't hack!");
    }

    // Load possible language files.
    @serendipity_plugin_api::load_language(dirname(__FILE__));

    // Extend the base class
    class serendipity_plugin_myfirstplugin extends serendipity_plugin {
      var $title = MYFIRSTPLUGIN_TITLE;

      // Setup metadata
      function introspect(&$propbag) {
        $propbag->add('name', MYFIRSTPLUGIN_TITLE);
      }

      // Return content
      function generate_content(&$title) {
        $title = $this->title;
        echo "Hello world!";
      }
    }
    ?>

4. Now we need a new language file for the constants we refer to (MYFIRSTPLUGIN_TITLE). Create a simple file "lang_en.inc.php" (for the english language) with this content:

    <?php
    @define('MYFIRSTPLUGIN_TITLE', 'This is my first plugin');
    ?>

And that's it for the plugin! You can now log into your plugin configuration management page and install the sidebar plugin. On the frontend, it will simply show you a "Hello world" statement.

Now let's disect the plugin code above:

1. The first thing is a hack-protection code, you can simply copy and paste this in new plugins
2. The second thing is a language loaded. Depending on the language of the blog, it searches for files like "lang_de.inc.php" (also in UTF-8 subdirectory of the plugin) and loads the constants. Also, if falls back to the english language file, which is the only required file you need.
3. Now the extension of the class is done. Note that the name of the plugin class needs to match exactly the name of the file (minus the extension ".php").
4. There is one class member variable $title that holds the title of a plugin, and uses the language constant we defined.
5. Then we have two methods: One is an introspect() method, which sets up several metadata values for your plugin. The other is the generate_content() method which is used for output.

You can use this simply example to extend your plugin to perform any PHP action you like. Of course you can also create as many helper methods inside the class that you will need. You can also include other libraries at this point, and use the full range of Serendipity API methods.

#### Creating a simple event plugin

An event plugin shares many similarities with the setup of a sidebar plugin. To create an event plugin follow these steps:

1. Create a new directory like "serendipity_event_myfirstplugin" in the "plugins" subdirectory of Serendipity. Note that event plugins always need to be prefixed with "serendipity_event_"!
2. Create a new file "serendipity_event_myfirstplugin.php" in the directory you created earlier. Note that the plugin filename needs to exactly match the directory name.
3. Now use this code for the created file:

    <?php

    // This line makes sure that plugins can only be called from the Serendipity Framework.
    if (IN_serendipity !== true) {
        die ("Don't hack!");
    }

    // Load possible language files.
    @serendipity_plugin_api::load_language(dirname(__FILE__));

    // Extend the base class
    class serendipity_event_myfirstplugin extends serendipity_plugin {
      var $title = MYFIRSTPLUGIN_TITLE;

      // Setup metadata
      function introspect(&$propbag) {
        $propbag->add('name', MYFIRSTPLUGIN_TITLE);
        $propbag->add('event_hooks', array('frontend_header' => true));
      }

      // Setup title
      function generate_content(&$title) {
        $title = $this->title;
      }

      // Listen on events
      function event_hook($event, &$bag, &$eventData, $addData = null) {
    	global $serendipity;

        $hooks = &$bag->get('event_hooks');

    	if (isset($hooks[$event])) {
    	  switch($event) {
    	    case 'frontend_header':
    	      echo '<!-- Hello world! -->';
    	      return true;
    	      break;

            default:
    	      return false;
    	    }
    	  } else {
    	   return false;
        }
      }
    }
    ?>

4. Now we need a new language file for the constants we refer to (MYFIRSTPLUGIN_TITLE). Create a simple file "lang_en.inc.php" (for the english language) with this content:

    <?php
    @define('MYFIRSTPLUGIN_TITLE', 'This is my first plugin');
    ?>

And that's it for the plugin! You can now log into your plugin configuration management page and install the event plugin. On the frontend, it will simply show you a "Hello world" comment statement inside the HTML head section.

The thing that differentiates the eventplugin from the sidebar plugin is the central "event_hook" method and an additional property bag attribute "event_hooks" in the introspect() method. This sets up the events on which the plugin listens, and inside the event_hook() method it checks if the currently called hook matches with the one it wants to execute.

You can simply expand the array in the property bag for multiple event hooks; each array key can represent an event hook name. Then in the event_hook() method, you need to enhance the central switch() statement to check for additional hooks.

If you want you can of course create seperate methods for each hook you want to call, if you find that easier to read:

    function event_hook($event, &$bag, &$eventData, $addData = null) {
        global $serendipity;

        $hooks = &$bag->get('event_hooks');

	   if (isset($hooks[$event])) {
	       $this->$event($eventData, $addData);
	       return true;
        } else {
            return false;
        }
    }

    function frontend_header(&$eventData, $addData) {
        // Do something
    }

    function frontend_footer(&$eventData, $addData) {
        // Do something
    }

Note that $eventData is a referenced array which you can write to and modify. The $addData is additional read-only data that certain hooks specify for context or metadata.

Also note that if you want to access the $serendipity array, you will need to import that from the global scope.

#### Creating bundled plugins

As you may have noted due to the naming scheme, you can only put one single plugin into one single directory. So you cannot bundle multiple event plugins in one directory. Also note that Serendipity recursively iterates your plugin directories - so never create a "backup" directory within a plugin with the same directory/filenames like your plugin, because Serendipity will try to load these files.

You can however, bundle one event and sidebar plugin within the same directory, because Serendipity actually only needs the filename to match the classname and can ignore the directory name. We just advise for clarity to name the directories distinctively matching either the sidebar or event plugin name.

With a setup like this you can bundle event and sidebar plugins, because often a plugin provides both event functionality and sidebar functionality. Those plugins can, if they reside in the same directory, access the same language constants and also other central shared classfiles that you can include. In spartacus, the serendipity_plugin_adduser & serendipity_event_adduser plugins are a good example of such a bundled plugin that provides common class names through a "common.inc.php" file.

When creating bundled plugins you can even link them together with a dependencies-property (see below)

#### Structure of serendipity_plugin in detail

Now that the basic groundwork of a plugin is clear, let's build on that and show you what more is available.

##### The introspect($propbag) method

The introspect() method exists so that a plugin can advertise its metadata to the core framework. It gets passed a central serendipity_property_bag() object which is a simple getter/setter object for any kind of storage.

The property bag can hold any kind of metadata:

    $bag = new serendipity_property_bag();

    // Set data:
    $bag->add('version', '1.0-alpha1');
    $bag->add('an array', array(1,2,3));
    // ...

    // Retrieve the data:
    echo $bag->get('version');

Internally serendipity offers those property bag attributes:

* name: A string that indicates the displayed name of the plugin. Should also be set to the $title class member variable, and in the referenced $title variable that is passed to generate_content().
* description: A string that describes the plugin.
* author: A string that describes the authorship
* copyright: A string that describes the used license
* version: A version number (use versions like X.Y.Z); if you contribute a plugin, each following version needs to be "higher" than the one before: After 1.10 follows 1.11 and noot 1.2!
* website: A string that can hold a URL to the author's site
* stackable: If set to TRUE, a plugin can be installed multiple times.
* requirements: Can hold an array with the keys "php", "smarty" and "serendipity" that indicates the minimum version number required to run the plugin.
* groups: Can hold an array with values like "MARKUP", "FRONTEND" etc. that indicate in which group a plugin belongs. A constant like "PLUGIN_GROUP_XXX" needs to exist for the group to be accepted; check the lang/serendipity_lang_en.inc.php file for available matching constants (like IMAGES, MARKUP, ANTISPAM, FRONTEND_FEATURES, ...)
* configuration: Can hold an array of available configuration items.
* Dependencies are registered through the $this->dependencies class member variable (see below)

Note that you can use a property bag to pass along any other kind of variables. The property bag is a temporary storage; it is setup and queries every time the plugin is instantiated; it does not persist on requests. To persist session data, simply use the PHP $_SESSION superglobal array. You can permanently store data through the plugin API's set_config() method, which is described later on.

Here is an example of a completely filled property bag:

    function introspect(&$propbag) {
        $propbag->add('name', MYFIRSTPLUGIN_TITLE);
        $propbag->add('description', 'It does nothing yet!);
        $propbag->add('author', 'Garvin Hicking');
        $propbag->add('copyright', 'GPL');
        $propbag->add('version', '1.0');
        $propbag->add('website', 'http://garv.in/');
        $propbag->add('stackable', true);
        $propbad->add('requirements', array('php' => '5.3.0', 'smarty' => '3.0', 'serendipity' => '2.0'));
        $propbad->add('groups', array('MARKUP', 'FRONTEND_FEATURES'));
        $propbad->add('configuration', array('title', 'subtitle', 'mood'));
        $this->dependencies = array('serendipity_event_myfirstplugin' => 'keep');
    }

##### The generate_content(&$title) method

For sidebar plugins, generate_content() is the central "main" method that returns the output. Note that $title is passed as a referenced variable where you set a plugin's title and can overwrite that variable (or display it).

##### Adding configuration options to your plugin: introspect_config_item(), get_config(), set_config(), validate()

To permanently store configuration inside your plugin, you first need to setup an array of available configuration keys in the introspect() property bag:

    $propbad->add('configuration', array('title', 'subtitle', 'mood'));

When this is done, your plugin needs to define a introspect_config_item() method like this:

    function introspect_config_item($name, &$propbag) {
	   switch($name) {
	       case 'title':
	           $propbag->add('type',        'html');
	           $propbag->add('name',        'Enter the title');
	           $propbag->add('default',     '');
	           break;

	       case 'subtitle':
    	        $propbag->add('type',        'boolean');
    	        $propbag->add('name',        'Should a subtitle (mood) be used?');
    	        $propbag->add('description', 'If this is disabled, the mood is not shown in the output.');
    	        $propbag->add('default',     false);
    	        break;

	       case 'mood':
    	        $propbag->add('type',        'string');
    	        $propbag->add('name',        'What is your mood?');
    	        $propbag->add('default',     "You wouldn't like me when I'm angry.");
    	        break;

	       default:
	    	  return false;
	   }
	   return true;
    }

As you can see, for each configuration option that is available, you can setup a central switch/case structure. Then for each configuration option you setup a configuration property bag that supports a list of options.

The available property keys are actually the same as for theme options, and they are descriped here: [Configuration keys](/documentation/developing/themes.md#Configurationkeys) **TODO: Proper link**.

On top of that, each property bag can also have these keys:

* validate: Allows to validate the input for a configuration option, can be set to: string, words, number, url, mail, path. If none of these matches, the validation is interpreted as a regular expression.
* validate_error: If set, contains a specific error message when validation fails. If not set a generic error message will be displayed when the user saves the configuration.

Inside the plugin (i.e. in the generate_content()) method you can use this code to access the values:

    function generate_content(&$title) {
        echo "Title: " . $this->get_config('title');
        if (serendipity_db_bool($this->get_config('subtitle')) {
            echo "Mood: " . $this->get_config('mood');
        }
        }

Be sure to always wrap serendipity_db_bool() around stored boolean values. Also make sure to escape output with serendipity_specialchars() if you pass through configuration values that shall not be interpreted as HTML!

You can store/overwrite configuration values inside a plugin:

    function generate_content(&$title) {
        $this->set_config('last_run', time());
    }

Those internal configuration values do NOT need to be advertised in the 'configuration' introspection bag, you can use them distinctly.

The values are stored in the serendipity_config database table and prefixed with the name of the plugin that it belongs to. If you need to store large amounts of data, it is better to create your own database tables for a plugin (by using serendipity_db_schema_import("CREATE TABLE...")).

##### More methods for plugins

There are a couple of more methods of the serendipity_plugin class that are called:

###### performConfig(&$bag)

This method is executed when the Serendipity configuration screen of a plugin is displayed. In this you can execute PHP code that should only be executed when configuring the plugin, and not every time the plugin is loaded.

##### install()

THis method is called when the plugin is installed.

##### uninstall()

This method is called when a plugin is uninstalled. You can use it to clean up variables or perform specific tasks.

##### cleanup()

This is called whenever the user saves the configuration and configuration values were updated/saved. You can use that for possible garbage collection.

##### parseTemplate($filename)

This helper method can be called to render a smarty template file inside the plugin directory path.

##### register_dependencies($remove, $authorid)

This is performed when a plugin has dependencies and those related plugins are uninstalled or installed. Usually you should not need to modify this piece of code, but if you have specific dependency management, you can.

##### validate($config_item, &$bag, &$value)

This is the default validation class. It is provided by the Serendipity API and should work for most validation scenarios, but if it doesn't, you can overwrite it.

##### Class member variables

The serendipity_plugin class offers several member variables:

* $instance: Holds the unique instance ID of a plugin
* $protected: If set to "true" only the owner of a plugin can configure it (set for "dangerous" plugins)
* $wrap_class: The CSS class in which a sidebar plugin is wrapped into
* $title_class: The CSS class in which the title of a sidebar plugin is wrapped into
* $content_class: The CSS class in which the content of a sidebar plugin is wrapped into
* $title: The title of the plugin (used for the output)
* $pluginPath: The internal path to the plugin file
* $act_pluginPath: The resolved internal path to the plugin file
* $pluginFile: The plugin filename
* $serendipity_owner: The intial owner of the plugin (who installed it)
* $dependencies: A possible array of dependencies. Each array keys represents a plugin class name, and the value can either be "remove" or "keep", which influences what happens to the bundled plugin when it's siblings are removed.

#### Structure of serendipity_event in detail

The serendipity_event class inherits all methods and class member variables like serendipity_plugin (see above).

It only adds the method:

* event_hook($event, &$bag, &$eventData, $addData = null): Central method to route events (see example)

And this property bag attribute:

* event_hooks: Array of event hooks that a plugin wants to listen on (see example)
* cachable_events: Array of cachable event hooks (usually only for markup text plugins)

#### More examples

##### How to make an event plugin create its own backend menu entries

** TODO: Example on how to create a plugin that hooks in the admin menu via: backend_sidebar_entries_event_display_XXX**

##### How to create an event plugin that performs an action when an entry is saved

** TODO: Example on how to do "smoething" when an entry is saved**

##### How to create an event plugin that transforms entry markup

** TODO: Example on how to create a plugin that does something on Frontend_display

##### How to create an event plugin that shows remote data or its distinct output

** TODO: Example for external_plugin **

#### Important event hooks:

The easiest way to see how to implement any given event hook is to search in the .php files for:
`hook_event('XXX')`

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

##### Other event hooks:

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

#### How to use events in Smarty

You can execute events (also custom ones you created only for your own plugin and theme) easily in Smarty in two ways.

The first way is to simply call an event hook with a function:

    {serendipity_hookPlugin hook="my_custom_event" hookAll="true" data="4711" addData=$someArray}

This would then yield the output of what your plugin that listens on "my_custom_event" outputs.

The second way is to call an event hook that modifies a distinct variable:

    {$entry.title|serendipity_refhookPlugin:'my_markup_transformation':false}

This would then pass along your $entry.title as a parameter for the my_markup_transformation event hook.

#### Creating new event hooks

If there is an event hook missing in the current Serendipity code, a single line is sufficient to add new events. Please let our developers know when you think a specific event is missing (**TODO: Link to "Contributing"**).

### Linking spartacus

You can easily combine the whole spartacus theme and plugin checkouts on your machine. To do that you can for example checkout these repositories to a subdirectory like `templates/spartacus/` and `plugins/spartacus/`. The reason this works is because both the theme and plugin framework of Serendipity can iterate through every subdirectory of the templates/ or plugins/ structure to search for matching plugin/theme files.
