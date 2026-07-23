const skillsFallbackData = [
    {
        image: "html-css.jpg",
        title: "HTML - CSS",
        text: "Intégration d'interfaces responsives et accessibles, respect d'une maquette, structuration sémantique du HTML et amélioration de la lisibilité."
    },
    {
        image: "js.jpg",
        title: "JavaScript",
        text: "Manipulation du DOM, création d'éléments dynamiques, gestion de données JSON, débogage avec Chrome DevTools et correction d'erreurs console."
    },
    {
        image: "react.jpg",
        title: "React",
        text: "Création de composants, gestion des props et du state, routes, affichage dynamique et tests unitaires avec React Testing Library."
    },
    {
        image: "gestion-de-projet.png",
        title: "Gestion de projet",
        text: "Analyse du besoin client, rédaction de spécifications, priorisation des tâches, suivi Kanban et travail en méthodologie Agile."
    },
    {
        image: "optimisation-et-debug.png",
        title: "Optimisation et debug",
        text: "Identification des anomalies, correction d'un site existant, optimisation SEO, accessibilité, performance et publication en ligne."
    },
    {
        image: "test.png",
        title: "Test logiciel",
        text: "Tests exploratoires, fonctionnels, API et E2E, rédaction de cahiers de recette, suivi des anomalies et automatisation avec Cypress."
    }
];

const portfolioFallbackData = [
    {
        image: "image1.webp",
        title: "Kasa",
        text: "Développement d'une application React, création de composants, routing, gestion des erreurs et tests unitaires avec Vitest et React Testing Library.",
        link: "https://github.com/emilie-is-away/OC-Kasa-Frontend"
    },
    {
        image: "image2.webp",
        title: "Eco Bliss Bath",
        text: "Automatisation de tests avec Cypress, tests API, parcours panier, analyse des anomalies et rédaction d'un bilan de campagne de test.",
        link: "https://github.com/emilie-is-away/OC-Eco-Bliss-Bath"
    },
    {
        image: "image3.webp",
        title: "Menu Maker by Qwenta",
        text: "Analyse du besoin, rédaction de spécifications techniques, organisation du projet avec un Kanban et définition d'une solution web.",
        link: "https://github.com/emilie-is-away"
    },
    {
        "image": "image4.webp",
        "title": "Booki",
        "text": "Développement d'un site web en HTML/CSS",
        "link": "https://booki.emiliely.fr/"
    },
    {
        "image": "image5.webp",
        "title": "Sophie Bluel",
        "text": "Création d'une page web dynamique avec JavaScript",
        "link": "https://github.com/emilie-is-away/OC-Portfolio-Sophie-Bluel"
    },
    {
        "image": "image6.webp",
        "title": "TOMSEN",
        "text": "Conception d'une stratégie de test pour une application financière",
        "link": "https://github.com/emilie-is-away"
    }
];

function handleNavbarScroll() {
    const header = document.querySelector(".navbar");

    if (!header) {
        return;
    }

    window.addEventListener("scroll", () => {
        const top = window.scrollY;
        header.classList.toggle("navbarDark", top >= 100);
    });
}

function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-link");
    const menuToggle = document.getElementById("navbarSupportedContent");

    if (!menuToggle || typeof bootstrap === "undefined") {
        return;
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (menuToggle.classList.contains("show")) {
                const collapse = bootstrap.Collapse.getOrCreateInstance(menuToggle);
                collapse.hide();
            }
        });
    });
}

function createCardColumn() {
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "mt-4");
    return card;
}

function appendCardToGrid(container, row, card, index, dataLength) {
    row.appendChild(card);

    if ((index + 1) % 3 === 0 || index === dataLength - 1) {
        container.appendChild(row);
        const newRow = document.createElement("div");
        newRow.classList.add("row");
        return newRow;
    }

    return row;
}

function renderSkills(data) {
    const container = document.querySelector("#skills .container");

    if (!container) {
        return;
    }

    container.querySelectorAll(".row, .text-danger").forEach((element) => element.remove());

    let row = document.createElement("div");
    row.classList.add("row");

    data.forEach((item, index) => {
        const card = createCardColumn();
        card.innerHTML = `
            <div class="card skillsText h-100">
                <div class="card-body">
                    <img src="./images/${item.image}" alt="Illustration de la compétence ${item.title}" width="256" height="150" loading="lazy" decoding="async">
                    <h3 class="card-title mt-3 h4">${item.title}</h3>
                    <p class="card-text mt-3">${item.text}</p>
                </div>
            </div>
        `;

        row = appendCardToGrid(container, row, card, index, data.length);
    });
}

function renderPortfolio(data) {
    const container = document.querySelector("#portfolio .container");

    if (!container) {
        return;
    }

    container.querySelectorAll(".row, .text-danger").forEach((element) => element.remove());

    let row = document.createElement("div");
    row.classList.add("row");

    data.forEach((item, index) => {
        const card = createCardColumn();
        card.innerHTML = `
            <article class="card portfolioContent h-100">
                <img class="card-img-top" src="images/${item.image}" alt="Aperçu du projet ${item.title}" width="1000" height="620" loading="lazy" decoding="async">
                <div class="card-body d-flex flex-column">
                    <h3 class="card-title h4">${item.title}</h3>
                    <p class="card-text">${item.text}</p>
                    <div class="text-center mt-auto">
                        <a href="${item.link}" class="btn btn-success" target="_blank" rel="noopener noreferrer">Voir le projet</a>
                    </div>
                </div>
            </article>
        `;

        row = appendCardToGrid(container, row, card, index, data.length);
    });
}

function loadJSON(url, fallbackData, renderFunction) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Impossible de charger ${url}`);
            }
            return response.json();
        })
        .then(renderFunction)
        .catch((error) => {
            console.warn(`${url} n'a pas pu être chargé. Données locales utilisées à la place.`, error);
            renderFunction(fallbackData);
        });
}

function createSkillsFromJSON() {
    loadJSON("data/skills.json", skillsFallbackData, renderSkills);
}

function createPortfolioFromJSON() {
    loadJSON("data/portfolio.json", portfolioFallbackData, renderPortfolio);
}

handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
