(function () {
    // Visionneuse desktop uniquement
    if (window.matchMedia('(max-width: 768px)').matches) return;

    var rightColumn = document.querySelector('.column.right');
    if (!rightColumn) return;

    // Images + vidéos locales + iframes = une seule liste
    var media = Array.prototype.slice.call(
        rightColumn.querySelectorAll('img, video, iframe')
    );

    if (media.length === 0) return;

    var overlay = document.createElement('div');
    overlay.className = 'image-viewer-overlay';

    var viewerImg = document.createElement('img');
    var viewerVideo = document.createElement('video');
    var viewerIframe = document.createElement('iframe');

    viewerVideo.controls = false;
    viewerVideo.autoplay = true;
    viewerVideo.loop = true;
    viewerVideo.muted = true;
    viewerVideo.playsInline = true;

    viewerImg.style.pointerEvents = 'none';
    viewerVideo.style.pointerEvents = 'none';

    viewerIframe.frameBorder = '0';
    viewerIframe.allowFullscreen = true;
    viewerIframe.style.pointerEvents = 'auto';

    overlay.appendChild(viewerImg);
    overlay.appendChild(viewerVideo);
    overlay.appendChild(viewerIframe);

    var closeBtn = document.createElement('div');
    closeBtn.className = 'viewer-close';
    closeBtn.textContent = '×';
    overlay.appendChild(closeBtn);

    var cursorFollower = document.createElement('div');
    cursorFollower.className = 'viewer-cursor';
    overlay.appendChild(cursorFollower);

    document.body.appendChild(overlay);

    // Couleur de fond = celle de la colonne de droite
    var rightBg = getComputedStyle(rightColumn).backgroundColor;
    overlay.style.backgroundColor = rightBg;

    var currentIndex = 0;

    function showMedia(index) {
        currentIndex = index;

        var item = media[currentIndex];

        // Cacher tout par défaut
        viewerImg.style.display = 'none';
        viewerVideo.style.display = 'none';
        viewerIframe.style.display = 'none';

        // Arrêter la vidéo locale précédente
        viewerVideo.pause();
        viewerVideo.removeAttribute('src');
        viewerVideo.load();

        if (item.tagName.toLowerCase() === 'img') {

            viewerImg.src = item.src;
            viewerImg.alt = item.alt || '';
            viewerImg.style.display = 'block';

        } else if (item.tagName.toLowerCase() === 'video') {

            var source = item.querySelector('source');

            viewerVideo.src = source
                ? source.src
                : item.currentSrc || item.src;

            viewerVideo.style.display = 'block';

            viewerVideo.currentTime = 0;
            viewerVideo.play().catch(function () {});

        } else if (item.tagName.toLowerCase() === 'iframe') {

            viewerIframe.src = item.src;
            viewerIframe.title = item.title || '';
            viewerIframe.style.display = 'block';
        }

        // Curseur visible immédiatement après changement
        cursorFollower.style.display = 'block';
    }

    function openViewer(index) {
        showMedia(index);
        overlay.classList.add('active');
        document.body.classList.add('viewer-open');
    }

    function closeViewer() {
        overlay.classList.remove('active');
        document.body.classList.remove('viewer-open');

        viewerVideo.pause();
        viewerVideo.removeAttribute('src');
        viewerVideo.load();

        viewerIframe.src = 'about:blank';

        cursorFollower.style.display = 'none';
    }

    function showPrev() {
        showMedia((currentIndex - 1 + media.length) % media.length);
    }

    function showNext() {
        showMedia((currentIndex + 1) % media.length);
    }

    // Clic sur les médias de la page
    media.forEach(function (item, i) {

        item.style.cursor = 'zoom-in';

        item.addEventListener('click', function () {
            openViewer(i);
        });

    });

    // Clic gauche/droite = navigation
    overlay.addEventListener('click', function (e) {

        // Ne pas naviguer si on clique sur la croix
        if (e.target === closeBtn) return;

        // Ne pas naviguer si on clique sur l'iframe
        if (e.target === viewerIframe) return;

        if (e.clientX < window.innerWidth / 2) {
            showPrev();
        } else {
            showNext();
        }

    });

    closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeViewer();
    });

    // Curseur personnalisé
    overlay.addEventListener('mousemove', function (e) {

        // Croix : cacher le curseur
        if (e.target === closeBtn) {
            cursorFollower.style.display = 'none';
            return;
        }

        // Iframe : cacher le curseur
        if (e.target === viewerIframe) {
            cursorFollower.style.display = 'none';
            return;
        }

        cursorFollower.style.display = 'block';

        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';

        cursorFollower.textContent =
            e.clientX < window.innerWidth / 2 ? '<' : '>';

    });

    // Quand la souris entre dans l'iframe,
    // le parent ne reçoit plus les mousemove.
    // On cache donc le curseur dès que l'iframe reçoit le pointeur.
    viewerIframe.addEventListener('mouseenter', function () {
        cursorFollower.style.display = 'none';
    });

    viewerIframe.addEventListener('mouseleave', function () {
        cursorFollower.style.display = 'block';
    });

    document.addEventListener('keydown', function (e) {

        if (!overlay.classList.contains('active')) return;

        switch (e.key) {

            case 'ArrowLeft':
                e.preventDefault();
                showPrev();
                break;

            case 'ArrowRight':
                e.preventDefault();
                showNext();
                break;

            case 'Escape':
                e.preventDefault();
                closeViewer();
                break;

        }

    });

})();