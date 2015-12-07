---
layout: docs
title: Performancing Setup
---

## Performancing Setup

Serendipity supports Performancing for Firefox (PFF) through our [XML-RPC plugin](http://spartacus.s9y.org/cvs/additional_plugins/serendipity_event_xmlrpc.zip). You'll need Firefox version 1.5 or better with the PFF extension installed.

There is currently no Serendipity preset in Performancing for Firefox. If enough of us write to them and request it, that could easily change!

Start PFF and make the following settings in the "account wizard":

* Blogging Service = Custom Blog
* Blog System = Movable Type
* Server API URL = [http://{yourblog}/serendipity\_xmlrpc.php](http://%7Byourblog%7D/serendipity_xmlrpc.php)
* User Name = {your Serendipity user name}
* Password = {your Serendipity password}
* click on "next"
* follow the further description

At this time, Performancing does not support extended bodies. We're working to help extend this popular blogging application!
