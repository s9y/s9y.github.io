# configuration

-   [Database settings](#A2)
-   [Paths](#A3)
-   [Permalinks](#A4)
-   [General settings](#A5)
-   [Appearance and options](#A6)
-   [Image Conversion Settings](#A7)


## <a name="A2"></a>Database settings

Most configuration choices are saved in your database, however database settings are saved on the host server in a file named serendipity\_config\_local.inc.php. Serendipity cannot function without these key pieces of information.

**Database type** [list] MySQL PostgreSQL MySQLi SQLite

**Database host** [string] The hostname for your database server.

**Database user** [string] The username used to connect to your database.

**Database password** [protected] The password matching the database username.

**Database name** [string] The name of your database.

**Database table prefix** [string] Prefix for the table names, i.e. serendipity\_

**Use persistent connections** [boolean] Enable the usage of persistent database connections, read more [here](http://us2.php.net/manual/en/features.persistent-connections.php). This is normally not recommended.

**Enable DB-charset conversion** [boolean] Issues a MySQL "SET NAMES" query to indicate the required charset for the database. Turn this on or off, if you see weird characters in your blog.

## <a name="A3"></a>Paths

Various paths to different essential folders and files. Don't forget trailing slashes for directories!

**Full path** [string] The full and absolute path to your serendipity installation.

**Upload path** [string] All uploads will go here, relative to the 'Full path' - typically 'uploads/'.

**Relative path** [string] Path to serendipity for your browser, typically '/serendipity/'.

**Relative template path** [string] The path to the folder containing your templates - Relative to the 'relative path'.

**Relative upload path** [string] Path to your uploads for browsers - Relative to the 'relative path'.

**URL to blog** [string] Base URL to your serendipity installation.

**Autodetect used HTTP-Host** [boolean] If set to "true", Serendipity will ensure that the HTTP Host which was used by your visitor is used as your BaseURL setting. Enabling this will let you be able to use multiple domain names for your Serendipity Blog, and use the domain for all follow-up links which the user used to access your blog.

**Index file** [string] The name of your serendipity index file.

## <a name="A4"></a>Permalinks

Defines various URL patterns to define permanent links in your blog. It is suggested that you use the defaults; if not, you should try to use the %id% value where possible to prevent Serendipity from querying the database to lookup the target URL.

**Permalink Entry URL structure** [string] Here you can define the relative URL structure beginning from your base URL to where entries may become available. You can use the variables %id%, %title%, %day%, %month%, %year% and any other characters.

**Permalink Author URL structure** [string] Here you can define the relative URL structure beginning from your base URL to where entries from certain authors may become available. You can use the variables %id%, %realname%, %username%, %email% and any other characters.

**Permalink Category URL structure** [string] Here you can define the relative URL structure beginning from your base URL to where entries from certain categories may become available. You can use the variables %id%, %name%, %parentname%, %description% and any other characters.

**Permalink RSS-Feed Category URL structure** [string] Here you can define the relative URL structure beginning from your base URL to where RSS-feeds from certain categories may become available. You can use the variables %id%, %name%, %description% and any other characters.

**Permalink RSS-Feed Author URL structure** [string] Permalink RSS-Feed Author URL structure.

**Path to archives** [string] Path to specific entries

**Path to archive** [string] Path to date range of entries, such as by month, year, etc.

**Path to categories** [string] Path to all entries by their assigned category.

**Path to authors** [string] Path to all entries by author.

**Path to unsubscribe comments** [string] Path for visitor to unsubscribe to all comments.

**Path to delete comments** [string] Path for author or admin to delete comments.

**Path to approve comments** [string] Path for author or admin to approve comments.

**Path to RSS Feeds** [string] Path to RSS syndication feeds.

**Path to single plugin** [string] Path to each specific plugin.

**Path to admin** [string] Path to Administration Suite.

**Path to search** [string] Path to search.

**Path to comments** [string] Path to comments.

## <a name="A5"></a>General settings

Customize how Serendipity behaves

**Blog name** [string] The title of your blog.

**Blog description** [string] Description of your blog.

**Blog's E-Mail address** [string] This configures the E-Mail address that is used as the "From"-Part of outgoing mails. Be sure to set this to an address that is recognized by the mailserver used on your host - many mailservers reject messages that have unknown From-addresses.

**Allow users to subscribe to entries?** [list] Allow users to subscribe to an entry and thereby receive a mail when new comments are made to that entry. Yes No.

**Use Double-Opt In for comment subscriptions?** [boolean] If enabled, when a comment is made where the person wants to be notified via e-mail about new comments to the same entry, he must confirm his subscription to the entry. This Double-Opt In is required by German law, for example.

**Use Tokens for Comment Moderation?** [boolean] If tokens are used, comments can be approved and deleted by clicking the email links without requiring login access to the blog. Note that this is a convenience feature, and if your mails get hijacked, those people can approve/delete the referenced comment without further authentication.

**Language** [list] Select the language for your blog.

**Charset selection** [list] Here you can toggle UTF-8 or native (ISO, EUC, ...) character sets. Some languages only have UTF-8 translations so that setting the charset to "Native" will have no effects. UTF-8 is suggested for new installations. Do not change this setting if you have already made entries with special characters - this may lead to corrupt characters. Be sure to read more on [http://www.s9y.org/index.php?node=46](http://www.s9y.org/index.php?node=46) about this issue.

**Calendar Type** [list] Choose your desired Calendar format.

**Use visitor's browser language as default** [boolean] Use visitor's browser language as default.

**Enable Plugin ACL for usergroups?** [boolean] If the option "Plugin ACL for usergroups" is enabled in the configuration, you can specify which usergroups are allowed to execute certain plugins/events.

## <a name="A6"></a>Appearance and options

Customize how Serendipity looks and feels.

**Entries to display on frontpage** [string] Number of entries to display for each page on the frontend.

**Entries to display in Feeds** [string] Number of entries to display for each page on the RSS Feed.

**How should search-results be sorted?** [list] Choose by Date (most recent first) or Relevance (number of hits for the searched term in a single entry).

**Activate strict RFC2616 RSS-Feed compliance** [list] NOT Enforcing RFC2616 means that all Conditional GETs to Serendipity will return entries last modified since the time of the last request. With that setting to "false", your visitors will get all articles since their last request, which is considered a good thing. However, some Agents like Planet act weird, if that happens, at it also violates RFC2616. So if you set this option to "TRUE" you will comply with that RFC, but readers of your RSS feed might miss items in their holidays. So either way, either it hearts Aggregators like Planet, or it hurts actual readers of your blog. If you are facing complaints from either side, you can toggle this option. Reference: [SourceForge](http://sourceforge.net/tracker/index.php?func=detail&aid=1461728&group_id=75065&atid=542822).

**Use gzip compressed pages** [boolean] To speed up delivery of pages, we can compress the pages we send to the visitor, given that his browser supports this. This is recommended.

**Enable use of popup windows** [boolean] Do you want to use popup windows for comments, trackbacks et al? Yes/No.

**Is serendipity embedded?** [boolean] If you want to embed serendipity within a regular page, set to true to discard any headers and just print the contents. You can make use of the indexFile option to use a wrapper class where you put your normal webpage headers. See the README file for more information! Yes No.

**Make external links clickable?** [boolean] "no": Unchecked external links (Top Exits, Top Referrers, User comments) are not shown/shown as plain text where applicable to prevent google spam (recommended). "yes": Unchecked external links are shown as hyperlinks. Can be overridden within sidebar plugin configuration! Yes No.

**Enable referrer tracking?** [boolean] Enabling the referrer tracking will show you which sites refer to your articles. Today this is often abused for spamming, so you can disable it if you want.

**Blocked Referers** [string] Are there any special hosts you want not to show up in the referers list? Separate the list of hostnames with ';' and note that the host is blocked by substring matches!

**URL Rewriting** [list] pretty URLs for your blog and make it better indexable for spiders like google. The webserver needs to support either mod\_rewrite or "[Allow Override](http://httpd.apache.org/docs/1.3/mod/core.html#allowoverride) All" for your serendipity dir. The default setting is auto-detected.

**Server time Offset** [string] Enter the amount of hours between the date of your webserver and your desired time zone.

**Show future entries** [boolean] If enabled, this will show all entries in the future on your blog. Default is to hide those entries and only show them if the publish date has arrived. Yes/No.

**Apply read-permissions for categories** [boolean] If enabled, the usergroup permission settings you setup for categories will be applied when logged-in users view your blog. If disabled, the read-permissions of the categories are NOT applied, but the positive effect is a little speedup on your blog. So if you don't need multi-user read permissions for your blog, disable this setting.

## <a name="A7"></a>Image Conversion Settings

Enter general information about how serendipity should handle Images

**Use Imagemagick** [boolean] Do you have image magick installed and want to use it to resize images? Yes No.

**Path to convert binary** [string] Full path & name of your image magick convert binary.

**Thumbnail suffix** [string] Thumbnails will be named with the following format: original.[suffix].ext.

**Thumbnail max size** [string] Maximum size of thumbnail in constrained dimension.

**Thumbnail constrained dimension** [list] Dimension to be constrained to the thumbnail max size. The default "Largest" limits both dimensions, so neither can be greater than the max size; "Width" and "Height" only limit the chosen dimension, so the other could be larger than the max size.

**Max. file upload size** [string] Enter the maximum filesize for uploaded files in bytes. This setting can be overruled by server-side settings in PHP.ini: upload\_max\_filesize, post\_max\_size, max\_input\_time all take precedence over this option. An empty string means to only use the server-side limits.

**Max. width of image files for upload** [string] Enter the maximum image width in pixels for uploaded images.

**Max. height of image files for upload** [string] Enter the maximum image height in pixels for uploaded images.

**Enable on-the-fly media synchronization** [boolean] If enabled, Serendipity will compare the media database with the files stored on your server and synchronize the database and directory contents.

**Allow dynamic image resizing?** [boolean] If enabled, the media selector can return images in any requested size via a GET variable. The results are cached, and thus can create a large filebase if you make intensive use of it.

**Import EXIF/JPEG image data** [boolean]If enabled, existing EXIF/JPEG metadata of images will be parsed and stored in the database for display in the media gallery.

**Media properties** [string] Enter a list of ";" separated property fields you want to define for each media file(You can append ":MULTI" after any item to indicate that this item will contain long text instead of just some characters).

**Media keywords** [string] Enter a list of ";" separated words that you want to use as pre-defined keywords for media items.