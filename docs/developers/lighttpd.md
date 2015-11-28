---
title: Lighttpd
---

# Lighttpd


This sample config was posted by Niclas Kühne on our Forums [http://board.s9y.org/viewtopic.php?p=19244](http://board.s9y.org/viewtopic.php?p=19244):

```
$HTTP["host"] == "www.s9y-site.com" {
  url.access-deny = ( ".tpl", ".inc.php", ".sql", ".db" )
  url.rewrite-once = ( "^/archives([/A-Za-z0-9]+)\.html"   => "/index.php?url=/archives/$1.html",
                       "^/([0-9]+)[_\-][0-9a-z_\-]*\.html" => "/index.php?url=$1-article.html",
                       "^/feeds/(.*)"                      => "/index.php?url=/feeds/$1",
                       "^/unsubscribe/(.*)/([0-9]+)"       => "/index.php?url=/unsubscribe/$1/$2",
                       "^/approve/(.*)/(.*)/([0-9]+)"      => "/index.php?url=approve/$1/$2/$3",
                       "^/delete/(.*)/(.*)/([0-9]+)"       => "/index.php?url=delete/$1/$2/$3",
                       "^/(admin|entries)(/.+)?"           => "/index.php?url=admin/",
                       "^/archive$"                        => "/index.php?url=/archive",
                       "^/categories/([0-9]+)"             => "/index.php?url=/categories/$1",
                       "^/plugin/(.*)"                     => "/index.php?url=plugin/$1",
                       "^/search/(.*)"                     => "/index.php?url=/search/$1",
                       "^/authors/([0-9]+)"                => "/index.php?url=/authors/$1",
                       "^/index\.html?"            => "/index.php?url=index.html",
                       "^/htmlarea/(.*)"                   => "/htmlarea/$1",
                       "/(.*\.html?)"                      => "/index.php?url=/$1",
                       "^/(serendipity\.css|serendipity_admin\.css)"       => "/index.php?url=/$1",
                       "^/(index|atom|rss|b2rss|b2rdf).(rss|rdf|rss2|xml)$" => "/rss.php?file=$1&ext=$2",
                     )
}
```