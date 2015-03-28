---
title: User management
---

# User management

* [The way it was a long time ago (\< 0.6.1-CVS)](#A2)
* [The way it was for a while (\>= 0.6.1 \< 0.9 beta 1)](#A3)
  * [What can a user do depending on his userlevel?](#A4)
  * [Private/Public](#A5)
* [The way it is now (\> 0.9 beta 1)](#A6)
  * [Default user group permissions](#A7)

Multi-user support has evolved a lot as serendipity has matured. The current version grants/denies capabilities based on user group memberships. Earlier user rights are maintained to a limited degree for backwards compatibility.

## <a name="A2"></a>The way it was a long time ago (\< 0.6.1-CVS)

You have to manually insert a row into the *serendipity\_authors* database-table:

```
INSERT INTO serendipity_authors
            (username, password, email)
     VALUES ('author2', md5('mypassword'), 'author2@s9y.org');
```

By executing that SQL statement you would then have created an account *author2* with the password *mypassword* and the e-mail address *author2@s9y.org*. That user can now log into your s9y blog and create/edit entries, but also administrate the full blog. Every user has the same rights.

## <a name="A3"></a>The way it was for a while (\>= 0.6.1 \< 0.9 beta 1)

In previous versions, all users shared the same rights in the blog. Beginning with 0.6.1 through 0.9, user management was based on so called "userlevels". If you log into your installation with your superuser account (created on installation) you can go to the administration area and then click on the "user management" link. There you have a simple interface to easily add users to your blog.

You can assign their login-names, passwords, e-mail addresses and some minor settings. And most importantly, their userlevel:

*  **Userlevel 0 (Editor)**: Cannot apply many administrative tasks and only maintain his personal entries.
*  **Userlevel 1 (Chief)**: Can apply some administrative tasks (like title of the blog, plugins). Can maintain all entries and create other users.
*  **Userlevel 255** (Admin)\*: Can change everything.

After you created an account, the users can log into your blog. Depending on their userlevels, there are different possibilities a user can or cannot do. One of the important things is that even a standard editor user can go to the administration panel and click on "Configuration". There he can alter his personal account options and choose the language he wants his s9y displayed in. Or choose if he wants to use the WYSIWYG-editing utility or rather use plaintext.

### <a name="A4"></a>What can a user do depending on his userlevel?

**ACTION** | **editor** | **chief** | **admin**
---------- | ---------- | --------- | ---------
Manage private plugins | - | + | +
Manage global plugins | - | - | +
Manage order of plugins | - | + | +
Manage configuration of private plugins | - | + | +
Manage configuration of all protected plugins | - | - | +
Manage configuration of private protected plugins | + | + | +
Manage all categories | - | + | +
Manage public categories | + | + | +
Manage private categories | + | + | +
Manage global configuration | - | - | +
Manage basic configuration | - | + | +
Manage private configuration | + | + | +
Manage templates | - | + | +
Manage 'admin' users | - | - | +
Manage 'chief' users | - | + | +
Manage 'editor' users | - | + | +
Manage private entries | + | + | +
Manage others entries | - | + | +
Manage comments/trackbacks to private entries | + | + | +
Manage comments/trackbacks to others entries | - | + | +
View/Link/Upload all pictures | + | + | +
View/Link/Upload private pictures | + | + | +
View/Link/Upload public pictures | + | + | +
Edit all pictures | - | + | +
Edit public pictures | + | + | +
Edit private pictures | + | + | +

It is advised that in shared setups only the webmaster has an admin-access. The users should be given a chief-login, and them their selves can distribute user logins.

### <a name="A5"></a>Private/Public

Many items like categories, images and plugins can have a public/private flag. As soon as a category is marked as 'public', each user can access and use that category. If it is flagged as private, only the owner can use a category. Same with images and plugins, even though admin users always have the freedem to use anything they want.

## <a name="A6"></a>The way it is now (\> 0.9 beta 1)

User levels worked great for a while, but the need for increased power and flexibility led to user groups. There is no limit to the number of groups that can be created, and users can be assigned to as many groups as necessary.

The key difference between the former user levels, and the current user groups is that, although user groups have default permissions, each of these can be changed to whatever meets your needs.

S9y defaults to three user groups, each corresponding to the previous user levels: Administrator, Chief Editor and Standard Editor. The corresponding default permissions for each of these groups is as follows:

### <a name="A7"></a>Default user group permissions

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