---
layout: docs
title: nl2br
---

### nl2br

The nl2br plugin is enabled by default in new Serendipity blogs.  It converts newlines (nl) to break tags (<br/>) in entries and comments.  Whenever you press the "Enter" key on your keyboard, you're adding a newline to your entry; it looks like you've ended the current line and started a new line.

HTML usually treats these newlines as if they were whitespace, converting any number of them to a single space.  (For the grammatically inclined, this is why your sentences are all followed by a single space instead of two: HTML interprets any number of spaces as a single space.)  To get a new line, you must enter a <P> or <BR /> tag.

Rather than making you remember all this, Serendipity provides the nl2br plugin.  It scans your entries for newlines, and converts them to <BR /> tags automatically. Usually this results in an entry that looks as you expected, with new lines where you entered them.

When you enter plain HTML, you often add lots of newlines that you **don't** want displayed.  For instance, when most people add tables, they use a new line for every tag:

```
<TABLE>
<TR>
<TD>First Cell</TD>
<TD>Second Cell</TD>
</TR>
</TABLE>
```

The nl2br plugin will add <BR /> tags after every line in the example.  Most browsers render that as the original table, with lots of space above them.

There are three ways to modify this behavior:

* To disable the nl2br plugin, go to your Admin screen, Configure Plugins, and click on the nl2br plugin.  Tick its box and click the button marked "Delete".  This will affect all your entries.
* If you want to keep the nl2br plugin, you can remove the extra newlines from your entries.  For instance, the example table above would become:

```
<TABLE><TR><TD>First Cell</TD><TD>Second Cell</TD></TR></TABLE>
```

* You can disable the nl2br plugin for individual entries if you install the "Extended Properties of Entries" plugin, which is included with Serendipity.
