# s9y documentation (Github Pages)

This is the documentation for [Serendipity](http://s9y.org).

## About this fork

Use this fork to create a basic sitemap structure of the documentation.

## Requirements

* Jekyll
* Composer

## How to

### Install the dependencies

```bash
$ cd treegen
$ composer install
```

### Build the site

Use Jekyll to build the site. The HTML files will be generated in the `_site` directory.

```bash
$ cd .. # back to the app's root dir
$ jekyll build
```

### Create the sitemap

This will create the sitemap as `_site/sitemap.html`

```bash
$ php treegen/app/console.php build
```

## TODO

Create a version that does not require Jekyll to build the HTML files first. This could also be done on the fly by PHP.
