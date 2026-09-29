document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;
    const loader = document.getElementById("page-loader");
    const cover = document.getElementById("cover");
    const openButton = document.getElementById("openInvitation");
    const music = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("music-btn");

    /* ==========================================
       PAGE LOADER
       ========================================== */

    function finishLoading() {

        if (loader) {
            loader.classList.add("hide");
        }

        body.classList.remove("page-loading");
        
        if (cover) {
            cover.classList.add("loaded");
        }

    }

    // Loader pasti hilang
    setTimeout(finishLoading, 800);

    // Pengaman kalau terjadi error/lag
    setTimeout(finishLoading, 2000);


    /* ==========================================
       BUKA UNDANGAN
       ========================================== */

    if (openButton) {

        openButton.addEventListener("click", function () {

            if (cover) {
                cover.classList.add("open");
            }

            body.classList.remove("no-scroll");

            // Putar musik setelah user menekan tombol
            if (music) {

                music.volume = 0.7;

                music.play()
                    .then(function () {

                        if (musicButton) {
                            musicButton.classList.add("playing");
                        }

                    })
                    .catch(function () {

                        console.log("Musik tidak dapat diputar otomatis.");

                    });

            }

            // Aktifkan animasi scroll
            setTimeout(function () {

                if (cover) {
                    cover.style.display = "none";
                }

            }, 1300);

        });

    }


    /* ==========================================
       MUSIC BUTTON
       ========================================== */

    if (musicButton && music) {

        musicButton.addEventListener("click", function () {

            if (music.paused) {

                music.play()
                    .then(function () {
                        musicButton.classList.add("playing");
                    })
                    .catch(function () {
                        console.log("Musik tidak dapat diputar.");
                    });

            } else {

                music.pause();
                musicButton.classList.remove("playing");

            }

        });

    }


    /* ==========================================
       SCROLL REVEAL
       ========================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("active");
        });

    }


    /* ==========================================
       SECTION ANIMATION
       ========================================== */

    const sections = document.querySelectorAll("section");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

    }


    /* ==========================================
       COUNTDOWN
       ========================================== */

    const weddingDate = new Date(
        "2026-12-12T11:00:00+07:00"
    ).getTime();

    function updateCountdown() {

        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = document.getElementById("days");
        const hours = document.getElementById("hours");
        const minutes = document.getElementById("minutes");
        const seconds = document.getElementById("seconds");

        if (distance <= 0) {

            if (days) days.textContent = "00";
            if (hours) hours.textContent = "00";
            if (minutes) minutes.textContent = "00";
            if (seconds) seconds.textContent = "00";

            return;
        }

        const d = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const h = Math.floor(
            (distance / (1000 * 60 * 60)) % 24
        );

        const m = Math.floor(
            (distance / (1000 * 60)) % 60
        );

        const s = Math.floor(
            (distance / 1000) % 60
        );

        if (days) {
            days.textContent = String(d).padStart(2, "0");
        }

        if (hours) {
            hours.textContent = String(h).padStart(2, "0");
        }

        if (minutes) {
            minutes.textContent = String(m).padStart(2, "0");
        }

        if (seconds) {
            seconds.textContent = String(s).padStart(2, "0");
        }

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);


    /* ==========================================
       SPARKLE SAAT KLIK
       ========================================== */

    document.addEventListener("click", function (event) {

        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";

        sparkle.style.left = event.clientX + "px";
        sparkle.style.top = event.clientY + "px";

        document.body.appendChild(sparkle);

        setTimeout(function () {

            sparkle.remove();

        }, 1500);

    });


    /* ==========================================
       IMAGE HOVER / PARALLAX SEDERHANA
       ========================================== */

    const images = document.querySelectorAll("img");

    images.forEach(function (image) {

        image.addEventListener("contextmenu", function (event) {
            event.preventDefault();
        });

    });


    /* ==========================================
       SELESAI
       ========================================== */

    console.log("Hadi & Riya Wedding Invitation aktif.");

});
