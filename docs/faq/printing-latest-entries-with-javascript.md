---
layout: docs
title: Printing Latest Entries with JavaScript
---

### Printing the Latest Entries with JavaScript

With a quick plugin, Serendipity can be accessed from external webpages using <noop>JavaScript</noop>.

First, [Download the "Show entries via JavaScript"](http://spartacus.s9y.org/cvs/additional_plugins/serendipity_event_backend.zip) plugin, also known as serendipity_event_backend and install it.  This can also be done through the SPARTACUS plugin, if you have it installed.

Configure the plugin through your Admin page.  Take special note of the name: you'll be using this in your external webpage later.

Now, you edit the external webpage.  Where you want the latest entries to appear, you add:

```
<script src="<noop>http://{yourblog}/plugin/{name}</noop>></script>
```

where {yourblog} is the complete path to your blog, including any directory, and {name} is the name you configured earlier in the plugin.

You can also specify options.  For instance,

```
<script src="<noop>http://{yourblog}/plugin/{name}?details=0</noop>></script>
```

will show only the headlines, with no entry body.

```
<script src="<noop>http://{yourblog}/plugin/{name}?category=news&num=10"</noop>></script>
```

will show the latest 10 entries from the "news" category.

The README file that came with the plugin includes detailed information on the other options that are available.