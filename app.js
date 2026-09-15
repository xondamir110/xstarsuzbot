const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();

    try {
        tg.setHeaderColor("#08090b");
        tg.setBackgroundColor("#08090b");
    } catch (e) {}
}


/* TELEGRAM USER */

if (tg?.initDataUnsafe?.user) {

    const user = tg.initDataUnsafe.user;

    const username =
        user.username
            ? "@" + user.username
            : user.first_name || "Foydalanuvchi";

    const profileUsername =
        document.getElementById("profileUsername");

    if (profileUsername) {
        profileUsername.textContent = username;
    }
}


/* NAVIGATION */

function navigate(page, button) {

    const sections = [
        document.querySelector(".hero"),
        document.querySelector(".balance-card"),
        document.querySelector(".stats"),
        ...document.querySelectorAll(".section"),
        document.getElementById("orders"),
        document.getElementById("profile")
    ];

    sections.forEach(section => {
        if (section) section.classList.add("hidden");
    });


    document.querySelectorAll(".nav")
        .forEach(nav => nav.classList.remove("active"));

    button.classList.add("active");


    if (page === "home") {

        document.querySelector(".hero")
            ?.classList.remove("hidden");

        document.querySelector(".balance-card")
            ?.classList.remove("hidden");

        document.querySelector(".stats")
            ?.classList.remove("hidden");

        document.querySelectorAll(".section")
            .forEach(section => section.classList.remove("hidden"));
    }


    if (page === "orders") {
        document.getElementById("orders")
            ?.classList.remove("hidden");
    }


    if (page === "profile") {
        document.getElementById("profile")
            ?.classList.remove("hidden");
    }


    if (page === "balance") {
        document.querySelector(".balance-card")
            ?.classList.remove("hidden");

        showNotice("Balansingiz: 0 so'm");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* SERVICE MODAL */

const services = {

    stars: {
        title: "Stars",
        description: "Telegram Stars sotib oling",
        logo: "★",
        content: `
            <div class="package-list">

                <div class="package">
                    <div class="package-star">★</div>
                    <div class="package-info">
                        <strong>50 Stars</strong>
                        <small>7 000 so'm</small>
                    </div>
                    <button class="package-buy"
                        onclick="selectPackage(50)">
                        →
                    </button>
                </div>

                <div class="package">
                    <div class="package-star">★</div>
                    <div class="package-info">
                        <strong>100 Stars</strong>
                        <small>14 000 so'm</small>
                    </div>
                    <button class="package-buy"
                        onclick="selectPackage(100)">
                        →
                    </button>
                </div>

                <div class="package">
                    <div class="package-star">★</div>
                    <div class="package-info">
                        <strong>250 Stars</strong>
                        <small>35 000 so'm</small>
                    </div>
                    <button class="package-buy"
                        onclick="selectPackage(250)">
                        →
                    </button>
                </div>

                <div class="package">
                    <div class="package-star">★</div>
                    <div class="package-info">
                        <strong>500 Stars</strong>
                        <small>70 000 so'm</small>
                    </div>
                    <button class="package-buy"
                        onclick="selectPackage(500)">
                        →
                    </button>
                </div>

                <div class="package">
                    <div class="package-star">★</div>
                    <div class="package-info">
                        <strong>1000 Stars</strong>
                        <small>140 000 so'm</small>
                    </div>
                    <button class="package-buy"
                        onclick="selectPackage(1000)">
                        →
                    </button>
                </div>

            </div>
        `
    },


    premium: {
        title: "Premium",
        description: "Telegram Premium obunasini tanlang",
        logo: "♛",
        content: `
            <div class="package-list">

                <div class="package">
                    <div class="package-star">♛</div>
                    <div class="package-info">
                        <strong>3 oy Premium</strong>
                        <small>Telegram Premium</small>
                    </div>
                    <button class="package-buy"
                        onclick="showNotice('Premium tanlandi')">
                        →
                    </button>
                </div>

                <div class="package">
                    <div class="package-star">♛</div>
                    <div class="package-info">
                        <strong>6 oy Premium</strong>
                        <small>Telegram Premium</small>
                    </div>
                    <button class="package-buy"
                        onclick="showNotice('Premium tanlandi')">
                        →
                    </button>
                </div>

            </div>
        `
    },


    gift: {
        title: "Gift",
        description: "Telegram sovg'alarini yuboring",
        logo: "◇",
        content: `
            <div class="empty-state">
                <div class="empty-icon">◇</div>
                <h3>Sovg'alar</h3>
                <p>Bu bo'lim tez orada ishga tushadi.</p>
            </div>
        `
    },


    nft: {
        title: "NFT",
        description: "Telegram NFT kolleksiyalari",
        logo: "◆",
        content: `
            <div class="empty-state">
                <div class="empty-icon">◆</div>
                <h3>NFT bozori</h3>
                <p>NFT xizmatlari tez orada qo'shiladi.</p>
            </div>
        `
    },


    poststars: {
        title: "Postga Stars",
        description: "Telegram postlariga Stars yuboring",
        logo: "✦",
        content: `
            <div class="empty-state">
                <div class="empty-icon">✦</div>
                <h3>Postga Stars</h3>
                <p>Post havolasini yuborish orqali xizmatdan foydalanasiz.</p>
            </div>
        `
    },


    ton: {
        title: "TON",
        description: "TON xizmatlari",
        logo: "△",
        content: `
            <div class="empty-state">
                <div class="empty-icon">△</div>
                <h3>TON</h3>
                <p>TON xizmatlari tez orada qo'shiladi.</p>
            </div>
        `
    },


    number: {
        title: "Raqam",
        description: "Virtual raqam xizmatlari",
        logo: "▯",
        content: `
            <div class="empty-state">
                <div class="empty-icon">▯</div>
                <h3>Virtual raqam</h3>
                <p>Raqam xizmatlari tez orada qo'shiladi.</p>
            </div>
        `
    }

};


/* OPEN SERVICE */

function openPage(name) {

    const service = services[name];

    if (!service) {
        showNotice("Bu bo'lim tez orada ishga tushadi");
        return;
    }

    document.getElementById("modalTitle")
        .textContent = service.title;

    document.getElementById("modalDescription")
        .textContent = service.description;

    document.getElementById("modalLogo")
        .textContent = service.logo;

    document.getElementById("modalContent")
        .innerHTML = service.content;

    document.getElementById("serviceModal")
        .classList.remove("hidden");

    document.body.style.overflow = "hidden";
}


/* CLOSE */

function closeModal() {

    document.getElementById("serviceModal")
        .classList.add("hidden");

    document.body.style.overflow = "";
}


/* PACKAGE */

function selectPackage(stars) {

    closeModal();

    showNotice(`${stars} Stars tanlandi ⭐`);

    /*
       KEYIN SHU YERGA:

       1. Buyurtma yaratish
       2. Telegram botga yuborish
       3. To'lov oynasini ochish
       4. To'lov tasdiqlangandan keyin
          Stars yetkazish

       BACKEND BILAN ULANADI.
    */

}


/* NOTICE */

let toastTimer;

function showNotice(text) {

    const toast =
        document.getElementById("toast");

    toast.textContent = text;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


/* MODAL BACKGROUND */

document.getElementById("serviceModal")
    ?.addEventListener("click", function(e) {

        if (e.target === this) {
            closeModal();
        }

    });


/* ESC */

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {
        closeModal();
    }

});
