// Select the page elements we need.
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const currentYear = document.getElementById("current-year");
const tipForm = document.getElementById("tip-form");
const billAmountInput = document.getElementById("bill-amount");
const customTipInput = document.getElementById("custom-tip");
const peopleCountInput = document.getElementById("people-count");
const tipOptions = document.querySelectorAll(".tip-option");
const calculatorError = document.getElementById("calculator-error");
const tipAmountResult = document.getElementById("tip-amount");
const totalAmountResult = document.getElementById("total-amount");
const perPersonResult = document.getElementById("per-person");

let selectedTip = 18;

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});


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

// Select a suggested tip percentage.
tipOptions.forEach((option) => {
    option.addEventListener("click", () => {
        tipOptions.forEach((button) => {
            button.classList.remove("active");
        });

        option.classList.add("active");
        selectedTip = Number(option.dataset.tip);
        customTipInput.value = "";
        calculatorError.textContent = "";
    });
});


// Use the custom tip instead of a suggested percentage.
customTipInput.addEventListener("input", () => {
    if (customTipInput.value !== "") {
        tipOptions.forEach((button) => {
            button.classList.remove("active");
        });
    }

    calculatorError.textContent = "";
});


// Calculate the tip, total bill, and amount per person.
tipForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const billAmount = Number(billAmountInput.value);
    const peopleCount = Number(peopleCountInput.value);

    const tipPercentage =
        customTipInput.value !== ""
            ? Number(customTipInput.value)
            : selectedTip;

    if (!Number.isFinite(billAmount) || billAmount <= 0) {
        calculatorError.textContent =
            "Please enter a bill amount greater than zero.";

        billAmountInput.focus();
        return;
    }

    if (
        !Number.isInteger(peopleCount) ||
        peopleCount < 1
    ) {
        calculatorError.textContent =
            "Please enter at least one person.";

        peopleCountInput.focus();
        return;
    }

    if (
        !Number.isFinite(tipPercentage) ||
        tipPercentage < 0 ||
        tipPercentage > 100
    ) {
        calculatorError.textContent =
            "Please enter a tip percentage between 0 and 100.";

        customTipInput.focus();
        return;
    }

    const tipAmount = billAmount * (tipPercentage / 100);
    const totalAmount = billAmount + tipAmount;
    const amountPerPerson = totalAmount / peopleCount;

    tipAmountResult.textContent =
        currencyFormatter.format(tipAmount);

    totalAmountResult.textContent =
        currencyFormatter.format(totalAmount);

    perPersonResult.textContent =
        currencyFormatter.format(amountPerPerson);

    calculatorError.textContent = "";
});


// Restore the calculator to its starting values.
tipForm.addEventListener("reset", () => {
    window.setTimeout(() => {
        selectedTip = 18;

        tipOptions.forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.tip === "18"
            );
        });

        tipAmountResult.textContent = "$0.00";
        totalAmountResult.textContent = "$0.00";
        perPersonResult.textContent = "$0.00";
        calculatorError.textContent = "";
    }, 0);
});

// Automatically display the current year in the footer.
currentYear.textContent = new Date().getFullYear();