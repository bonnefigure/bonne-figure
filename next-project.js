(function () {
    var order = [
        'premiers-feux',
        'ccam',
        'i-want-to',
        'qui-reconnait-les-visages',
        'le-chat-le-chardon-et-la-caslon',
        'cine-club',
        'worldbuilding',
        'version-contre-version',
        'jouer-dejouer',
        'we-like-you-come-visit',
        'er',
        'bring-the-outdoors-in',
        'slayer',
        'la-venue-de-marie-queau',
        'une-annee-a-cambrai'
    ];

    var parts = window.location.pathname.split('/').filter(Boolean);
    var slug = parts[parts.length - 1];
    var idx = order.indexOf(slug);

    if (idx === -1) return;

    var nextSlug = order[(idx + 1) % order.length];

    var btn = document.querySelector('.btn-next');
    if (btn) {
        btn.setAttribute('href', '../' + nextSlug + '/');
    }
})();