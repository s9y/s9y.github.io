---
layout: docs
title: POPfetcher
---

### POPfetcher: Posting New Entries by Email

Serendipity's [POPfetcher plugin](http://spartacus.s9y.org/cvs/additional_plugins/serendipity_event_popfetcher.zip) allows you to post new entries just by emailing them to your blog!

First, get yourself an email account only for adding blog entries. Either you can create a mail adress on your hosting server, or use a free POP3 service like hotmail.com or Gmail. Let's pretend you picked up blog-this@gmail.com.

Next, install the POPfetcher plugin. Enter the username and password to the blog Email account in the POPfetcher configuration. You'll also need to tell it what host the POP3 mail server is running on. In our example, the user is blog-this, and the host is gmail.com.

Now you can write a mail to the account. In our example, just send it to blog-this@gmail.com. The content of the mail will be used as the blog entry.

When you want Serendipity to check the mail, log in to your Admin screen and click the "Fetch Mails" link. POPfetcher will connect to the mail account, fetch all its mails, and insert them as Serendipity entries. Alternatively, just set your browser's "Go" or address bar to the special URL:

    http://{yourblog}/index.php?/plugin/popfetcher_poll

You could even bookmark it and visit the bookmark whenever you feel like checking blog mails.

Of course, you probably want Serendipity to check the mail account automatically. Unfortunately, blogs like Serendipity don't run all the time; they can only perform tasks when they're called.

You could hire an army of monkeys to visit that special URL regularly. Or you could use the "cron" utility. Cron acts like an army of monkeys that perform tasks as often as you tell them to. Any cron facility will do; some webservers offer them, and every Linux installation has cron.

Just configure cron (or the crontab, if that's how your cron utility works) to visit the popfetcher\_poll URL every hour with a lightweight browser, such as lynx or wget.