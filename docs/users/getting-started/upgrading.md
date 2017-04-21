---
layout: docs
title: Upgrading Serendipity
---

<h2>Upgrading Serendipity</h2>

* TOC
{:toc}

### Shortcut to updating

A shorter guide, also covering most common errors is outlined in our [FAQ](/docs/faq/index.html#docs-upgrading).

### Updating

A proper backup of BOTH the file system and your database is suggested. Whenever you made changes to the distributed files (or to the files like xml.gif or the smilies) you have to make sure to copy them over the distributed files after updating.

#### Using the Autoupdater

Install the Auptoupdater plugin (serendipity_event_autoupdate) and visit the dashboard. If an update is available, a button will appear. Click on the button to get an installer that will download and apply the update for you.

#### Update manually

Serendipity has been designed to make upgrading easy. Make a complete backup of your existing installation, we recommend saving every file to a backup folder on your local hard drive, and be sure to save a dump of your database as well. Using phpMyAdmin, select your database from the left side drop down, then click 'export' from the main navbar, select the options you need, then click 'save as file' and 'Go'.

Next, download and unzip the version of Serendipity you wish to upgrade to, and upload every file to the same folder as your existing installation, and overwriting your previous files. Be sure not to delete or modify the .htaccess or serendipity\_config\_local.inc.php files. The upgrade script needs these and will modify them for you.

The automatic update script should find and execute any necessary changes to the database layout made in different s9y versions. The upgrader will perform its automatic actions, as soon as you have copied the new s9y files over your old installation and access the start page of your blog.

Usually all DB schema upgrades in previous versions will be used. So when you upgrade from 0.5 to 0.7 you will get upgrades from 0.5 -\> 0.6 and 0.6 -\> 0.7.

However, you are always advised to look at the corresponding SQL update file in sql/db\_update\* to see which changes were made.

#### Locking the blog during the upgrade

Create this .htacess file in your server webroot (or edit the existing one):

    AuthType Basic
    AuthName "Authorisation: Serendipity Upgrade IN PROGRESS"
    AuthUserFile /absolute/path/to/your/s9y/.htpasswd
    require valid-user
    # BEGIN s9y
    #
    # END s9y

Note the BEGIN/END s9y section - if you use a fresh .htaccess file, this marker needs to exist. If this already exists in your file, you do not add it a second time.

Then create a file .htpasswd using a simple 'username:md5password' combination. Look at [http://www.htaccesstools.com/htpasswd-generator/](http://www.htaccesstools.com/htpasswd-generator/) for an online generator for .htpasswd files.

    .htpasswd
    s9y:s9QXoc9dcFOT2

This would create a user "s9y" with password "s9y" with which you'd have to log into your blog.

**SECURITY RECOMMENDATION:** Do not skip this step due to security implications. You want to make sure that only you are authorized to update the blog, and calls to your site from others are prevented.


#### Will upgrading overwrite my custom plugins/templates?

No custom templates, plugins or other files will be touched when upgrading Serendipity.

Since you only copy/extract new files from the Serendipity releases to your host, you only overwrite the existing Serendipity files. All custom plugins and templates will not be overwritten, since they are not contained in our release file.

Only if you have made manual changes to the core Serendipity files, you must write down your changes and apply them again after upgrading. The best way for maintaining/tracking your own changes is to use a Git checkout of the Serendipity sourcecode, as this will keep your own changes. You will also benefit from using Git checkouts that they are easily updatable via git pull" and synchronize to our repository.
