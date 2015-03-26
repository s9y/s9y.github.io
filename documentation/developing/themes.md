---
title: Themes
---

**TODO: Template API (xml, php alternatives)

### Supported filenames

**TODO**

### config.inc.php
**TODO**
**TODO: Plugin hooks serendipity_plugin_api_XXX(...)**

### Specific theme files and their meaning

++++ commentform.tpl

This file controls the look of your comment form where visitors can comment on your entries.

++++ commentpopup.tpl

This controls the basic HTML layout of the optional comment popup window.

++++ comments.tpl, trackbacks.tpl

This shows the available comments and trackbacks made to an entry.

++++ comments_by_author.tpl

This controls the layout of the functionality where comments by visitors are shown.

++++ content.tpl

This is a master template that holds your page content area, and depending on the page type (entries overview, entry search, archive page, ...) emits different messages.

++++ entries_archives.tpl

This file holds the display of entry archives (per month / year).

++++ entries_summary.tpl

This file displays the overview of entry archives (per month/year).

++++ feed_*.tpl

These files hold the various RSS/Atom feed template files. Here you could add customization to those feeds.

++++ index.tpl

This is the main template file that controls the general look of your page as well as HTML headers, meta tags, CSS embedding, sidebar locations etc.

++++ entries.tpl

This is the main logic file and it tells Serendipity how to format your entry overview, how to loop entries, where to show commentsforms etc.

++++ plugin_calendar.tpl, plugin_categories.tpl

Some plugins allow their own templating. Those files are prefixed with "plugin_" and can also come with certain plugins. Putting those files into your template directory will customize the look of that plugin within your theme. The files available by default for bundled plugins are for the Calendar and Categories sidebar plugins. You first need to enable the templating option in the configuration of those plugins, though!

++++ preview_iframe.tpl

When you create a preview from within the admin interface, this file controls the basic look of the embedded iframe holding the preview. You need to adapt this file of your preview looks odd/off.

++++ sidebar.tpl

This file controls how the list of sidebar plugins is displayed.

+++ config.inc.php

This master PHP file can customize options only available with PHP coding in your theme.

For a possible use of this, check these documents: ((http://www.s9y.org/78.html)(Special Smarty Templating)) and ((http://www.s9y.org/137.html)(Configuration of Theme options)).

+++ Styling the media manager

The media manager is the only part of the admin interface that is Smarty customizable.

The files for this are in the admin/ subdirectory of your theme:

++++ media_choose.tpl

The main template file of the media manager popup window.

++++ media_items.tpl

The display logic of the specific items in your media database overview.

++++ media_pane.tpl

The header/footer area of the media database overview.

++++ media_properties.tpl

The page which displays properties (keywords, exif-information etc.) of a selected image.

++++ media_showitem.tpl

Used when displaying an image via the frontend of your blog to visitors.

++++ media_upload.tpl

The template file for uploading a single or multiple images.

++++ media_imgedit.tpl, media_imgedit_done.tpl, imgedit.css

The files responsible for "editing" an image. Currently still in development.

+++ Creating images

Inside the /img/ subdirectory of your template directory you can place a list of common images:

++++ back.png

This image is used for the calendar plugin as the back arrow

++++ forward.png

This image is used for the calendar plugin as the forward arrow

++++ xml.gif

This image is used for indicating XML file links (like for the syndication and categories plugin)

++++ cry_smile.gif, embaressed_smile.gif, omg_smile.gif, regular_smile.gif, sad_smile.gif, shades_smile.gif, teeth_smile.gif, tounge_smile.gif, wink_smile.gif

Various emoticons which are used by the /Emoticate Event Plugin/ to transform text-smilies into graphical representations. You may want to tweak those to match your template look.

To customize smilies with individual images from a theme, you can

create the file 'emoticons.inc.php' inside this template directory

and use an array like this:

[code]

   <?php

   $serendipity['custom_emoticons'] = array(

     ":'("  => serendipity_getTemplateFile('img/cry_smile.gif'),

     ':-)'  => serendipity_getTemplateFile('img/regular_smile.gif'),

     ':-O'  => serendipity_getTemplateFile('img/embaressed_smile.gif'),

     ':O'   => serendipity_getTemplateFile('img/embaressed_smile.gif'),

     ...

    );

    ?>

[/code]

This will override the default list of emoticons set inside the file plugins/serendipity_event_emoticate/serendipity_event_emoticate.php and use the ones you created for your template.

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

### Best practice for themes

* Make sure that you only change template files you absolutely must. Serendipity can fallback to use default template files, so if you do not need to change the 'index.tpl' file for example, please simply do not provide that file.
* If your templates needs a config.inc.php file or custom language files, please try to make those files as small as possible. Performance counts, and PHP code should only be used if the code in there is fit to be executed on each page visit. You can disable smarty security through $serendipity['smarty']->security = false - but only do this, if you absolutely must due to custom use of unregistered PHP functions or modifiers or {php} calls.
* Please try to properly indent all of your HTML and CSS rules by using 4 spaces (not tabs).
* Please try to use HTML5 or proper XHTML. HTML 4.0 should really no longer be used.
* Please try to make sure your template can be viewed in all modern browsers.
* If you provide foreign language files, also deliver the language files inside the "UTF-8" subdirectory of your template, and save them in UTF-8 encoding. Save all files using UNIX Linebreaks (\n) if possible.
