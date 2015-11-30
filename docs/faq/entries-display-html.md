---
title: Entries Display HTML
---

### Entries Display HTML

This is sometimes caused by the Wiki Markup plugin.  If it's installed, remove it and see if the problem is corrected.

The "Options for trustworthy editing on multi-user blogs" plugin can also cause this problem.  It's main purpose is to escape any HTML that was entered by a non-trusted user, so if you're not one of the trusted users, your images and formatting will show up as HTML!  Either add yourself to trusted users, or remove the plugin to correct the problem.

Other possible causes include entering HTML in the WYSIWYG editor and improper imports.

To enter custom HTML in the WYSIWYG editor, you must click the button that places the editor into tag-editing mode.  Sometimes this is marked "View Source" or "Show HTML".  If you tried to enter, for instance, an <img> tag in WYSIWYG mode, you'd see the <img> tag in your entry.  Edit the entry to correct the problem.

If your imported entries display HTML tags, you'll probably have to modify the database.  The easiest method is to create a database dump.  This is a plain text file; you can then edit it and replace all the instances of "&lt;" with "<" and "&gt;" with ">".
