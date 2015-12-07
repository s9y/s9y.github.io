---
layout: docs
title: Embed Configuration
---

<h2>The 'embed' Configuration Directive</h2>

* TOC
{:toc}

In your serendipity configuration, you can set an 'embed' option to true or false.

This defines, whether you use your blog as a standalone webpage - or if you have different content wrapped around your blog, like the menu of your usual homepage.

By setting the 'embed' option to true, you have to make sure the following things to get everything to work well:

### 'indexFile' option.

This configuration option needs to be set to the wrapper file you want to use. Let's say you normally have a 'content.php' file for your webpage. This 'content.php' file sets up your internal templates, your menu structure and such.Now you want this file to be used to include your weblog. A simple content.php could look like this:

    <?php
    $homepage = new Template_Class;
    $homepage->set_template($_REQUEST['page']);
    $homepage->output_header();
    $homepage->output_content();
    $homepage->output_footer();
    $homepage->track_statistics();
    ?>

So normally your file would be called with 'content.php?page=about' to display your 'about' page of your personal homepage.

Now we want this file to be displayed, having the 'page' variable being set to 'blog'.

For this, we set up a 'wrapper.php' file:

    <?php
    $_REQUEST['page'] = 'blog';
    // Let serendipity generate our content:
    ob_start();
    require 'index.php';
    $blog_data = ob_get_contents();
    ob_end_clean();

    // Now we include our normal content building file.
    // This one has to make use of your $blog_data variable to print
    // the content where appropriate!
    require 'content.php';
    ?>

You would then set your 'indexFile' serendipity-option to the 'wrapper.php' file.

### Plugins

Plugins like the serendipity\_event\_livesearch can emit [Java Script](/index.php?cmd=newdoc&newdocname=Java+Script&node=35&refnode=55)**?** library calls in the header of the blog. And because if you use the embed option, serendipity will no longer take care of that part, so you need to add the calls to those libaries by yourself. For the livesearch plugin that means you need to insert this line in your custom header:

    <script type="text/javascript" src="/serendipity/plugin/ls-js"></script>

### The "easier way"

For many users, this setup using a Wrapper-file may sound too complicated (even if it isn't).

Those users could just turn on the embed option option and leave the indexFile set to 'index.php'. And then you would only need to edit your template files and insert all the html/head tags and custom layout at the bottom and top of the file. With the Smarty templating magic, this is easily possible.

This method is easier to setup, and you'll have everything in your Serendipity template files - but the more flexible way is to use a custom wrapper file. You need to choose one, depending on your knowledge and what you want to achieve.
