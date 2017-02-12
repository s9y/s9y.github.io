---
layout: docs
title: Windows Live Writer setup
---

## Windows Live Writer setup

Serendipity supports Windows Live Writer through our [XML-RPC plugin](http://spartacus.s9y.org/cvs/additional_plugins/serendipity_event_xmlrpc.zip).

There is now a Serendipity preset in Windows Live Writer! Unfortunately, it does not configure Live Writer properly to interact with Serendipity.

Thanks to Xeno Phage from the [Serendipity forums](https://board.s9y.org) for the following information:

Install Windows Live Writer and set your blog up as "Custom (Moveable Type API)". Make sure you have the xmlrpc plugin installed in Serendipity.

When it asks for the URL to post, it will be something like this:

`http://{full path to Serendipity}/serendipity_xmlrpc.php`

Give it your login info and you're good to go. Categories, keywords (tags), and trackbacks all seem to work fine.
