# Using Plugins

* [General Usage](#A2)
  * [What are plugins useful for?](#A3)
    * [Sidebar plugins](#A4)
    * [Event plugins](#A5)
  * [Installing and configuring plugins](#A6)
  * [Installing external Plugins](#A7)
    * [Using SPARTACUS](#A8)
    * [Installing a plugin via CVS checkouts](#A9)
    * [Downloading a plugin](#A10)
* [Available internal sidebar plugins bundled with s9y](#A11)
  * [Calendar](#A12)
    * [Configuration](#A13)
  * [Quicksearch](#A14)
  * [Archives](#A15)
  * [Top Referrers](#A16)
    * [Configuration](#A17)
  * [Top Exits](#A18)
    * [Configuration](#A19)
  * [Syndication](#A20)
    * [Configuration](#A21)
  * [Blog Administration](#A22)
  * [Powered by](#A23)
  * [HTML Nugget](#A24)
    * [Configuration](#A25)
  * [Categories](#A26)
    * [Configuration](#A27)
  * [Remote RSS Feed](#A28)
    * [Configuration](#A29)
* [Available external sidebar plugins bundled with s9y](#A30)
  * [Comments](#A31)
    * [Configuration](#A32)
  * [Creative Commons](#A33)
  * [Event Wrapper](#A34)
    * [Configuration](#A35)
  * [Recent Entries](#A36)
    * [Configuration](#A37)
  * [Shoutbox](#A38)
    * [Configuration](#A39)
  * [Template Dropdown](#A40)
    * [Configuration](#A41)
* [Available event plugins bundled with s9y](#A42)
  * [Content Rewrite](#A43)
    * [Configuration](#A44)
  * [Markup plugins: Emoticate, BBCode, NL2BR, s9ymarkup, textile, textwiki](#A45)
    * [Configuration](#A46)
  * [Track Exits](#A47)
    * [Configuration](#A48)
  * [Mailer](#A49)
    * [Configuration](#A50)
  * [Statistics](#A51)
    * [Configuration](#A52)
  * [Template Chooser](#A53)
  * [Weblogping](#A54)
    * [Configuration](#A55)
  * [HTMLValidator](#A56)
* [Extending Plugins](#A57)



## <a name="A2"></a>General Usage


### <a name="A3"></a>What are plugins useful for?

The Serendipity blogging platform is designed to make it easy for blog owners to create and manage blog entries. Plugins allow blog owners to extend this functionality and present even more information to their site visitors. Two types of plugin exist for Serendipity, *sidebar plugins*, and *event plugins*.

#### <a name="A4"></a>Sidebar plugins

Sidebar plugin are visible in either the left or right sidebar on your blog. Sidebar plugins are particularly useful for displaying small chunks of information such the calendar, a list of recent comments to your blog entries or a fully customized HTML block (*nugget*). Sidebar plugins are usually very simple, often only containing links, but they can be more complex like for example the shoutbox plugin.

#### <a name="A5"></a>Event plugins

Event plugins make changing the way Serendipity manipulates your data easy and are a powerful way of tweaking s9y's internal power. For every action performed by Serendipity (like displaying an entry, storing an entry, editing an entry) our code is written to include special *hooks* that execute event plugins. For example, event plugins can be used to adjust your favorite textmarkup. You can choose from a list of several (partially concurring) markups: Wiki, BBCode, HTML, s9ymarkup.

Those hooks execute your plugin, which performs its assigned duty, then returns the data to s9y for completion of the task (like saving the entry).

For a list of hooks, see our [Plugin API](/40.html). With just a single line of code we can add event hooks on any place you want. Just be creative. :-)

### <a name="A6"></a>Installing and configuring plugins

Plugins can only be installed and configured from within the admin suite. Click the "Configure Plugins" link to display the list of all installed sidebar and event plugins. Serendipity is preconfigured with several plugins already installed, with many more available in your plugins folder.

You'll notice a number of options for each installed plugin, a check box to uninstall the plugin, an icon to configure the plugin, a permissions drop down. You can adjust the order of your plugins by moving them up or down, or even changing which sidebar the plugin's output will appear in. If you enabled enhanced JS (javascript), you can drag and drop each plugin exactyly where you want it. If you do not have JS enabled in your profile, you will see a drop down allowing you to specify *left*, *right*, or *hidden* attributes for your plugin. You may have additional sidebar choices if enabled by your template.

Event plugins aren't displayed in your sidebar so their position relative to each other adjust the order in which Serendipity executes them. Some event plugins need to be executed before others to ensure they work correctly.

Installing new plugins of either type is as simple as clicking the "Click here to install a new sidebar plugin" or "Click here to install a new event plugin" links at the top of each section. Now you are presented with a complete list of all plugins available to you, and clicking the icon to the right of the plugin details is all that is required to install your new plugin.

Once Serendipity has successfully installed your new plugin you will be taken to the plugin configuration screen where you can change the way the plugin operates. The level of complexity of the plugin will determine how much configuration is required, in some cases none is required. Saving your changes takes you back to the list of installed plugins.

If you wish to configure a plugin you have previously installed, simply click the name of the plugin to be taken to that plugin's configuration page. Some very simple plugins have no configuration screen.

### <a name="A7"></a>Installing external Plugins

We have a large load of external plugins available for your download. See the List of our Plugins at [http://spartacus.s9y.org/.](http://spartacus.s9y.org/.)

There are multiple ways to install an external plugin:

#### <a name="A8"></a>Using SPARTACUS

Since Serendipity 0.8 we offer a Event Plugin called "SPARTACUS". This is a repository manager plugin which you can install. It will then hook itself into the plugin manager and adds a new Link "Click here to fetch a plugin from the Remote Plugin Repository".

If you click on that link, Serendipity will connect itself to our Plugin Repository, fetch a list of available plugins and offer those to you. Then you can click on the plugin to install just like you do with bundled plugins, and the files will automatically be downloaded.

There are 3 important issues to note with this somewhat experimental plugin:

1. Spartacus requires an outgoing connection to the [Source Forge](/index.php?cmd=newdoc&newdocname=Source+Forge&node=38&refnode=45)**?**.Net servers. That means your webserver shall not block HTTP requests.

2. The [Source Forge](/index.php?cmd=newdoc&newdocname=Source+Forge&node=38&refnode=45)**?**.net ViewCVS server is sometimes a bit laggy or unresponsive. It can happen that you get error messages like "File not found" or the list of plugins could not be downloaded. In this case, please have patience and try again after some time.

3. Spartacus needs write privileges to your /plugins directory so that it can install new files. Thus you will need to change the directory privileges of /plugins to something like 777, depending on your installation. If you do not do this you will get error message like "Could not create file...".

#### <a name="A9"></a>Installing a plugin via CVS checkouts

You can checkout our "additional\_plugins" repository using CVS into a seperate directory. Then you could create a symbolic link of that additional\_plugins directory into your serendipity/plugins/ directory. Serendipity will then detect the nested new plugin lists and offer you the plugins in the Installation facility.

This requires some basic Linux/Windows-Shell knowledge and knowledge how to use CVS.

#### <a name="A10"></a>Downloading a plugin

You can download the plugin you want either via the [ViewCVS file browser](http://cvs.sourceforge.net/viewcvs.py/php-blog/additional_plugins/) or by downloading our full plugin snapshot at [Netmirror.org](http://www.netmirror.org/mirror/serendipity/additional_plugins.tgz).

A plugin always consists of a single directory like "serendipity\_event\_trackback" with at least one file in it. If you use the ViewCVS facility you can click on each single file and then on the following page click on the first "Download" link which fetches the latest version of that file. Save that file on your Serendipity installation and place them all into a subdirectory of your /plugins directory. First create a directory with the same name as the plugin ("serendipity\_event\_trackback"). Then save the file "serendipity\_event\_trackback.php" inside that directory.

After you have downloaded all files you can go to your Serendipity Plugin manager and on the list of available plugins you will see your latest acquired plugin. :-)

The same applies when having downloaded our Netmirror Snapshot file. Just extract the tarball somewher and copy the files and directory you want to your /plugins subdirectory of the Serendipity installation.


## <a name="A11"></a>Available internal sidebar plugins bundled with s9y

Here's a list of internal s9y plugins. Those cannot be removed from your installation:

### <a name="A12"></a>Calendar

Displays a browseable calendar in your sidebar. Days on which you made entries are highlighted and link to a page where those entries are shown.

#### <a name="A13"></a>Configuration

* **beginningOfWeek**: You can adjust on which day your week starts (depending on your nationality)


### <a name="A14"></a>Quicksearch

Shows a small form field where a user can insert search words and then gets a list of matching entries you made. MySQL users please note that this plugin requires MySQL version 3.23.23 or later.


### <a name="A15"></a>Archives

Shows a linked list of the last 3 months where you made entries.


### <a name="A16"></a>Top Referrers

Shows a list of which pages refer to your blog.

#### <a name="A17"></a>Configuration

* **limit**: You can limit how many pages should be shown. Defaults to 10 items.


### <a name="A18"></a>Top Exits

Together with the "Track Exits" event plugin you can encode all external URLs you refer to in your articles. When a user then clicks on those links, s9y counts the amount of clicks. This plugin then displays a list of the last top clicks on external targets.

#### <a name="A19"></a>Configuration

* **limit**: You can limit how many pages should be shown. Defaults to 10 items.


### <a name="A20"></a>Syndication

Displays a list of available syndication formats. This is a list of links to RSS feeds.

#### <a name="A21"></a>Configuration

* **RSS versions**: You can check which syndication formats you want to make available to your audience: RSS 0.91, 1.0, 2.0 or Atom 0.3.

* **Prevent caching**: Usually your RSS feed is cached via [Conditional Get](/40.html). With this setting you can turn of caching

* **RSS fields**: There are a bunch of special fields which can be embedded into your blog, like your E-Mail adress for error reports, a small image depicting your site and others


### <a name="A22"></a>Blog Administration

Shows a link to the administration/backend area of your weblog.


### <a name="A23"></a>Powered by

This shows our small "powered by" logo inside your blog. So that everyone can see you're an elite-blogger. ;-)


### <a name="A24"></a>HTML Nugget

This is maybe one of the most powerful plugins you may want to use to customize your blog. Remember that you can add as many nugget plugins to your site as you want, you are not limited to one.

The content of the HTML nugget can be any HTML/JavaScript code you like.

#### <a name="A25"></a>Configuration

* **Content**: Here you can edit the content with a large textarea. You can copy&paste existing code here, like blogchalk code or a "I am currently reading" box.


### <a name="A26"></a>Categories

Shows a list of the categories you created. Then a user can click on the link and only get items of that category.

#### <a name="A27"></a>Configuration

* **authorid**: You can select from which user's categories should be shown here. This can be used to insert multiple category plugins into your sidebars, each showing the categories of a special user (in multi-user blogs).


### <a name="A28"></a>Remote RSS Feed

Enables you to display a foreign RSS feed embedded into your blog. You can insert multiple plugins of this type to display multiple feeds. The feeds are cached and only updated as soon as the "time to live" of the cache gets hit.

#### <a name="A29"></a>Configuration

* **number** - Number of feed items to display (defaults to all items)
* **dateformat** - Customize the dateformat for the items
* **title** - Title in the sidebar
* **rssuri** - The URI of the foreign RSS feed
* **target** - A HTML anchor target
* **cachetime** - Time to Live of the cache. Defaults to 3 hours.


## <a name="A30"></a>Available external sidebar plugins bundled with s9y

s9y also stores external plugins inside the *plugins* subdirectory structure. There you can add and remove subdirectories to adjust which and how many plugins you want to be able to add.

### <a name="A31"></a>Comments

Displays a list of recently submitted comments to your blog

#### <a name="A32"></a>Configuration

* **limit**: How many comments should be shown.
* **chars/words**: You can restrict the amount of chars/words for each comment to only show an excerpt as a preview


### <a name="A33"></a>Creative Commons

This plugin is paired with the *Event plugin* called the same. Depending on the config you made to the event plugin, this shows your chosen Creative Commons License data on your sidebar.


### <a name="A34"></a>Event Wrapper

Usually event plugins do not have sidebar output associated with them. But there's always the future possibility, they could have. Like the *Content Rewrite Event Plugin*. That plugin generates a list of words (some kind of glossary). You must use the *Event Wrapper sidebar plugin* if you want to show the output of the event plugin inside your sidebar.

#### <a name="A35"></a>Configuration

* **Event plugin**: You need to choose the event plugin from which you want the data to be displayed


### <a name="A36"></a>Recent Entries

Shows a quick list of your recently made entries.

#### <a name="A37"></a>Configuration

* **limit**: How many entries should be shown.


### <a name="A38"></a>Shoutbox

Shows a simple form area where users can enter any comment they want. Those comments get immediately displayed on the sidebar instead of being associated to an entry as a comment.

#### <a name="A39"></a>Configuration

* **limit**: How many "shouts" should be shown.
* **chars/words**: You can restrict the amount of chars/words for each shout to only show an excerpt as a preview


### <a name="A40"></a>Template Dropdown

This plugin is paired with the *Template Chooser Event plugin*. It shows in your sidebar a list of available themes, and every visitor can then choose which layout he wants to see your blog in.

#### <a name="A41"></a>Configuration

* **submit button**: You can control if you want to show a submit button to change the template, or if a template gets changed as soon as you change the dropdown.


## <a name="A42"></a>Available event plugins bundled with s9y

### <a name="A43"></a>Content Rewrite

This is a very powerful plugin to insert a list of words which may be rewritten by applying transformation rules. More precisely: Say you always want to have "PHP" rewritten as \<code\>\<a href="[http://www.php.net/](http://www.php.net/)" title="PHP Hypertext Preprocessor"\>PHP\</a\>\</code\> and not type that every time, you can use this plugin.

If you want to display some kind of glossary of all your entered words, you can use the *Event Wrapper Sidebar plugin*.

#### <a name="A44"></a>Configuration

This is the place where you actually edit and insert all words you want to rewrite. You can edit the "from" and "to" substitution rules here as well.

Here's an example. Say everytime you have the word "test" and always want it changed to "testing, one two" you would enter this in the configuration panel:

Rewrite String: "{to}"

Rewrite Char: ""

New Title ({from}): "test"

New Description ({to}): "testing, one two"

So you can see, the "Rewrite String" can make use of {to} and {from} variables. The "New Title" value allows you to enter what is the source of your rewrite ({from}, "test"). The "New Description" value is the {to} variable and says what your wording shall be rewritten to ("testing, one two").

So you use the Rewrite String usually to add any special HTML markup using {from} and {to}, and make those variables fit inside any HTML markup you like (\<a href="{to}" title="{from}"\>{to}\</a\>)

Now, everytime Serendipity finds your word "test" it will save the word 'test' in the temporary variable {from}. It will then look up in which word it shall be transfered to and saves that in the variable {to}. Then it will look up your Rewrite String and replace "test" with the parsed contents of the Rewrint String. As this is set to "{to}" only, the {from} variable will completely vanish.


### <a name="A45"></a>Markup plugins: Emoticate, BBCode, NL2BR, s9ymarkup, textile, textwiki

You can create your blog entries in any kind of text formatting you like. Without any plugins, you need to insert pure HTML code. If you're a novice user you will probably enable the WYSIWYG module, but possibly you are already used to other common markup formats like BBCode, Textile or Wiki.

Then you can insert either of the plugins. But take care that using Textwiki and BBCode together is not a good idea, as they interfere with each other. But using s9ymarkup and BBCode together is no problem.

The *emoticate* plugin converts smilies to images, and uses the images provided inside your template directory.

The *nl2br* plugin converts any newlines you used during entry creation into HTML breaks.

#### <a name="A46"></a>Configuration

Each of the markup plugins share common directives to control whether that markup method is only used for the teaser text of your articles, the extended body or even the comments for an article. So you can enable the BBCode plugin for comments, but disable them for your own usage. You can also choose to apply a markup plugin to HTML nuggets.


### <a name="A47"></a>Track Exits

Encodes any URLs you use in your articles with a special method so that a click on the links from your visitors is stored in your database. You can display this data using the *Top Exits Sidebar plugin*

#### <a name="A48"></a>Configuration

* **commentredirection** - Can be set to "s9y", "google" or an empty value. Specifies if URL specified by commenting authors should be redirected through either s9y internal measures or through a google deflector. This destroys the use of spammers who boost their google pagerank by being linked to their site, but it can also disable the increased pagerank of a "friendly" page.


### <a name="A49"></a>Mailer

Using this event plugin you can mail any articles you create to a single e-mail adress (which may be a mailing-list, of course).

#### <a name="A50"></a>Configuration

* **email-address**: The email address to where you want the entries sent to.


### <a name="A51"></a>Statistics

Even backend functionality can be fully customized with an event plugin. Using this plugin you'll find a new link in your Authoring Suite where you can see various statistics about your blog.

#### <a name="A52"></a>Configuration

* **limit**: Choose how many top items should be shown for statistical output


### <a name="A53"></a>Template Chooser

This allows users to change the appearance of your blog on a per-user basis. To show a nice dropdown-box for this, see the *Template Dropdown Sidebar plugin*, which automatically bundles with this plugin.


### <a name="A54"></a>Weblogping

This plugin hooks into the interface for article creation/editing. It shows a list of well-known XML-RPC weblogping services. You can check the services where you want to announce your article to. Bear in mind that this can take up to a minute depending on the hosts you post your ping to.

#### <a name="A55"></a>Configuration

* **services**: You can check default services you usually want to announce your entries to


### <a name="A56"></a>HTMLValidator

This plugin hooks into the interface for article creation/editing. You can then check the validate checkbox to submit your article HTML-code to the validator and see if you made anything wrong. This service is dependent on the W3C-Service and may spontaneously timeout. :-(


## <a name="A57"></a>Extending Plugins

See our [Plugin API](/40.html)