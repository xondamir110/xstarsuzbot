// ===============================
// X STARS UZ - APP.JS
// ===============================

const pages = [
    "home",
    "stars",
    "premium",
    "gift",
    "nft",
    "poststars",
    "ton",
    "number",
    "orders",
    "balance-page",
    "profile"
];


// ===============================
// TELEGRAM
// ===============================

let tg = null;

try {
    if (window.Telegram && window.Telegram.WebApp) {
        tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
    }
} catch (error) {
    console.log("Telegram WebApp:", error);
}


// ===============================
// STARS PACKAGES
// ===============================

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
        stars: 200,
        price: 44000
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


// ===============================
// FORMAT PRICE
// ===============================

function formatPrice(number) {
    return Number(number).toLocaleString("uz-UZ") + " so'm";
}


// ===============================
// OPEN PAGE
// ===============================

function openPage(pageName) {

    pages.forEach(function(page) {

        const element = document.getElementById(page);

        if (element) {
            element.classList.remove("active");
        }

    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    // Stars paketlarini yuklash
    if (pageName === "stars") {
        renderStars();
    }


    // Pastki navigatsiya
    updateNavigation(pageName);
}


// ===============================
// HOME
// ===============================

function goHome() {
    openPage("home");

    const navButtons = document.querySelectorAll(".nav-item");

    navButtons.forEach(function(button) {
        button.classList.remove("active");
    });

    if (navButtons[0]) {
        navButtons[0].classList.add("active");
    }
}


// ===============================
// BOTTOM NAVIGATION
// ===============================

function navigate(pageName, button) {

    openPage(pageName);

    const navButtons = document.querySelectorAll(".nav-item");

    navButtons.forEach(function(item) {
        item.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }
}


function updateNavigation(pageName) {

    const navButtons = document.querySelectorAll(".nav-item");

    navButtons.forEach(function(item) {
        item.classList.remove("active");
    });

    if (pageName === "home") {
        if (navButtons[0]) {
            navButtons[0].classList.add("active");
        }
    }

    if (pageName === "orders") {
        if (navButtons[1]) {
            navButtons[1].classList.add("active");
        }
    }

    if (pageName === "balance-page") {
        if (navButtons[2]) {
            navButtons[2].classList.add("active");
        }
    }

    if (pageName === "profile") {
        if (navButtons[3]) {
            navButtons[3].classList.add("active");
        }
    }
}


// ===============================
// STARS
// ===============================

function renderStars() {

    const container = document.getElementById("starsPackages");

    if (!container) return;

    container.innerHTML = "";

    starsPackages.forEach(function(item) {

        const button = document.createElement("button");

        button.className = "package";

        button.innerHTML = `
            <div>
                <div class="package-star">★</div>

                <div>
                    <strong>${item.stars.toLocaleString("uz-UZ")} Stars</strong>
                    <span>Telegram Stars</span>
                </div>
            </div>

            <b>${formatPrice(item.price)}</b>
        `;

        button.addEventListener("click", function() {
            selectStars(item.stars, item.price);
        });

        container.appendChild(button);
    });
}


// ===============================
// SELECT STARS
// ===============================

function selectStars(stars, price) {

    showToast(
        stars.toLocaleString("uz-UZ") +
        " Stars — " +
        formatPrice(price)
    );

    /*
        Keyinchalik shu joyga real buyurtma
        va to'lov tizimi ulanadi.
    */
}


// ===============================
// PREMIUM
// ===============================

function selectPremium(period) {

    showToast(
        "Premium " + period + " tanlandi"
    );

    /*
        Keyinchalik Premium buyurtma
        funksiyasi shu yerga ulanadi.
    */
}


// ===============================
// TOAST
// ===============================

let toastTimer = null;

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function() {
        toast.classList.remove("show");
    }, 2200);
}


// ===============================
// THEME
// ===============================

function toggleTheme() {

    const isLight =
        document.body.classList.contains("light");

    if (isLight) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
}


function setTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light");

        localStorage.setItem(
            "xstars-theme",
            "light"
        );

    } else {

        document.body.classList.remove("light");

        localStorage.setItem(
            "xstars-theme",
            "dark"
        );
    }
}


// ===============================
// LOAD THEME
// ===============================

function loadTheme() {

    const savedTheme =
        localStorage.getItem("xstars-theme");

    if (savedTheme === "light") {
        setTheme("light");
    } else {
        setTheme("dark");
    }
}


// ===============================
// TELEGRAM USER
// ===============================

function loadTelegramUser() {

    try {

        if (
            !tg ||
            !tg.initDataUnsafe ||
            !tg.initDataUnsafe.user
        ) {
            return;
        }

        const user = tg.initDataUnsafe.user;

        const profileName =
            document.getElementById("profileName");

        const profileUsername =
            document.getElementById("profileUsername");

        const profileAvatar =
            document.getElementById("profileAvatar");


        let fullName = "";

        if (user.first_name) {
            fullName += user.first_name;
        }

        if (user.last_name) {
            fullName += " " + user.last_name;
        }

        if (!fullName) {
            fullName = "Foydalanuvchi";
        }


        if (profileName) {
            profileName.textContent = fullName;
        }


        if (profileUsername) {

            if (user.username) {
                profileUsername.textContent =
                    "@" + user.username;
            } else {
                profileUsername.textContent =
                    "Telegram foydalanuvchisi";
            }

        }


        if (profileAvatar) {

            if (user.first_name) {
                profileAvatar.textContent =
                    user.first_name
                        .charAt(0)
                        .toUpperCase();
            }

        }

    } catch (error) {

        console.log(
            "User ma'lumotlarini olishda xatolik:",
            error
        );

    }
}


// ===============================
// TELEGRAM BACK BUTTON
// ===============================

function setupTelegramBackButton() {

    try {

        if (!tg || !tg.BackButton) {
            return;
        }

        tg.BackButton.onClick(function() {
            goHome();
            tg.BackButton.hide();
        });

    } catch (error) {
        console.log(error);
    }
}


// ===============================
// PAGE OPEN WATCHER
// ===============================

function showBackButton() {

    try {

        if (!tg || !tg.BackButton) {
            return;
        }

        const currentPage =
            document.querySelector(".page.active");

        if (!currentPage) return;

        if (currentPage.id === "home") {
            tg.BackButton.hide();
        } else {
            tg.BackButton.show();
        }

    } catch (error) {
        console.log(error);
    }
}


// ===============================
// CLICK EFFECT
// ===============================

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest("button");

        if (!button) return;

        button.style.transform = "scale(0.97)";

        setTimeout(function() {

            button.style.transform = "";

        }, 100);

    }
);


// ===============================
// INIT
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadTheme();

        loadTelegramUser();

        setupTelegramBackButton();

        renderStars();

        openPage("home");

        console.log(
            "X Stars Uz successfully loaded."
        );
    }
);


// ===============================
// PREVENT BROKEN LINKS
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        document.querySelectorAll(
            'a[href="#"]'
        ).forEach(function(link) {

            link.addEventListener(
                "click",
                function(event) {
                    event.preventDefault();
                }
            );

        });

    }
);
