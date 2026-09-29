document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;
    const loader = document.getElementById("page-loader");
    const cover = document.getElementById("cover");
    const openButton = document.getElementById("openInvitation");

    const music = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("music-btn");


    /* =========================================
       LOADING
       ========================================= */

    function hideLoader() {

        if (loader) {
            loader.classList.add("hide");
        }

        body.classList.remove("page-loading");

        if (cover) {
            cover.classList.add("loaded");
        }
    }


    // Hilangkan loading setelah 1 detik
    setTimeout(hideLoader, 1000);


    // Pengaman tambahan:
    // kalau ada masalah JS lain, loading tetap hilang
    setTimeout(hideLoader, 3000);



    /* =========================================
       BUKA UNDANGAN
       ========================================= */

    if (openButton && cover) {

        openButton.addEventListener("click", function () {

            cover.classList.add("open");

            body.classList.remove("no-scroll");

            playMusic();

            setTimeout(function () {

                cover.style.display = "none";

            }, 1300);

        });

    }



    /* =========================================
       MUSIK
       ========================================= */

    function playMusic() {

        if (!music) return;

        music.play()
            .then(function () {

                if (musicButton) {
                    musicButton.classList.add("playing");
                }

            })
            .catch(function () {

                console.log(
                    "Musik membutuhkan interaksi pengguna."
                );

            });

    }


    function pauseMusic() {

        if (!music) return;

        music.pause();

        if (musicButton) {
            musicButton.classList.remove("playing");
        }

    }


    if (musicButton) {

        musicButton.addEventListener("click", function () {

            if (!music) return;

            if (music.paused) {

                playMusic();

            } else {

                pauseMusic();

            }

        });

    }



    /* =========================================
       SCROLL REVEAL
       ========================================= */

    const elements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("active");

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        elements.forEach(function (element) {

            observer.observe(element);

        });

    } else {

        elements.forEach(function (element) {

            element.classList.add("active");

        });

    }



    /* =========================================
       SECTION VISIBLE
       ========================================= */

    const sections =
        document.querySelectorAll("section");


    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

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



    /* =========================================
       COUNTDOWN
       ========================================= */

    const targetDate =
        new Date(
            "2026-12-12T11:00:00+07:00"
        ).getTime();


    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");


    function updateCountdown() {

        const now =
            new Date().getTime();

        const distance =
            targetDate - now;


        if (distance <= 0) {

            if (days) days.textContent = "00";
            if (hours) hours.textContent = "00";
            if (minutes) minutes.textContent = "00";
            if (seconds) seconds.textContent = "00";

            return;
        }


        const d =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const h =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );


        const m =
            Math.floor(
                (distance %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );


        const s =
            Math.floor(
                (distance %
                    (1000 * 60)) /
                1000
            );


        if (days) {

            days.textContent =
                String(d).padStart(2, "0");

        }


        if (hours) {

            hours.textContent =
                String(h).padStart(2, "0");

        }


        if (minutes) {

            minutes.textContent =
                String(m).padStart(2, "0");

        }


        if (seconds) {

            seconds.textContent =
                String(s).padStart(2, "0");

        }

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );



    /* =========================================
       SPARKLE KETIKA KLIK
       ========================================= */

    document.addEventListener(
        "click",
        function (event) {

            if (
                event.target.closest(".music-btn") ||
                event.target.closest(".open-btn")
            ) {
                return;
            }


            const sparkle =
                document.createElement("span");


            sparkle.className =
                "sparkle";


            sparkle.style.left =
                event.clientX + "px";


            sparkle.style.top =
                event.clientY + "px";


            document.body.appendChild(
                sparkle
            );


            setTimeout(function () {

                sparkle.remove();

            }, 1500);

        }
    );

});
