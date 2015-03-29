---
title: MySQL Stopwords
---

# MySQL Stopwords

The Serendipity search function uses the SQL fulltext search capability. In MySQL, this capability includes "stopwords". Basically, searching for any of the stopwords would return (almost) all the entries, so MySQL ignores those words for efficiency.

If you're searching for a word that appears in every entry of your blog, you really don't need to search for it, do you? Even if you do, you can't. MySQL won't return any results for a word on the stopword list, and there is no known workaround.

*Link broken, needs fix* -> [Here's the list of MySQL default stopwords.](http://dev.mysql.com/tech-resources/articles/full-text-revealed.html#stopwords)
