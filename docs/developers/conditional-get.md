---
layout: docs
title: Conditional Get for RSS Feeds
---

### Conditional Get for RSS Feeds

Serendipity supports an HTTP-cache compatible way of only showing items in an RSS feed which where modified since the last request from a client.

Typically, an RSS reader fetches your RSS feeds (15 items, per default). It then remembers the timestamp when those items where fetched. By the time your RSS reader updates the feed (typically after 1 hour) Serendipity will now only serve all new or modified items since the last time of refresh. If no entries where updated since then, serendipity will only serve the 304 Header (Not Modified) and saves a lot of bandwidth for both client and server on periodical updates.

Technically an RSS reader catches the "Last-Modified" Header of the RSS output as well as a special "ETag"-Header. Both are set to the last modification time of your article base. On the next fetch, those received headers are sent as "IF\_MODIFIED\_SINCE" (= Last-Modified) and "IF\_NONE\_MATCH" (= ETag) Headers and will affect your rss feed. This is what saves the bandwidth on both client and server side.

Users who have been watching your feed and where not able to catch up the latest articles may miss some of them, because you usually only get 15 items per feed. In case your reader provides the IF\_MODIFIED\_SINCE header the client can now catch all items (resp. a maximum of 50 articles to prevent abuse).

If you want to permanently disable that feature (whatever the reasons are) you can either set a "\$\_REQUEST['nocache'] = true" inside your rss.php file (first line) or append the '&nocache=true' request variable to your feed so that it looks like:

`http://example.host/serendipity/rss.php?version=2.0&nocache=true`.

Of course, the usual feed behaviour is not affected if none of the caching headers are provided. So if you use syndication methods to embed content from a blog inside an application, just tune your application to either send the 'nocache'-Variable to a Serendipity blog, or to not send the caching headers.

The syndication plugin can be configured to append that variable to your feed URLs from your blog.
