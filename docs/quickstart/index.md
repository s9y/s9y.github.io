---
layout: docs
title: Quickstart
---

## Quickstart

The easiest way to test Serendipity is to run it [via Scaleway](https://www.scaleway.com/imagehub/serendipity/).

But it is also easy enough if you already have another hoster, or if you want to install it to your local machine. All there is to do is to download one archive, to unpack it into the webroot of your server and then to follow a two-step installation.

### Download & Unpacking

Download the [newest version of serendipity](http://www.s9y.org/latest) and unpack the archive:

    wget -O s9y.zip http://www.s9y.org/latest
    unzip s9y.zip -d /var/www/

### Installation

Go to the URL of your server, or on your local machine to `http://localhost/serendipity`.

[![first page of the installer](/img/quickstart/s9y_installer1_thumb.png){: .content-image}](/img/quickstart/s9y_installer1.png)

The first page of the installer checks if the server has all the capabilities needed and if the rights are correct. Follow its hints, then click on *Simple Installation*.

[![second page of the installer](/img/quickstart/s9y_installer2_thumb.png){: .content-image}](/img/quickstart/s9y_installer2.png)

The second page asks for various configuration options. Important are the database settings at the top. Either use MySQL (your hoster should provide you with the access data) or PDO-Sqlite (no access data needed). Next step is your username and password. The other options can be ignored.

### Finish

That's it. Your blog is now installed and you can [continue to use it](/docs/users/using/index.html).
