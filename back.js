document.querySelectorAll('.btn-back, .btn-back-fr, .btn-back-en').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        // 1. On vérifie qu'on est sur mobile (écran < 768px)
        if (window.matchMedia("(max-width: 768px)").matches) {
            // 2. On vérifie que l'utilisateur vient bien d'une page de ton site
            if (document.referrer.includes(window.location.hostname)) {
                e.preventDefault(); // On annule le lien normal
                window.history.back(); // On utilise le BFCache instantané
            }
        }
        // Sur desktop, le script ne fait rien : le lien <a href="/"> fonctionnera normalement
        // et chargera ton Index tout en lisant ton sessionStorage pour le scroll.
    });
});