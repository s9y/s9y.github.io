---
layout: docs
title: Migration
---

# Migration from other blogs / RSS Import

Serendipity support importing [RSS feeds](/38.html) into your articlebase. This way you can migrate your entries from your old blog to Serendipity, as long as your old blog supports RSS export.

RSS is a simple format to contain XML-data of your entries. We use the external library Onyx for parsing an RSS feed, so everything which is supported by Onyx is supported by us: RSS 1.0, 0.91, 2.0. (No Atom in our bundled version yet)

To import your feed, you first need to still have your old blog online, and let it give you the URL for your RSS feed. This feed should contain ALL entries, so look at your blog's documentation how to achieve that.

When you have the URL written down, open your Serendipity Blog. Go to the Administration area and click on "Import/Export".

There you can enter the URL you previously copied and just click in import. All entries will now be fetched and stored in your Serendipity database.

Starting with Serendipity 0.6.6-CVS you have some more options for importing: You can choose whether to import entries in DRAFTS or PUBLISHED state. And you can tell in which category your entries should be imported.

It's important to tell that existing images and links are NOT converted and fetched to suit your new Serendipity blog. You will most probably need to edit/see each article and see if there are important things missing. The import is meant as a starting ground for keeping your textual archives and not losing content by migrating.