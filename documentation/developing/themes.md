---
title: Themes and Smarty Templating
---

# Themes and Smarty Templating

A theme is a collection of single template files, and must be put into the templates/ subdirectory to be available for selection your blog's "Manage Themes" admin section.

Themes can either consist of a Frontend Theme, a Backend Theme or provide both. All styling for the backend is done in a subdirectory "admin" of the theme directory.

## Smarty

Are you afraid of using PHP? Get the shivers of complexity? Don't be afraid: Serendipity uses the Smarty PHP templating system, see (http://www.smarty.net). There you can also find a complete description of how it can be used - it is very easy to lern, has a lower entry barrier that using PHP code, and generally "looks" cleaner und more understandable.

(Sidestep: You are not afraid of using PHP? See below for the "Template API", but bear in mind that Smarty is really comfortable to use and you shouldn't worry about using it. You can place custom PHP code easily in our Plugin API, or even a template's configuration file).

The general idea is easy: Templates should only contain display logic, and not perform actual algorithms. This is called "seperation of concerns". That means, Serendipity is responsible for executing codeflow and assembling variables that are passed to the output layer (Smarty). Smarty then allows a theme author/frontend developer to place those variables in any arrangement they like. They can use loops and logical "IF"-comparisons to perform some minor logic.

This means, Smarty themes are actually mostly HTML files where you can put in special commands or placeholders. Those are quite easy to learn and use:

* Variables are placed through curly brackets and the dollar sign: ```{$variable}```
* Arrays can be accessed similar to JavaScript: ```{$array.subkey}```
* ... but also simliar to PHP: ```{$array['subkey']}```
* Function calls can be executed with curly brackets: ```{myFunction param1="something" param2="something else"}```
* IF-queries can be performed: ```{if $variable == true}...{/if}```
* Loops can be performed: ```{foreach from=$array item="myvalue" key="mykey"}...{/foreach}```
* So called "modifiers" can be stacked to operate on a single variable with the "pipe" sign: ```{$variable|escape|lower}```
* Modifers can have parameters: ```{$variable|format_date:"%d.%m.%Y"}``

## Fallback templates

A frontend theme can hold multiple files in its directory and define its custom output. Serendipity contains a lot of individual template files (see below), but very often a theme can work with the default template files that are provided by Serendipity.

To make theme directories as small as possible, and as update- and futureproof as possible, we have a sophisticated scheme of fallbacks for files that are not provided by an individual theme.

Let's take the file "entries.tpl" for example. This template file is used in the frontend to display both the list of entries and the view of a single entry.

When your frontend is called and the entries.tpl file should be rendered, Serendipity checks for this file like this:

* First, check if the currently set theme (for example "my_custom_theme") has the file "entries.tpl". If yes: Use that file ```templates/my_custom_theme/entries.tpl```.
* Now check the theme's "info.txt" file and see if the theme defined an "Engine: XXX" which specifies the default fallback directory to use. By default, this directory is set to "2k11" - so this file ```templates/2k11/entries.tpl```will be returned. If "Engine: bulletproof" would be contained in the file, then ```templates/bulletproof/entries.tpl``` would be returned.
* If such a file would still not exist, the last fallback is to use ```templates/default/entries.tpl```

So make sure that you only copy over those files to your theme directory which you are really going to customize!

## Frontend Themes

The frontend theme is the collection of files that are used to show anything on the content.

The most important files of a theme are these:

### info.txt

This file is the only required file of a theme directory. It specifies the metadata of a theme. The format of this file is simple and consists of a few "Key: Value" pairs (only one line per key!)


```
Name: This is the name of your theme
Author: This is what is displayed as "author" in the backend
Date: The creation date of your theme (any format you like, i.e. YYYY-MM-DD)
Require Serendipity: [VERSION]
Backend: [BACKEND]
Engine: [ENGINE]
```

Every line except "Name:" is optional.

* ```[VERSION]``` can be replaced with the minimum version of Serendipity that is required to power your theme. Simply set the version number of your current installation where you developed a theme with.
* ```[BACKEND]``` can hold the string "Yes" if your theme also provides a backend theme. Leave out this line, if no backend is provided
* ```[ENGINE]``` can hold the string of any theme directory (i.e. "bulletproof", "2k11", "default") to specify, which fallback to use. If not provided, falls back to $serendipity['defaultTemplate'] (2k11).

### preview.png, preview_backend_fullsize.jpg, preview_fullsize.jpg

**TODO**

### config.inc.php

This is another very central file of a theme, but it is optional. If that file is present, it is included just after Smarty is initialized by the core. This means that this file can use the whole range of Serendipity API functions and extend the Smarty framework with any custom Smarty modifiers or function you would like.

Also, this file is responsible for setting up theme options.

Please make sure that this file always contains those lines at the top:

```
<?php
if (IN_serendipity !== true) {
  die ("Don't hack!");
}
```

This ensures that the file can only be called from within the Serendipity framework, and not by outside HTTP calls.

#### Defining custom Smarty functions/modifiers

Since config.inc.php is called after the Smarty framework is initialized, you can easily access ```$serendipity['smarty']``` to register custom functions:

```
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
```

Note that you first need to actually define your functions in the PHP scope, and then you need to use the ```$serendipity['smarty']->registerPlugin()``` call to make it available to Smarty templates.

* The first parameter to ```registerPlugin()``` defines whether to make a modifier or a function known.
* The second parameter defines how the function is called in a Smarty template: ```{$variable|mymodifier}``` or ```{myfunction param1="value"}```.
* The third parameter is the actual name of the PHP function that will be called.

Of course you can also use the other Smarty API functions to assign special variables you might need for your theme:

```
$serendipity['smarty']->assign('my_ip', $_SERVER['REMOTE_ADDR']);
```

You can also influence whether the Smarty security should be disabled so that you can use {php} code tags or call any PHP modifiers:

```
$serendipity['smarty']->security = false;
```

#### Listen on Plugin Hooks

A themes's config.inc.php file can also hook into the Serendipity code flow. Usually this is done only by plugins. Offering this functionality in a theme has the benefit that a user does not require to install additional plugins to perform minor tasks. Also hooking into events like the CSS and JS generation is important for themes.

You can read more about plugin hooks here: **TODO: Link**

To make a theme hook into the "js" hook to add some javascript to the frontend, a function needs to be defined. This is done by a central function called ```serendipity_plugin_api_event_hook```:

```
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
```

For each additional event hook the theme wants to "listen on", you can add multiple cases for those:

```
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
```

The examples above are trivial, but the usage nearly unlimited. Themes can provide any kind of plugin as internal functionality, even with complete plugin output that hooks into saving entries, offering new frontend functionality and anything else you can think of.

#### Theme Options

A theme can offer complex configuration for any kind of options. Those can be evaluated by the template files and affect anything from custom header images up to different entry listings or magazine-style themes.

The theme configuration is actually a lot like the configuration offered by plugins, from both a developer as well a user standpoint.

Theme options are defined in the config.inc.php file of a theme, and are listed in an array ```$template_config```. Each array key represents one configuration option, and each configuration option has a subset of specific keys that describe how it is configured.

The "var" type of each array indicates the name that you can later use to access a template option like this: ```{$template_option.layouttype}```.

An example (copied from the bulletproof theme):

```
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

```

This example defines four different configuration options. Each configuration option has a specific variable name, a title displayed for the user, an indicator of what type it is, and its available options. Those are defined by these array keys:

* **var**: Defines what variable name is later used so that you can check for it in the Smarty template files. ```'var' => 'layouttype'``` would later be accessible as ```{$template_option.layouttype}``` in the index.tpl file for example.
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
  * **sequence**: Can be used for a re-orderable widget with multiple values. For an exmample, check out the ```serendipity_event_entryproperties``` plugin which uses this configuration item.
    **checkable**: If set to true, each ordered widget can be enabled/disabled. When set, retrieving the option later will only list those widgets that were checked. If not set, all available values will always be returned (in the order the user indicated)
    **values**: Defines an array that uses a unique key for its configuration and as the value it holds a sub-array with the key 'display' to provide the HTML output for each re-orderable widget.

(when selected) Values can be: select, tristate, boolean, radio, string, html, hidden.
  * When using the "select"

The configuration array is processed through ```ìnclude/functions_plugins_admin.inc.php```, ```serendipity_plugin_config()``` if you want to see how these arrays are checked. The output of the configuration items is done by the ```admin/plugin_config.tpl``` file (which also calls ```admin/plugin_config_item.tpl``` for each item).

##### Advanced theme options: Theme option groups

Theme options can also be put into specific groups. To do this, define an array like this in your ```config.inc.php``` file of the theme:

```
$template_config_groups = array(
    THEME_COLORSET  => array('colorset', 'layouttype', 'jscolumns'),
    THEME_HEADER    => array('custheader', 'headerimage', 'headertype')
);
```

The array key definesthe theme option group name which gets displayed for the user. The array value defines an array of defined theme options you want to have in that group. Those array values corellate with the name of the theme options that are defined in ```$template_config```.

##### Advanced theme options: Central navigation

Serendipity offers an "add-in" for each template config, if you want to offer menu items. To enable this, you need to make Serendipity recognize your custom theme options and merge them with global theme options.

This sounds more complicated that it is; simply add those lines after you have defined ```$template_config```:

```
// Setup an array to indicate which global theme options should be merged.
$template_global_config = array('navigation' => true);

// Load the current configuration of the defined theme options and parse them into a helper array
$template_loaded_config = serendipity_loadThemeOptions($template_config, $serendipity['smarty_vars']['template_option']);

// Now merge the loaded configuration with the additional global configuration:
serendipity_loadGlobalThemeOptions($template_config, $template_loaded_config, $template_global_config);
```

Currently only the **navigation** global option is supported, but there might be more in the future. Plus, plugins might provide more global theme options through the use of an event hook we placed for future compatibility.

Internally, serendipity_loadGlobalThemeOptions() simply appends a predefined set of configuration keys to the central array.

#### Internationalization

Just like plugins, you can make a theme available in multiple languages. For that, you need to define custom translation constants. Create a file like ```lang_en.inc.php``` in the theme's directory and put in the usual PHP deifnitions:

```
<?php
@define('MY_THEME_OPTION', 'This is my theme option');
?>
````

Now you need to load this language file in your theme's ```config.inc.php``` file:

```
$probelang = dirname(__FILE__) . '/' . $serendipity['charset'] . 'lang_' . $serendipity['lang'] . '.inc.php';

if (file_exists($probelang)) {
    include $probelang;
}

include dirname(__FILE__) . '/lang_en.inc.php';
```

Those lines ensure that a language file of the current user language is loaded (if it exists!), and also the english file is ALWAYS loaded as a fallback.

If you now provide a translation for german, you would add a file ```lang_de.inc.php``` with this content:

```
<?php
@define('MY_THEME_OPTION', 'Dies ist meine Theme-Option');
?>
```

and save that file also in the UTF-8 subdirectory (the base file should be encoded in ISO-8859-1). Serendipity will automatically now pick up that file.


#### Theme Sidebars

The variable ```$sidebars``` inside a ```config.inc.php``` defines an array of which sidebars a theme offers. By default Serendipity provides "left", "right" and "hidden". Themes can use this to define specific "footer" and "header" sidebars for example:

```
$serendipity['sidebars'] = array('left','right','hidden','footer','header');
```

The plugin manager interface will show one column for each of the configured sidebars, so that people can move around plugins from one to the other location.

Note that no spaces are allowed in sidebar names, and no sidebar name may be longer than 6 characters.

If you want that users are able to define their own sidebars dynamically, you can simply add a string-type theme option to your list:

```
$template_config['sidebars'] = array(
    'var'           => 'sidebars',
    'name'          => 'Which sidebars to use?',
    'type'          => 'string',
    'default'       => 'left,right,hidden',
)
```

### Specific FRONTEND theme files and their meaning

Each of those files is not mandatory in your theme directory. If you want to adapt it, you should copy it over from the 2k11 directory. Only copy over the files you actually change, so that the fallback-chain can work properly (see above).

#### atom.css

Stylesheet applied to ATOM feeds

#### style_fallback.css

It emits CSS rules that all templates should have and is supplied in the templates/default/ subdirectory.
Classes are declared on top of the file, so if you  want to make changes in your own template, you should override the rules on the bottom of your own style.css template.
It is not advised to create your own  style_fallback.css file.

#### style.css

This is the custom CSS of your theme. If you do not write a theme from scratch, it is advised to use tools like Firebug or Developer Tools to inspect the HTML layout of a page to be able to style it properly.

#### user.css

This file can be used by actual users of your theme. This is where users shall place custom CSS rules that enhance a theme. Theme developers shall NOT bundle such a file, because the file is meant to survive updates of a theme when overwriting a directory with a newer version.

#### commentform.tpl

This file controls the look of your comment form where visitors can comment on your entries.

#### commentpopup.tpl

This controls the basic HTML layout of the optional comment popup window.

#### comments.tpl, trackbacks.tpl

This shows the available comments and trackbacks made to an entry.

#### comments_by_author.tpl

This controls the layout of the functionality where comments by visitors are shown.

#### content.tpl

This is a master template that holds your page content area, and depending on the page type (entries overview, entry search, archive page, ...) emits different messages.

#### entries_archives.tpl

This file holds the display of entry archives (per month / year).

#### entries_summary.tpl

This file displays the overview of entry archives (per month/year).

#### feed_*.tpl

These files hold the various RSS/Atom feed template files. Here you could add customization to those feeds.

#### index.tpl

This is the main template file that controls the general look of your page as well as HTML headers, meta tags, CSS embedding, sidebar locations etc.

#### entries.tpl

This is the main logic file and it tells Serendipity how to format your entry overview, how to loop entries, where to show commentsforms etc.

#### plugin_calendar.tpl, plugin_categories.tpl, plugin_staticpage.tpl

Some plugins allow their own templating. Those files are prefixed with "plugin_" and can also come with certain plugins. Putting those files into your template directory will customize the look of that plugin within your theme. The files available by default for bundled plugins are for the Calendar and Categories sidebar plugins. You first need to enable the templating option in the configuration of those plugins, though!

#### preview_iframe.tpl

When you create a preview from within the admin interface, this file controls the basic look of the embedded iframe holding the preview. You need to adapt this file if your preview looks odd/off.

#### sidebar.tpl

This file controls how the list of sidebar plugins is displayed in the frontent.

#### media_showitem.tpl

If a media database file is shown in the frontend, this file controls its layout.

#### img/ subfolder and others

Of course your theme can hold its own assets and javascript file. You can put them anywhere you like. Most themes use a "js" and "img" subdirectory.

Most notably the files back.png/forward.png (for calendar icons) and xml.gif (RSS feed icons) are fetched from this directory by many plugins.

##### Custom emoticons

The Serendipity Emoticate plugin allows to transform usual emoticon texts to graphics. You may want to tweak those to match your template look.

To customize smilies with individual images from a theme, you can create the file 'emoticons.inc.php' inside this template directory and use an array like this:

```
<?php
   $serendipity['custom_emoticons'] = array(
     ":'("  => serendipity_getTemplateFile('img/cry_smile.gif'),
     ':-)'  => serendipity_getTemplateFile('img/regular_smile.gif'),
     ':-O'  => serendipity_getTemplateFile('img/embaressed_smile.gif'),
     ':O'   => serendipity_getTemplateFile('img/embaressed_smile.gif')
    );
?>
```

This will override the default list of emoticons set inside the file plugins/serendipity_event_emoticate/serendipity_event_emoticate.php and use the ones you created for your template. Of course a user can still configure the emoticons on his own in the plugin configuration.
** TODO: How is this done right now? **

#### jQuery

**TODO: @yellowled, I don't remember, how do we actually use jquery in the frontend? We're not bundling it, only in the backend? Write something here :) **

### Smarty methods

Serendipity offers a list of custom Smarty methods and functions that can be used by the template files:

* **serendipity_getFile**
**TODO: functions_smarty.inc.php, serendipity_smarty_class.inc.php**

#### Serendipity Smarty Layer

Serendipity uses it's own Layer on Top of Smarty to offer some backwards compatibility and default setup. This class ```Serendipity_Smarty``` is defined in **include/serendipity_smarty_class.inc.php**. It makes sure to only use the Serendipity theme directories, sets the compile directory and offers those backwards compatibility calls:

* **$serendipity['smarty']->register_function()** was previously used to register Smarty functions (it is now done by ```$serendipity['smarty']->registerPlugin('function', ...)```).
* **$serendipity['smarty']->register_modifier()** was previously used to register Smarty modifiers (it is now done by ```$serendipity['smarty']->registerPlugin('modifier', ...)```).
* **$serendipity['smarty']->assign_by_ref()** was previously used to assign Smarty variables by references (it is now done by ```$serendipity['smarty']->assignByRef()```).

On top of that, a ```Serendipity_Smarty_Security_Policy``` class constraints the security settings of Smarty. It allows only calling a set of PHP functions (isset, empty, count, sizeof, in_array, is_array, time, nl2br, class_exists) as well as using PHP functions for modifiers (sprintf, sizeof, count, rand, print_r, str_repeat, nl2br). If a theme or plugin needs to do more, it can override the security Settings of Serendipity by setting ```$serendipity['smarty']->security = false```.

### Smarty variables

Here is a list of commonly used smarty variables within the frontend .tpl files:

**TODO**

#### $raw_data [mixed]

If a theme with an old-style "layout.php" is used, this contains the output from that layout.php code. 

Scope: *.tpl

#### $plugin_calendar_weeks [array], $plugin_calendar_dow [array], plugin_calendar_head [array]

Contains the calendar item data for displaying the sidebar calendar (associative arrays)

Scope: plugin_calendar.tpl

#### $is_form [bool], $category_image [string], $form_url [string], $categories [array]

Specific variables for displaying the category listing in the sidebar. $is_form indicates whether a <form> tag for selecting multiple categories shall be emitted. 

$form_url contains the URL to the submission target of the form.

$category_image contains the image filename for the "XML" button.

$categories holds an associative array of the (nested) category listings.

Scope: plugin_categories.tpl

#### $plugindata [array], $pluginside [string]

$plugindata contains an associative array for the output of a sidebar plugin. The keys are 'side' (left/right), 'class' (CSS), 'title' (text), 'content' (HTML), 'id' (plugin ID).

Scope: sidebar.tpl

#### $leftSidebarElements [int], $rightSidebarElements [int]

Contains the amount of sidebar plugins for each side.

Scope: *.tpl

#### $content_message [string]

Holds some output about the specific error/notice messages from Serendipity (like number of searchresults, no entries found, etc.)

#### $searchresult_tooShort [bool], $searchresult_error [bool], $searchresult_noEntries [bool], $searchresult_results [bool]

Indicates whether the quicksearc returned errors/results/no entries

Scope: index.tpl, content.tpl

#### $startpage [bool]

If set, then serendipity currently displays the startpage on the frontend

Scope: *.tpl

#### $uriargs [array]

Contains a list of URI arguments passed to the current page

Scope: *.tpl

#### $is_preview [bool]

If set, the template is currently being called in "preview mode" from the backend

Scope: *.tpl

#### $preview [string]

Contains the entry preview (parsed 'entries.tpl')

Scope: preview_iframe.tpl

#### $commentform_action [string], $commentform_id [string], $commentform_name [string], $commentform_email [string], $commentform_url [string], $commentform_remember [string], $commentform_replyTo [array], $commentform_subscribe [string], $commentform_data [string], $is_commentform_showToolbar [bool], $is_allowSubscriptions [bool], $is_moderate_comments [bool], $commentform_entry [array]

Multiple variables used for representing the comment form. 

$commentform_action contains the form URL to submit the data to.

$commentform_id contains the ID of the entry to display the form for.

$commentform_name, _email, ...: The specific entered data from the user. Drawn from POST or COOKIE.

$commentform_replyTo: Contains dropdown values for the threaded comment list so far

$is_commentform_showToolbar: Indicates if extended commentform options shall be displayed (admin purpose)

$is_allowSubscriptions: Whether the "mail notifications" option is available

$is_moderate_comments: Whether the current entry requires moderation

$commentform_entry: The associative entry data of the entry being commented on

Scope: commentform.tpl

#### $comments [array]

The list of (threaded) comments.

Scope: comments.tpl

#### $metadata [array], $entries [array], $is_comments [bool], $last_modified [string], $self_url [string], $namespace_display_dat [string], $once_display_dat [string]

Contains multiple values for displaying an RSS/ATOM feed.

$metadata is an associative array containing metadata for the current feed. Array keys: 'title' (feed title), 'description' (feed description), 'language' (feed language), 'additional_fields' (specific fields from the syndication plugin), 'link' (feed link), 'email' (admin email), 'fullFeed' (if the feed contains full texts), 'showMail' (whether emails are disclosed), 'version' (feed version).

$entries holds the associative array of entry data

$is_comments indicates whether this is a comment only feed

$last_modified contains the timestamp of last entry modification

$self_url contains the URL of the current feed

$namespace_display_dat contains additional XML namespaces for the feed as configured per plugins

Scope: feed*.tpl

#### $entry_id [int], $is_comment_added [bool], $comment_url [string], $comment_string [string], $is_showtrackbacks [bool], $comment_entryurl [string], $is_showcomments [bool], $is_comment_allowed [bool], $is_comment_notadded [bool], $is_comment_empty [bool]

Multiple values for showing the comments inside a popup window.

$entry_id contains the ID of the entry showing the comments

$comment_url contains the URL to submitting a comment to

$comment_entryurl contains the URL to the entry for which comments are shown

$comment_string returns a message after submitting a comment

$is_show_trackbacks indicates whether trackbacks shall be shown

$is_comment_added indicates if a comment has just been added.

$is_showcomments indicates if comments shall be displayed

$is_comment_allowed indicates if comments are allowed

$is_comment_notadded is set when a comment could not be added

$is_comment_empty is set when a comment was submitted with no text

Scope: commentpopup.tpl

#### $view [string - available for 1.0-beta3 and above]

Indicates the current "view" on the frontend. One of: "archives, entry, feed, admin, archives, plugin, categories, authors, search, css, start, 404"

Scope: *.tpl

#### $footer_prev_page [string], $footer_next_page [string] $footer_totalEntries [int], $footer_totalPages [int], $footer_currentPage [int], $footer_pageLink [string], $footer_info [string]

Specifies multiple variables for showing the pagination footer.

$footer_prev_page, $footer_next_page and $footer_pageLink contains links to the previous page, next page and the current page.

$footer_totalEntries holds the total number of entries available in the current display scope.

$footer_totalPages holds the total number of pages available in the current display scope.

$footer_currentPage holds the number of the currently viewed page

$footer_info contains a textual representation of which page you are currently viewing ("Page 1 of 5, totalling 20 entries")

Scope: entries.tpl

#### $plugin_clean_page [bool], $comments_messagestack [array], $is_comment_added [bool], $is_comment_moderate [bool], $entries [array]

Several variables for showing/parsing entries.

$plugin_clean_page indicates whether a plugin has taken over parsing entries.tpl, and not the usual entries listing is displayed.

$comments_messagestack holds an array of output messages when somebody submits a comment (like "comment was added", "comment was moderated" etc.).

$is_comment_added indicates whther somebody just submitted a comment.

$is_comment_moderate indicates if the current entry being displayed is moderated

$entries is one large, multi-dimensional array that holds all entries being displayed on the current page. Important key indices are: 

 *title*: The entry title 

 *html_title*: The unescaped entry title (no htmlspecialchars is applied here)

 *body*: The entry body

 *extended*: The extended entry

 *is_cached*: Whether the current entry markup was cached

 *author*: The author name of the entry

 *authorid*: The authorid of the entry

 *email*: Email address of the author of the entry

 *link*: The URL to the current entry

 *commURL*: The link to commenting on an entry

 *rdf_ident*: RDF metadata unique id

 *link_rdf*: RDF metadata URL

 *allow_comments*: Whether comments are allowed to this specific entry

 *moderate_comments*: Whether comments are moderated for this entry

 *viewmode*: If comments of this entry are currently being viewed in LINEAR or THREADED mode

 *link_viewmode_threaded*: Link to viewing comments in threaded view

 *link_viewmode_linear*: Link to viewing comments in linear view

 *link_author*: Link to viewing all entries for the author of the current entry

 *link_allow_comments*: An admin link for allowing comments

 *link_deny_comments*: An admin link for denying comments

 *link_popup_comments*: URL to the popup window for comments to this entry

 *link_popup_trackbacks*: URL to the popup window for trackbacks to this entry

 *link_edit*: URL to the backend for editing an entry

 *link_trackback*: Trackback-URL for this entry

 *categories*: An array of all associated categories to this entry

 *has_extended*: If an entry has an extended entry

 *is_extended*: If the entry is currently being viewed completely

 *has_comments*: Whether the entry has comments

 *label_comments*: The text label of a comment (singular/plural)

 *has_trackbacks*: Whether the entry has trackbacks

 *label_trackbacks*: The text label of a trackback (singular/plural)

 *is_entry_owner*: Indicates if the currently logged in user is the owner of this entry

 *plugin_display_dat*: Plugin output for this entry

Scope: entries.tpl

#### $trackbacks [array]

Holds an array of trackbacks being displayed

Scope: trackbacks.tpl

#### $head_charset [string], $head_version [string], $head_title [string], $head_subtitle [string], $head_link_stylesheet [string], $is_xhtml [bool], $serendipityVersion [string], $lang [string]

Multiple variables defining the Serendipity version/language, blog title and link to Stylesheets. $head_title and $head_subtitle are set according to which action is currently performed on the frontend (category view, archive view etc.)

Scope: *.tpl

#### $use_popups [bool], $is_embedded [bool], $is_raw_mode [bool]

Indicates if popups are enabled on the blog, if the blog is embedded, and if the blog is using deprecated layout.php styling

Scope: *.tpl

#### $entry_id [int], $is_single_entry [bool]

If the frontend is currently displaying a single article, those variables hold the boolean state and entry id.

Scope: *.tpl

#### $blogTitle [string], $blogSubTitle [string], $blogDescription [string]

Holds the configured blog's title, subtitle and description as entered by the admin. Note that those variables will not be changed, unlike the $head_subtitle / $head_title variables!

Scope: *.tpl

#### $serendipityHTTPPath [string], $serendipityBaseURL [string], $serendipityRewritePrefix [string], $serendipityIndexFile [string]

Holds several URL strings for the blog

Scope: *.tpl

#### $category [int], $category_info [array]

$category holds the current ID of a category, if a category is being viewed. $category_info contains an associative array with the full category data ('category_name', 'parentid', 'category_description' etc.)

Scope: *.tpl

#### $template [string]

The name of the currently selected template

Scope: *.tpl

#### $dateRange [array]

Holds an array of two timestamps that restrict the date scope of entries being displayed (if set)

Scope: *.tpl

#### $template_option [array - available only for Serendipity 1.1 and above]

Holds configured template options that were set in the backend for templates supporting options (like colorsets, navigation links etc.)

Scope: *.tpl

**TODO: Check all *.php files for "->assign" to get a list

## Backend themes

Serendipity provides its default backend theme inside the "2k11/admin" directory. The template files in that directory specify the complete look of the whole admin interface, and also contains workflow and logic as well as javascript libaries.

While you can completely build your own backend and customize the look of it, the core development continues based on those files. So it is your own responsibility to keep up with Serendipity development to port bugfixes and new features into your own backend theme, if you wish to change the Smarty templates.

Thus we suggest to only modify the CSS portion of the backend to adapt the look of it. An even better way to deal with a customized backend theme is to simply put a "user.css" file into the "2k11/admin/" subdirectory. Inside that CSS file you can overwrite any CSS rules, and because this file is not part of our core distribution, it will be update-safe for future Serendipity versions.

Having said this, here is a description of what each backend template does. Note that the described template-fallback mechanism of the frontend (see above) also applies to the backend.

### Specific BACKEND theme files and their meaning

All backend-related theme files are listed in the admin/ subdirectory of a theme.

#### user.css

Just like a frontend theme, a backend can have it's own "user.css" file with custom rules. You should not bundle this file with your theme (see note on the frontend's user.css).

#### Styling the media manager

The media manager is the only part of the admin interface that is Smarty customizable.

The files for this are in the admin/ subdirectory of your theme:

##### media_choose.tpl

The main template file of the media manager popup window.

##### media_items.tpl

The display logic of the specific items in your media database overview.

##### media_pane.tpl

The header/footer area of the media database overview.

##### media_properties.tpl

The page which displays properties (keywords, exif-information etc.) of a selected image.

##### media_showitem.tpl

Used when displaying an image via the frontend of your blog to visitors.

##### media_upload.tpl

The template file for uploading a single or multiple images.

#### The core workflow

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

# Linking spartacus

You can easily combine the whole spartacus theme and plugin checkouts on your machine. To do that you can for example checkout these repositories to a subdirectory like ```templates/spartacus/``` and ```plugins/spartacus/```. The reason this works is because both the theme and plugin framework of Serendipity can iterate through every subdirectory of the templates/ or plugins/ structure to search for matching plugin/theme files.


# Best practice for themes

* Make sure that you only change template files you absolutely must. Serendipity can fallback to use default template files, so if you do not need to change the 'index.tpl' file for example, please simply do not provide that file.
* If your templates needs a config.inc.php file or custom language files, please try to make those files as small as possible. Performance counts, and PHP code should only be used if the code in there is fit to be executed on each page visit. You can disable smarty security through $serendipity['smarty']->security = false - but only do this, if you absolutely must due to custom use of unregistered PHP functions or modifiers or {php} calls.
* Please try to properly indent all of your HTML and CSS rules by using 4 spaces (not tabs).
* Please try to use HTML5 or proper XHTML. HTML 4.0 should really no longer be used.
* Please try to make sure your template can be viewed in all modern browsers.
* If you provide foreign language files, also deliver the language files inside the "UTF-8" subdirectory of your template, and save them in UTF-8 encoding. Save all files using UNIX Linebreaks (\n) if possible.

**TODO: Template API (xml, php alternatives)
