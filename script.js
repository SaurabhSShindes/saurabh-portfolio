
// =========================
// 1. MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("show");

    const isOpen = navLinks.classList.contains("show");

    menuToggle.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute("aria-expanded", isOpen);

});


// =========================
// 2. CLOSE MENU AFTER CLICK
// =========================

const navigationLinks = document.querySelectorAll(".nav-link");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("show");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// =========================
// 3. ACTIVE NAVIGATION
// =========================

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navigationLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


// =========================
// 4. CURRENT YEAR
// =========================

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();




// =========================
// 6. TYPING ANIMATION
// =========================

const typingText = document.querySelector(".typing-text");

const words = [
    "Software Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentWord.substring(0, charIndex);

    let speed = deleting ? 60 : 120;

    if (!deleting && charIndex === currentWord.length) {

        deleting = true;
        speed = 1500;

    } else if (deleting && charIndex === 0) {

        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;

    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// // CONTACT FORM FUNCTIONALITY

// const contactForm = document.getElementById("contactForm");

// if (contactForm) {

//     contactForm.addEventListener("submit", function(event) {

//         event.preventDefault();

//         const name = document.getElementById("contactName").value.trim();

//         const email = document.getElementById("contactEmail").value.trim();

//         const message = document.getElementById("contactMessage").value.trim();

//         // Check empty fields

//         if (!name || !email || !message) {
//             alert("Please fill all fields!");
//             return;
//         }

//         // Your Email Address
//         const receiverEmail = "saurabh.shinde4767@gmail.com";

//         const subject = encodeURIComponent("Portfolio Contact Message");

//         const body = encodeURIComponent(
//             "Name: " + name +
//             "\nEmail: " + email +
//             "\n\nMessage:\n" + message
//         );

//         const mailtoLink =
//             "mailto:" + receiverEmail +
//             "?subject=" + subject +
//             "&body=" + body;

//         window.location.href = mailtoLink;

//     });

// }


// =========================
// CONTACT FORM - WEB3FORMS
// =========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();


        // hCaptcha Verification

        const captchaResponse = contactForm.querySelector(
            'textarea[name="h-captcha-response"]'
        );

        if (!captchaResponse || !captchaResponse.value.trim()) {

            alert("Please complete the CAPTCHA verification!");

            return;

        }


        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";

        try {

            const formData = new FormData(contactForm);

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (result.success) {

                alert("Message sent successfully!");

                // Reset contact form
                contactForm.reset();

                // Reset CAPTCHA
                if (
                    window.hcaptcha &&
                    typeof window.hcaptcha.reset === "function"
                ) {
                    window.hcaptcha.reset();
                }

            }
            
            else {

                alert(
                    result.message ||
                    "Message could not be sent. Please try again."
                );

            }

        } catch (error) {

            console.error("Contact Form Error:", error);

            alert("Something went wrong. Please try again.");

        } finally {

            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;

        }

    });

}


