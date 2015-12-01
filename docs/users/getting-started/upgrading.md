---
layout: docs
title: Upgrading Serendipity
---

# Upgrading Serendipity

* [Shortcut to Updating](#A2)
* [Updating](#A3)
* [Will upgrading overwrite my plugins/templates?](#A4)
* [Notes on updating from 0.8 / 0.9 / 1.0 / 1.1 / 1.2 and above](#A5)
* [Notes on updating from 0.7 -\> 0.8](#A6)
* [Notes on updating from 0.5/0.5.1 -\> 0.6](#A7)
* [Notes on updating from 0.4 -\> 0.5](#A8)
* [Notes on updating from 0.3 -\> 0.4](#A9)

## <a name="A2"></a>Shortcut to Updating

A shorter guide, also covering most common errors is outlined in our FAQ:

[FAQ: Upgrading](http://www.s9y.org/11.html#A18)

## <a name="A3"></a>Updating

Serendipity has been designed to make upgrading easy. Make a complete backup of your existing installation, we recommend saving every file to a backup folder on your local hard drive, and be sure to save a dump of your database as well. Using phpMyAdmin, select your database from the left side drop down, then click 'export' from the main navbar, select the options you need, then click 'save as file' and 'Go'.

Next, download and unzip the version of Serendipity you wish to upgrade to, and upload every file to the same folder as your existing installation, and overwriting your previous files. Be sure not to delete or modify the .htaccess or serendipity\_config\_local.inc.php files. The upgrade script needs these and will modify them for you.

The automatic update script should find and execute any necessary changes to the database layout made in different s9y versions beginning from 0.5. The upgrader will perform its automatic actions, as soon as you have copied the new s9y files over your old installation and access the start page of your blog.

You can speed up the process of backing up your data and copying the files by using the supplied "upgrade.sh" script. Be sure to edit the file and change the variables to your needs.

Usually all DB schema upgrades in previous versions will be used. So when you upgrade from 0.5 to 0.7 you will get upgrades from 0.5 -\> 0.6 and 0.6 -\> 0.7.

However, you are always advised to look at the corresponding SQL update file in sql/db\_update\*to see which changes were made.

```
.htaccess
AuthType Basic
AuthName "Authorisation: Serendipity Upgrade IN PROGRESS"
AuthUserFile /absolute/path/to/your/s9y/.htpasswd
require valid-user
```

Then create a file .htpasswd using a simple 'username:md5password' combination. Look at [http://www.advancehost.com/htpasswd.html](http://www.advancehost.com/htpasswd.html) for an online generator for .htpasswd files.

```
.htpasswd
s9y:s9QXoc9dcFOT2
```

This would create a user "s9y" with password "s9y" with which you'd have to log into your blog.

A proper backup of BOTH the file system and your database is suggested. Whenever you made changes to the distributed files (or to the files like xml.gif or the smilies) you have to make sure to copy them over the distributed files after updating.

## <a name="A4"></a>Will upgrading overwrite my plugins/templates?

No existing templates, plugins or other files will be touched when upgrading Serendipity.

Since you only copy/extract new files from the Serendipity releases to your host, you only overwrite the existing Serendipity files. All custom plugins and templates will not be overwritten, since they are not contained in our release file.

Only if you have made manual changes to the core Serendipity files, you must write down your changes and apply them again after upgrading. The best way for maintaining/tracking your own changes is to use a CVS/GitHUB checkout of the Serendipity sourcecode, as this will keep your own changes. You will also benefit from using GitHUB/CVS checkouts that they are easily updatable via "cvs update -d" or "git pull" and synchronize to our repository.

## <a name="A5"></a>Notes on updating from 0.8 / 0.9 / 1.0 / 1.1 / 1.2 and above

No specific tasks are required to update Serendipity versions after 0.8 to the current ones. The complete upgrade path is automatted and can be performed with a single mouse click.

## <a name="A6"></a>Notes on updating from 0.7 -\> 0.8

Please read [the 0.8 Release announcement](/63.html).

## <a name="A7"></a>Notes on updating from 0.5/0.5.1 -\> 0.6

* [The 0.5.1 release was renamed to 0.6, but there will still be DB layout changes applied which are labelled as 0.5.1 - just ignore it. It's only to easy migration to CVS-Snapshot users using the 0.5.1-version]
* The structure of the content\_rewrite plugin has changed. It will get rewritten automatically by the update script, but if you had output on your sidebar before, you need to do this:
  * Add the 'serendipity\_plugin\_eventwrapper' to the sidebar plugins.
  * Configure the 'serendipity\_plugin\_eventwrapper' and set it to use your existing 'serendpity\_event\_contentrewrite' plugin.
* Smilies and the XML-button where moved from the '/pixel' subdirectory into per-template 'img/' subdirectories. If you modified the original files, you need to copy your versions inside the'templates/default/img/' directory.
* A home-link has been added to the page headers. For that, two new CSS classes have been introduced: .homelink1 (header), .homelink2 (subheader). If you have a custom template, you need to adapt to those changes. To make them look like your header previously has, insert this in your style.css:

```
  a.homelink1,
  a.homelink1:hover,
  a.homelink1:link,
  a.homelink1:visited,
  #serendipity_banner h1 {
    ... your css-definitions ...
    text-decoration: none;
  }

  a.homelink2,
  a.homelink2:hover,
  a.homelink2:link,
  a.homelink2:visited,
  #serendipity_banner h2 {
    ... your css-definitions ...
    text-decoration: none;
  }
```

## <a name="A8"></a>Notes on updating from 0.4 -\> 0.5

No changes where made to the database schema in this version.

## <a name="A9"></a>Notes on updating from 0.3 -\> 0.4

Run the file 'sql/db\_update\_0.3\_0.4\_mysql.sql' or 'sql/db\_update\_0.3\_0.4\_pgsql.sql' to update your database. Apart from that, just copy over the new files of the distribution.