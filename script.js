// ================================
// MENU CHECKLIST → WHATSAPP / EMAIL
// ================================

document.addEventListener("DOMContentLoaded", () => {

    const whatsappBtn = document.getElementById("whatsapp-send");
    const emailBtn = document.getElementById("email-send");

    // 🔹 Apna WhatsApp number (country code ke saath)
    const WHATSAPP_NUMBER = "919958792286"; // 91 + number

    function getSelectedDishesMessage() {
        const selected = document.querySelectorAll(".dish-checkbox:checked");

        if (selected.length === 0) {
            alert("Please select at least one dish!");
            return null;
        }

        let message = "Hi! I would like to order the following dishes:\n\n";

        selected.forEach((dish, index) => {
            const name = dish.dataset.name;
            const price = dish.dataset.price;
            message += `${index + 1}. ${name} (${price})\n`;
        });

        message += "\nPlease contact me for further details.";

        return message;
    }

    // ====================
    // WHATSAPP SEND
    // ====================
    whatsappBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const message = getSelectedDishesMessage();
        if (!message) return;

        const url =
            `https://wa.me/${WHATSAPP_NUMBER}?text=` +
            encodeURIComponent(message);

        window.open(url, "_blank");
    });

    // ====================
    // EMAIL SEND
    // ====================
    emailBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const message = getSelectedDishesMessage();
        if (!message) return;

        const subject = "Menu Selection – Royal Catering";
        const mailto =
            `mailto:animesansaryt@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

        window.location.href = mailto;
    });

});

// Footer WhatsApp click
const footerWhatsApp = document.querySelector('.footer-contact a[href*="wa.me"]');

footerWhatsApp.addEventListener('click', (e) => {
    console.log("User clicked WhatsApp link!");
    // Optional: alert("Redirecting to WhatsApp...");
});

