var main = function () {
    "use strict";

    var requestURL = "http://api.flickr.com/services/feeds/photos_public.gne?tags=woman,training,gym&format=json&jsoncallback=?";

    $.getJSON(requestURL, function(flickrResponse) {
        flickrResponse.items.forEach(function (item) {
            var $div = $("<div>").hide();
            var $h3 = $("<h3>").hide();
            var $img = $("<img>").hide();

            $div.attr("class", "personal-content-infos");
            $img.attr("src", item.media.m);
            
            $("main .personal-content").append($div);

            $("main .personal-content-foto").append($img);

            $div.fadeIn();
            $img.fadeIn();
        });
    });
};

$(document).ready(main);