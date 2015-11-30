---
title: Spam Protector
---

### Spam Protector

Serendipity's Spam Protector plugin is a quite powerful tool to protect your blog from spam. It can provide CAPTCHAs and block trackback or comment spam based on domains or keywords.

The Spam Protector plugin is included and automatically enabled with every Serendipity distribution. All you need to do is configure it. From your admin screen, click on "Configure Plugins", and then click on the "Spam Protector" plugin.

Most of the configuration is easy to understand. Here are a few of the tricky bits.

#### Disabling Trackbacks

Set "How to treat comments made via APIs" to "reject". Trackbacks are comments made via API. This also rejects plain comments made by API, which are also generally spam. It does not reject comments made directly from your blog. If you choose to disable trackbacks, you may also want to [remove the trackback links from the entry display](removing-trackback-links.html).

Set "Check Trackback URLs" to "Yes". If you allow trackbacks, this will block any trackbacks that don't actually link to your blog. This is pretty easy for spammers to get around, though: they just change the link after the trackback is made.
