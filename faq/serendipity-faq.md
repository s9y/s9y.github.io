# Serendipity - Frequently Asked Questions

# General information

## Where does the name Serendipity originate from?

While Serendipity in itself means "The faculty of making fortunate discoveries by accident.", the name of this project was described by [Sterling Hughes](http://www.s9y.org/24.html) as originating from two things:

1. [Manufactured Serendipity](http://www.intertwingly.net/stories/2002/03/13/manufacturedSerendipity.html), an essay by Sam Ruby. 
2. Serendipity, the hot ass stripper in [Dogma](http://www.imdb.com/title/tt0120655/). Played by Selma Hayek.

## What's with this "s9y", what does it mean?

"s9y" is an abbreviation of "Serendipity", much like "i18n" is an abbriviation of "Internationalization". The abbriviation is often used in the mailing lists and forums.

# Installation requirements

## How do I install serendipity?

Just download the .tar.gz to your server, unpack it inside your document root, make sure the created directory is writeable by the webserver (in most cases `/chmod 770 serendipity/` will do) and open it in your web browser. You will see the installation screen that lets you set up serendipity. You'll be up and running in about 2 minutes!

## What system requirements does serendipity have?

You need a [PHP](http://www.php.net) installation together with a [MySQL](http://www.mysql.com) or [PostgreSQL](http://www.postgresql.org) server. We also require you use the Apache webserver, because we utilize a number of internal functions to make Serendipity run correctly. To fully enjoy serendipity, you should have either [ImageMagick](http://www.imagick.org)'s convert binary installed on your server or a PHP installation with gd2 support (recommended). You should also verify, that your Apache takes notice of the ".htaccess" file in your document root (Override All), otherwise s9y won't be able to run properly.

## Serendipity asks me for entering data to a database, but when I enter a name and install Serendipity it tells me the database does not exist

Serendipity requires that you have already setup the Database in your favorite database system. For MySQL you can create a database with `CREATE DATABASE serendipity;` for example, on postgreSQL you can do that via `createdb serendipity`. The username you enter in the Serendipity Installations also requires that this username already exists. On MySQL you create users via the "GRANT" feature subset. Use a tool like phpMyAdmin to easily create users, or just enter the credentials you were given from your hoster. On postgreSQL you can create a user with `createuser serendipity` for example.

The reason why Serendipity does not create a database automatically is because on most hosting providers you already have an existing database (like usrdb_htdu1_sql) and are not able to create more databases. To make serendipity detect that and guess the right user privileges would be too error-prone. So it is best that you create an empty database with the right privileges to use for Serendipity (assign CREATE, INSERT, UPDATE, DELETE, ALTER and INDEX privileges for the SQL user account).

# Errors/Problems

## What does this warning mean: Your current template is using a deprecated template method, you are advised to update if possible

Since Serendipity 0.8, we offer the users a way to use Smarty Templating to customize their templates. This means that older 'layout.php' files inside the templates directories are no longer needed, as everything done there can be achieved via editing the various *.tpl files.

The usage of that layout.php method is still possible, but you get better performance, if you adjust the template to use Smarty. If Serendipity detects that you use the old method, it emits a warning on the Theme Selection panel:

"Warning: Your current template is using a deprecated template method, you are advised to update if possible"

Doing that is quite easy: Take the .tpl files you need from the 'default' template folder and adjust them to fit the style of your template. Make it look like it looked previously using the layout.php.
If you need to execute certain PHP-code within the layout.php you can now put that code into 'config.inc.php' inside your template directory. This PHP code is then executed before our templating engine displays your templates. That means you can also add your custom Smarty modifiers in that file.
After having adjusted the files (you usually only need to edit the index.tpl file) you can delete layout.php and the warning message will disappear, and you will be able to use the full power of Smarty Templating.
Currently, a few bundled templates (like Mozilla Modern) are still using the old method. As soon as the developers find some time, they will be adapted to the new templating.

## My calendar shows weird 1969 dates when I browse it!

This can happen if your Configuration Directive for the "Relative HTTP Path to Serendipity direcotry" (serendipityHTTPPath) is set to an empty string. You need to set it to at least "/" when having Serendipity installed in your base directory!

## I cannot change my WYSIWYG option, it always stays enabled!

You need to deactivate the WYSIWYG option in your **Personal Configuration** menu option, not within the global **Configuration** section of the blog. The first menu shows your user accounts personal preferences, the latter only sets the default option for new authors or the default option when installing. In the upcoming 0.9 version the option will only be visible in the Personal Configuration screen.

## When I use mod_rewrite URL rewriting, I cannot access any files in subdirectories of my Serendipity install! If I go to any of my own URLs it keeps redirecting me to my blog plage!

You need to put a .htaccess file into each subdirectory which is not related to Serendipty. The only contents of this file needs to be "rewriteengine Off". With this you tell the Webserver that the directory is independent from Serendipity and thus no Serendipity Rewrite-Rules shall be applied

## The search doesn't work!

The search on mysql systems uses the internal fulltext mechanism of MySQL. That system only starts working to find entries once you've made a couple of them. With a single entry, the search never shows a result. Dummy entries only containing "test test test" will also not be found. This behaviour is documented on http://dev.mysql.com/doc/mysql/en/fulltext-search.html

## What are the file permissions required to run Serendipity?

Serendipity's installation usually ships with propper permissions within the tarball.

Upon installation, Serendipity needs to create the files **.htaccess** and **serendipity_config_local.inc.php**. That is why the core directory needs to be writable for your webserver user (775 or 777 on some installations). Those two files will then be created in a way, that Serendipity can always write to those files later on. It needs to be able to do that for upgrading purposes - so leave those files writable after installation. You can then re-adjust your core directory to be only executable for the webserver user (i.e. 755).

Then serendipity needs to be able to constantly have write and privileges for the directories **templates_c**, **archives** and **uploads** plus all the files contained there. templates_c is an empty directory when installing Serendipity and it holds the compiled Smarty Templates. **archives** holds additional temporary files, and **uploads** contains your media files. Always set those folders and files to be writable for your server.

If you are planning to use Spartacus, you also need to make the **plugins** directory writable for the webserver user, so that plugins can be downloaded to that directory. Also make **templates** writable for the webserver if you plan to download additional styles via Spartacus. The Spartacus configuration offers you an interface to tell which permissions (chmod/chown) it shall perform for those downloaded files.

To sum it up: After installation, the only permissions you may want to adjust are those of the core directory, which you can set to 755 (of course this depends on your user/group configuration - you need to know that on your own). 

If you're especially paranoid, also change the **serendipity_config_local.inc.php** and **.htaccess** files to be only readable for the webserver. But then you need to remember to make those files writable when you upgrade Serendipity!

## When I save/preview an entry, it shows my admin panel in the preview section! Or: I need to login after each page request, and can't perform any action!

This can happen, if your Webserver/PHP is not properly configured to use HTTP Cookie sessions. Serendipity requests PHP to have HTTP Session cookies enabled, and the session extension properly working.

## The dates / weeknames are not displayed according to my language, but all other things display correctly!

To display date and time formats specific to national conventions, Serendipity uses a system called "Locales". This system is both available on Linux and Windows and adjusts the native language of the system. A system can contain multiple locales to choose from, and Serendipity employs them via the "LOCALES" constant found in your lang/serendipity_lang_XX.inc.php.

This means, one of the Locales specified there need to be existing on your server. You will need to ask your System administrator to install the locale you want to use or install it yourself with tools like "localegen".

# Upgrading

## How do I upgrade Serendipity?

*NOTE*: When your server runs PHP 5.3+ you must use at least Serendipity 1.5.5. If you want to move an earlier version of Serendipity to a new server running PHP 5.3+, you should first upload all your old files, and then immediately upload the new Serendipity version files to your host, and then proceed the upgrade as usual.

Serendipity has an automatted upgrade system. You can upgarde from any Serendipity version starting from 0.4 to the latest version, even nightlies/snapshots - and you will not loose any previous content. First of all, you should make a backup of your existing installtion by copying your whole directory and by creating a Database dump (use phpMyAdmin or something similar). 

After you have done that, you only need to extract the new Serendpipity release files over your old directory. Make sure that you never delete the serendipity_config_local.inc.php file, as it contains the most vital Serendipity configuration data.

Then go to your Serendipity Admin Panel, and you will see the Serendipity upgrader.

It will tell you which version you are running, and which tasks are going to get executed. That means, some PHP functions can be called, and some DB updates are called. The DB update files are stored in the `sql/` subdirectory of Serendipity.

Before you continue the process, make sure that the PHP/Apache webserver is able to write to your `serendipity_config_local.inc.php` and `.htaccess` file, and that the directory `templates_c/` exists and is writable. You can change permissions using chmod commands in your favourite FTP or SSH client.

Also make sure that your configured database users are privileged to execute ALTER TABLE, CREATE TABLE and CREATE INDEX commands!

When you have ensured all the things mentioned, you can click on the Upgrade button.

If you encounter any errors on the next page, write them down carefully and go to ask the Serendipity Forums for help. Most errors happen, if your SQL user does not have sufficient privileges, or one of the mentioned files could not be written.

If you are upgrading from Serendipity versions older than 1.2, you might need to instruct your browser to clear your currently set Cookies for your Blog so that you can properly re-login. You might also want to flush your browser's cache (CSS, images, javascripts) after upgrading to make sure, the new files get loaded properly.

## My upgrade failed! (or: I cannot change permissions of my files)

Even though the Serendipity Team strifes to have the best upgrading facility, there might always been errors and you might want to re-execute your update.

In most cases it is no problem to re-execute an update of Serendipity. If you upgraded from Serendipity 0.8.5 to 0.9 for example, and your MySQL user had not sufficient privileges, you want to re-execute all SQL statements again. 

The easiest method would be to restore the backup you made previously, and then run the upgrade again. If you haven't made the backup or want to make it faster, you can do that by:

1. Edit your `serendipity_config_local.inc.php` file. Usually that file is only writable for the Webserver. If you cannot modify it via SSH/FTP, you can create a simple fixperm.php script in your Serendipity directory with these contents:

**fixperm.php**

```
<?php
chmod('/path/to/your/serendipity/serendipity_config_local.inc.php', 0777);
?>
```

On some hosts, the user as which your webserver runs is different than the user that you have FTP/SSH privileges for. In usual environments, your FTP user should be within the same group like your webserver user, so that you are able to modify files with the right umask. However, some providers might not think about that and thus deny you access to your own files. In those cases you also need the script above to change file permissions if you need to manually edit/delete a special file. Note that plugins copied by spartacus and images uploaded via the Serendipity Admin suite are affected by the same problem. You can change the default file/directory of the Spartacus plugin though by it's configuration.

Then call that simple script via http://yourblog/serendipity/fixperm.php and the filepermissions will be changed so that you can write the file. For security reasons, change the permissions of the config file back to what it was previously after upgrading (like 0744 or so).

2. Now that you can edit the serendipity_config_local.inc.php file, locate the string

`$serendipity['versionInstalled'] = '0.9';`


3. Just set the version to "0.8.5" or whatever version you upgraded from, then save the file and re-enter your Serendipity Config Panel. The upgrader will say hello to you once again and re-execute the steps!

## How can I move an existing Serendipity installation to a different place (server or path)?

[This shows how to move Serendipity to a new directory, with pictures.](http://www.s9y.org/198.html)

First, you copy over all files from your old server to the new server. Especially pay attention that you copy the .htaccess and serendipity_config_local.inc.php files as well. If those files are not readable by your FTP user, you can use the little fixperm.php script from the "My upgrade failed!" section above to fix the permissions so that you can read the files.

Second you must migrate the database. Use a tool like phpMyAdmin to create a db SQL dump file. Re-import that file on your new server.

On your new server, make sure that all the permissions are set like they were on the old provider. Especially make sure that the files serendipity_config_local.inc.php and .htaccess are read+writable by the server, and the directory `templates_c/` and `uploads/` is read+writable by the server.

Now edit the serendipity_config_local.inc.php file, you might need to insert the new DB user account data into that file. You also might need to edit your .htaccess file to set the new paths properly.

Now you should be able to re-login into the Serendipity Admin panel without a problem. Go to your configuration and see if you need to reconfigure any of the paths listed.

If you had a lot entries or HTML nuggets where you manually used the path of Serendipity, and this has now changed, you need to manually edit the articles to insert the new URL!

Then you should be done.

# Operating Serendipity

## I've changed my SQL user password and now can no longer login to Serendipity!

If you change your SQL account password, you must change it for Serendipity as well. Go and edit your serendipity_config_local.inc.php file to set the new password there. You might then also need to check your serendipity_config DB table and set the new password for the "dbPassword" row there as well, and then you can already access your blog again.

## Help, my blog looks ugly, no stylesheets seem to be applied, and I get HTTP 404 errors or even 500 internal server errors all the way when browsing the page!

Serendipity offers several forms of URL Rewriting, to make your URLs look pretty. So instead of having the URL "http://localhost/index.php?article=1" you can have something nice like "http://localhost/archives/1-myentry.html".

To achieve this, Serendipity either uses mod_rewrite or the Apache Errorhandling functionality. Both may not be available on all hosts, and require a certain setup ("Allowoverride All") to apply rewriting within your .htaccess file. Serendipity tries to autodetect your best setting in the installer, but under certain circumstances, this might fail. Or you might even  change the suggested setting during installation without knowing the problems.

The problems of enabling URL Rewriting without meeting the requirements are the problems you're now having: Stylesheet URLs cannot be find, article links cannot be found and so on, or even your .htaccess might contain "dangerous" settings.

You can easily fix this by entering your admin panel with the "http://localhost/serendipity_admin.php" URL. Then enter the configuration area, and set "URL Rewriting" to "None" and save your config. Make sure your .htaccess file is writable!

Another problem that calls this symtopms is that your .htaccess file might not be parsed/readable by the webserver. Check your permissions or contact your provider to check the Apache errorlogs for detailed information.

What can also affect the symptom of "no stylesheets are used" is if you enabled the 'embed' directive in Serendipity Configuration. As mentioned in the Configuration, if you enabled this setting, you must take care for the HTML head and body sections for yourself, Serendipity only outputs the straight content and nothing different. So either disable the embed mode, or use it as intended. :-)

## When I try to send trackbacks, they always fail!

Sending trackbacks is explained here [Trackbacks/Pingbacks](http://www.s9y.org/48.html) in the section "How to create a trackback". This chapter also explains, why trackbacks might fail.

## My IE browser displays PNG images weirdly and I get "Access Denied" Javascript errors!

Serendipity requires you to configure the HTTP URL you are using to access your blog within the Configuration section. If you entered "http://www.example.com/" in that configuration field, you are required to only use that URL to access your blog. Else, plugins like the Browsercompatibility plugin (that loads a javascript for showing transparent PNG images for the IE) fail to load their scripts because access through domain boundaries is not allowed.

The solution is to either properly use and configure the domains you want to use, or to enable the "HTTP-Host autodetection" in your Serendipity Configuration. If you enable this, Serendipity will always use the same host for follow-up request like your visitor initially used.

## What is "Spartacus"? How do I install Spartacus?

Spartacus is the name of the Serendipity Online Plugin Repository, and the name of the correspondig plugin of your Serendipity Weblog that connects to this repository.

You can view all the plugins of that repository on http://spartacus.s9y.org.

To install the plugin on your Serendipity Installation, follow these instructions:

After installation, you go to your serendipity admin interface. 

There you click on "Configure Plugins". Then go down to the page and locate the link "Click here to install event plugins". Click that link.

You will now see a list of default Serendipity Event Plugins you can install. Locate the Plugin called "Spartacus" and click on the install button next to it.

After you have done that you will see the configuration screen of that plugin. You can leave all settings as-is. If you later have any troubles with download you might want to play with the settings offered there.

Now the spartacus plugin is activated and will fetch a list of plugins the next time you choose to install a plugin. So go to the plugin manager again, click on the "Click here to install event plugins" link again. Now Spartacus should fetch plugins from the remote repository and display them to you.

If you get any network errors or download failures, either the repository mirror servers (SourceForge.Net or Netmirror.org) are down. Or your server might be firewalled and does not allow outgoing connections, in which case you'll need to talk with your provider about this.

Now you can click on any plugin to fetch it; Spartacus plugins are indicated by a plugin with an additional arrow.

## How can my users subscribe to an entry?

It's possible to get an email whenever new comments are submitted to an entry by leaving your email address with a comment and checking the subscribe box. 

If your users don't want to leave comments, they'll have to use the Comments RSS feed.  The default templates don't supply the comment feed for individual comments; to do this, you'll need to edit entries.tpl and insert a line like this:

```
<a href="
http://myblog/myblog_path/rss.php?version=2.0&type=comments&
cid={$entry.id}">RSS feed for this entry's comments</a>
```

# Customization request

## I don't want to have comments and trackbacks in my blog!

First off, blogging is about getting contributions and comments. Having said that, you can turn of the comments and trackbacks by editing your entries.tpl template and removing the trackback/comment sections. Or you can also even use CSS to set "display: none" for those regions.

You can turn off to receive trackbacks/comments in the configuration of your spamblock plugin. To totally ban trackbacks from your site, you can edit the serendipity file **comment.php** After the first <?php add this:

`if ($_REQUEST['type'] == 'trackback') die('Disabled');`

The other way you have is to edit your **.htaccess** file and add a mod_rewrite (if your server supports that, of course) rule to block calls to your comment.php:

```
((Rewrite Cond)) %{QUERY_STRING} ^.*type=trackback.*$ [NC]

((Rewrite Rule)) ^.*comment.php.*$ - [F]
```

If you do not want your blog to send outgoing trackbacks, you can edit your **serendipity_config_local.inc.php** file (or **serendipity_config.inc.php**, just as you prefer) and insert this line:

`$serendipity['noautodiscovery'] = true;`

This will make Serendipity not send any outgoing trackbacks.

## I want trackbacks and comments, but spammers are killing my blog!

As Grischa explains, [you can stop trackback spam with some custom .htaccess rules](http://blog.brockha.us/index.php?/archives/69-TrackBack-SPAM-Bots-abwehren.html). Just add this to the bottom of the .htaccess in your Serendipity directory:

```
# BEGIN ANTI SPAM
<Files comment.php>
 # short 403 error-message
 ErrorDocument 403 "403 Forbidden
 
 # Mark bots whose user agent name is starting with "TrackBack" as SPAM
 BrowserMatch ^TrackBack is_trackback_spammer
 # Mark bots don't sending a user agent name at all as SPAM
 BrowserMatch ^$ is_trackback_spammer
 
 # Lock them out
 Order Allow,Deny
 Allow from all
 deny from env=is_trackback_spammer
</Files>
# END ANTI SPAM
```

This filters out lots of unwanted messages before Serendipity even gets started, saving you some CPU resources and reducing your log size.

## I want to add some links / HTML to my blog!

You can add custom pieces of HTML code or links to any special pages to your blog sidebar by installing a "HTML Nugget" sidebar plugin. There you can enter arbitrary HTML or ((Javascript)).

The other possibility is to use a editor to edit your *.tpl template files and place custom HTML inside the files where you want it. Like you can add custom headers into the index.tpl file.

When you paste javascript code into a .tpl file, you must make sure to replace all occurences of "{" to "{ldelim}" and "}" to "{rdelim}". Smarty requires you to do that, because it uses the {} characters for special instructions. If you forget to escape this, you get an error like

`Fatal error: Smarty error: [in file:...]: syntax error: unrecognized tag: ..."`

If you paste huge amounts of ((Java Script)), you can also enclose the whole block with {literal}...{/literal} so that Smarty will ignore any { and } instructions within that block.

## How do I add PHP code to my templates?

Many ways lead to rome! 

### The "Easy and cool" way

The coolest solution for you is to register a custom smarty function. For that, create (or edit) a file "config.inc.php" inside your template directory. Then register your markup like this:

```
<?php
$serendipity['smarty']->register_function('my_custom_function', 'my_custom_function');

function my_custom_function($params, &$smarty) {
  return 'I customized this: ' . $params['stuff'];
}
?>
```

Then you can just edit your template (index.tpl, for example) and place this piece of code somewhere:

`{my_custom_function stuff="Cool!"}`

With the same way, you can also include foreign PHP applications:

```
<?php
$serendipity['smarty']->register_function('my_custom_function', 'my_custom_function');

function my_custom_function($params, &$smarty) {
  include 'my_existing_tool.php';
  return my_existing_function($params);
}
?>
```

### The "hackish but even easier" way

Another way to embed your custom PHP code is to use Smarty's {php} tags. For that you first need to disable the Smarty security setting within your config.inc.php template file:

```
<?php
$serendipity['smarty']->security = false;
?>
```

Then you can use this in your index.tpl:

```
{php}
include "my_existing_tool.php";
{/php}
```

### The "elegant way"

The third, and actually the coolest way is to create your own plugins that deal with content. You can then access them with {serendipity_hookPlugin ...} smarty calls.

Read more about that [here](http://www.s9y.org/78.html).