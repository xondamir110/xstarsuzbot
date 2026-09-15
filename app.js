// ===============================
// X STARS UZ — APP.JS
// ===============================

const tg = window.Telegram?.WebApp;

// Telegram Web App
if (tg) {
    tg.ready();
    tg.expand();

    try {
        tg.setHeaderColor("#08090b");
        tg.setBackgroundColor("#08090b");
    } catch (e) {}
}

// ===============================
// TELEGRAM USER
// ===============================

const user = tg?.initDataUnsafe?.user;

const usernameEl = document.getElementById("username");

if (usernameEl) {
    usernameEl.textContent = user?.username
        ? "@" + user.username
        : user?.first_name || "Foydalanuvchi";
}

// ===============================
// STARS PACKAGES
// ===============================

const starsPackages = [
    { stars: 50, price: 11000 },
    { stars: 100, price: 22000 },
    { stars: 250, price: 55000 },
    { stars: 500, price: 110000 },
    { stars: 1000, price: 220000 },
    { stars: 2000, price: 440000 },
    { stars: 3000, price: 660000 },
    { stars: 4000, price: 880000 },
    { stars: 5000, price: 1100000 }
];

let selectedStars = null;

// ===============================
// HELPERS
// ===============================

function formatPrice(number) {
    return new Intl.NumberFormat("uz-UZ").format(number) + " so'm";
}

function showNotice(message) {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

// ===============================
// NAVIGATION
// ===============================

function navigate(page) {
    const pages = {
        home: document.getElementById("homePage"),
        orders: document.getElementById("ordersPage"),
        balance: document.getElementById("balancePage"),
        profile: document.getElementById("profilePage")
    };

    Object.values(pages).forEach(pageEl => {
        if (pageEl) pageEl.style.display = "none";
    });

    if (pages[page]) {
        pages[page].style.display = "block";
    }

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");

        if (item.dataset.page === page) {
            item.classList.add("active");
        }
    });
}

// ===============================
// SERVICE DATA
// ===============================

const services = {

    stars: {
        title: "Telegram Stars",
        description: "Telegram Stars sotib oling",
        logo: "★"
    },

    premium: {
        title: "Telegram Premium",
        description: "Premium obunasini tanlang",
        logo: "♛"
    },

    gift: {
        title: "Gift",
        description: "Telegram sovg'alarini tanlang",
        logo: "◇"
    },

    nft: {
        title: "NFT",
        description: "NFT xizmatlari",
        logo: "◆"
    },

    poststars: {
        title: "Postga Stars",
        description: "Postga Stars yuborish",
        logo: "✦"
    },

    ton: {
        title: "TON",
        description: "TON xizmatlari",
        logo: "△"
    },

    number: {
        title: "Raqam",
        description: "Telegram raqam xizmatlari",
        logo: "▯"
    }
};

// ===============================
// OPEN SERVICE
// ===============================

function openPage(serviceName) {

    if (serviceName === "stars") {
        openStarsPage();
        return;
    }

    const service = services[serviceName];

    if (!service) return;

    const modal = document.getElementById("serviceModal");
    const logo = document.getElementById("modalLogo");
    const title = document.getElementById("modalTitle");
    const description = document.getElementById("modalDescription");
    const content = document.getElementById("modalContent");

    if (!modal) return;

    if (logo) logo.textContent = service.logo;
    if (title) title.textContent = service.title;
    if (description) description.textContent = service.description;

    if (content) {
        content.innerHTML = `
            <div class="empty-service">
                <div class="empty-icon">${service.logo}</div>
                <h3>Tez orada</h3>
                <p>Bu xizmat hozircha ishlab chiqilmoqda.</p>
            </div>
        `;
    }

    modal.classList.add("active");
}

// ===============================
// STARS PAGE
// ===============================

function openStarsPage() {

    const modal = document.getElementById("serviceModal");
    const logo = document.getElementById("modalLogo");
    const title = document.getElementById("modalTitle");
    const description = document.getElementById("modalDescription");
    const content = document.getElementById("modalContent");

    if (!modal || !content) return;

    if (logo) {
        logo.innerHTML = `
            <svg viewBox="0 0 100 100" width="42" height="42">
                <defs>
                    <linearGradient id="starGold" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#fff3a0"/>
                        <stop offset="45%" stop-color="#ffd21c"/>
                        <stop offset="100%" stop-color="#ff9d00"/>
                    </linearGradient>
                </defs>

                <path
                    d="M50 5
                    L61 37
                    L95 38
                    L68 58
                    L78 91
                    L50 71
                    L22 91
                    L32 58
                    L5 38
                    L39 37 Z"
                    fill="url(#starGold)"
                />
            </svg>
        `;
    }

    if (title) title.textContent = "Telegram Stars";
    if (description) {
        description.textContent = "Kerakli Stars paketini tanlang";
    }

    content.innerHTML = `
        <div class="stars-page">

            <div class="stars-info-card">
                <div class="stars-big-icon">
                    <svg viewBox="0 0 100 100">
                        <defs>
                            <linearGradient id="bigStarGold" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stop-color="#fff3a0"/>
                                <stop offset="45%" stop-color="#ffd21c"/>
                                <stop offset="100%" stop-color="#ff9d00"/>
                            </linearGradient>
                        </defs>

                        <path
                            d="M50 5
                            L61 37
                            L95 38
                            L68 58
                            L78 91
                            L50 71
                            L22 91
                            L32 58
                            L5 38
                            L39 37 Z"
                            fill="url(#bigStarGold)"
                        />
                    </svg>
                </div>

                <div>
                    <div class="stars-info-title">Stars</div>
                    <div class="stars-info-text">
                        50 dan 5000 Stars gacha
                    </div>
                </div>
            </div>

            <div class="stars-packages">

                ${starsPackages.map((item, index) => `
                    <button
                        class="stars-package ${index === 3 ? "popular" : ""}"
                        onclick="selectStars(${item.stars}, this)"
                    >

                        ${index === 3 ? `
                            <span class="popular-badge">
                                Mashhur
                            </span>
                        ` : ""}

                        <div class="package-star">
                            <svg viewBox="0 0 100 100">
                                <defs>
                                    <linearGradient id="packageStar${index}"
                                        x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stop-color="#fff3a0"/>
                                        <stop offset="50%" stop-color="#ffd21c"/>
                                        <stop offset="100%" stop-color="#ff9d00"/>
                                    </linearGradient>
                                </defs>

                                <path
                                    d="M50 5
                                    L61 37
                                    L95 38
                                    L68 58
                                    L78 91
                                    L50 71
                                    L22 91
                                    L32 58
                                    L5 38
                                    L39 37 Z"
                                    fill="url(#packageStar${index})"
                                />
                            </svg>
                        </div>

                        <div class="package-info">
                            <strong>${item.stars.toLocaleString("uz-UZ")} Stars</strong>
                            <span>${formatPrice(item.price)}</span>
                        </div>

                        <div class="package-arrow">
                            ›
                        </div>

                    </button>
                `).join("")}

            </div>

            <div class="stars-limit">
                Maksimal buyurtma: <b>5000 Stars</b>
            </div>

            <button
                id="buyStarsButton"
                class="buy-stars-button"
                onclick="buySelectedStars()"
                disabled
            >
                Stars paketini tanlang
            </button>

        </div>
    `;

    modal.classList.add("active");
}

// ===============================
// SELECT STARS
// ===============================

function selectStars(stars, element) {

    selectedStars = stars;

    document.querySelectorAll(".stars-package").forEach(card => {
        card.classList.remove("selected");
    });

    if (element) {
        element.classList.add("selected");
    }

    const packageData = starsPackages.find(
        item => item.stars === stars
    );

    const button = document.getElementById("buyStarsButton");

    if (!button || !packageData) return;

    button.disabled = false;

    button.innerHTML = `
        <span>${stars.toLocaleString("uz-UZ")} Stars</span>
        <strong>${formatPrice(packageData.price)}</strong>
    `;

    // Telegram haptic
    try {
        tg?.HapticFeedback?.impactOccurred("light");
    } catch (e) {}
}

// ===============================
// BUY STARS
// ===============================

function buySelectedStars() {

    if (!selectedStars) {
        showNotice("Avval Stars paketini tanlang");
        return;
    }

    const packageData = starsPackages.find(
        item => item.stars === selectedStars
    );

    if (!packageData) return;

    /*
       HOZIRCHA FAQAT UI.

       Keyinchalik shu joyga:
       - backend
       - buyurtma yaratish
       - to'lov
       - Telegram Stars yetkazib berish
       qo'shiladi.
    */

    showNotice(
        `${selectedStars.toLocaleString("uz-UZ")} Stars tanlandi`
    );

    try {
        tg?.HapticFeedback?.notificationOccurred("success");
    } catch (e) {}
}

// ===============================
// CLOSE MODAL
// ===============================

function closeModal() {

    const modal = document.getElementById("serviceModal");

    if (modal) {
        modal.classList.remove("active");
    }

    selectedStars = null;
}

// ===============================
// MODAL BACKGROUND CLICK
// ===============================

document.addEventListener("click", function(event) {

    const modal = document.getElementById("serviceModal");

    if (!modal) return;

    if (event.target === modal) {
        closeModal();
    }
});

// ===============================
// ESCAPE
// ===============================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeModal();
    }

});

// ===============================
// INITIAL PAGE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    navigate("home");

    // Telegram user
    const profileUsername =
        document.getElementById("profileUsername");

    if (profileUsername && user) {

        if (user.username) {
            profileUsername.textContent =
                "@" + user.username;
        } else if (user.first_name) {
            profileUsername.textContent =
                user.first_name;
        }
    }

});
