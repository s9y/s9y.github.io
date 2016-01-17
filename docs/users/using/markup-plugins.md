---
layout: docs
title: Markup plugins
---

<h2>Markup plugins</h2>

* TOC
{:toc}

### Standard S9y Markup Plugins

Please note: This page is a work in progress.

#### nl2br

The nl2br plugin is enabled by default in new Serendipity blogs.  It converts newlines (nl) to break tags (<br/>) in entries and comments.  Whenever you press the "Enter" key on your keyboard, you're adding a newline to your entry; it looks like you've ended the current line and started a new line.

HTML usually treats these newlines as if they were whitespace, converting any number of them to a single space.  (For the grammatically inclined, this is why your sentences are all followed by a single space instead of two: HTML interprets any number of spaces as a single space.)  To get a new line, you must enter a <P> or <BR /> tag.

Rather than making you remember all this, Serendipity provides the nl2br plugin.  It scans your entries for newlines, and converts them to <BR /> tags automatically. Usually this results in an entry that looks as you expected, with new lines where you entered them.

When you enter plain HTML, you often add lots of newlines that you **don't** want displayed.  For instance, when most people add tables, they use a new line for every tag:

    <TABLE>
    <TR>
    <TD>First Cell</TD>
    <TD>Second Cell</TD>
    </TR>
    </TABLE>

The nl2br plugin will add <BR /> tags after every line in the example.  Most browsers render that as the original table, with lots of space above them.

There are three ways to modify this behavior:

 1. To disable the nl2br plugin, go to your Admin screen, Configure Plugins, and click on the nl2br plugin.  Tick its box and click the button marked "Delete".  This will affect all your entries.
 2. If you want to keep the nl2br plugin, you can remove the extra newlines from your entries.  For instance, the example table above would become:

    <TABLE><TR><TD>First Cell</TD><TD>Second Cell</TD></TR></TABLE>

 3. You can disable the nl2br plugin for individual entries if you install the "Extended Properties of Entries" plugin, which is included with Serendipity.


#### Emoticate

This will turn some of the more common smilies/emoticons into images, which images it turns them into depends on which template you have selected. The emoticons it uses are:

    **Similey** | **Image file**
    ----------- | -------------
    :'( | cry\_smile.gif
    :-) | regular\_smile.gif
    :-O | embaressed\_smile.gif
    :O' | embaressed\_smile.gif
    :-( | sad\_smile.gif
    :(  | sad\_smile.gif
    :)  | regular\_smile.gif
    8-) | shades\_smile.gif
    :-D | teeth\_smile.gif
    :D  | teeth\_smile.gif
    8)  | shades\_smile.gif
    :-P | tounge\_smile.gif
    ;-) | wink\_smile.gif
    ;)  | wink\_smile.gif
    :P  | tounge\_smile.gif

#### S9y Markup

    **bolded text**

    _underlined text_

    ^superscript text^

    @subscript text@

    |xxxxxx|Font color change, where xxxxxx is a hex code|

    #yyy# embeds #yyy# as an html entity, (#gt#, #lt# and #amp# for instance)


#### Textile

#### BBCode

#### TextWiki

This uses the PEAR Text\_Wiki rules (which is an extension of the standard [WikiWikiWeb](http://www.c2.com/) text transformation rules. Notice that it does not currently handle [Wiki Words](/index.php?cmd=newdoc&newdocname=Wiki+Words&node=38&refnode=50)**?**.

#### RegExp

This is the catch-all of markup plugins. It allows you to add custom markup to your blog with [PHP regular expressions](http://us2.php.net/manual/en/function.preg-replace.php)!

For instance, if you use a lot of embedded Flash video, you might want an easy way to specify it in your entries. The RegExp plugin lets you create an \<flv\> tag, making entry easier for you. Just go to the plugin/serendipity\_event\_regexpmarkup/regexps/ directory and create a file called FLV.php. In that file, put the regular expression for the tag and the replacement.

Here's an example. It replaces the \<flv\> tag with everything you need for a Flash video, including dimensions and automatic start. Note that \$1, \$2 and so on are the text matched by the first and second set of parenthesis; you can modify these lines to use as many variables as you want.

    $regexpArray = array(
        'SearchArray'=>array(
          '/<flv href="([^"]+)" width="([^"]+)" height="([^"]+)" autostart="([^"]+)">/U'
        ),
        'ReplaceArray'=>array(
          '<object type="application/x-shockwave-flash" width="$2" height="$3" data="http://yourdomain/flv.swf?file=$1&autostart=$4"><param name="movie" value="http://yourdomain/flv.swf?file=$1&autostart=$4" /></object>'
        )
    );

Now, you can use \<flv href="my\_flv\_file.flv" width="its\_width" height="its\_height" autostart="true\_or\_false"\> to insert the entire Flash video anywhere in your entry.
