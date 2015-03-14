# Moving Serendipity to a New Directory

This information comes courtesy of **Azel**, of the Serendipity Forums, who graciously allowed us to add it here. Thanks, Azel!

A german article and a small shell script to achieve a similar result is here: [http://www.jd-weblog.de/index.php?/archi ... ity-aendern-die-ganze-Wahrheit.html](http://www.jd-weblog.de/index.php?/archives/3-Pfade-in-Serendipity-aendern-die-ganze-Wahrheit.html)

(Note: this article uses phpMyAdmin to access the database and make changes. You can use any tool you like, but the pictures provided show phpMyAdmin screens.)

It's really a simple three-step process:

* [Make a backup!](#A2)
* [Change the configured path to Serendipity](#A3)
* [Rename the folder](#A4)
* [Special Notes](#A5)
  * [SQLite users](#A6)

The easiest thing you can do is this: (with pictures!)

## <a name="A2"></a>Make a backup!

(You can skip this step if you don't have a whole lot of entries and don't mind recreating them.) Make a backup of your database through phpMyAdmin. This is where you can gain access to your database tables (where s9y stores its information). On the index page of phpMyAdmin, you should see something like this:

Click on Export.

* * * * *

Select which database you would like to export.

* * * * *

Click the "Go" button on the bottom right to download a copy of your database file.

## <a name="A3"></a>Change the configured path to Serendipity


While you're in phpMyAdmin, click to open serendipity\_config in your database.

* * * * *

Click on Browse.

* * * * *

Change the serendipityPath, serendipityHTTPPath, and baseURL to their new values.

* * * * *

* * * * *

So your new settings should say:

serendipityPath | *path/to/blog*
serendipityHTTPPath | *blog*
baseURL | *http://yoursite.com/blog/*

## <a name="A4"></a>Rename the folder

Change your folder name in your FTP client (or whatever tool your server admin gives you) from serendipity to blog.

I hope that sounds easy enough and not too intimidating.

## <a name="A5"></a>Special Notes

### <a name="A6"></a>SQLite users

A similar tool for SQLite is [SQLiteManager](http://www.sqlitemanager.org/).

Note that it's designed for SQLite3, so users of SQLite2 may have to modify some code. In particular, Debian/Sarge users must modify line 4 of SQLiteAUtoConnect.class.php to remove the include for sqlite3.class.php.
