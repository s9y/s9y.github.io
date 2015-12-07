---
layout: docs
title: Themes and Smarty Templating
---

## Themes and Smarty Templating

A theme is a collection of single template files, and must be put into the templates/ subdirectory to be available for selection your blog's "Manage Themes" admin section.

Themes can either consist of a Frontend Theme, a Backend Theme or provide both. All styling for the backend is done in a subdirectory "admin" of the theme directory.

### Smarty

Are you afraid of using PHP? Get the shivers of complexity? Don't be afraid: Serendipity uses the Smarty PHP templating system, see (http://www.smarty.net). There you can also find a complete description of how it can be used - it is very easy to lern, has a lower entry barrier that using PHP code, and generally "looks" cleaner und more understandable.

(Sidestep: You are not afraid of using PHP? See below for the "Template API", but bear in mind that Smarty is really comfortable to use and you shouldn't worry about using it. You can place custom PHP code easily in our Plugin API, or even a template's configuration file).

The general idea is easy: Templates should only contain display logic, and not perform actual algorithms. This is called "seperation of concerns". That means, Serendipity is responsible for executing codeflow and assembling variables that are passed to the output layer (Smarty). Smarty then allows a theme author/frontend developer to place those variables in any arrangement they like. They can use loops and logical "IF"-comparisons to perform some minor logic.

This means, Smarty themes are actually mostly HTML files where you can put in special commands or placeholders. Those are quite easy to learn and use:

* Variables are placed through curly brackets and the dollar sign: `{$variable}`
* Arrays can be accessed similar to JavaScript: `{$array.subkey}`
* ... but also simliar to PHP: `{$array['subkey']}`
* Function calls can be executed with curly brackets: `{myFunction param1="something" param2="something else"}`
* IF-queries can be performed: `{if $variable == true}...{/if}`
* Loops can be performed: `{foreach from=$array item="myvalue" key="mykey"}...{/foreach}`
* So called "modifiers" can be stacked to operate on a single variable with the "pipe" sign: `{$variable|escape|lower}`
* Modifers can have parameters: `{$variable|format_date:"%d.%m.%Y"}`

### Fallback templates

A frontend theme can hold multiple files in its directory and define its custom output. Serendipity contains a lot of individual template files (see below), but very often a theme can work with the default template files that are provided by Serendipity.

To make theme directories as small as possible, and as update- and futureproof as possible, we have a sophisticated scheme of fallbacks for files that are not provided by an individual theme.

Let's take the file "entries.tpl" for example. This template file is used in the frontend to display both the list of entries and the view of a single entry.

When your frontend is called and the entries.tpl file should be rendered, Serendipity checks for this file like this:

* First, check if the currently set theme (for example "my_custom_theme") has the file "entries.tpl". If yes: Use that file `templates/my_custom_theme/entries.tpl`.
* Now check the theme's "info.txt" file and see if the theme defined an "Engine: XXX" which specifies the default fallback directory to use. By default, this directory is set to "2k11" - so this file `templates/2k11/entries.tpl`will be returned. If "Engine: bulletproof" would be contained in the file, then `templates/bulletproof/entries.tpl` would be returned.
* If such a file would still not exist, the last fallback is to use `templates/default/entries.tpl`

So make sure that you only copy over those files to your theme directory which you are really going to customize!

### Frontend Themes

The frontend theme is the collection of files that are used to show anything on the content.

The most important files of a theme are these:

#### info.txt

This file is the only required file of a theme directory. It specifies the metadata of a theme. The format of this file is simple and consists of a few "Key: Value" pairs (only one line per key!)

    Name: This is the name of your theme
    Author: This is what is displayed as "author" in the backend
    Date: The creation date of your theme (any format you like, i.e. YYYY-MM-DD)
    Require Serendipity: [VERSION]
    Backend: [BACKEND]
    Engine: [ENGINE]

Every line except "Name:" is optional.

* `[VERSION]` can be replaced with the minimum version of Serendipity that is required to power your theme. Simply set the version number of your current installation where you developed a theme with.
* `[BACKEND]` can hold the string "Yes" if your theme also provides a backend theme. Leave out this line, if no backend is provided
* `[ENGINE]` can hold the string of any theme directory (i.e. "bulletproof", "2k11", "default") to specify, which fallback to use. If not provided, falls back to $serendipity['defaultTemplate'] (2k11).

#### preview.png, preview_fullsize.jpg

These image files represent the thumbnails for the theme. "preview.png" is a small thumbnail (usually around 100-150px wide), while preview_fullsize.jpg is used for a large screenshot.

#### config.inc.php

This is another very central file of a theme, but it is optional. If that file is present, it is included just after Smarty is initialized by the core. This means that this file can use the whole range of Serendipity API functions and extend the Smarty framework with any custom Smarty modifiers or function you would like.

Also, this file is responsible for setting up theme options.

Please make sure that this file always contains those lines at the top:

    <?php
    if (IN_serendipity !== true) {
      die ("Don't hack!");
    }

This ensures that the file can only be called from within the Serendipity framework, and not by outside HTTP calls.

##### Defining custom Smarty functions/modifiers / Executing custom PHP

Since config.inc.php is called after the Smarty framework is initialized, you can easily access `$serendipity['smarty']` to register custom functions:

    <?php
    if (IN_serendipity !== true) {
        die ("Don't hack!");
    }

    // A smarty modifier is a PHP function that operates on the first parameter and returns content.
    function serendipity_smarty_mymodifier($string) {
        return strtolower($string);
        // Simply returns the lowercased version of a string.
    }

    // A smarty function can be called with parameters, and returns content.
    function serendipity_smarty_myfunction($params, &$smarty) {
    	return 'This function has been called with those parameteres: <pre>' . print_r($params, true) . '</pre>';
    	// Simply returns a HTML statement with passed parameteres
    }

    $serendipity['smarty']->registerPlugin('modifier', 'mymodifier', 'serendipity_smarty_mymodifier'
    $serendipity['smarty']->registerPlugin('function', 'myfunction', 'serendipity_smarty_myfunction'

Note that you first need to actually define your functions in the PHP scope, and then you need to use the `$serendipity['smarty']->registerPlugin()` call to make it available to Smarty templates.

* The first parameter to `registerPlugin()` defines whether to make a modifier or a function known.
* The second parameter defines how the function is called in a Smarty template: `{$variable|mymodifier}` or `{myfunction param1="value"}`.
* The third parameter is the actual name of the PHP function that will be called.

Of course you can also use the other Smarty API functions to assign special variables you might need for your theme:

    $serendipity['smarty']->assign('my_ip', $_SERVER['REMOTE_ADDR']);

You can also influence whether the Smarty security should be disabled so that you can use {php} / {include_php} code tags or call any PHP modifiers:

    $serendipity['smarty']->security = false;

If you want to include foreign PHP scripts to show them on your own page, consider using the "External PHP" or "Wrap URL" event plugins available via Spartacus - or of course, creating your own simple PHP Serendipity Plugin. Head over to the Plugin API Docs for more information about this. **TODO:LINK**

##### Using Smarty in entries

The "Markup: Smarty" plugin allows you to insert Smarty markup into your entries, complete with the power Smarty offers you. PHP within entries is not allowed, as it imposes a huge security risk.

Of course you can use the method of a config.inc.php file as described above to register your custom PHP code, which you can then re-use inside your entry code!

So you can declare a my_magic_function() which executes the PHP code you want, and if you register the function inside the config.inc.php file you can re-use it in your entry.

##### Listen on Plugin Hooks

A themes's config.inc.php file can also hook into the Serendipity code flow. Usually this is done only by plugins. Offering this functionality in a theme has the benefit that a user does not require to install additional plugins to perform minor tasks. Also hooking into events like the CSS and JS generation is important for themes.

You can read more about plugin hooks here: **TODO: Link**

To make a theme hook into the "js" hook to add some javascript to the frontend, a function needs to be defined. This is done by a central function called `serendipity_plugin_api_event_hook`:

    if (IN_serendipity !== true) {
        die ("Don't hack!");
    }

    // The parameter order and default values should always look the same:
    function serendipity_plugin_api_event_hook($event, &$bag, $eventData, $addData = null) {
        global $serendipity;

        switch($event) {
            case 'js':
                echo '$(document).ready(function() { console.log("Theme loaded!"); }';
    		    return true;
                break;
        }
    }

For each additional event hook the theme wants to "listen on", you can add multiple cases for those:

    if (IN_serendipity !== true) {
        die ("Don't hack!");
    }

    // The parameter order and default values should always look the same:
    function serendipity_plugin_api_event_hook($event, &$bag, $eventData, $addData = null) {
        global $serendipity;

        switch($event) {
            case 'js':
                echo '$(document).ready(function() { console.log("Frontend-Theme loaded!"); }';
    		    return true;
                break;

            case 'js_backend':
                echo '$(document).ready(function() { console.log("Backend-Theme loaded!"); }';
    		    return true;
                break;
        }
    }

The examples above are trivial, but the usage nearly unlimited. Themes can provide any kind of plugin as internal functionality, even with complete plugin output that hooks into saving entries, offering new frontend functionality and anything else you can think of.

##### Custom Entryproperties

**Using the plugin serendipity_event_entryproperties**

Serendipity allows you to define custom fields within your entry, which you can display within an entry. For that you need to enable the serendipity_event_entryproperties plugin.

That means, you can create two custom fields called Listening and Playing (don't use whitespace or special characters for fieldnames). Create an entry, and fill in values for those two fields. Now edit your entries.tpl template and place the Smarty Codes

    Now listening to: {$entry.properties.ep_Listening}
    Now playing: {$entry.properties.ep_Playing}

anywhere you like inside the entry loop. Remember to prefix your property keyname with ep_. Then you'll see those fields at the place you configured. You can also add the usual Smarty markup to check if a variable is empty, and add some DIV or other tags to surround your output.

Now if you don't want to show actually fixed customFields of an entry, but instead make your own plugin insert stuff at that place, you can do that either by the custom function calls mentioned above, or by making your plugin alter the $entry['properties'] array to inject new content.

Your plugin can just hook into one of the events where entries are fetched ('entry_display' or 'frontend_display' or even 'frontend_entryproperties') and then just set your $eventData property index to what you want to be displayed later on. As your template already contains the display code from above, it will just pick up the new $entry['properties'] data from your custom plugin and show it, just as if you entered it on the entry creation screen.

**Using a theme's entryproperties**

Also, a theme can define a set of custom entryproperties on its own, using the customized event hooks described above.

To do that, you place this code in the config.inc.php file. The code consists of three parts: A helper function to get custom options, a helper function to set custom options, and the helper function to hook into plugin output to display the input form in the backend.

The code below integrates the custom entry property fields "entry_subtitle" and "entry_specific_header_image", which are later available in the Smarty file as `{$entry.properties.entry_subtitle}` and `{$entry.properties.entry_specific_header_image}`.

    <?php
    // Save custom field variables within the serendipity "Edit/Create Entry" backend.
    //                Any custom variables can later be queried inside the .tpl files through
    //                  {if $entry.properties.key_value == 'true'}...{/if}

    // Function to get the content of a non-boolean entry variable
    function entry_option_get_value($property_key, &$eventData) {
        global $serendipity;
        if (isset($eventData['properties'][$property_key])) return $eventData['properties'][$property_key];
        if (isset($serendipity['POST']['properties'][$property_key])) return $serendipity['POST']['properties'][$property_key];
         return false;
    }

    // Function to store form values into the serendipity database, so that they will be retrieved later.
    function entry_option_store($property_key, $property_val, &$eventData) {
        global $serendipity;

        $q = "DELETE FROM {$serendipity['dbPrefix']}entryproperties WHERE entryid = " . (int)$eventData['id'] . " AND property = '" . serendipity_db_escape_string($property_key) . "'";
        serendipity_db_query($q);

        if (!empty($property_val)) {
            $q = "INSERT INTO {$serendipity['dbPrefix']}entryproperties (entryid, property, value) VALUES (" . (int)$eventData['id'] . ", '" . serendipity_db_escape_string($property_key) . "', '" . serendipity_db_escape_string($property_val) . "')";
            serendipity_db_query($q);
        }
    }

    function serendipity_plugin_api_event_hook($event, &$bag, &$eventData, $addData = null) {
        global $serendipity;

        // Check what Event is coming in, only react to those we want.
        switch($event) {

            // Displaying the backend entry section
            case 'backend_display':
                // INFO: The whole 'entryproperties' injection is easiest to store any data you want. The entryproperties plugin
                // should actually not even be required to do this, as serendipity loads all properties regardless of the installed plugin

                // The name of the variable you want to support
                $entry_subtitle_key = 'entry_subtitle';
                $entry_specific_header_image_key = 'entry_specific_header_image';

                // Check what our special key is set to (checks both POST data as well as the actual data)
                $is_entry_subtitle = (function_exists('serendipity_specialchars') ? serendipity_specialchars(entry_option_get_value($entry_subtitle_key, $eventData)) : htmlspecialchars(entry_option_get_value($entry_subtitle_key, $eventData), ENT_COMPAT, LANG_CHARSET));
                $is_entry_specific_header_image = entry_option_get_value ($entry_specific_header_image_key, $eventData);

                // This is the actual HTML output on the backend screen.
                echo '<div class="entryproperties">';
                echo '  <input type="hidden" value="true" name="serendipity[propertyform]">';
                echo '  <h3>' . THEME_ENTRY_PROPERTIES_HEADING . '</h3>';
                echo '      <div class="entryproperties_customfields adv_opts_box">';
                echo '          <h4>' . THEME_CUSTOM_FIELD_HEADING . '</h4>';
                echo '          <span>' . THEME_CUSTOM_FIELD_DEFINITION . '</span>';
                echo '          <div class="serendipity_customfields clearfix">';
                echo '              <div class="clearfix form_area media_choose" id="ep_column_' . $entry_subtitle_key . '">';
                echo '                  <label for="'. $entry_subtitle_key. '">' . THEME_ENTRY_SUBTITLE . '</label>';
                echo '                  <input id="entrySubTitle" type="text" value="' . $is_entry_subtitle . '" name="serendipity[properties][' . $entry_subtitle_key . ']" style="width: 100%;">';
                echo '              </div>';
                echo '          </div>';
                echo '          <div class="serendipity_customfields clearfix">';
                echo '              <div class="clearfix form_area media_choose" id="ep_column_' . $entry_specific_header_image_key . '">';
                echo '                  <label for="' . $entry_specific_header_image_key . '">' . THEME_ENTRY_HEADER_IMAGE. '</label>';
                echo '                  <textarea data-configitem="' . $entry_specific_header_image_key . '" name="serendipity[properties][' . $entry_specific_header_image_key . ']" class="change_preview" id="prop' . $entry_specific_header_image_key . '">' . $is_entry_specific_header_image . '</textarea>';
                echo '                  <button title="' . MEDIA . '" name="insImage" type="button" class="customfieldMedia"><span class="icon-picture"></span><span class="visuallyhidden">' . MEDIA . '</span></button>';
                echo '                  <figure id="' . $entry_specific_header_image_key . '_preview">';
                echo '                      <figcaption>' . PREVIEW . '</figcaption>';
                echo '                      <img alt="" src="' . $is_entry_specific_header_image . '">';
                echo '                  </figure>';
                echo '              </div>';
                echo '          </div>';
                echo '      </div>';
                echo ' </div>';

                break;

            // To store the value of our entryproperties
            case 'backend_publish':
            case 'backend_save':
                // Call the helper function with all custom variables here.
                entry_option_store('entry_subtitle', $serendipity['POST']['properties']['entry_subtitle'], $eventData);
                entry_option_store('entry_specific_header_image', $serendipity['POST']['properties']['entry_specific_header_image'], $eventData);
                break;
        }
    }
    ?>

##### Theme Options

A theme can offer complex configuration for any kind of options. Those can be evaluated by the template files and affect anything from custom header images up to different entry listings or magazine-style themes.

The theme configuration is actually a lot like the configuration offered by plugins, from both a developer as well a user standpoint.

Theme options are defined in the config.inc.php file of a theme, and are listed in an array `$template_config`. Each array key represents one configuration option, and each configuration option has a subset of specific keys that describe how it is configured.

The "var" type of each array indicates the name that you can later use to access a template option like this: `{$template_option.layouttype}`.

An example (copied from the bulletproof theme):

    $template_config = array(
       array(
    		'var'           => 'infobp',
    		'name'          => 'infobp',
    		'type'          => 'custom',
    		'custom'        => USER_STYLESHEET,
        ),
        array(
            'var'           => 'layouttype',
            'name'          => LAYOUT_TYPE,
            'type'          => 'select',
            'default'       => '3sbs',
            'select_values' => array('3sbs' => LAYOUT_SBS,
                                     '3bss' => LAYOUT_BSS,
                                     '3ssb' => LAYOUT_SSB,
                                     '2sb'  => LAYOUT_SB,
                                     '2bs'  => LAYOUT_BS,
                                     '1col' => LAYOUT_SC,
                                     '2sbf' => LAYOUT_SBF,
                                     '2bsf' => LAYOUT_BSF)
        ),
        array(
            'var'           => 'jscolumns',
            'name'          => JAVASCRIPT_COLUMNS,
            'type'          => 'boolean',
            'default'       => 'false',
        ),
        array(
            'var'           => 'addthisaccount',
            'name'          => ADDTHIS_ACCOUNT,
            'type'          => 'string',
            'default'       => '',
        ),
        array(
        	'var'			=> 'example_radio',
        	'name'          => 'An example radio button',
        	'type'          => 'radio',
        	'value'         => array('first', 'second', 'third'),
        	'desc'          => array('The first option', 'The second Option', 'The Third Option');
        	'per_row'       => 1
        )
    );

##### Configuration keys

This example defines four different configuration options. Each configuration option has a specific variable name, a title displayed for the user, an indicator of what type it is, and its available options. Those are defined by these array keys:

* **var**: Defines what variable name is later used so that you can check for it in the Smarty template files. `'var' => 'layouttype'` would later be accessible as `{$template_option.layouttype}` in the index.tpl file for example.
* **name**: This is the string that gets displayed to the user when configuring the theme option. Usually it holds a CONSTANT that is defined in a language file (see below)
* **default**: Defines the default value when the user has not yet entered his own
* **type**: Specifies, how your option shall be shown to the user. There are several types available, each of those can offer additional required array keys to the base configuration array:
  * **select**: Offers a select menu.
    * The values that are available need to be defined in a **select_values** array key (see example).
    * The size of the select field can be changed with the **select_size** array key
  * **multiselect**: Like the select menu above, but with multiselection.
  * **seperator**: Emits a simple seperator
  * **tristate**: Offers a "YES", "NO", "USE DEFAULT" radio-selection
  * **boolean**: Offers a "YES, "NO" radio-selection
  * **radio**: Offers a radio-selection. The available values need to be defined in the **value** array key, the matching descriptions in a **desc** array key. The **per_row** key defines how many radio buttons are displayed on a single row in the configuration.
  * **string**: Offers a single line input text field
  * **html**: Offers a textarea input field. Number of rows can be defined with **rows** array key. When WYSIWYG editor is enabled, this is shown a a WYSIWYG field.
  * **text**: Offers a textarea input field. Number of rows can be defined with **rows** array key. No WYSIWYG editing available.
  * **content**: Can be used to emit any kind of HTML on the configuration backend. The HTML is stored in the **default** array key. This is used for information output.
  * **custom**: Can be used to emit any kind of HTML on the configuration backend. The HTML is stored in the **default** array key. This is used to store custom values.
  * **hidden**: Can be used to store a hidden HTML input field. The value is fetched from the **value** array key.
  * **media**: Can be used to retrieve a media file location. Array keys **preview_width** and **preview_height** indicate image size.
  * **sequence**: Can be used for a re-orderable widget with multiple values. For an exmample, check out the `serendipity_event_entryproperties` plugin which uses this configuration item.
    **checkable**: If set to true, each ordered widget can be enabled/disabled. When set, retrieving the option later will only list those widgets that were checked. If not set, all available values will always be returned (in the order the user indicated)
    **values**: Defines an array that uses a unique key for its configuration and as the value it holds a sub-array with the key 'display' to provide the HTML output for each re-orderable widget.

(when selected) Values can be: select, tristate, boolean, radio, string, html, hidden.
  * When using the "select"

The configuration array is processed through `ìnclude/functions_plugins_admin.inc.php`, `serendipity_plugin_config()` if you want to see how these arrays are checked. The output of the configuration items is done by the `admin/plugin_config.tpl` file (which also calls `admin/plugin_config_item.tpl` for each item).

##### Advanced theme options: Theme option groups

Theme options can also be put into specific groups. To do this, define an array like this in your `config.inc.php` file of the theme:

    $template_config_groups = array(
        THEME_COLORSET  => array('colorset', 'layouttype', 'jscolumns'),
        THEME_HEADER    => array('custheader', 'headerimage', 'headertype')
    );

The array key definesthe theme option group name which gets displayed for the user. The array value defines an array of defined theme options you want to have in that group. Those array values corellate with the name of the theme options that are defined in `$template_config`.

##### Advanced theme options: Central navigation

Serendipity offers an "add-in" for each template config, if you want to offer menu items. To enable this, you need to make Serendipity recognize your custom theme options and merge them with global theme options.

This sounds more complicated that it is; simply add those lines after you have defined `$template_config`:

    // Setup an array to indicate which global theme options should be merged.
    $template_global_config = array('navigation' => true);

    // Load the current configuration of the defined theme options and parse them into a helper array
    $template_loaded_config = serendipity_loadThemeOptions($template_config, $serendipity['smarty_vars']['template_option']);

    // Now merge the loaded configuration with the additional global configuration:
    serendipity_loadGlobalThemeOptions($template_config, $template_loaded_config, $template_global_config);

Currently only the **navigation** global option is supported, but there might be more in the future. Plus, plugins might provide more global theme options through the use of an event hook we placed for future compatibility.

Internally, serendipity_loadGlobalThemeOptions() simply appends a predefined set of configuration keys to the central array.

##### Internationalization

Just like plugins, you can make a theme available in multiple languages. For that, you need to define custom translation constants. Create a file like `lang_en.inc.php` in the theme's directory and put in the usual PHP deifnitions:

    <?php
    @define('MY_THEME_OPTION', 'This is my theme option');
    ?>

Now you need to load this language file in your theme's `config.inc.php` file:

    $probelang = dirname(__FILE__) . '/' . $serendipity['charset'] . 'lang_' . $serendipity['lang'] . '.inc.php';

    if (file_exists($probelang)) {
        include $probelang;
    }

    include dirname(__FILE__) . '/lang_en.inc.php';

Those lines ensure that a language file of the current user language is loaded (if it exists!), and also the english file is ALWAYS loaded as a fallback.

If you now provide a translation for german, you would add a file `lang_de.inc.php` with this content:

    <?php
    @define('MY_THEME_OPTION', 'Dies ist meine Theme-Option');
    ?>

and save that file also in the UTF-8 subdirectory (the base file should be encoded in ISO-8859-1). Serendipity will automatically now pick up that file.

##### Theme Sidebars

The variable `$sidebars` inside a `config.inc.php` defines an array of which sidebars a theme offers. By default Serendipity provides "left", "right" and "hidden". Themes can use this to define specific "footer" and "header" sidebars for example:

    $serendipity['sidebars'] = array('left','right','hidden','footer','header');

The plugin manager interface will show one column for each of the configured sidebars, so that people can move around plugins from one to the other location.

Note that no spaces are allowed in sidebar names, and no sidebar name may be longer than 6 characters.

If you want that users are able to define their own sidebars dynamically, you can simply add a string-type theme option to your list:

    $template_config['sidebars'] = array(
        'var'           => 'sidebars',
        'name'          => 'Which sidebars to use?',
        'type'          => 'string',
        'default'       => 'left,right,hidden',
    )

#### Specific FRONTEND theme files and their meaning

Each of those files is not mandatory in your theme directory. If you want to adapt it, you should copy it over from the 2k11 directory. Only copy over the files you actually change, so that the fallback-chain can work properly (see above).

##### atom.css

Stylesheet applied to ATOM feeds

##### style_fallback.css

It emits CSS rules that all templates should have and is supplied in the templates/default/ subdirectory.
Classes are declared on top of the file, so if you  want to make changes in your own template, you should override the rules on the bottom of your own style.css template.
It is not advised to create your own  style_fallback.css file.

##### style.css

This is the custom CSS of your theme. If you do not write a theme from scratch, it is advised to use tools like Firebug or Developer Tools to inspect the HTML layout of a page to be able to style it properly.

##### user.css

This file can be used by actual users of your theme. This is where users shall place custom CSS rules that enhance a theme. Theme developers shall NOT bundle such a file, because the file is meant to survive updates of a theme when overwriting a directory with a newer version.

##### commentform.tpl

This file controls the look of your comment form where visitors can comment on your entries.

##### commentpopup.tpl

This controls the basic HTML layout of the optional comment popup window.

##### comments.tpl, trackbacks.tpl

This shows the available comments and trackbacks made to an entry.

##### comments_by_author.tpl

This controls the layout of the functionality where comments by visitors are shown.

##### content.tpl

This is a master template that holds your page content area, and depending on the page type (entries overview, entry search, archive page, ...) emits different messages.

##### entries_archives.tpl

This file holds the display of entry archives (per month / year).

##### entries_summary.tpl

This file displays the overview of entry archives (per month/year).

##### feed_*.tpl

These files hold the various RSS/Atom feed template files. Here you could add customization to those feeds.

##### index.tpl

This is the main template file that controls the general look of your page as well as HTML headers, meta tags, CSS embedding, sidebar locations etc.

##### entries.tpl

This is the main logic file and it tells Serendipity how to format your entry overview, how to loop entries, where to show commentsforms etc.

##### plugin_calendar.tpl, plugin_categories.tpl, plugin_staticpage.tpl

Some plugins allow their own templating. Those files are prefixed with "plugin_" and can also come with certain plugins. Putting those files into your template directory will customize the look of that plugin within your theme. The files available by default for bundled plugins are for the Calendar and Categories sidebar plugins. You first need to enable the templating option in the configuration of those plugins, though!

##### preview_iframe.tpl

When you create a preview from within the admin interface, this file controls the basic look of the embedded iframe holding the preview. You need to adapt this file if your preview looks odd/off.

##### sidebar.tpl

This file controls how the list of sidebar plugins is displayed in the frontent.

##### media_showitem.tpl

If a media database file is shown in the frontend, this file controls its layout.

##### img/ subfolder and others

Of course your theme can hold its own assets and javascript file. You can put them anywhere you like. Most themes use a "js" and "img" subdirectory.

Most notably the files back.png/forward.png (for calendar icons) and xml.gif (RSS feed icons) are fetched from this directory by many plugins.

**Custom emoticons**

The Serendipity Emoticate plugin allows to transform usual emoticon texts to graphics. You may want to tweak those to match your template look.

To customize smilies with individual images from a theme, you can create the file 'emoticons.inc.php' inside this theme directory and use an array like this:

    <?php
       $serendipity['custom_emoticons'] = array(
         ":'("  => serendipity_getTemplateFile('img/cry_smile.gif'),
         ':-)'  => serendipity_getTemplateFile('img/regular_smile.gif'),
         ':-O'  => serendipity_getTemplateFile('img/embaressed_smile.gif'),
         ':O'   => serendipity_getTemplateFile('img/embaressed_smile.gif')
        );
    ?>

This will override the default list of emoticons set inside the file plugins/serendipity_event_emoticate/serendipity_event_emoticate.php and use the ones you created for your template.

Alternatively, you can also simply deliver a set of image files that match the default image file names.

##### jQuery

**TODO: @yellowled, I don't remember, how do we actually use jquery in the frontend? We're not bundling it, only in the backend? Write something here :) **

#### Smarty methods

Serendipity offers a list of custom Smarty methods and functions that can be used by the template files. They are defined in the serendipity_smarty_init() function inside include/functions_smarty.inc.php.

##### Smarty modifiers

The name in brackets is the PHP function that is called and defined in include/functions_smarty.inc.php, the bold name is how you actually call the modifier in Smarty with `{$variable|@makeFilename}` for example.

The first parameter is always the variable that the modifier gets applied to.

* **makeFilename** (serendipity_makeFilename): Transform a string into a URL-compatible string. A second parameter indicates if also dots (.) shall be removed from the string.
* **emptyPrefix** (serendipity_emptyPrefix): Check if a string is not empty and prepend a prefix in that case. Else, leave empty. Second parameter is a prefix.
* **formatTime** (serendipity_smarty_formatTime): Formats a timestamp. Second parameter is the strftime-compatible placeholder, third parameter whether timezone offsets are calculated, fourth parameter whether valid unix timestamps are checked, fifth parameter indicates if the `date` PHP function shall be used instead of `strftime`.
* **serendipity_utf8_encode** (serendipity_utf8_encode): UTF-8 encodes a string (if not already in UTF-8 charset)
* **ifRemember** (serendipity_ifRemember): Returns a cookie-stored variable. Second parameter controls default value, third parameter whether a default is specified, fourth parameter whether a value is stored in a radio-selectbox.
* **checkPermission** (serendipity_checkPermission): Checks if the author has specific permissions. Second parameter can specify a different author id than the currently logged in author, third parameter is whether all permission groups of a user are returned.
* **serendipity_refhookPlugin** (serendipity_smarty_refhookPlugin): Executes a plugin API event and specifies `$eventData` as a parameter. Second parameter is the hook to execute, third parameter possible additional Data `$addData`.
* **serendipity_html5time** (serendipity_smarty_html5time): Returns a timestamp in valid HTML5 format
* **rewriteURL** (serendipity_rewriteURL): Return a permalink for a given permalink type. Second parameter indicates if the full URL or only a relative path is returned, third parameter indicates if possible URL-rewriting shall be discarded.

##### Smarty functions

Smarty functions are meant to be executed on their own and will return their content at the place of where you put the function call. In distinction to smarty modifieres, function calls are executed with exact parameters and cannot be "stacked" upon each other like a `{$variable|modifier1|modifier2|...}` call.

The name in brackets is the PHP function that is called and defined in include/functions_smarty.inc.php, the bold name is how you actually call the function in Smarty with `{serendipity_printSidebar param1="value" param2="value" ...}` for example. The list of parametes is indented below.

* **serendipity_printSidebar** (serendipity_smarty_printSidebar): Prints the list of sidebar plugins.
  * side: The name of the sidebar, i.e. "left", "right", "hidden"
  * template: The name of the Smarty template file to render a plugin with (default: "sidebar.tpl")
  * **EXAMPLE**: `{serendipity_printSidebar side="left|right|hidden|*" template="yourtemplate.tpl"}`
* **serendipity_hookPlugin** (serendipity_smarty_hookPlugin): Executes a hook of the Plugin API and return content.
  * hook: The name of the event hook to call. Available names are: frontend_header, entries_header, entries_footer, frontend_comment, frontend_footer. If other hooks are meant to be executed, the following parameter needs to be set:
  * hookAll: If set to true, any plugin API event hook can be executed.
  * data: Passes the $eventData for the event
  * addData: Passes optional additional $addData for the event
  * External variable $serendipity['skip_smarty_hooks'] is evaluated, if set to "true" no plugins will be executed. This is for specific recursive calls of event hooks and used internally.
  * External variable $serendipity['skip_smarty_hook'] can contain an array of plugin hooks to not execute.  This is for specific recursive calls of event hooks and used internally.
  * **EXAMPLE**: `{serendipity_hookPlugin hook="hookname" hookAll="true|false" data=$eventData addData=$addData}`
* **serendipity_showPlugin** (serendipity_smarty_showPlugin): Shows the output of a specific sidebar plugin.
  * class: The classname of the plugin to show, like "serendipity_plugin_quicksearch"
  * id: A distinct ID of a plugin to show (see database table `serendipity_plugins`)
  * side: Which sidebar the plugins belongs to. If set to "*", the sidebar will not matter.
  * negate: If set, reverts the previous filters, can be used to "Show all plugins EXECEPT ...".
  * empty: Can be set to a string that is shown, when the plugin output was empty.
  * template: Can be set to a sidebar template file other than the default "sidebar.tpl"
  * **EXAMPLE**: `{serendipity_showPlugin class="serendipity_your_nugget" id="serendipity_your_plugin:21323223efsd22aa" side="left|right|hidden|*" negate="null|true"}`
* **serendipity_getFile** (serendipity_smarty_getFile): Get the full path to a template file. The file is searched in the usual template fallback mechanism, so it can also be fetched from the default location.
  * file: The name of the template file (i.e. "img/preview.png").
  * **EXAMPLE**: `{serendipity_getFile file="img/preview.png"}`
* **serendipity_printComments** (serendipity_smarty_printComments): Shows the comments to an entry with a specified Smarty template
  * template: Indicates which smarty template file to render comments with
  * block: Indicates the name of a temporary placeholder for the comments output (defaults to `{$COMMENTS}`.
  * trace: Nested comments are nested with a "1.3.1.1" like terminology. You can specify a used prefix here.
  * depth: Defines the starting depth of nested comments (0)
  * entry: Holds the entry ID to which comments shall be printed
  * order: Defines the sorting order of comments (ASC or DESC)
  * mode: Defines a viewing mode ($CONST.VIEWMODE_THREADED or $CONST.VIEWMODE_LINEAR)
  * limit: How many comments to fetch (0 means all)
  * **EXAMPLE**: `{serendipity_printComments entry="123" mode=$CONST.VIEWMODE_LINEAR}`
* **serendipity_printTrackback** (serendipity_smarty_printTrackbacks): Shows the trackbacks to an entry with a specified Smarty template
  * template: Indicates which smarty template file to render trackbacks with
  * block: Indicates the name of a temporary placeholder for the trackbacks output (defaults to `{$TRACKBACKS}`.
  * trace: Trackbacks are enumberated, you can specify a prefix here.
  * entry: Holds the entry ID to which trackbacks shall be printed
  * **EXAMPLE**: `{serendipity_printTrackbacks entry="123"}`
* **serendipity_rss_getguid** (serendipity_smarty_rss_getguid): Returns a canonical permalink to an entry.
  * entry: The entry ID
  * is_comments: Whether a permalink for a comment feed should be embedded
* **serendipity_fetchPrintEntries** (serendipity_smarty_fetchPrintEntries): A central function to print/display blog entries, which can be used to place different entry boxes in a magazine-like fashion. The function combines parameters for fetching and displaying
  * Parameters for **fetching**:
	* category: The category ID (seperate multiple with ";") to fetch entries from
	* viewAuthor: The author ID (seperate multiple with ";") to fetch entries from
	* page: The number of the page for paginating entries
	* id: The ID of an entry. If given, only a single entry will be fetched. If left empty, multiple entries are fetched.
	* range: Restricts fetching entries to a specific timespan. Behaves differently depending on the type:
	  * Numeric: YYYYMMDD - Shows all entries from YYYY-MM-DD. If DD is "00", it will show all entries from that month. If DD is any other number, it will show entries of that specific day.
	  * 2-Dimensional Array:
	    * Key #0   - Specifies the start timestamp (unix seconds)
	    * Key #1   - Specifies the end timestamp (unix seconds)
	  * Other (null, 3-dimensional Array, ...): Entries newer than $modified_since will be fetched
	* full: Indicates if the full entry will be fetched (body+extended: TRUE), or only the body (FALSE).
	* limit: Holds a "Y" or "X, Y" string that tells which entries to fetch. X is the first entry offset, Y is number of entries. If not set, the global fetchLimit will be applied (15 entries by default)
	* fetchDrafts: Indicates whether drafts should be fetched (TRUE) or not
	* modified_since: Holds a unix timestamp to be used in conjunction with $range, to fetch all entries newer than this timestamp
	* orderby: Holds the SQL "ORDER BY" statement.
	* filter_sql: Can contain any SQL code to inject into the central SQL statement for fetching the entry
	* noCache: If set to TRUE, all entries will be fetched from scratch and any caching is ignored
	* noSticky: If set to TRUE, all sticky entries will NOT be fetched.
	* select_key: Can contain a SQL statement on which keys to select. Plugins can also set this, pay attention!
	* group_by: Can contain a SQL statement on how to group the query. Plugins can also set this, pay attention!
	* returncode: If set to "array", the array of entries will be returned. "flat-array" will only return the articles without their entryproperties. "single" will only return a 1-dimensional array. "query" will only return the used SQL.
	* joinauthors: Should an SQL-join be made to the AUTHORS DB table?
	* joincategories: Should an SQL-join be made to the CATEGORIES DB table?
	* joinown: SQL-Parts to add to the "JOIN" query
	* entryprops: Condition list of commaseparated entryproperties that an entry must have to be displayed (example: "ep_CustomField='customVal',ep_CustomField2='customVal2'")
   * Parameters for **displaying**:
	* template: Name of the template file to print entries with
	* preview: Indicates if this is a preview
	* block: The name of the SMARTY block that this gets parsed into
	* use_hooks: Indicates whether to apply footer/header event hooks
	* use_footer: Indicates whether the pagination footer should be displayed
	* groupmode: Indicates whether the input $entries array is already grouped in preparation for the smarty $entries output array [TRUE], or if it shall be grouped by date [FALSE]
	* skip_smarty_hooks: If TRUE, no plugins will be executed at all
	* skip_smarty_hook: Can be set to an array of plugin hooks to NOT execute
	* prevent_reset: If set to TRUE, the smarty $entries array will NOT be cleared. (to prevent possible duplicate output of entries)
	* short_archives: If set to true and an archive listing is displayed, uses the short variant.
* **serendipity_getTotalCount** (serendipity_smarty_getTotalCount): Get total count for specific objects (like comments, entries etc.)
  * what: Can be set to either comments, trackbacks or entries to get the specific amounts.
* **pickKey** (serendipity_smarty_pickKey): Helper function to return a specific array key of a multi-dimensional array.
  * array: The array to search in
  * key: The array key to return if found
  * default: The default string to return when an array does not contain the key searched for.
* **serendipity_showCommentForm** (serendipity_smarty_showCommentForm): Displays the comment form
  * id: An entryid to show the commentform for
  * entry: The array of $entry data that the commentform is for
  * url: URL to point the commentform to (defaults to Serendipity core)
  * comments: Optional array of contained comments
  * data: possible pre-submitted vlauues to the input values
  * showToolbar: Whether to show extended options to the comment form
  * moderate_comments: Indicates if comments are accepted
* **serendipity_getImageSize** (serendipity_smarty_getImageSize): Sets information about image size of a file
  * file: The file to check the size for. The file is checked for first related to the DOCUMENT_ROOT, then (if not found) from the template subdirectory.
  * assign: Name of a smarty parameter where the image size is saved into
* **serendipity_getConfigVar** (serendipity_smarty_getConfigVar): Returns a Serendipity configuration variable
  * key: The name of the configuration variable
* **serendipity_setFormToken** (serendipity_smarty_setFormToken): Sets the XSS-prevention form token (a unique hash)
  * type: If set to "form", a whole <input> element will be returned. If set to "url" a URL-compatible string (key=value) will be returned. Else, only the token itself will be returned.

#### Serendipity Smarty Layer

Serendipity uses it's own Layer on Top of Smarty to offer some backwards compatibility and default setup. This class `Serendipity_Smarty` is defined in **include/serendipity_smarty_class.inc.php**. It makes sure to only use the Serendipity theme directories, sets the compile directory and offers those backwards compatibility calls:

* **$serendipity['smarty']->register_function()** was previously used to register Smarty functions (it is now done by `$serendipity['smarty']->registerPlugin('function', ...)`).
* **$serendipity['smarty']->register_modifier()** was previously used to register Smarty modifiers (it is now done by `$serendipity['smarty']->registerPlugin('modifier', ...)`).
* **$serendipity['smarty']->assign_by_ref()** was previously used to assign Smarty variables by references (it is now done by `$serendipity['smarty']->assignByRef()`).

On top of that, a `Serendipity_Smarty_Security_Policy` class constraints the security settings of Smarty. It allows only calling a set of PHP functions (isset, empty, count, sizeof, in_array, is_array, time, nl2br, class_exists) as well as using PHP functions for modifiers (sprintf, sizeof, count, rand, print_r, str_repeat, nl2br). If a theme or plugin needs to do more, it can override the security Settings of Serendipity by setting `$serendipity['smarty']->security = false`.

#### Smarty variables

Here is a list of commonly used smarty variables within the frontend .tpl files:

##### $raw_data [mixed]

If a theme with an old-style "layout.php" is used, this contains the output from that layout.php code.

Scope: *.tpl

##### $plugin_calendar_weeks [array], $plugin_calendar_dow [array], plugin_calendar_head [array]

Contains the calendar item data for displaying the sidebar calendar (associative arrays)

Scope: plugin_calendar.tpl

##### $is_form [bool], $category_image [string], $form_url [string], $categories [array]

Specific variables for displaying the category listing in the sidebar.

* $is_form indicates whether a <form> tag for selecting multiple categories shall be emitted.
* $form_url contains the URL to the submission target of the form.
* $category_image contains the image filename for the "XML" button.
* $categories holds an associative array of the (nested) category listings.

Scope: plugin_categories.tpl

##### $plugindata [array], $pluginside [string]

* $plugindata contains an associative array for the output of a sidebar plugin. The keys are 'side' (left/right), 'class' (CSS), 'title' (text), 'content' (HTML), 'id' (plugin ID).
* $pluginside holds the currently renderd sidebar key.

Scope: sidebar.tpl

##### $leftSidebarElements [int], $rightSidebarElements [int]

Contains the amount of sidebar plugins for each side.

Scope: *.tpl

##### $content_message [string]

Holds some output about the specific error/notice messages from Serendipity (like number of searchresults, no entries found, etc.)

##### $searchresult_tooShort [bool], $searchresult_error [bool], $searchresult_noEntries [bool], $searchresult_results [bool]

Indicates whether the quicksearc returned errors/results/no entries

Scope: index.tpl, content.tpl

##### $startpage [bool]

If set, then serendipity currently displays the startpage on the frontend

Scope: *.tpl

##### $uriargs [array]

Contains a list of URI arguments passed to the current page

Scope: *.tpl

##### $is_preview [bool]

If set, the template is currently being called in "preview mode" from the backend

Scope: *.tpl

##### $preview [string]

Contains the entry preview (parsed 'entries.tpl')

Scope: preview_iframe.tpl

##### $commentform_action [string], $commentform_id [string], $commentform_name [string], $commentform_email [string], $commentform_url [string], $commentform_remember [string], $commentform_replyTo [array], $commentform_subscribe [string], $commentform_data [string], $is_commentform_showToolbar [bool], $is_allowSubscriptions [bool], $is_moderate_comments [bool], $commentform_entry [array]

Multiple variables used for representing the comment form.

* $commentform_action contains the form URL to submit the data to.
* $commentform_id contains the ID of the entry to display the form for.
* $commentform_name, _email, ...: The specific entered data from the user. Drawn from POST or COOKIE.
* $commentform_replyTo: Contains dropdown values for the threaded comment list so far
* $is_commentform_showToolbar: Indicates if extended commentform options shall be displayed (admin purpose)
* $is_allowSubscriptions: Whether the "mail notifications" option is available
* $is_moderate_comments: Whether the current entry requires moderation
* $commentform_entry: The associative entry data of the entry being commented on

Scope: commentform.tpl

##### $comments [array]

The list of (threaded) comments.

Scope: comments.tpl

##### $metadata [array], $entries [array], $is_comments [bool], $last_modified [string], $self_url [string], $namespace_display_dat [string], $once_display_dat [string], $channel_display_dat [string]

Contains multiple values for displaying an RSS/ATOM feed.

* $metadata is an associative array containing metadata for the current feed. Array keys: 'title' (feed title), 'description' (feed description), 'language' (feed language), 'additional_fields' (specific fields from the syndication plugin), 'link' (feed link), 'email' (admin email), 'fullFeed' (if the feed contains full texts), 'showMail' (whether emails are disclosed), 'version' (feed version).
* $entries holds the associative array of entry data
* $is_comments indicates whether this is a comment only feed
* $last_modified contains the timestamp of last entry modification
* $self_url contains the URL of the current feed
* $namespace_display_dat contains additional XML namespaces for the feed as configured per plugins
* $channel_display_dat contains additional XML namespaces for the feed as configured per plugins

Scope: feed*.tpl

##### $entry_id [int], $is_comment_added [bool], $comment_url [string], $comment_string [string], $is_showtrackbacks [bool], $comment_entryurl [string], $is_showcomments [bool], $is_comment_allowed [bool], $is_comment_notadded [bool], $is_comment_empty [bool]

Multiple values for showing the comments inside a popup window.

* $entry_id contains the ID of the entry showing the comments
* $comment_url contains the URL to submitting a comment to
* $comment_entryurl contains the URL to the entry for which comments are shown
* $comment_string returns a message after submitting a comment
* $is_show_trackbacks indicates whether trackbacks shall be shown
* $is_comment_added indicates if a comment has just been added.
* $is_showcomments indicates if comments shall be displayed
* $is_comment_allowed indicates if comments are allowed
* $is_comment_notadded is set when a comment could not be added
* $is_comment_empty is set when a comment was submitted with no text

Scope: commentpopup.tpl

##### $view [string]

Indicates the current "view" on the frontend. One of: "archives, entry, feed, admin, archive, plugin, categories, authors, search, css, js, comments, start, 404"

Scope: *.tpl

##### $footer_prev_page [string], $footer_next_page [string] $footer_totalEntries [int], $footer_totalPages [int], $footer_currentPage [int], $footer_pageLink [string], $footer_info [string]

Specifies multiple variables for showing the pagination footer.

* $footer_prev_page, $footer_next_page and $footer_pageLink contains links to the previous page, next page and the current page.
* $footer_totalEntries holds the total number of entries available in the current display scope.
* $footer_totalPages holds the total number of pages available in the current display scope.
* $footer_currentPage holds the number of the currently viewed page
* $footer_info contains a textual representation of which page you are currently viewing ("Page 1 of 5, totalling 20 entries")

Scope: entries.tpl

##### $plugin_clean_page [bool], $comments_messagestack [array], $is_comment_added [bool], $is_comment_moderate [bool], $entries [array]

Several variables for showing/parsing entries.

* $plugin_clean_page indicates whether a plugin has taken over parsing entries.tpl, and not the usual entries listing is displayed.
* $comments_messagestack holds an array of output messages when somebody submits a comment (like "comment was added", "comment was moderated" etc.).
* $is_comment_added indicates whther somebody just submitted a comment.
* $is_comment_moderate indicates if the current entry being displayed is moderated
* $entries is one large, multi-dimensional array that holds all entries being displayed on the current page. Important key indices are:
  * *title**: The entry title
  * *html_title**: The unescaped entry title (no htmlspecialchars is applied here)
  * *body**: The entry body
  * *extended**: The extended entry
  * *is_cached**: Whether the current entry markup was cached
  * *author**: The author name of the entry
  * *authorid**: The authorid of the entry
  * *email**: Email address of the author of the entry
  * *link**: The URL to the current entry
  * *commURL**: The link to commenting on an entry
  * *rdf_ident**: RDF metadata unique id
  * *link_rdf**: RDF metadata URL
  * *allow_comments**: Whether comments are allowed to this specific entry
  * *moderate_comments**: Whether comments are moderated for this entry
  * *viewmode**: If comments of this entry are currently being viewed in LINEAR or THREADED mode
  * *link_viewmode_threaded**: Link to viewing comments in threaded view
  * *link_viewmode_linear**: Link to viewing comments in linear view
  * *link_author**: Link to viewing all entries for the author of the current entry
  * *link_allow_comments**: An admin link for allowing comments
  * *link_deny_comments**: An admin link for denying comments
  * *link_popup_comments**: URL to the popup window for comments to this entry
  * *link_popup_trackbacks**: URL to the popup window for trackbacks to this entry
  * *link_edit**: URL to the backend for editing an entry
  * *link_trackback**: Trackback-URL for this entry
  * *categories**: An array of all associated categories to this entry
  * *has_extended**: If an entry has an extended entry
  * *is_extended**: If the entry is currently being viewed completely
  * *has_comments**: Whether the entry has comments
  * *label_comments**: The text label of a comment (singular/plural)
  * *has_trackbacks**: Whether the entry has trackbacks
  * *label_trackbacks**: The text label of a trackback (singular/plural)
  * *is_entry_owner**: Indicates if the currently logged in user is the owner of this entry
  * *plugin_display_dat**: Plugin output for this entry

Scope: entries.tpl

##### $trackbacks [array]

Holds an array of trackbacks being displayed

Scope: trackbacks.tpl

##### $head_charset [string], $head_version [string], $head_title [string], $head_subtitle [string], $head_link_stylesheet [string], $is_xhtml [bool], $serendipityVersion [string], $lang [string], $head_link_script [string], $head_link_stylesheet_frontend [string], $is_logged_in [bool]

Multiple variables defining the Serendipity version/language, blog title and link to Stylesheets. $head_title and $head_subtitle are set according to which action is currently performed on the frontend (category view, archive view etc.)

Scope: *.tpl

##### $use_popups [bool], $is_embedded [bool], $is_raw_mode [bool]

Indicates if popups are enabled on the blog, if the blog is embedded, and if the blog is using deprecated layout.php styling

Scope: *.tpl

##### $entry_id [int], $is_single_entry [bool]

If the frontend is currently displaying a single article, those variables hold the boolean state and entry id.

Scope: *.tpl

##### $blogTitle [string], $blogSubTitle [string], $blogDescription [string]

Holds the configured blog's title, subtitle and description as entered by the admin. Note that those variables will not be changed, unlike the $head_subtitle / $head_title variables!

Scope: *.tpl

##### $serendipityHTTPPath [string], $serendipityBaseURL [string], $serendipityRewritePrefix [string], $serendipityIndexFile [string]

Holds several URL strings for the blog

Scope: *.tpl

##### $category [int], $category_info [array]

$category holds the current ID of a category, if a category is being viewed. $category_info contains an associative array with the full category data ('category_name', 'parentid', 'category_description' etc.)

Scope: *.tpl

##### $template [string]

The name of the currently selected template

Scope: *.tpl

##### $dateRange [array]

Holds an array of two timestamps that restrict the date scope of entries being displayed (if set)

Scope: *.tpl

##### $template_option [array - available only for Serendipity 1.1 and above]

Holds configured template options that were set in the backend for templates supporting options (like colorsets, navigation links etc.)

Scope: *.tpl

### Backend themes

Serendipity provides its default backend theme inside the "2k11/admin" directory. The template files in that directory specify the complete look of the whole admin interface, and also contains workflow and logic as well as javascript libaries.

While you can completely build your own backend and customize the look of it, the core development continues based on those files. So it is your own responsibility to keep up with Serendipity development to port bugfixes and new features into your own backend theme, if you wish to change the Smarty templates.

Thus we suggest to only modify the CSS portion of the backend to adapt the look of it. An even better way to deal with a customized backend theme is to simply put a "user.css" file into the "2k11/admin/" subdirectory. Inside that CSS file you can overwrite any CSS rules, and because this file is not part of our core distribution, it will be update-safe for future Serendipity versions.

Having said this, here is a description of what each backend template does. Note that the described template-fallback mechanism of the frontend (see above) also applies to the backend.

#### Specific BACKEND theme files and their meaning

All backend-related theme files are listed in the admin/ subdirectory of a theme.

##### user.css

Just like a frontend theme, a backend can have it's own "user.css" file with custom rules. You should not bundle this file with your theme (see note on the frontend's user.css).

##### Styling the media manager

The media manager is the only part of the admin interface that is Smarty customizable.

The files for this are in the admin/ subdirectory of your theme:

**media_choose.tpl**

The main template file of the media manager popup window.

**media_items.tpl**

The display logic of the specific items in your media database overview.

**media_pane.tpl**

The header/footer area of the media database overview.

**media_properties.tpl**

The page which displays properties (keywords, exif-information etc.) of a selected image.

**media_showitem.tpl**

Used when displaying an image via the frontend of your blog to visitors.

**media_upload.tpl**

The template file for uploading a single or multiple images.

##### The core workflow

The following files influence how the actual admin interface operates and looks:

admin/category.inc.tpl
admin/comments.inc.tpl
admin/config_template.tpl
admin/configuration.inc.tpl
admin/entries.inc.tpl
admin/entries.tpl
admin/entries_overview.inc.php
amdin/groups.inc.tpl
admin/guess_input.tpl
admin/images.inc.tpl
admin/import.inc.tpl
admin/index.tpl
admin/installer.inc.tpl
admin/maintenance.inc.tpl
admin/media_choose.tpl
admin/media_items.tpl
admin/media_pane.tpl
admin/media_properties.tpl
admin/media_upload.tpl
admin/oldie.css
admin/overview.inc.tpl
admin/personal.inc.tpl
admin/plugin_config.tpl
admin/plugin_config_item.tpl
admin/plugins.inc.tpl
admin/serendipity_editor.js.tpl
admin/show_plugins.fnc.tpl
admin/style.css
admin/templates.inc.tpl
admin/upgrader.inc.tpl
admin/users.inc.tpl
admin/wysiwyg_init.tpl
admin/img/
admin/font/
admin/js

## Linking spartacus

You can easily combine the whole spartacus theme and plugin checkouts on your machine. To do that you can for example checkout these repositories to a subdirectory like `templates/spartacus/` and `plugins/spartacus/`. The reason this works is because both the theme and plugin framework of Serendipity can iterate through every subdirectory of the templates/ or plugins/ structure to search for matching plugin/theme files.

## Showing entries in foreign webpages

You can quite easily "show" Serendipity entries from other parts of your website, if PHP is available there and you have filesystem access to the Serendipity installation.

You can use the following PHP code to include the Serendipity framework and use the Serendipty API to display entries:

    <?php
    // 1: Switch to the Serendipity path. We need to use chdir so that the s9y framework can use its relative calls.
    chdir('/home/www/public_html/blog/');

    // 2: Start the Serendipity API
    include 'serendipity_config.inc.php';

    // 3: Start Smarty templating
    serendipity_smarty_init();

    // 4: Get the latest entries
    $entries = serendipity_fetchEntries(null, true,1);

    // 5: Put all the variables into Smarty
    serendipity_printEntries($entries);

    // 6: Get the template file
    $tpl = serendipity_getTemplateFile('entries.tpl', 'serendipityPath');

    // 7: Format and output the entries
    $serendipity['smarty']->display($tpl);

    // 8: Go back to where you came from
    chdir('/home/www/public_html/');
    ?>

You can adapt each of the serendipity_fetchEntries() / serendipity_printEntries() calls to suit your needs. You can of course also pass any other template file instead of entries.tpl to the serendipity_getTemplateFile() call, so that you can have a custom layout for your entries in the PHP application, and use the default entries.tpl template in the real Serendipity installation.

To look up possible functions, check out the include/functions_entries.inc.php file of your Serendipity installation to see phpDoc comments above the functions for which parameters you can use.

## You hate Smarty? You've come a long way!

We love Smarty. But we also covered people like you, who hate it. Since Smarty is a template layer that implements very specific methods, you can simply overwrite it with whatever you like: XML-based transformations, or PHP transformations.

Since we firmly believe in Smarty as a great templating system, we only provide a "proof of concept" theme on how to achieve this, if you are interested. Check out the themes "default-php" and "default-xml" in our Spartacus repository to see those examples.

Note that even if you use a custom frontend theme, the backend will always continue to use Smarty templating, because it would be too much work to port alternate layers for the code.

### Step 1: Create a template.inc.php file

In your theme directory, create a template.inc.php file with a content like this:

    include_once S9Y_INCLUDE_PATH . 'include/template_api.inc.php';
    $GLOBALS['template'] = new serendipity_smarty_emulator();
    $GLOBALS['serendipity']['smarty'] =& $GLOBALS['template'];

This loads the Serendipity template API layer and implements a smarty emulator, and it replaces the internal Serendipity Smarty object with your own.

### Step 2: Read more

Check out the instructions in the file `include/template_api.inc.php` if you want to know more about the internal Template API layer.

All it basically does it it wraps the Smarty commands to simple PHP, which collects all variables in a `$GLOBALS['tpl']` array, that you can access in PHP.

Also, check out the alternate layer `serendipity_smarty_emulator_xml` which is another way to store all assigned variables in XML language, so you could use XSLT to render your blog view.

### Step 3: Create template files

Now instead of using Smarty markup, check out the files like index.tpl which simply contain PHP markup to output the `$GLOBALS['tpl']['...']` values at the place you like.

We have provided a few examples on what to replace with what, but it is more a proof-of-concept that should get you kickstarted.

## Best practice for themes

* Make sure that you only change template files you absolutely must. Serendipity can fallback to use default template files, so if you do not need to change the 'index.tpl' file for example, please simply do not provide that file.
* If your templates needs a config.inc.php file or custom language files, please try to make those files as small as possible. Performance counts, and PHP code should only be used if the code in there is fit to be executed on each page visit. You can disable smarty security through $serendipity['smarty']->security = false - but only do this, if you absolutely must due to custom use of unregistered PHP functions or modifiers or {php} calls.
* Please try to properly indent all of your HTML and CSS rules by using 4 spaces (not tabs).
* Please try to use HTML5 or proper XHTML. HTML 4.0 should really no longer be used.
* Please try to make sure your template can be viewed in all modern browsers.
* If you provide foreign language files, also deliver the language files inside the "UTF-8" subdirectory of your template, and save them in UTF-8 encoding. Save all files using UNIX Linebreaks (\n) if possible.
