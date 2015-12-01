---
layout: docs
title: Internationalization
---

### Languages / i18n

s9y is fully compatible to be used in a native language and supports native and UTF-charsets, timezones and entity-encoding. Apart from the bundled languages (english, german, danish, czech, french, spanish and many others) you can easily translate the strings into your language. Given that you can read at least one of the mentioned languages. :-)

Language files are stored inside the 'lang' subdirectory of s9y. Each language file has its filename token: 'de' for 'German', 'en' for english and so forth:

*  **lang/serendipity\_lang\_en.inc.php**: This file holds a list of constants for each string/message that is used in Serendipity. The file also defines some common variables like the national timezone, locales, a dateformat and the used codepage/charset (ISO-88591-1, windows-1252 etc).

If you want to add a new language, just copy this mentioned file and adjust your language prefix. Say you want to add a dutch version of s9y you just need the file **lang/serendipity\_lang\_nl.inc.php**.

Now you also need to supply a UTF-8 version of your language file, which you then put into the **UTF-8** directory. For new language we suggest that you only create a UTF-8 version of your language, with all the Constants set to UTF-8 and the file saved in UTF-8 encoding. Then you just put the same file into both the **lang** and **lang/UTF-8** directories. If all this UTF-8 mumbo-jombo is too complex for you, just announce your translated language file on the Serendipity Forums, and somebody will come to your help to create the UTF-8 variant!

Now to make Serendipity recognize the new language, you need to edit the file **serendipity\_config.inc.php** in the main serendipity directory. Open that file with an editor and look for the definition of the \$serendipity['languages'] array. It will look something like this:

```
$serendipity['languages'] = array('en' => 'English',
                                  'de' => 'German',
                                  'da' => 'Danish',
                                  'es' => 'Spanish',
                                  'fr' => 'French',
                                  'fi' => 'Finnish',
                                  'cs' => 'Czech (Win-1250)',
                                  'cz' => 'Czech (ISO-8859-2)',
                                  'nl' => 'Dutch',
                                  'is' => 'Icelandic',
                                  'tr' => 'Turkish',
                                  'se' => 'Swedish',
                                  'pt' => 'Portuguese Brazilian',
                                  'pt_PT' => 'Portuguese European',
                                  'bg' => 'Bulgarian',
                                  'hu' => 'Hungarian',
                                  'no' => 'Norwegian',
                                  'pl' => 'Polish',
                                  'ro' => 'Romanian',
                                  'it' => 'Italian',
                                  'ru' => 'Russian',
                                  'fa' => 'Persian',
                                  'tw' => 'Traditional Chinese (Big5)',
                                  'tn' => 'Traditional Chinese (UTF-8)',
                                  'zh' => 'Simplified Chinese (GB2312)',
                                  'cn' => 'Simplified Chinese (UTF-8)',
                                  'ja' => 'Japanese',
                                  'ko' => 'Korean',
                                  'sa' => 'Arabic',
                                  'ta' => 'Tamil');
```

Now just add your new language with the prefix and the language name to that array, and you can choose it in your Serendipity Interface.

Please also think about [contributing](http://docs.s9y.org/contributing/index.html) your translated language files so that all users can benefit from your efforts!

### Date formats

The date format of the Serendipity backend and frontend is specific to the selected language you have chosen.

Each language file defines a PHP constant like this:

```
@define('DATE_FORMAT_ENTRY', '%A, %B %e. %Y');
@define('DATE_FORMAT_SHORT', '%Y-%m-%d %H:%M');
```

This defines the default date format that appears "native" to each language. This is usually preferred, because every language has it's own preference on how dates should look like to a native reader.

Those constants are evaluated within the entries.tpl template file of a template, so in fact you can override the language-based date format with a template-based date formatting. Date formatting inside a template looks like this:

```
{$entry.timestamp|@formatTime:$CONST.DATE_FORMAT_ENTRY}
```

which usually means to format a timestamp of an entry variable with the content of that constant. If you want to use an ISO 8601 timestamp instead, you could use:

```
{$entry.timestamp|@formatTime:'%Y-%m-%d %H:%i'}
```

which would always format the time like "2008-10-28 15:00" in every language. The parameters are documented on the [php.net/strftime documentation](http://php.net/strftime).

Plus, some templates (like bulletproof) offer you a template option field where you can choose your favorite (language independent) date format. This allows you to change the dateformat without the need to edit any file.
