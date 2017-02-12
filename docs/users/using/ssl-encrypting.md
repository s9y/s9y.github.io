---
layout: docs
title: Using SSL encryption for your blog
---

<h2>Using SSL encryption for your blog</h2>

In this times it is very important for your reader to care about their privacy. Therefor more and more sites use SSL encryption (HTTPS) to transmit data safely from the webserver to the users browser. Search engines like google will rank sites better if they are using encryption. For yourself it is safer to type the password for the login to your backend via an ecrypted connection.
If you want your blog to use SSL encryption as well you have to follow these steps.

### Implement SSL to your domain

How to do this depends from your hosting provider. Many providers make it very easy for their users to use HTTPS. Maybe you have to ask your provider for the neccesary steps. 

When you operate a root server on your own, you should know how to do this. ;-)

There is to say that nowadays you can easily get SSL certificates for no charge at [Let's Encrypt](https://letsencrypt.org).

### Map all HTTP-calls to HTTPS

When your domain is reachable by HTTPS you have to map all not encrypted HTTP calls to HTTPS. You can do this by an entry in the .htaccess file in the root directoy of your blog. Insert the following lines before the '# BEGIN s9y
' statement in your .htaccess. 

    RewriteEngine on
     RewriteCond %{HTTPS} !=on
     RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [L,R=301]


### Change URL in the configuration

In your Serendipity backend go to the blogs configuration and modify the URL from

    http://my.blog.xyz
to
    https://my.blog.xyz

![Configuration](/img/docs/users/using/ssl-encryption.png){: .content-image}
    
    
That should do it.

    
### Some things to think about

If you embed anything in your blog (fonts, javascript, pictures) you have to take care to do this via HTTPS. If not that could lead to a broken security chain. This is shown differently in dependence of the browser you are using. For example, firefox shows an exclamation mark beside the lock symbol at the url. 

The modern themes and the plugins usually are aware to use the prefix from the configuration. There could be plugins which use external services that may implemet them with http instead of https. This will lead to a broken security chain. For the most cases, an entry on our [board](https://board.s9y.org) will activate a developer to fix it (if it is possible for the external service). :)

You have to take care for things you embed via the http-nugget-plugin or other things you modify individually in your blogs sources. If you embed external elements to your blog entries you also have to take care that they use a secure connection.