---
title: Database structure
---

### Database structure

#### TOC

* Database structure
  * serendipity_authors
  * serendipity_groups
  * serendipity_groupconfig
  * serendipity_authorgroups
  * serendipity_access
  * serendipity_comments
  * serendipity_entries
  * serendipity_references
  * serendipity_exits
  * serendipity_referrers
  * serendipity_config
  * serendipity_options
  * serendipity_suppress
  * serendipity_plugins
  * serendipity_category
  * serendipity_images
  * serendipity_entrycat
  * serendipity_entryproperties
  * serendipity_mediaproperties
  * serendipity_permalinks
  * serendipity_plugincategories
  * serendipity_pluginlist

#### serendipity_authors

Holds the users/authors. Columns are:

* authorid: Primary ID
* realname: The full author name
* username: The loginname
* password: Hashed password
* email: E-Mail
* userlevel: User level (0,1,255) of the user
* right_publish: Whether author is allowed to publish
* hashtype: Used password hash (0: old md5, 1: sha1)
* mail_comments: Configuration option "receive mail notifications for comments"
* mail_trackbacks: Configuration option "receive mail notifications for trackbacks"

#### serendipity_groups

Holds the user groups

* id: Primary ID
* Name: Name of the group

#### serendipity_groupconfig

Holds ACL configuration data of usergroups

* id: Foreign key of serendipity_groups.id
* property: Property name
* value: Property value

#### serendipity_authorgroups

Holds n:m associations for users to groups

* groupid: Foreign key of serendipity_groups.id
* authorid: Foreign key of serendipity_authors.authorid

#### serendipity_access

Holds access control lists for any kind of stored data (entries, categories, entries) to indicate which author is allowed to access what. Access is granted on a usergroup level.

* groupid: Foreign key of serendipity_groups
* artifact_id: Foreign key of the item that gets controlled
* artifact_type: Type of the item (entry, category, ...)
* artifact_mode: Read or write
* artifact_index: Possible additional data for an item

#### serendipity_comments

Holds the comments to entries

* id: Primary ID
* entry_id: Foreign key of serendipity_entries.id
* parent_id: For threaded comments holds the foreign key of serendipity_comments.id
* timestamp: Time of the comment
* title: Title of a comment (trackbacks)
* author: Author of a comment
* email: E-Mail of the comment's author
* url: URL of the comment
* ip: IP of the comment's author
* body: The comment body
* type: Comment type (trackback, comment, pingback)
* subscribed: Whether the comment's author wants subscription notifications of more comments
* status: Whether the comment is approved/pending
* referer: URL of the referrer

#### serendipity_entries

Holds the blog entries

* id: Primary ID
* title: Entry title
* timestamp: Entry timestamp
* body: Entry body
* comments: Number of comments for this entry
* trackbacks: Number of trackbacks for this entry
* extended: Extended entry body
* exflag: Boolean to indicate if entry has extended body
* author: Name of the entry's author
* authorid: Foreign key to serendipity_authors.id
* isdraft: Boolean to indicate if entry is a draft
* allow_comments: Boolean to indicate if comments are allowed
* last_modified: Timestamp of last modification
* moderate_comments: Boolean to indicate if comments are moderated

#### serendipity_references

Holds parsed references within a blog entry

* id: Primary ID
* entry_id: Foreign key to serendipity_entries.id
* link: The link that is references
* name: Link title
* type: Link type

#### serendipity_exits

Holds external URLs that are captured through exit tracking

* entry_id: Foreign key to serendipity_entries.id where the URL was linked from
* day: Timestamp of when a link was clicked
* count: Number of clicks
* scheme: URL scheme
* host: URL host
* port: URL port
* path: URL path
* query: URL query part

#### serendipity_referrers

Holds external URLs that reference to blog entries

* entry_id: Foreign key to serendipity_entries.id where the URL was linked to
* day: Timestamp of when a link was incoming
* count: Number of clicks
* scheme: URL scheme
* host: URL host
* port: URL port
* path: URL path
* query: URL query part

#### serendipity_config

Holds the central serendipity configuration options

* name: Name of the config option
* value: Value of the config option
* authorid: 0 if global, or reference to the authorid that the configuration option is valid for

#### serendipity_options

Holds template options.

* name: Name of the config option
* value: Value of the config option
* okey: Key/ID of the template the config option belongs to

#### serendipity_suppress

Holds URLs that are blocked from exit-tracking

* ip: Incoming IP
* scheme: URL scheme
* host: URL host
* port: URL port
* path: URL path
* query: URL query part
* last: Last access

#### serendipity_plugins

Holds the list of enabled plugins

* name: Name of the plugin
* placement: Type of plugin (event, sidebar, hidden, ...)
* sort_order: Sort order ID of the plugin
* authorid: Owner of the plugin
* path: Path to plugin directory

#### serendipity_category

Holds the categories of a blog.

* categoryid: Primary ID
* category_name: Category name
* category_icon: A category icon
* category_description: Description of Category
* authorid: Owner of category
* category_left: Nested Set ID of next category for hierarchy
* category_right: Nested Set ID of previous category for hierarchy
* parentid: Parent category for hierarchy
* sort_order: Sort order of a category within parent hierarchy
* hide_sub: Boolean whether subcategories are hidden

#### serendipity_images

Holds media items of the database

* id: Primary ID
* name: Name of media file
* extension: Extension of media file
* mime: Mime-Type of media file
* size: Filesize
* dimensions_width: Image dimensions (width)
* dimensions_height: Image dimensions (height)
* date: Upload date
* thumbnaul_name: Thumbnail extension name
* authorid: Owner of media file
* path: Storage directory of media file
* hotlink: Whether media file is hotlinked (comes from foreign server)
* realname: Full media file

#### serendipity_entrycat

Holds n:m associations of entries to categories

* entryid: Foreign key to serendipity_entries.id
* categoryid: Foreign key to serendipity_category.categoryid

#### serendipity_entryproperties

Holds additional entry properties

* entryid: Foreign key to serendipity_entries.id
* property: Property name
* value: Property value

#### serendipity_mediaproperties

Holds additional properties of media files

* mediaid: Foreign key to serendipity_images.id
* property: Property name
* property_group: Property main group
* property_subgroup: Property sub group
* value: Property value

#### serendipity_permalinks

Holds the created permalinks for articles, authors and categories for lookup purposes.

* permalink: The URL
* entry_id: The ID of an item
* type: The typ eof an item (entry, author, category, ...)
* data: Additional data

#### serendipity_plugincategories

Holds categorization information for available plugins

* class_name: Plugin class name
* category: Name of category the plugin belongs to

#### serendipity_pluginlist

Holds information about all available plugins

* plugin_file: Plugin filename
* class_name: Plugin class name with identifier
* plugin_class: Normal plugin class name
* pluginPath: Directory for plugin file
* name: Name of plugin
* description: Description of plugin
* version: Version of plugin
* upgrade_version: Repository version of plugin
* plugintype: Type of plugin (event/sidebar)
* pluginlocation: storage location of plugin
* stackable: Whether plugin is installable multiple times
* author: Author of plugin
* requirements: Installation requirements
* website: Author of plugin
* last_modified: Time of last plugin update
