# RSS / Syndication

*  [What is RSS?](#A2)
*  [RSS in s9y](#A3)
  *  [The rss.php file](#A4)
*  [RSS import](#A5)


## <a name="A2"></a>What is RSS?

RSS is an acronym for either "RDF Site Summary" (whereas RDF means "Rich Data Format"), or "Really Simple Syndication".

The [RSS 1.0 Specification](http://www.purl.org/rss/1.0/) says:

RDF Site Summary (RSS) is a lightweight multipurpose extensible metadata description and syndication format. RSS is an XML application, conforms to the W3C's RDF specification and is extensible via XML-namespace and/or RDF based modularization.

RSS is a format consisting of several concurring versions and dialects. Most common are the version 0.91, 1.0 and 2.0. You can look up the [history of RSS](http://goatee.net/2003/rss-history.html) to see how that came about. A new format called Atom is considered to take on the job of advancing the technology in the future.

However the basic principle of each syndication format is the same: It's there to make your valuable data (your articles) independent from your homepage. To share your articles for other aggregators or web pages. And most of all, to make your articles easily readable by special RSS readers.

Those utilities can read many feeds at once and make it easy for the reader to be notified on updates to your site.

## <a name="A3"></a>RSS in s9y

s9y supports all known and documented RSS versions, [Atom](http://www.atomenabled.org/) 0.3 and 1.0, and [OPML](http://www.opml.org/) 1.0.

If you enable the *Syndication Sidebar plugin* you can select which versions you want to make public to your audience. The link to those RDF/XML files can be interpreted by most RSS readers and contain additional information to your entries: Number of Comments, Link to Comments, a small logo for your feed, mail contact adresses and even License information.

The RSS feature of PHP also supports [Conditional Get for RSS Feeds](/42.html).

### <a name="A4"></a>The rss.php file

The file *rss.php* is responsible for creating your feed items. It can take versions HTTP GET variables:

*  **version**: One of "0.91", "1.0", "2.0", "atom0.3", atom1.0, opml1.0. Mandatory.
*  **type**: Can be either "comments" or "content" (default). Using the value "comments" will feed all the comments made to your entries, whereas "content" will only deliver your plaintext entries. However inside your plaintext entries we use the commentAPI (an XML namespace) to depict comments to individual entries. Optional.
*  **category**: Can be set to restrict the feed to a certain category. This way you can allow the readers to only aggregate/read certain categories of your blog. Optional.
*  **cid**: Fetches only a single comment with a special ID. This is needed for the wfw:commentAPI. Optional.
*  **nocache**: If this is set to any value, it overrides any conditional get caching logic.
*  **all**: If this is set to any value, the RSS feed will export ALL your entries instead of limiting to 15.

You can combine each of the parameters with each other to construct your individual URLs:
```
    http://yourblog/serendipity/rss.php?version=1.0&category=2
    -- Display a RSS 1.0 feed of your category #2

    http://yourblog/serendipity/rss.php?version=1.0&category=2;4;6
    -- Display a RSS 1.0 feed of your category #2, 4 & 6

    http://yourblog/serendipity/rss.php?version=2.0&type=comments
    -- Display a RSS 2.0 feed of all your comments

    http://yourblog/serendipity/rss.php?version=1.0&category=3&type=comments
    -- Display a RSS 1.0 feed of all comments in your category #3
```

## <a name="A5"></a>RSS import

As most blog applications syndicate their data with the RSS format, this is ideal for importing and exporting data. If you switched from Moveable Type to Serendipity and want to import your entries, you can easily switch to your *Administration Suite* and click on *Import Export*. There you can enter the URL to your RSS-feed of your Moveable Type installation and click in Import.

You can also migrate your s9y data to a different blog to specify the URL to your RSS-feed.

Note that the RSS standard usually allows for 15 entries, so you would not be able to Import your entire blog database. Serendipity supports exporting all items using the "all" parameter, so it is possible that other advanced weblogs can do the same. If you are handy with SQL, it is a relatively painless process to write a *insert into ... select* statement to handle your import, if the underlying importing database is compatible to the simple serendipity database layout.