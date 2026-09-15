// ==========================================
// X STARS UZ — APP.JS
// ==========================================

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


// ==========================================
// TELEGRAM USER
// ==========================================

const telegramUser = tg?.initDataUnsafe?.user;

const profileName = document.getElementById("profileName");
const profileUsername = document.getElementById("profileUsername");

if (telegramUser) {

    if (profileName) {
        profileName.textContent =
            telegramUser.first_name || "Foydalanuvchi";
    }

    if (profileUsername) {
        profileUsername.textContent =
            telegramUser.username
                ? "@" + telegramUser.username
                : "Telegram foydalanuvchisi";
    }
}


// ==========================================
// STARS PACKAGES
// ==========================================

const starsPackages = [
    {
        stars: 50,
        price: 11000
    },
    {
        stars: 100,
        price: 22000
    },
    {
        stars: 250,
        price: 55000
    },
    {
        stars: 500,
        price: 110000
    },
    {
        stars: 1000,
        price: 220000
    },
    {
        stars: 2000,
        price: 440000
    },
    {
        stars: 3000,
        price: 660000
    },
    {
        stars: 4000,
        price: 880000
    },
    {
        stars: 5000,
        price: 1100000
    }
];

let selectedStars = null;


// ==========================================
// PRICE FORMAT
// ==========================================

function formatPrice(price) {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm";
}


// ==========================================
// TOAST
// ==========================================

function showNotice(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


// ==========================================
// NAVIGATION
// ==========================================

function navigate(page, button) {

    const orders = document.getElementById("orders");
    const profile = document.getElementById("profile");

    // Home content
    const homeSections = document.querySelectorAll(
        ".topbar, .hero, .balance-card, .stats, .section"
    );

    // Hide pages
    if (orders) {
        orders.classList.add("hidden");
    }

    if (profile) {
        profile.classList.add("hidden");
    }

    // Hide/show home
    if (page === "home") {

        homeSections.forEach(section => {
            section.style.display = "";
        });

    } else {

        homeSections.forEach(section => {
            section.style.display = "none";
        });
    }


    // Orders
    if (page === "orders" && orders) {
        orders.classList.remove("hidden");
    }


    // Profile
    if (page === "profile" && profile) {
        profile.classList.remove("hidden");
    }


    // Balance
    if (page === "balance") {

        homeSections.forEach(section => {
            section.style.display = "none";
        });

        showNotice("Balans bo'limi");
    }


    // Active navigation
    document.querySelectorAll(".nav").forEach(nav => {
        nav.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }
}


// ==========================================
// SERVICES
// ==========================================

const services = {

    premium: {
        title: "Premium",
        description: "Telegram Premium obunasini tanlang",
        logo: "♛"
    },

    gift: {
        title: "Gift",
        description: "Telegram sovg'alarini tanlang",
        logo: "◇"
    },

    nft: {
        title: "NFT",
        description: "NFT kolleksiyalari",
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
        description: "Virtual raqamlar",
        logo: "▯"
    }
};


// ==========================================
// OPEN PAGE
// ==========================================

function openPage(serviceName) {

    // Stars
    if (serviceName === "stars") {
        openStars();
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


    if (logo) {
        logo.textContent = service.logo;
    }

    if (title) {
        title.textContent = service.title;
    }

    if (description) {
        description.textContent = service.description;
    }

    if (content) {

        content.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">${service.logo}</div>

                <h3>Tez orada</h3>

                <p>
                    Bu xizmat hozircha ishlab chiqilmoqda.
                </p>
            </div>
        `;
    }


    modal.classList.remove("hidden");
    modal.classList.add("active");
}


// ==========================================
// OPEN STARS
// ==========================================

function openStars() {

    const modal = document.getElementById("serviceModal");
    const logo = document.getElementById("modalLogo");
    const title = document.getElementById("modalTitle");
    const description = document.getElementById("modalDescription");
    const content = document.getElementById("modalContent");

    if (!modal || !content) return;


    if (logo) {
        logo.innerHTML = `
            <svg viewBox="0 0 100 100"
                 width="48"
                 height="48"
                 style="display:block">

                <defs>
                    <linearGradient
                        id="starsGold"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1">

                        <stop offset="0%"
                              stop-color="#fff3a0"/>

                        <stop offset="45%"
                              stop-color="#ffd21c"/>

                        <stop offset="100%"
                              stop-color="#ff9d00"/>
                    </linearGradient>
                </defs>

                <path
                    d="M50 4
                       L61 37
                       L96 38
                       L68 59
                       L79 93
                       L50 72
                       L21 93
                       L32 59
                       L4 38
                       L39 37 Z"

                    fill="url(#starsGold)"
                />
            </svg>
        `;
    }


    if (title) {
        title.textContent = "Stars";
    }


    if (description) {
        description.textContent =
            "Telegram Stars sotib oling";
    }


    // Packages
    content.innerHTML = `

        <div class="stars-packages">

            ${starsPackages.map((item, index) => `

                <button
                    class="stars-package ${index === 3 ? "popular" : ""}"
                    onclick="selectStars(${item.stars}, this)"
                >

                    ${
                        index === 3
                            ? `<span class="popular-badge">
                                Mashhur
                               </span>`
                            : ""
                    }


                    <div class="package-star">

                        <svg viewBox="0 0 100 100">

                            <defs>
                                <linearGradient
                                    id="packageGold${index}"
                                    x1="0"
                                    y1="0"
                                    x2="1"
                                    y2="1">

                                    <stop offset="0%"
                                          stop-color="#fff3a0"/>

                                    <stop offset="50%"
                                          stop-color="#ffd21c"/>

                                    <stop offset="100%"
                                          stop-color="#ff9d00"/>
                                </linearGradient>
                            </defs>


                            <path
                                d="M50 4
                                   L61 37
                                   L96 38
                                   L68 59
                                   L79 93
                                   L50 72
                                   L21 93
                                   L32 59
                                   L4 38
                                   L39 37 Z"

                                fill="url(#packageGold${index})"
                            />

                        </svg>

                    </div>


                    <div class="package-info">

                        <strong>
                            ${item.stars.toLocaleString("uz-UZ")}
                            Stars
                        </strong>

                        <span>
                            ${formatPrice(item.price)}
                        </span>

                    </div>


                    <div class="package-arrow">
                        →
                    </div>

                </button>

            `).join("")}

        </div>


        <div
            style="
                text-align:center;
                margin:16px 0;
                color:#8b9098;
                font-size:13px;
            "
        >
            Maksimal buyurtma:
            <b style="color:#ffd21c">
                5000 Stars
            </b>
        </div>


        <button
            id="buyStarsButton"
            onclick="buyStars()"
            disabled
            style="
                width:100%;
                border:0;
                border-radius:18px;
                padding:17px;
                background:#ffd21c;
                color:#08090b;
                font-size:16px;
                font-weight:800;
                opacity:.5;
                cursor:pointer;
            "
        >
            Stars paketini tanlang
        </button>

    `;


    modal.classList.remove("hidden");
    modal.classList.add("active");

    selectedStars = null;
}


// ==========================================
// SELECT STARS
// ==========================================

function selectStars(stars, element) {

    selectedStars = stars;


    // Remove old selection
    document
        .querySelectorAll(".stars-package")
        .forEach(card => {
            card.classList.remove("selected");
        });


    // Select current
    if (element) {
        element.classList.add("selected");
    }


    const packageData = starsPackages.find(
        item => item.stars === stars
    );

    const button =
        document.getElementById("buyStarsButton");


    if (!button || !packageData) return;


    button.disabled = false;

    button.style.opacity = "1";


    button.innerHTML = `
        ${stars.toLocaleString("uz-UZ")} Stars
        — ${formatPrice(packageData.price)}
    `;


    // Haptic
    try {
        tg?.HapticFeedback?.impactOccurred("light");
    } catch (e) {}
}


// ==========================================
// BUY STARS
// ==========================================

function buyStars() {

    if (!selectedStars) {

        showNotice(
            "Avval Stars paketini tanlang"
        );

        return;
    }


    const packageData = starsPackages.find(
        item => item.stars === selectedStars
    );


    if (!packageData) return;


    showNotice(
        `${selectedStars.toLocaleString("uz-UZ")} Stars tanlandi`
    );


    try {
        tg?.HapticFeedback?.notificationOccurred(
            "success"
        );
    } catch (e) {}


    /*
        MUHIM:

        Hozir bu faqat UI.

        Keyingi bosqichda bu yerga:
        - buyurtma yaratish
        - to'lov
        - backend
        - Telegram Stars yetkazib berish

        ulanadi.
    */
}


// ==========================================
// CLOSE MODAL
// ==========================================

function closeModal() {

    const modal =
        document.getElementById("serviceModal");

    if (!modal) return;


    modal.classList.remove("active");
    modal.classList.add("hidden");


    selectedStars = null;
}


// ==========================================
// MODAL BACKGROUND
// ==========================================

document.addEventListener("click", function(event) {

    const modal =
        document.getElementById("serviceModal");

    if (!modal) return;


    if (event.target === modal) {
        closeModal();
    }
});


// ==========================================
// ESC
// ==========================================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeModal();
    }

});


// ==========================================
// START
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // Home
    document.querySelectorAll(".nav").forEach(nav => {
        nav.classList.remove("active");
    });

    const homeNav = document.querySelector(
        '.nav[onclick*="home"]'
    );

    if (homeNav) {
        homeNav.classList.add("active");
}
