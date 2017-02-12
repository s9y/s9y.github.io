---
layout: docs
title: Integrating and sharing content
---

## w.bloggar Setup

Serendipity supports w.bloggar through our [XML-RPC plugin](http://spartacus.s9y.org/cvs/additional_plugins/serendipity_event_xmlrpc.zip).

There is currently no Serendipity preset in w.bloggar. If enough of us write to them and request it, that could easily change!

To set up w.bloggar to work with Serendipity, use these settings:

* In the API Server tab:
    * Blog Tool: Custom
    * Host: your Serendipity blog's host
    * Path: /{full path to Serendipity}/serendipity\_xmlrpc.php
* In the Custom tab:
    * Posts: metaWeblog API
    * Categories: metaWeblog API - Single
    * Templates: Blogger\_API
    * Title Tags: title
    * More Text Tags: mt\_text\_more


The fastest way is to **move the external page inside Serendipity**. This involves editing tem

## Flickr Setup

Just download the [Import from Flickr Plugin](http://spartacus.s9y.org/cvs/additional_plugins/serendipity_event_flickr.zip) and follow the directions!

By far, the most common error with the Flickr plugin is "generate\_content(): Failed opening required 'Flickr/API.php'.

To correct this, download the [PEAR Flickr\_API](http://code.iamcal.com/php/flickr/readme.htm) and unzip it into either the Flickr plugin directory or the bundled-libs/ directory.

## Plogger Setup

To embed a plogger gallery, [follow this forum thread](https://board.s9y.org/viewtopic.php?t=6110).

## Showing entries elsewhere

Users commonly request the ability to print the latest entries on a different page. Serendipity supports multiple ways to do it.

The easiest way is to **get the entries from Serendipity and print them using JavaScript in the external page**. This means your users will have to have JavaScript enabled, and their browsers will have to fetch the latest entries themselves.

The faster way is to **use PHP to print the latest entries on the external webpage**. This works right on your server, but the external page has to be parsed by PHP: either its name must end in .php, or your server has to be set up to parse it.

The fastest way is to **move the external page inside Serendipity**. This involves editing templates, which is not too hard, but can be confusing for the casual user. It's easier to move a plain HTML page than to move a PHP application.


### Printing the Latest Entries with JavaScript

With a quick plugin, Serendipity can be accessed from external webpages using <noop>JavaScript</noop>.

First, [Download the "Show entries via JavaScript"](http://spartacus.s9y.org/cvs/additional_plugins/serendipity_event_backend.zip) plugin, also known as serendipity_event_backend and install it.  This can also be done through the SPARTACUS plugin, if you have it installed.

Configure the plugin through your Admin page.  Take special note of the name: you'll be using this in your external webpage later.

Now, you edit the external webpage.  Where you want the latest entries to appear, you add:

    <script src="<noop>http://{yourblog}/plugin/{name}</noop>></script>

where {yourblog} is the complete path to your blog, including any directory, and {name} is the name you configured earlier in the plugin.

You can also specify options.  For instance,

    <script src="<noop>http://{yourblog}/plugin/{name}?details=0</noop>></script>

will show only the headlines, with no entry body.

    <script src="<noop>http://{yourblog}/plugin/{name}?category=news&num=10"</noop>></script>

will show the latest 10 entries from the "news" category.

The README file that came with the plugin includes detailed information on the other options that are available.


### Printing the Latest Entries with PHP

For this method of printing the latest entries in an external webpage, we'll add a some PHP to it.  That code will retrieve the latest entries from Serendipity, all on the same server.

Since we'll be running PHP code in the external page, PHP will have to parse it.  It should either be named so that your server recognizes it as a PHP script (usually names ending in .php), or you should tell your server to parse it.  These lines in your .htaccess tell Apache to parse plain HTML files:

    Options +Includes
    AddHandler server-parsed .html

Some servers may not allow these directives.  If the PHP code shows up in your page, you know it's not being parsed.  Talk to your server.

So much for the preliminaries. **Here's the PHP code to print the latest entries.**

    <?php
    // 1: Switch to the Serendipity path
    chdir('path/to/serendipity');
    // 2: Start the Serendipity API
    include 'serendipity_config.inc.php';
    // 3: Start Smarty templating
    serendipity_smarty_init();
    // 4: Get the latest entries
    $entries = serendipity_fetchEntries(null, true,
      $serendipity['fetchLimit']);
    // 5: Put all the variables into Smarty
    serendipity_printEntries($entries);
    // 6: Get the template file
    $tpl = serendipity_getTemplateFile('entries.tpl',
      'serendipityPath');
    // 7: Format and output the entries
    $serendipity['smarty']->display($tpl);
    // 8: Go back to where you came from
    chdir('..');
    ?>

Just copy this into the file wherever you want the entries to be printed.  Of course, replace "path/to/serendipity" with the path to **your** Serendipity directory, and replace ".." with the path to get back to your original directory.

This only outputs plain HTML; you'll want to link the Serendipity style sheet in your external page, or copy the Serendipity styles to your external page's style sheet.

There are many modifications you can make to this code, too.  For instance, right now it retrieves the number of entries configured for the frontpage.  You can change that to any number by modifying step 4 like this:

    // Get the latest entries
    $entries = serendipity_fetchEntries(null, true,
      10);

Now it'll fetch 10 entries, no matter how Serendipity is configured.

Right now, all the links open in the main blog page.  If you want them to open in your external page instead, just add this between steps 2 and 3:

    // Set link targets to the external page
    $serendipity['indexFile'] = 'external_page.php';
    // Don't rewrite links away from the external page
    $serendipity['rewrite'] = 'none';

Right now, the entries are formatted according to the template configured in Serendipity.  If you'd like to use a different template, just put this between steps 4 and 5:

    // Change to a different template
    $serendipity['template'] = 'template_directory_name';

Right now, the entries are formatted as if they were entries.  You can custom format the entries (and optimize Smarty processing, since you know these aren't going to be single entries) by copying entries.tpl to your own file, and changing step 6 like this:

    // 6: Get the template file
    $tpl = serendipity_getTemplateFile('external_entries.tpl',
      'serendipityPath');

If you need something not mentioned here, be sure to check [the forums](http://boards.s9y.org/).  We're always happy to help out!

### Moving an External Page Into Serendipity

Serendipity is controlled by two pages: index.php and index.tpl.  You can "move" and external page into Serendipity simply by including its code in the appropriate file.

For instance, other PHP applications can be called from index.php.  This requires an understanding of PHP coding, however.

HTML pages can be included in the index.tpl.  In fact, the index.tpl already has a lot of HTML in it.  It's just surrounded by those weird [Smarty](http://smarty.php.net/) tags.

The Smarty tags are really not difficult to understand.  [The Smarty webpage](http://smarty.php.net/) is a good place to start, but here are the basics, as used by Serendipity:

#### `{$variable}`

This tag prints whatever's in $variable.  Of course, you'll see lots of different variable names.

#### `{if}{else}{/if}`

These tags indicate a choice.  For instance:

    {if $is_single_entry} {$entry.body} {/if}

prints the entry body, but **only** if we're viewing a single entry right now.

The {else} part doesn't have to be there, but it's the opposite choice: it's what to do if the {if} wasn't true.

#### `{foreach}{foreachelse}{/foreach}`

These tags are for looping.  For instance, in entries.tpl, you'll see:

    {foreach from=$entries item="dategroup"}

Everything between that and its {/foreach} will be done once for each entry in $entries, and the entry can be called $dategroup while we're working on it.

The {foreachelse} doesn't have to be there, just like the {else} in {if}.  But if it is there, it specifies what to do when there are no entries to print.

By following the code in index.tpl, you can see exactly where you want to put your own HTML.  You can make Serendipity look exactly like your existing webpage.  Then you've "moved" your webpage into Serendipity.
