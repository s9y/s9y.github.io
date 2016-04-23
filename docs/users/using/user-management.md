---
layout: docs
title: User management
---

<h2>User management</h2>

* TOC
{:toc}

Multi-user support has evolved a lot as serendipity has matured. The current version grants/denies capabilities based on user group memberships. Earlier user rights are maintained to a limited degree for backwards compatibility.

User levels worked great for a while, but the need for increased power and flexibility led to user groups. There is no limit to the number of groups that can be created, and users can be assigned to as many groups as necessary.

The key difference between the former user levels and the current user groups is that, although user groups have default permissions, each of these can be changed to whatever meets your needs.

S9y defaults to three user groups, each corresponding to the previous user levels: Administrator, Chief Editor and Standard Editor. The corresponding default permissions for each of these groups is as follows:

#### Default user group permissions

**ACTION** | **editor** | **chief** | **admin**
---------- | ---------- | --------- | ---------
Administrate categories | + | + | +
Delete categories | - | + | +
Administrate other user's categories | - | + | +
Administrate comments | - | + | +
Administrate entries | + | + | +
Administrate other user's entries | - | + | +
Administrate media files | + | + | +
Add new media files | + | + | +
Delete media files | + | + | +
Administrate media directories | - | + | +
Administrate other user's media files | - | + | + |
Sync thumbnails | - | + | +
View media files | + | + | +
View other user's media files | + | + | +
Import entries | - | + | +
Administrate plugins | - | + | +
Administrate other user's plugins | - | - | +
Administrate templates | - | + | +
Administrate users | - | + | +
Create new users | - | + | +
Delete users | - | + | +
Change userlevel | - | + | +
Administrate usergroups | - | + | +
Administrate users that are not in your group(s) | - | - | +
Administrate users that are in your group(s) | - | + | +
Access blog-centric configuration | - | + | +
Access personal configuration | + | + | +
Change "forbid creating entries" | - | + | +
Change right to publish entries | - | + | +
Change userlevels | - | + | +
Access system configuration | - | - | +
