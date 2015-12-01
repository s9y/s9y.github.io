---
layout: docs
title: Editing entries.tpl
---

### Tutorial: Editing entries.tpl template

This verbose tutorial is an excerpt of a thread on the forums [http://board.s9y.org/viewtopic.php?t=4013](http://board.s9y.org/viewtopic.php?t=4013).

The initial question was this:

#### The question

I'm helping another user to customise my carl blue theme, we've changed the entries.tpl back to the default method, rather than my custom version, so now of course the entries that were posted on the same day all appear grouped. This is fine, but we were wondering if its possible to add a dividing line between these entries only, ie not between dates, just between entries of the same date.

#### The answer (by Judebert)

I'd like to take a shot at explaining, in plain English, if that's even possible. Feel free to read it sometime when you don't have a headache. I could start off on explaining all of Smarty, but we'll stick to the topic at hand for now. And I'll keep it pretty basic, since other people with no experience might be reading.

First, let's state the problem: we want separators between articles that appear in groups, like so:

DATE

article

* * * * *

article

* * * * *

article

DATE

article

...and so on. When I look at this pattern, I see that there's a separator beneath every article except the last one.

Now, articles consist of a lot of different pieces: title, body, footer, etc. There's even a div surrounding (almost) the whole thing. But, for simplicity, we'll actually add a separate separator. The HTML tag designed for this is \<HR\>, which puts a horizontal line (a "Horizontal Rule", literally) on the screen. We don't even need CSS!

Since the template is where we generate our HTML, we'll need to modify the template. We know entries.tpl is where the HTML for entries is generated (hence the name), and so that's where we go.

Smarty pays attention to things in {}. Everything else is plain HTML. Stripping out all the stuff we don't care about, we see something like this:

```
{foreach from=$entries item="dategroup"}
    <div class="serendipity_Entry_Date">
        {if $dategroup.is_sticky}
        <h3 class="serendipity_date">{$CONST.STICKY_POSTINGS}</h3>
        {else}
        <h3 class="serendipity_date">
{$dategroup.date|@formatTime:DATE_FORMAT_ENTRY}</h3>
        {/if}
        {foreach from=$dategroup.entries item="entry"}
        <h4 class="serendipity_title">
<a href="{$entry.link}">{$entry.title}</a></h4>
        <div class="serendipity_entry
serendipity_entry_author_{$entry.author|@makeFilename}
{if $entry.is_entry_owner}serendipity_entry_author_self{/if}">
        ... entry stuff ...
        </div>
        {/foreach}
        ... other stuff ...
    </div>
    {foreachelse}
    {if not $plugin_clean_page}
        {$CONST.NO_ENTRIES_TO_PRINT}
    {/if}
    {/foreach}
```

The first {foreach} loops through every item in \$entries, which is the array of articles Serendipity fills out for us. Serendipity groups the articles according to date, so really Smarty is looping once for each date. It will call each date a "dategroup". For each dategroup, it creates a div, then prints the date (or "Sticky Posts" if it's a sticky group).

The dategroups may have multiple articles. The next {foreach} loop goes through each article individually, calling each article an "entry". It creates a div with multiple classes, prints the entry stuff, and eventually reaches the bottom of the loop ({/foreach}) and goes back up for another entry.

If we want to insert something at the end of each article, this is the place to do it. Any HTML we type will be included after every article. So if we inserted an \<hr\> here, we'd get separators. Here's a code snippet:

```
        ... entry stuff ...
        </div>
        <hr>
        {/foreach}
        ... comment stuff ...
    </div>
    {foreachelse}
```

This would work, but because we put the \<hr\> after [i]every[/i] article, they'd look like this:

DATE

article

* * * * *

article

* * * * *

DATE

article

* * * * *

See the extra separator after the last article? We don't need that. Let's take it out.

If you look at the code we've already got, you'll see the {if} statement. We create an \<H3\> containing the STICKY\_POSTINGS text if the date is the sticky date, otherwise we create an \<H3\> with the date. We also use an {if} to add the class "serendipity\_entry\_author\_self" if the viewer is the article author. Pretty keen.

We just need to add our own {if}, with some way to tell if the article is the first one. If it's **not** the first one in the loop, we need to add a separator. If there's only one article, it's automatically the first in the loop, so we'll skip the separator.

Fortunately, Smarty provides exactly this capability. Unfortunately, this is not something we can ask the "entry" or "dategroup" about. We need to ask the {foreach}. To talk about it, and not some other {foreach}, we need to give it a unique name. And of course, Smarty provides this capability, as well.

So now we must do two things:

1) We have to name our {foreach}.

2) We have to ask our {foreach} if we're on the first loop, and skip the separator if we are.

Simple enough. Here's how we name our foreach:

\<code\>

{foreach name="dategroup" from=\$dategroup.entries item="entry"}

\</code\>

We simply added the "name" attribute. Any name will do, but "dategroup" seems simple. That makes the actual, full name of the {foreach} \$smarty.foreach.dategroup.

Now we need to ask if we're on the first entry of the group (the first loop). That's as simple as checking the "first" attribute of our foreach, like this:

```
        {if $smarty.foreach.dategroup.first}
        <!-- No separator for this! -->
        {else}
        <hr>
        {/if}
```

That'll work. There's a simpler way, of course. Since we only want the separator when it's *not* the first loop, we can just add the "not" to our {if} and lose the {else} altogether:

```
        {if not $smarty.foreach.dategroup.first}
        <hr>
        {/if}
```

Smaller code is better, because it's faster (minutely, in this case, but hey... I'm making a point here).

We could, of course, use other HTML than \<hr\>. We could add a complete div, a span, an image, whatever. And if you understand CSS, you could just add an extra class to the appropriate div, then give it extra border, bigger margin, a different color, or what-have-you. But this is already long enough for now.

#### Closing words

You can find some more sidenotes on the thread noted above. Many thanks to judebert for this explanation and for being able to put it into this documantation.
