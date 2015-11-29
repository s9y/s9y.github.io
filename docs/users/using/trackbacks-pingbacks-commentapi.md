---
title: Trackbacks-Pingbacks-CommentAPI
---

# Trackbacks / Pingbacks / CommentAPI

*  [What are trackbacks?](#A2)
  *   [What does a trackback look like?](#A3)
  *   [How to create a trackback](#A4)
  *   [How to disable automatic trackbacks](#A5)
*  [What is a pingback?](#A6)
  *   [What does a pingback look like?](#A7)
  *   [How to create a pingback](#A8)
*  [What is the commentAPI?](#A9)


## <a name="A2"></a>What are trackbacks?

When posting entries to your blog, you often take reference to another articles or bloggers. By posting your opinion about what another blogger said on your own blog, that person may not get aware that you wrote something about him.

This is where trackbacks (or "trackback pings") come in place: Most blog applications share a common interface for receiving and sending notifications. Using that interface the original author will see which of his articles you refer to.

### <a name="A3"></a>What does a trackback look like?

A trackback is nothing more than accessing a special URL on the original author's blog and submitting a few variables to it. Those variables are either transmitted via HTTP GET or POST and contain your blogTitle, your blogURL, your blogDescription and the URL to your referring article. It's then up to the original author's blog application to display or hide those trackbacks.

In s9y, the trackbacks you receive to your articles can be seen in the footer of each of your written articles. Clicking on this link "Trackbacks (1)" would open a link containing:

*  The currently existing trackbacks to that article, with their referring URL, the title and description.
*  The manual trackback link. A visitor to your blog could copy that URL to enter it into his blog application to send a trackback to you.
*  The direct HTML link to the detailed view of the article.

In the detailed view of an article, you can access the same trackback features as in the article overview.

Also have a look at s9y outputted HTML code: You can see various RDF-tags inside the text which can also be drawn from other blog applications to post a trackback to you.

### <a name="A4"></a>How to create a trackback

S9y has an easy automatic trackback discovery. If you create an article and put a usual HTML-Link inside your article and then save your article, s9y will automagically search through your posting. It will gather all external links and search if they contain valid trackback options. If one is found, it sends a trackback to that page.

So basically you don't have to do anything manually at all!

When a blog does not support the "magic" RDF metadata so that Serendipity can send and automatic trackback, you can specify the "manual" Trackback URI when using the [serendipity\_event\_trackback](http://cvs.sourceforge.net/viewcvs.py/php-blog/additional_plugins/serendipity_event_trackback/) plugin.

If a page does not contain the magic RDF metadata, or wrong metadata (the RDF:specifier does not equal the URL you entered - sometimes it matters if you use http://www.example.com or http://example.com! you will get this message when saving an entry:

"The autodiscovered trackback URI does not match our target URI"

In this case you'll have to check your HTML link if it contains the right metadata and/or a different link, or you have to use the plugin mentioned above.

If enter a link in your entry, that directly leads to a trackback, Serendipity will complain with this error message:

"Trackback failed: No trackback-URI found".

Serendipity can only send automatic trackbacks to a URL, that contains the required RDF metadata of the trackback API. Some wordpress blogs are known to not provide this required metadata, and thus Serendipity cannot send an automatic trackback. To solve this, please complain to the blog author of the blog you are trying to trackback. You can also use the trackback plugin mentioned earlier, which allows you to send manual trackbacks to URLs, which do not require this RDF-metadata.

### <a name="A5"></a>How to disable automatic trackbacks

You can either disable sending a trackback to an individual entry by installing the "Manual Trackback" plugin from the Serendipity Repository.

To disable trackbacks alltogether, please edit your serendipity\_config\_local.inc.php file (see the FAQ for the fixperm.php script in case you cannot edit your file).

Then insert this line of Code somewhere before the closing ?\> tag:

```
$serendipity['noautodiscovery'] = true;
```

This will disable sending any trackbacks from your blog. This is not (yet) a configuration item of Serendipity, because we still believe in the fundamental use of trackbacks within blogs. That might change with SPAM being one of the largest problems of Blogs in the future... but until then, you'll need to use this manual method.

## <a name="A6"></a>What is a pingback?

When you create your entries, you may want to announce your entries on certain blog-pages like technorati.com or others. This announcement is called "pingback".

### <a name="A7"></a>What does a pingback look like?

A pingback is also a standard HTTP GET or POST request to a special page. Many pages have an XML-RPC like API to evaluate those requests. The values submitted to a pingback-service host are usually your blogTitle, blogDescription, blogURL and the excerpt of your posting.

### <a name="A8"></a>How to create a pingback

For pingbacks to work, you need to have the *Weblog ping Event plugin* installed. Inside the configuration of that plugin you can choose which pingback services you usually want your entries announced to.

If you then create a new entry, you will see a new special area on the bottom of the screen. There you can check some checkboxes to select the services you're posting the announce of the current article to.

If you then save your article, and set its status to "publish" your entry will be announced to the service. This is done only once on the first publishing of your article!

## <a name="A9"></a>What is the commentAPI?

The commentAPI is a special XML namespace used inside RSS feeds. It allows any user reading your RSS-feed to easily post a comment to an item.

It interfaces with your s9y to read all the data necessary for a comment and will display it just the same way as if a user commented through your blog interface.