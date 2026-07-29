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

    var btns = document.querySelectorAll('.btn-next');
    btns.forEach(function (btn) {
        btn.setAttribute('href', '../' + nextSlug + '/');
        // ajouté : incrémente la profondeur à chaque clic "suivant"
        btn.addEventListener('click', function () {
            var depth = parseInt(sessionStorage.getItem('projectDepth') || '1', 10);
            sessionStorage.setItem('projectDepth', String(depth + 1));
        });
    });
})();