// Select the page elements we need.
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const currentYear = document.getElementById("current-year");


// Open and close the mobile navigation menu.
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    const menuIsOpen = navLinks.classList.contains("show");

    menuToggle.textContent = menuIsOpen ? "✕" : "☰";
    menuToggle.setAttribute(
        "aria-label",
        menuIsOpen ? "Close navigation menu" : "Open navigation menu"
    );
});


// Close the mobile menu after a navigation link is selected.
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});


// Display a confirmation when the contact form is submitted.
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const customerName = document.getElementById("name").value.trim();

    formMessage.textContent =
        `Thank you, ${customerName}! Your message has been received.`;

    contactForm.reset();

    setTimeout(() => {
        formMessage.textContent = "";
    }, 5000);
});


// Automatically display the current year in the footer.
currentYear.textContent = new Date().getFullYear();