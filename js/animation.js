// =========================================================
// HADI & RIYA
// LUXURY WEDDING INVITATION
// FINAL ANIMATION.JS
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const loader = document.getElementById("page-loader");
    const cover = document.getElementById("cover");
    const openButton = document.getElementById("openInvitation");

    const music = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("music-btn");


    // =====================================================
    // 01. PAGE LOADER
    // =====================================================

    setTimeout(() => {

        if (loader) {
            loader.classList.add("hide");
        }

        body.classList.remove("page-loading");

        if (cover) {
            cover.classList.add("loaded");
        }

    }, 1200);



    // =====================================================
    // 02. OPEN INVITATION
    // =====================================================

    if (openButton && cover) {

        openButton.addEventListener("click", () => {

            // Sparkle effect
            createSparkleBurst(
                window.innerWidth / 2,
                window.innerHeight / 2
            );


            // Cover keluar
            cover.classList.add("open");


            // Aktifkan scroll
            body.classList.remove("no-scroll");


            // Jalankan partikel emas
            startGoldParticles();


            // Putar musik
            playMusic();


            // Scroll ke awal halaman
            setTimeout(() => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }, 500);


            // Hilangkan cover dari interaksi
            setTimeout(() => {

                cover.style.display = "none";

            }, 1400);

        });

    }



    // =====================================================
    // 03. MUSIC
    // =====================================================

    function playMusic() {

        if (!music) return;

        const promise = music.play();

        if (promise !== undefined) {

            promise
                .then(() => {

                    if (musicButton) {
                        musicButton.classList.add("playing");
                    }

                })
                .catch(() => {

                    /*
                     * Beberapa browser memblokir autoplay.
                     * Musik tetap bisa dimainkan lewat tombol musik.
                     */

                });

        }
    }


    function pauseMusic() {

        if (!music) return;

        music.pause();

        if (musicButton) {
            musicButton.classList.remove("playing");
        }
    }


    if (musicButton) {

        musicButton.addEventListener("click", () => {

            if (!music) return;

            if (music.paused) {

                playMusic();

            } else {

                pauseMusic();

            }

        });

    }



    // =====================================================
    // 04. SCROLL REVEAL
    // =====================================================

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
    );


    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -60px 0px"
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });



    // =====================================================
    // 05. SECTION ANIMATION
    // =====================================================

    const sections = document.querySelectorAll("section");


    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });



    // =====================================================
    // 06. GOLD PARTICLES
    // =====================================================

    function createGoldParticle() {

        const particle = document.createElement("span");

        particle.className = "gold-particle";


        const startX =
            Math.random() *
            window.innerWidth;


        const startY =
            window.innerHeight +
            20;


        const moveX =
            (Math.random() - 0.5) * 180;


        const duration =
            5000 +
            Math.random() * 6000;


        particle.style.left =
            `${startX}px`;

        particle.style.top =
            `${startY}px`;

        particle.style.setProperty(
            "--move-x",
            `${moveX}px`
        );

        particle.style.animationDuration =
            `${duration}ms`;


        document.body.appendChild(particle);


        setTimeout(() => {

            particle.remove();

        }, duration + 500);

    }


    function startGoldParticles() {

        // Buat beberapa partikel awal
        for (let i = 0; i < 18; i++) {

            setTimeout(() => {

                createGoldParticle();

            }, i * 250);

        }


        // Partikel terus berjalan
        setInterval(() => {

            createGoldParticle();

        }, 700);

    }



    // =====================================================
    // 07. SPARKLE
    // =====================================================

    function createSparkle(x, y) {

        const sparkle =
            document.createElement("span");

        sparkle.className =
            "sparkle";


        sparkle.style.left =
            `${x}px`;

        sparkle.style.top =
            `${y}px`;


        document.body.appendChild(sparkle);


        setTimeout(() => {

            sparkle.remove();

        }, 1600);

    }


    function createSparkleBurst(x, y) {

        const amount = 18;


        for (let i = 0; i < amount; i++) {

            const angle =
                (Math.PI * 2 / amount) * i;


            const distance =
                50 + Math.random() * 100;


            const sparkleX =
                x +
                Math.cos(angle) * distance;


            const sparkleY =
                y +
                Math.sin(angle) * distance;


            setTimeout(() => {

                createSparkle(
                    sparkleX,
                    sparkleY
                );

            }, i * 25);

        }

    }



    // =====================================================
    // 08. CLICK SPARKLE
    // =====================================================

    document.addEventListener("click", (event) => {

        // Jangan terlalu banyak sparkle
        if (
            event.target.closest(".music-btn") ||
            event.target.closest(".open-btn")
        ) {
            return;
        }


        createSparkle(
            event.clientX,
            event.clientY
        );

    });



    // =====================================================
    // 09. PARALLAX
    // =====================================================

    const parallaxElements =
        document.querySelectorAll(".parallax");


    let ticking = false;


    function updateParallax() {

        const scrollY =
            window.scrollY;


        parallaxElements.forEach((element) => {

            const speed =
                parseFloat(
                    element.dataset.speed || "0.15"
                );


            const movement =
                scrollY * speed;


            element.style.transform =
                `translateY(${movement}px)`;

        });


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );



    // =====================================================
    // 10. COUNTDOWN
    // =====================================================

    const targetDate =
        new Date(
            "2026-12-12T11:00:00+07:00"
        ).getTime();


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    function updateCountdown() {

        const now =
            new Date().getTime();


        const distance =
            targetDate - now;


        if (distance <= 0) {

            if (daysElement)
                daysElement.textContent = "00";

            if (hoursElement)
                hoursElement.textContent = "00";

            if (minutesElement)
                minutesElement.textContent = "00";

            if (secondsElement)
                secondsElement.textContent = "00";

            return;

        }


        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (distance %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (distance %
                    (1000 * 60)) /
                1000
            );


        if (daysElement) {

            daysElement.textContent =
                String(days).padStart(2, "0");

        }


        if (hoursElement) {

            hoursElement.textContent =
                String(hours).padStart(2, "0");

        }


        if (minutesElement) {

            minutesElement.textContent =
                String(minutes).padStart(2, "0");

        }


        if (secondsElement) {

            secondsElement.textContent =
                String(seconds).padStart(2, "0");

        }

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );



    // =====================================================
    // 11. IMAGE PROTECTION / UX
    // =====================================================

    document
        .querySelectorAll("img")
        .forEach((image) => {

            image.setAttribute(
                "draggable",
                "false"
            );

        });



    // =====================================================
    // 12. MUSIC VISIBILITY
    // =====================================================

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden &&
                music &&
                !music.paused
            ) {

                music.pause();

                if (musicButton) {

                    musicButton.classList.remove(
                        "playing"
                    );

                }

            }

        }
    );



    // =====================================================
    // 13. IMAGE LOADING EFFECT
    // =====================================================

    document
        .querySelectorAll("img")
        .forEach((image) => {

            if (image.complete) {

                image.classList.add("loaded");

            } else {

                image.addEventListener(
                    "load",
                    () => {

                        image.classList.add(
                            "loaded"
                        );

                    }
                );

            }

        });



    // =====================================================
    // 14. SMOOTH INTERNAL LINKS
    // =====================================================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });

});
