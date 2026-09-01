(function() {
    var images = Array.from(document.querySelectorAll('.column.right img'));
    if (images.length === 0) {
        document.dispatchEvent(new Event('allImagesLoaded'));
        return;
    }

    var sources = [];
    var alts = [];

    images.forEach(function(img) {
        sources.push(img.src);
        alts.push(img.alt);
        
        img.removeAttribute('src');
        img.removeAttribute('alt');
    });


    function loadNext(index) {
        if (index >= images.length) {
            document.dispatchEvent(new Event('allImagesLoaded'));
            return;
        }

        var img = images[index];

        img.onload = img.onerror = function() {
            img.alt = alts[index];
            loadNext(index + 1);
        };

        img.src = sources[index];
    }

    loadNext(0);
})();