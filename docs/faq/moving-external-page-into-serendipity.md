---
layout: docs
title: Moving an External Page Into Serendipity
---

### Moving an External Page Into Serendipity

Serendipity is controlled by two pages: index.php and index.tpl.  You can "move" and external page into Serendipity simply by including its code in the appropriate file.

For instance, other PHP applications can be called from index.php.  This requires an understanding of PHP coding, however.

HTML pages can be included in the index.tpl.  In fact, the index.tpl already has a lot of HTML in it.  It's just surrounded by those weird [Smarty](http://smarty.php.net/) tags.

The Smarty tags are really not difficult to understand.  [The Smarty webpage](http://smarty.php.net/) is a good place to start, but here are the basics, as used by Serendipity:

##### `{$variable}`

This tag prints whatever's in $variable.  Of course, you'll see lots of different variable names.

##### `{if}{else}{/if}`

These tags indicate a choice.  For instance:

    {if $is_single_entry} {$entry.body} {/if}

prints the entry body, but **only** if we're viewing a single entry right now.

The {else} part doesn't have to be there, but it's the opposite choice: it's what to do if the {if} wasn't true.

##### `{foreach}{foreachelse}{/foreach}`

These tags are for looping.  For instance, in entries.tpl, you'll see:

    {foreach from=$entries item="dategroup"}

Everything between that and its {/foreach} will be done once for each entry in $entries, and the entry can be called $dategroup while we're working on it.

The {foreachelse} doesn't have to be there, just like the {else} in {if}.  But if it is there, it specifies what to do when there are no entries to print.

By following the code in index.tpl, you can see exactly where you want to put your own HTML.  You can make Serendipity look exactly like your existing webpage.  Then you've "moved" your webpage into Serendipity.
