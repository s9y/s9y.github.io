---
layout: docs
title: Showing Entries Elsewhere
---

### Showing Entries Elsewhere

Users commonly request the ability to print the latest entries on a different page. Serendipity is so flexible it actually supports multiple ways to do it.

(The first thought that comes to a developer's mind is using Serendipity's RSS feed to get the latest entries. Unfortunately, I don't know how to print an RSS feed in a web page. If you know, [tell us on the forums](http://board.s9y.org/) and I'll add it!)

The easiest way is to **get the entries from Serendipity and print them using JavaScript in the external page**. This means your users will have to have JavaScript enabled, and their browsers will have to fetch the latest entries themselves.

The faster way is to **use PHP to print the latest entries on the external webpage**. This works right on your server, but the external page has to be parsed by PHP: either its name must end in .php, or your server has to be set up to parse it.

The fastest way is to **move the external page inside Serendipity**. This involves editing templates, which is not too hard, but can be confusing for the casual user. It's easier to move a plain HTML page than to move a PHP application.

So, which way would you like to try?

* [Printing the Latest Entries with JavaScript](/docs/faq/ask-the-expert/printing-latest-entries-with-javascript.html)
* [Printing the Latest Entries with PHP](/docs/faq/ask-the-expert/printing-latest-entries-with-php.html)
* [Moving an External Page into Serendipity](/docs/faq/ask-the-expert/moving-external-page-into-serendipity.html)
