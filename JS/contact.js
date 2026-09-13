const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name")
                    .value.trim();


            const message =
                document.getElementById("message");


            const formMsg =
                document.getElementById("formMsg");


            if (name === "") {

                formMsg.textContent =
                    "Please enter your name.";

                return;

            }


            formMsg.textContent =
                "✓ Thanks! Your message was received in this frontend demo. No data was sent to a server.";


            contactForm.reset();

        }
    );

}