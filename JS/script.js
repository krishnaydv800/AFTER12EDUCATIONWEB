document.addEventListener(
    "DOMContentLoaded",
    function () {

        const menuBtn =
            document.getElementById("menuBtn");

        const navMenu =
            document.getElementById("navMenu");


        if (menuBtn && navMenu) {

            menuBtn.addEventListener(
                "click",
                function () {

                    navMenu.classList.toggle("show");

                }
            );


            const navLinks =
                navMenu.querySelectorAll("a");


            navLinks.forEach(link => {

                link.addEventListener(
                    "click",
                    function () {

                        navMenu.classList.remove(
                            "show"
                        );

                    }
                );

            });

        }

    }
);