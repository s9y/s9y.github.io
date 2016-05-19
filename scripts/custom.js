$(document).ready(function() {
    jQuery.getFeed({
        url: 'http://blog.s9y.org/rss.php',
        success: function(feed) {
          console.log(feed);
        }
    });
});
