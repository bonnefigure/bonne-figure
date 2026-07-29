document.querySelectorAll('.btn-back, .btn-back-fr, .btn-back-en, .header-left, .header-right').forEach(function(link) {

    link.addEventListener('click', function(e) {

        if (!document.referrer.includes(window.location.hostname)) {
            return;
        }

        e.preventDefault();

        window.history.back();
    });

});