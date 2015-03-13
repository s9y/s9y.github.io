# w.bloggar Setup

Serendipity supports w.bloggar through our [XML-RPC plugin](http://spartacus.s9y.org/cvs/additional_plugins/serendipity_event_xmlrpc.zip).

There is currently no Serendipity preset in w.bloggar. If enough of us write to them and request it, that could easily change!

To set up w.bloggar to work with Serendipity, use these settings:

* In the API Server tab:
  * Blog Tool: Custom
  * Host: your Serendipity blog's host
  * Path: /{full path to Serendipity}/serendipity\_xmlrpc.php
* In the Custom tab:
  * Posts: metaWeblog API
  * Categories: metaWeblog API - Single
  * Templates: Blogger\_API
  * Title Tags: title
  * More Text Tags: mt\_text\_more
