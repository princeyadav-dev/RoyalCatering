const whatsappBtn = document.getElementById("whatsapp-send");
const emailBtn = document.getElementById("email-send");

function getSelectedDishesMessage() {
    const items = document.querySelectorAll(".menu-item");
    let message = "Hi! I would like to order:\n\n";
    let hasSelection = false;

    items.forEach(item => {
        const checkbox = item.querySelector(".dish-checkbox");
        const qtyInput = item.querySelector(".dish-qty");

        if (checkbox.checked) {
            hasSelection = true;
            const name = checkbox.dataset.name;
            const price = checkbox.dataset.price;
            const qty = qtyInput.value;

            message += `• ${name}\n  Qty: ${qty}\n  Price: ${price}\n\n`;
        }
    });

    if (!hasSelection) {
        alert("Please select at least one dish");
        return null;
    }

    return message;
}

/* WhatsApp */
whatsappBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const message = getSelectedDishesMessage();
    if (!message) return;

    const phone = "919958792286"; // apna number (country code ke saath)
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
});

/* Email */
emailBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const message = getSelectedDishesMessage();
    if (!message) return;

    const mail = `mailto:info@royalcatering.com?subject=Menu Order&body=${encodeURIComponent(message)}`;
    window.location.href = mail;
});

const totalPriceEl = document.getElementById("total-price");

function calculateTotal() {
    let total = 0;

    document.querySelectorAll(".menu-item").forEach(item => {
        const checkbox = item.querySelector(".dish-checkbox");
        const qtyInput = item.querySelector(".dish-qty");

        if (checkbox.checked) {
            const price = parseFloat(
                checkbox.dataset.price.replace("$", "")
            );
            const qty = parseInt(qtyInput.value) || 1;

            total += price * qty;
        }
    });

    totalPriceEl.textContent = "$" + total.toFixed(2);
}

/* EVENTS */
document.querySelectorAll(".dish-checkbox").forEach(cb => {
    cb.addEventListener("change", calculateTotal);
});

document.querySelectorAll(".dish-qty").forEach(qty => {
    qty.addEventListener("input", calculateTotal);
});
