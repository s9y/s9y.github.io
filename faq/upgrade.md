---
title: Upgrade
---

# Upgrade

Upgrading Serendipity couldn't be easier. (At least, not without compromising security.)

Just upload the files for the new Serendipity version right on top of all the old files. Yes, overwrite them.

Then visit your Admin page (if you're having trouble reaching it, type http://{yourdomain}/{yourpath}/serendipity\_admin.php in your browser's address bar). Serendipity will tell you that it needs to do some work, and when you click the link it will update your database automatically.

### Trouble after an upgrade

Usually this is the result of an incomplete or corrupted upload. Either all the files didn't get overwritten, or some file was corrupted. The best advice is to try again.

If Serendipity doesn't realize that you've re-uploaded, you can force it to upgrade again by editing your serendipity\_config\_local.inc.php file. Find the line:

```
$serendipity['VersionInstalled'] = {yourversion};
```

and change the version to your old version. When you visit your Admin page again, Serendipity will notice the change and retry the upgrade.
