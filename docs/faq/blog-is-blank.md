---
layout: docs
title: Blog is Blank
---

### Blog Is Blank

Blank blog pages almost always mean the server has encountered an error. Luckily, web servers almost always keep track of errors in a log file. Ask your provider for the error logs for your web page; they'll tell you what the problem is.

If you're having trouble finding the logs, you can try modifying your .htaccess with these lines:

    php_value display_errors on
    php_value error_log /path/to/your/serendipity/errors.log

Of course, replace *path/to/your/serendipity* with the path to Serendipity on your server. Unfortunately, not all providers will allow you to do this. But if it works, you can read the errors.log in your Serendipity directory to determine the problem.
