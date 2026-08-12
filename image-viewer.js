(function () {
    var rightColumn = document.querySelector('.column.right');
    if (!rightColumn) return;

    var images = Array.prototype.slice.call(rightColumn.querySelectorAll('img'));
    if (images.length === 0) return;

    var overlay = document.createElement('div');
    overlay.className = 'image-viewer-overlay';

    var viewerImg = document.createElement('img');
    overlay.appendChild(viewerImg);

    var backBtn = document.createElement('a');
    backBtn.href = '#';
    backBtn.className = 'viewer-back';
    backBtn.innerHTML = 'retour <span lang="en">back</span>';

    var nextBtn = document.createElement('a');
    nextBtn.href = '#';
    nextBtn.className = 'viewer-next';
    nextBtn.innerHTML = 'suivant<span lang="en"> next</span>';

    overlay.appendChild(backBtn);
    overlay.appendChild(nextBtn);
    document.body.appendChild(overlay);

    // couleur de fond = celle de la colonne de droite de la page projet
    var rightBg = getComputedStyle(rightColumn).backgroundColor;
    overlay.style.backgroundColor = rightBg;

    var currentIndex = 0;

    function showImage(index) {
        currentIndex = index;
        viewerImg.src = images[currentIndex].src;
        viewerImg.alt = images[currentIndex].alt || '';
    }

    function openViewer(index) {
        showImage(index);
        overlay.classList.add('active');
        document.body.classList.add('viewer-open');
    }

    function closeViewer() {
        overlay.classList.remove('active');
        document.body.classList.remove('viewer-open');
    }

    function showNext() {
        showImage((currentIndex + 1) % images.length);
    }

    images.forEach(function (img, i) {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function () {
            openViewer(i);
        });
    });

    backBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeViewer();
    });

    nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showNext();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeViewer();
        }
    });
})();