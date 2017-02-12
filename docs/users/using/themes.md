---
layout: docs
title: Manage Styles
---

## Manage Styles

Styles, also known as themes or templates, are just one of the ways that you can personalise your new Serendipity blog. Styles are available to install directly from your administration screen, or you could download a zipfile of the style from the Serendipity repository, or even from the designer's own blog.

Many users of Serendipity eventually want to modify a style to suit their needs. All Serendipity themes are written using standard HTML and CSS, but with the addition of the easy to learn and very powerful Smarty templating language.

### Installing a new style

By default Serendipity ships with several attractive styles for you to try. Simply login to your administration suite and click the "Manage Styles" link in the left menubar. This produces a list of all available themes with screenshots to make it easy for you. To the right of each style is an icon which is used to change to the style you select. You may be presented with a variety of icons. The icon with the floppy disk and CD indicates that the style is already installed and is available to select. An icon with a floppy disk and green arrow indicates that this style is available to download and install automatically, and clicking this icon will instruct Serendipity to save the style to your templates folder and then make it the style of choice for your blog. In rare circumstance you may even see a red icon, and this informs you that the style has changed since you last installed it.

If your Serendipity blog isn't able to use Spartacus, perhaps because your webhost won't allow it, you can still install new styles for your blog. Either visit the web-based version of the [Serendipity repository](http://spartacus.s9y.org) or download a zipfile of the style directly from the template designer. You'll need to unzip the style and upload it (using ftp) to the templates folder of your Serendipity installation. Once you have uploaded your new style, select the style from 'Manage Styles' page within the administration suite.

If you have any questions about Serendipity styles, please be sure to visit the [forums](https://board.s9y.org) and ask your question in the themes forum.

### User Modifications

You can add **any** HTML or Javascript to your Serendipity blog! And there's more than one way to do it.

#### The easiest way is to install the "HTML Nugget" plugin.

This plugin provides a block in the sidebar where you can insert your custom code.

#### If you want your code in the head of the document, you can use the "Head Nugget" plugin.

This does exactly the same thing, but inserts your code in the head of every Serendipity page. You can verify that it works with your browser's "View Source" capability.

#### If you want to make the changes directly, you should modify your template.

To put Javascript in the head of the page, for instance, you'd want to modify the index.tpl in templates/{your currently selected template's name}. If it doesn't exist, please copy it from templates/default/index.tpl.

Just remember, the index.tpl is parsed by [Smarty](http://www.smarty.net/), and both Smarty and Javascript assign special meaning to the curly braces "{}", so there's going to be a conflict.

Smarty is going to win, since it goes first -- on the server, whereas Javascript has to wait until the client's browser is ready to execute it.

To slip the braces past Smarty and on to Javascript, you need to convince Smarty to either ignore the braces, or generate them.

Ignoring the braces is the simpler solution. Smarty passes on anything between {literal} tags, thusly:

    {literal}
    some_javascript
    {
      with(braces);
    }
    {/literal}

So when you modify index.tpl, you could just enclose all your Javascript in {literal} tags.

The other option, generating the braces, isn't difficult, just annoying. Smarty will turn any instance of {ldelim} into a left-curly-brace, and any instance of {rdelim} into a right-curly-brace. Thusly:

    some_javascript
    {ldelim}
      with(braces);
    {rdelim}

So you could just replace all occurrences of "{" with {ldelim} and all occurrences of "}" with {rdelim} in your Javascript only.

When you visit your page, if your Javascript doesn't work as expected, first check the page source. If the script looks like you wanted, there's likely a problem with the script. If it's missing all its braces, you need one of the solutions above.
