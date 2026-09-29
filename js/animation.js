document.addEventListener("DOMContentLoaded", function () {

    console.log("Animation JS berhasil dijalankan");

    const loader = document.getElementById("page-loader");
    const cover = document.getElementById("cover");
    const openButton = document.getElementById("openInvitation");

    // Hilangkan loading
    setTimeout(function () {

        if (loader) {
            loader.classList.add("hide");
        }

        if (cover) {
            cover.classList.add("loaded");
        }

        document.body.classList.remove("page-loading");
        document.body.classList.remove("no-scroll");

    }, 800);


    // Tombol buka undangan
    if (openButton) {

        openButton.addEventListener("click", function () {

            if (cover) {
                cover.classList.add("open");
            }

            document.body.classList.remove("no-scroll");

            // Musik
            const music = document.getElementById("weddingMusic");

            if (music) {
                music.play().catch(function () {
                    console.log("Musik menunggu interaksi pengguna.");
                });
            }

        });

    }

});
