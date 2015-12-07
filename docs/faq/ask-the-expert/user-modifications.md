---
layout: docs
title: User Modifications
---

## User Modifications

Yes, you can add **any** HTML or Javascript to your Serendipity blog! And there's more than one way to do it.

### The easiest way is to install the "HTML Nugget" plugin.

This plugin provides a block in the sidebar where you can insert your custom code.

### If you want your code in the head of the document, you can use the "Head Nugget" plugin.

This does exactly the same thing, but inserts your code in the head of every Serendipity page. You can verify that it works with your browser's "View Source" capability.

### If you want to make the changes directly, you should modify your template.

To put Javascript in the head of the page, for instance, you'd want to modify the index.tpl in templates/{your currently selected template's name}. If it doesn't exist, please copy it from templates/default/index.tpl.

Just remember, the index.tpl is parsed by [Smarty](http://smarty.php.net/), and both Smarty and Javascript assign special meaning to the curly braces "{}", so there's going to be a conflict.

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
