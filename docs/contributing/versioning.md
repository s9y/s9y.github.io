---
layout: docs
title: Versioning
---

## Versioning

Serendipity follow a [semantic versioning scheme](http://semver.org).

* **Major versions** (like 1.0, 2.0) introduce new features and can possibly affect backwards compatibility and APIs.
* **Minor versions** (like 2.1.0) can introduce new main features.
* **Bugfix versions** (like 2.0.3) only introduce bugfixes and very minor new features.

Plugin versions should usually be incremented in the same way.

### Deprecated plugins

Plugins can be removed/deprecated from the central [Spartacus repository](http://spartacus.s9y.org), if:

* they are broken and no longer work, maybe because depending on external functionality that is no longer available
* there are critical issues with a plugin and no maintainer can be found
* there are bettter plugins that provide the same functionality

By removing them from Spartacus, users who have the plugin installed (and because of any reason want to keep using them) could do that, because Serendipity would not delete them.

When a plugin is removed from Spartacus, the development team will  write a blog announcement post to inform users who have the plugin installed so that they can remove them themselves (or maybe even better, volunteer to fix/improve it).

If users find plugins that no longer work and should be marked as deprecated, please report this on our issue tracker or on the forums, so that we can take action.
