$(document).ready(function() {
    $('*[data-rss*="http"]').each(function() {
        console.log($(this).attr('data-rss'));
        jQuery.getFeed({
            url: $(this).attr('data-rss'),
            feedparent: $(this),
            success: function(feed) {
              console.log(feed);
              console.log(this.feedparent);
              
              this.feedparent.find('ol').empty();
              for(var i=0; i <= 4; i++) {
                  if (feed.items[i]) {
                     this.feedparent.find('ol').append('<li><h3><a href="' + feed.items[i].link + '">' + feed.items[i].title + '</a></h3><p>' + feed.items[i].description + '</p></li>');
                  }
              }
            }
        });
    });    
});
