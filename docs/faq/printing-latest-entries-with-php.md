---
layout: docs
title: Printing Latest Entries with PHP
---

### Printing the Latest Entries with PHP

For this method of printing the latest entries in an external webpage, we'll add a some PHP to it.  That code will retrieve the latest entries from Serendipity, all on the same server.

Since we'll be running PHP code in the external page, PHP will have to parse it.  It should either be named so that your server recognizes it as a PHP script (usually names ending in .php), or you should tell your server to parse it.  These lines in your .htaccess tell Apache to parse plain HTML files:

```
Options +Includes
AddHandler server-parsed .html
```

Some servers may not allow these directives.  If the PHP code shows up in your page, you know it's not being parsed.  Talk to your server.

So much for the preliminaries. **Here's the PHP code to print the latest entries.**

```
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
```

Just copy this into the file wherever you want the entries to be printed.  Of course, replace "path/to/serendipity" with the path to **your** Serendipity directory, and replace ".." with the path to get back to your original directory.

This only outputs plain HTML; you'll want to link the Serendipity style sheet in your external page, or copy the Serendipity styles to your external page's style sheet.

There are many modifications you can make to this code, too.  For instance, right now it retrieves the number of entries configured for the frontpage.  You can change that to any number by modifying step 4 like this:

```
// Get the latest entries
$entries = serendipity_fetchEntries(null, true,
  10);
```

Now it'll fetch 10 entries, no matter how Serendipity is configured.

Right now, all the links open in the main blog page.  If you want them to open in your external page instead, just add this between steps 2 and 3:

```
// Set link targets to the external page
$serendipity['indexFile'] = 'external_page.php';
// Don't rewrite links away from the external page
$serendipity['rewrite'] = 'none';
```

Right now, the entries are formatted according to the template configured in Serendipity.  If you'd like to use a different template, just put this between steps 4 and 5:

```
// Change to a different template
$serendipity['template'] = 'template_directory_name';
```

Right now, the entries are formatted as if they were entries.  You can custom format the entries (and optimize Smarty processing, since you know these aren't going to be single entries) by copying entries.tpl to your own file, and changing step 6 like this:

```
// 6: Get the template file
$tpl = serendipity_getTemplateFile('external_entries.tpl',
  'serendipityPath');
```

If you need something not mentioned here, be sure to check [the forums](http://board.s9y.org/).  We're always happy to help out!