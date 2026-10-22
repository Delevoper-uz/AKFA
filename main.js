document.addEventListener("DOMContentLoaded", function () {
    var loader = document.getElementById("door-loader");
    
    setTimeout(function () {
        loader.classList.add("anim-handle");
    }, 500);

    setTimeout(function () {
        loader.classList.add("anim-open");
    }, 1000);

    setTimeout(function () {
        loader.classList.add("anim-zoom");
    }, 2000);

    setTimeout(function () {
        loader.style.visibility = "hidden";
    }, 2800);

    var contactBtn = document.getElementById("contact-btn");
    var ctaContactTrigger = document.getElementById("cta-contact-trigger");
    var contactModal = document.getElementById("contact-modal");
    var modalClose = document.getElementById("modal-close");

    contactModal.style.visibility = "hidden";

    contactBtn.addEventListener("click", function (e) {
        e.preventDefault();
        contactModal.style.visibility = "visible";
    });

    if (ctaContactTrigger) {
        ctaContactTrigger.addEventListener("click", function () {
            contactModal.style.visibility = "visible";
        });
    }

    modalClose.addEventListener("click", function () {
        contactModal.style.visibility = "hidden";
    });

    var contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = document.getElementById("contact-name").value;
        var phone = document.getElementById("contact-phone").value;
        var message = document.getElementById("contact-message").value;

        if (name && phone && message) {
            showNotification("Habar Noma jonatildi", function () {});
            contactForm.reset();
            contactModal.style.visibility = "hidden";
        }
    });

    function showNotification(text, onClick) {
        var container = document.getElementById("toast-container");
        var toast = document.createElement("div");
        toast.className = "toast";
        toast.innerText = text;

        toast.addEventListener("click", function () {
            if (onClick) onClick();
            toast.remove();
        });

        container.appendChild(toast);

        setTimeout(function () {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 4000);
    }

    var cartItems = [];
    var cartCountEl = document.getElementById("cart-count");
    var cartSidebar = document.getElementById("cart-sidebar");
    var cartOverlay = document.getElementById("cart-overlay");
    var cartClose = document.getElementById("cart-close");
    var cartIconBtn = document.getElementById("cart-icon-btn");
    var cartItemsList = document.getElementById("cart-items-list");
    var cartOrderForm = document.getElementById("cart-order-form");

    function openCart() {
        cartSidebar.classList.add("open");
        cartOverlay.classList.add("open");
    }

    function closeCart() {
        cartSidebar.classList.remove("open");
        cartOverlay.classList.remove("open");
    }

    cartIconBtn.addEventListener("click", openCart);
    cartClose.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);

    var addToCartBtns = document.querySelectorAll(".add-to-cart");
    addToCartBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var name = btn.getAttribute("data-name");
            var price = btn.getAttribute("data-price");
            
            cartItems.push({ name: name, price: price });
            cartCountEl.innerText = cartItems.length;
            renderCart();

            showNotification("Savatchaga qo'shildi: " + name, function () {
                openCart();
            });
        });
    });

    function renderCart() {
        if (cartItems.length === 0) {
            cartItemsList.innerHTML = '<p class="empty-cart-msg">Savatchangiz bo\'sh</p>';
            return;
        }
        cartItemsList.innerHTML = "";
        cartItems.forEach(function (item) {
            var row = document.createElement("div");
            row.className = "cart-item-row";
            row.innerHTML = "<span>" + item.name + "</span><strong>" + item.price + " UZS</strong>";
            cartItemsList.appendChild(row);
        });
    }

    cartOrderForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var uName = document.getElementById("cart-user-name").value;
        var uPhone = document.getElementById("cart-user-phone").value;

        if (cartItems.length === 0) {
            showNotification("Savatchangiz bo'sh!", function () {});
            return;
        }

        if (uName && uPhone) {
            showNotification("Buyurtmangiz qabul qilindi!", function () {});
            cartItems = [];
            cartCountEl.innerText = "0";
            renderCart();
            cartOrderForm.reset();
            closeCart();
        }
    });

    var viewMoreBtns = document.querySelectorAll(".view-more-btn");
    viewMoreBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var extra = btn.nextElementSibling;
            if (extra.classList.contains("active")) {
                extra.classList.remove("active");
                btn.innerText = "VIEW MORE";
            } else {
                extra.classList.add("active");
                btn.innerText = "VIEW LESS";
            }
        });
    });
});