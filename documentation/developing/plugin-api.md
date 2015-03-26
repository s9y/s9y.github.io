---
title: Plugin API
---

# TOC

* Plugin API
  * Important event hooks
  * Creating new event hooks

# Plugin API

The general meaning of Plugins for Serendipity is described in the section [Plugins](/contributing/developers/index.md#Plugins) of our "Getting started" documentation.

This page provides more in depth description of the inner workings.

**TODO: Describe additional_plugins symlinks!**
**TODO: Plugin-API
	https://www.onli-blogging.de/876/Rohform-eines-Serendipity-Plugins.html 
	https://www.onli-blogging.de/879/Einfuehrung-Serendipity-Plugins-schreiben.html**
** TODO: serendipity_plugin_api_core_event_hook
** TODO: Example on how to create a plugin that hooks in the admin menu via: backend_sidebar_entries_event_display_XXX**
** TODO: Example on how to do "smoething" when an entry is saved**
** TODO: Example on how to create a plugin that does something on Frontend_display
** TODO: Example for external_plugin **

## Important event hooks:

The easiest way to see how to implement any given event hook is to search in the .php files for:

```
hook_event('XXX')
```

where you replace 'XXX' with the name of the even thook you want to look up. There you can also easily see which $eventData is passed to the hook.

* css: Frontend CSS generation
* css_backend: Backend CSS generation
* js: Additional javascript frontend
* js_backend: Additional javascript backend
* frontend_configure: Performed when frontend is initialized
* backend_configure: Performed when backend is initialized
* backend_publish: Performed when an entry is published
* backend_save: Performed when an entry is saved (also for drafts!)
* entry_display: Performed when multiple entries are displayed in the frontend
* external_plugin: Execution of external plugins that take over complete page flow
* frontend_display: Performed when a single entry is displayed in the frontend
* genpage: Performed when smarty framework was initilizaed
* frontend_display:rss-2.0:namespace: RSS feed namespace
* frontend_display:atom-1.0:namespace: RSS feed namespace
* frontend_display:rss-2.0:per_entry: Single entry display in RSS feed
* frontend_display:atom-1.0:per_entry: Single entry display in Atom feed

### Other event hooks:

Most of these event hooks have self-explanatory names. You can easily look them up in the codebase by searching for those names, they usually only occur once at a specific place in code.

* backend_approvecomment
* backend_auth
* backend_cache_entries
* backend_cache_purge
* backend_category_addNew
* backend_category_delete
* backend_category_showForm
* backend_category_update
* backend_comments_top
* backend_delete_entry
* backend_deletecomment
* backend_directory_create
* backend_directory_delete
* backend_entry_iframe
* backend_entry_presave
* backend_entry_toolbar_body
* backend_entry_updertEntry
* backend_entryform
* backend_entryform_smarty
* backend_entryproperties
* backend_frontpage_display
* backend_http_request
* backend_image_add
* backend_image_addHotlink
* backend_import_entry
* backend_login
* backend_loginfail
* backend_media_check
* backend_media_delete
* backend_media_makethumb
* backend_media_path_exclude_directories
* backend_media_rename
* backend_pluginlisting_header
* backend_pluginlisting_header_upgrade
* backend_plugins_event_header
* backend_plugins_fetchlist
* backend_plugins_fetchplugin
* backend_plugins_install
* backend_plugins_new_instance
* backend_plugins_sidebar_header
* backend_plugins_update
* backend_preview
* backend_sendcomment
* backend_sendmail
* backend_sidebar_entries_event_display_XXX: Custom menu items for plugins to hook into.
* backend_sidebar_entries_event_display_profiles
* backend_staticpages_insert
* backend_staticpages_showform
* backend_staticpages_update
* backend_templates_configuration_bottom
* backend_templates_configuration_none
* backend_templates_configuration_top
* backend_templates_fetchlist
* backend_templates_fetchtemplate
* backend_templates_globalthemeoptions
* backend_templates_install
* backend_thumbnail_filename_select
* backend_trackback_check
* backend_trackbacks
* backend_updatecomment
* backend_users_add
* backend_users_delete
* backend_users_edit
* backend_view_comment
* backend_wysiwyg
* backend_wysiwyg_nuggets
* cronjob
* cronjob_XXX: Executed on cronjob interval, i.e. cronjob_5min, cronjob_30min, ...
* entry_groupdata
* fetch_images_sql
* fetchcomments
* frontend_calendar
* frontend_display:html_layout
* frontend_display:rss-1.0:once
* frontend_display:html:per_entry
* frontend_display_cache
* frontend_entries_rss
* frontend_entryproperties
* frontend_entryproperties_query
* frontend_fetchentries
* frontend_fetchentry
* frontend_generate_plugins
* frontend_media_showitem
* frontend_media_showitem_init
* frontend_rss
* frontend_saveComment
* frontend_saveComment_finish
* frontend_sidebar_plugins
* frontend_xmlrpc
* media_getproperties
* media_getproperties_cached
* media_showproperties
* plugin_dashboard_updater
* quicksearch_plugin

## Creating new event hooks

If there is an event hook missing in the current Serendipity code, a single line is sufficient to add new events. Please let our developers know when you think a specific event is missing (**TODO: Link to "Contributing"**).
