document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENT
    ===================================================== */

    const body = document.body;
    const loader = document.getElementById("page-loader");
    const cover = document.getElementById("cover");
    const openButton = document.getElementById("openInvitation");

    const music = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("music-btn");


    /* =====================================================
       LOADING SCREEN
    ===================================================== */

    let loaderFinished = false;

    function finishLoading() {

        if (loaderFinished) return;

        loaderFinished = true;

        if (loader) {
            loader.classList.add("hide");
        }

        body.classList.remove("page-loading");

        if (cover) {
            cover.classList.add("loaded");
        }
    }

    // Normal loading
    window.addEventListener("load", function () {
        setTimeout(finishLoading, 500);
    });

    // Backup agar tidak loading terus
    setTimeout(finishLoading, 1500);
    setTimeout(finishLoading, 3000);


    /* =====================================================
       OPEN INVITATION
    ===================================================== */

    if (openButton) {

        openButton.addEventListener("click", function () {

            // Animasi cover membuka
            if (cover) {
                cover.classList.add("open");
            }

            // Izinkan halaman di-scroll
            body.classList.remove("no-scroll");

            // Putar musik
            if (music) {

                music.volume = 0.7;

                const playMusic = music.play();

                if (playMusic !== undefined) {

                    playMusic
                        .then(function () {

                            if (musicButton) {
                                musicButton.classList.add("playing");
                            }

                        })
                        .catch(function () {

                            console.log(
                                "Musik belum dapat diputar otomatis."
                            );

                        });
                }
            }

            // Hilangkan cover setelah animasi selesai
            setTimeout(function () {

                if (cover) {
                    cover.style.visibility = "hidden";
                    cover.style.pointerEvents = "none";
                }

            }, 1500);

        });

    }


    /* =====================================================
       MUSIC BUTTON
    ===================================================== */

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


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("active");

        });

    }


    /* =====================================================
       SECTION ANIMATION
    ===================================================== */

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
                threshold: 0.08
            }
        );

        sections.forEach(function (section) {

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       COUNTDOWN
    ===================================================== */

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


        // Jika hari H sudah tiba
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


    /* =====================================================
       GOLD PARTICLES
    ===================================================== */

    function createParticle() {

        const particle = document.createElement("span");

        particle.className = "particle";

        particle.style.left =
            Math.random() * 100 + "vw";

        particle.style.animationDuration =
            (5 + Math.random() * 7) + "s";

        particle.style.opacity =
            0.3 + Math.random() * 0.7;

        const size =
            2 + Math.random() * 4;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";


        document.body.appendChild(particle);


        setTimeout(function () {

            particle.remove();

        }, 13000);

    }


    // Jangan terlalu banyak particle di HP
    setInterval(function () {

        createParticle();

    }, 1800);


    /* =====================================================
       CLICK SPARKLE
    ===================================================== */

    document.addEventListener("click", function (event) {

        // Jangan membuat sparkle terlalu banyak
        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";

        sparkle.style.left =
            event.clientX + "px";

        sparkle.style.top =
            event.clientY + "px";


        document.body.appendChild(sparkle);


        setTimeout(function () {

            sparkle.remove();

        }, 1500);

    });


    /* =====================================================
       PARALLAX HERO
    ===================================================== */

    const hero = document.querySelector(".hero");

    if (hero) {

        window.addEventListener(
            "scroll",
            function () {

                const scrollY = window.scrollY;

                if (scrollY < window.innerHeight) {

                    const heroImage =
                        hero.querySelector("img");

                    if (heroImage) {

                        heroImage.style.transform =
                            "translateY(" +
                            scrollY * 0.12 +
                            "px)";

                    }

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       IMAGE PROTECTION
    ===================================================== */

    const images = document.querySelectorAll("img");

    images.forEach(function (image) {

        image.addEventListener(
            "contextmenu",
            function (event) {

                event.preventDefault();

            }
        );


        image.addEventListener(
            "dragstart",
            function (event) {

                event.preventDefault();

            }
        );

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(
        function (link) {

            link.addEventListener("click", function (event) {

                const targetId =
                    this.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        }
    );


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "✨ Hadi & Riya Wedding Invitation aktif."
    );

});
