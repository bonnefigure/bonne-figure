document.querySelectorAll('.btn-back, .btn-back-fr, .btn-back-en, .header-left, .header-right').forEach(function(link) {

    link.addEventListener('click', function(e) {

        if (!window.matchMedia("(max-width: 768px)").matches) {
            return;
        }

        if (!document.referrer.includes(window.location.hostname)) {
            return;
        }

        e.preventDefault();

        window.location.href = '../';
    });

});