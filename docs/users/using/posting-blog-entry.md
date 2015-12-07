---
layout: docs
title: Posting a blog entry
---

<h2>Posting a blog entry</h2>

* TOC
{:toc}

A blog entry has at least one thing, that being the entry body. Everything else is just gravy.

A post that is Published will show up in your front page, a post that is a draft is not published to your front page, but instead remain hidden in the Authoring Suite.

It is also important to note that as of s9y version .7, that there are two main areas for administration. The first of these is the "Authoring Suite" which is used to actually post entries, [Approve Comments](/68.html), [Manage Categories](/69.html), [View Statistics](/70.html), [Add / Manage Media](/index.php?cmd=newdoc&newdocname=Add+%2F+Manage+Media&node=38&refnode=39)**?**, [Manage Directories](/index.php?cmd=newdoc&newdocname=Manage+Directories&node=38&refnode=39)**?**, and [Switch to Admin Interface](/index.php?cmd=newdoc&newdocname=Switch+to+Admin+Interface&node=38&refnode=39)**?**.

### Posting to S9y using S9y

Posting to S9y is as easy! Use the "Open Administration" link on your weblog, enter your login and password. Then click on "New Entry". From there, you are given the option to give your entry a title, a category, and to set the date and time of your posting (its default is the current date at time). Type in your post and even add pictures using the Image Manager Icon (hovering over the top of each icon on the bars above your post will display text as to what they are...look for the one displaying "Manage Images")

Posts will Accept plain text and HTML, and there are a variety of [Markup Plugins](/50.html) that one can enable in order to beautify your post.

The Entry Body is what is displayed on the front page (and in your archives and RSS/Atom feeds) You can add additional text to the extended body, which will show up only when a user clicks on that particular entry.

Depending on which [Plugins](/45.html) you have installed, you may have some of the following options available:

#### Publish or draft

You will be required to choose whether or not you want to publish your post or set it as a draft. The draft will not be published to the front page but will remain intact in your administration area so that you can edit it later.

#### Category

After choosing either publish or draft you can select which category you'd like to publish the entry in. You can setup categories by using the Categories Link in the administration menu. Please note that you'll need to add categories BEFORE you'll be able to choose it for your entries. A post may be assigned to more than a single category by installing the Category Assignment event plugin (serendipity\_event\_assigncategories).

#### Previewing your post

It is wise to always preview your post before actually posting it. That way you can see exactly how the blog entry will look to those that come to your site. By using the "Preview" button, you'll be able to take an advanced look at the layout of your post and troubleshoot any problems that you may find.

#### Allow comments to this entry

This will allow users to comment on your post. If you'd like it to be enabled, simply checkmark the selection box by clicking on it with your mouse.

#### Comments & trackbacks to this entry requires moderation

This will set all comments and trackbacks to require approval before they are allowed to post to your blog. Good for removing profanity, nonsense links, and other such material from comments of those visiting your website. If you'd like it to be enabled, simply checkmark the selection box by clicking on it with your mouse. PLEASE NOTE: If you'd like to be notified of comments posting to your site via email, you must have a valid email address listed under Admin Interface \>\> Personal Settings.

#### HTML Validator

HTML Validator is not present in version .7 and upward.

#### Announce Entries

If you wish to announce entries to toher blog services, you can select them here. See [Trackbacks / Pingbacks / CommentAPI](/48.html) for more information.

### Posting to S9y using XML-RPC

You can post so S9Y using the BloggerAPI or the [Moveable Type](/index.php?cmd=newdoc&newdocname=Moveable+Type&node=38&refnode=39)**?** extension to BloggerAPI.

Webservices are notorious for being sketchy, and some services may not work.

The Webservices path is [http://your.host/path/to/s9y/serendipity\_xmlrpc.php](http://your.host/path/to/s9y/serendipity_xmlrpc.php)
