---
title: Markup Plugins
---

# Markup Plugins

*  [Standard S9y Markup Plugins](#A2)
  *  [nl2br](#A3)
  *  [Emoticate](#A4)
  *  [S9y Markup](#A5)
  *  [Textile](#A6)
  *  [BBCode](#A7)
  *  [TextWiki](#A8)
  *  [RegExp](#A9)


# <a name="A2"></a>Standard S9y Markup Plugins

Please note: This page is a work in progress.

## <a name="A3"></a>nl2br

This cryptically named markup plugin simply takes any newline and turns it into the html code "\<br/\>".

## <a name="A4"></a>Emoticate

This will turn some of the more common smilies/emoticons into images, which images it turns them into depends on which template you have selected. The emoticons it uses are:


**Similey** | **Image file**
----------- | -------------
:'( | cry\_smile.gif
:-) | regular\_smile.gif
:-O | embaressed\_smile.gif
:O' | embaressed\_smile.gif
:-( | sad\_smile.gif
:( | sad\_smile.gif
:) | regular\_smile.gif
8-) | shades\_smile.gif
:-D | teeth\_smile.gif
:D | teeth\_smile.gif
8) | shades\_smile.gif
:-P | tounge\_smile.gif
;-) | wink\_smile.gif
;) | wink\_smile.gif
:P | tounge\_smile.gif

## <a name="A5"></a>S9y Markup

```
**bolded text**

_underlined text_

^superscript text^

@subscript text@

|xxxxxx|Font color change, where xxxxxx is a hex code|

#yyy# embeds #yyy# as an html entity, (#gt#, #lt# and #amp# for instance)
```


## <a name="A6"></a>Textile

## <a name="A7"></a>BBCode

## <a name="A8"></a>TextWiki

This uses the PEAR Text\_Wiki rules (which is an extension of the standard [WikiWikiWeb](http://www.c2.com/) text transformation rules. Notice that it does not currently handle [Wiki Words](/index.php?cmd=newdoc&newdocname=Wiki+Words&node=38&refnode=50)**?**.

## <a name="A9"></a>RegExp

This is the catch-all of markup plugins. It allows you to add custom markup to your blog with [PHP regular expressions](http://us2.php.net/manual/en/function.preg-replace.php)!

For instance, if you use a lot of embedded Flash video, you might want an easy way to specify it in your entries. The RegExp plugin lets you create an \<flv\> tag, making entry easier for you. Just go to the plugin/serendipity\_event\_regexpmarkup/regexps/ directory and create a file called FLV.php. In that file, put the regular expression for the tag and the replacement.

Here's an example. It replaces the \<flv\> tag with everything you need for a Flash video, including dimensions and automatic start. Note that \$1, \$2 and so on are the text matched by the first and second set of parenthesis; you can modify these lines to use as many variables as you want.

```
$regexpArray = array(
    'SearchArray'=>array(
      '/<flv href="([^"]+)" width="([^"]+)" height="([^"]+)" autostart="([^"]+)">/U'
    ),
    'ReplaceArray'=>array(
      '<object type="application/x-shockwave-flash" width="$2" height="$3" data="http://yourdomain/flv.swf?file=$1&autostart=$4"><param name="movie" value="http://yourdomain/flv.swf?file=$1&autostart=$4" /></object>'
    )
);
```

Now, you can use \<flv href="my\_flv\_file.flv" width="its\_width" height="its\_height" autostart="true\_or\_false"\> to insert the entire Flash video anywhere in your entry.