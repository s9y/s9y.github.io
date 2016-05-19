$(document).ready(function() {
    $('*[data-rss*="http"]').each(function() {
        console.log($(this).attr('data-rss'));
        jQuery.getFeed({
            url: $(this).attr('data-rss'),
            feedparent: $(this),
            success: function(feed) {
              console.log(feed);
              console.log(this.feedparent);
            }
        });
    });    
});
