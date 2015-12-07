---
layout: docs
title: Removing Trackback Links
---

## Removing Trackback Links

Entries often include a link for [Trackbacks](/docs/faq/ask-the-expert/glossary.html). This allows other bloggers to blog about your blog, or to give you credit for blogging an idea or event first. Unfortunately, those evil minions, spammers, abused trackbacks just like they abuse everything else.

Removing the trackback links from your blog entries won't stop the spammers, but it will change the appearance of your blog. To disable trackbacks altogether, you'll want to read about the [Spam Protector](/docs/faq/ask-the-expert/spam-protector.html) plugin.

The trackback display is printed from the entries.tpl. This will be in the templates/ directory, under your current template's subdirectory. If your template doesn't use its own entries.tpl, it will use the one in templates/default/ instead. If it does use its own entries.tpl, the lines below may vary slightly. Use your judgement, and read about [User Modifications](/docs/faq/ask-the-expert/user-modifications.html) and [Editing entries.tpl](/docs/developers/entries_tpl.html) if you have any questions.

All you need to do is remove these lines from your entries.tpl:

    {if $entry.has_trackbacks}
     {if $use_popups}
        | <a href="{$entry.link_popup_trackbacks}" onclick="window.open(this.href, 'comments', 'width=480,height=480,scrollbars=yes'); return false;">{$entry.label_trackbacks} ({$entry.trackbacks})</a>
      {else}
        | <a href="{$entry.link}#trackbacks">{$entry.label_trackbacks} ({$entry.trackbacks})</a>
      {/if}
    {/if}

Don't forget to get these ones, too:

    <div class="serendipity_comments serendipity_section_trackbacks">
      <br />
      <a id="trackbacks"></a>
      <div class="serendipity_commentsTitle">{$CONST.TRACKBACKS}</div>
      <div class="serendipity_center">
        <a rel="nofollow" style="font-weight: normal" href="{$entry.link_trackback}" onclick="alert('{$CONST.TRACKBACK_SPECIFIC_ON_CLICK|@escape:htmlall}'); return false;" title="{$CONST.TRACKBACK_SPECIFIC_ON_CLICK|@escape}">{$CONST.TRACKBACK_SPECIFIC}</a>
      </div>
      <br />
      {serendipity_printTrackbacks entry=$entry.id}
    </div>

You can check for other lines including the word "trackback" and remove any of them you find problematic, too.
