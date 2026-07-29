document.querySelectorAll('.btn-back, .btn-back-fr, .btn-back-en, .header-left, .header-right').forEach(function(link) {

    link.addEventListener('click', function(e) {

        if (!window.matchMedia("(max-width: 768px)").matches) {
            return;
        }

        if (!document.referrer.includes(window.location.hostname)) {
            return;
        }

        e.preventDefault();

        var ref = document.referrer;

        // Si on revient d'une page index :
        // on utilise l'historique (instantané)
        if (ref === window.location.origin + '/' ||
            ref === window.location.origin) {

            window.history.back();
            return;
        }


        // Si on vient d'un projet :
        // on retourne directement à l'index.
        // La position sera restaurée par sessionStorage.
        window.location.href = '../';
    });

});