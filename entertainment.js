const newsGrid = document.getElementById("newsGrid");
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const refreshBtn = document.getElementById("refreshBtn");

/* =========================
   MOBILE MENU
========================= */

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}

/* =========================
   RSS FEEDS
========================= */

const feeds = [
    "https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/Movies.xml"
];

/* RSS to JSON API */
const API = "https://api.rss2json.com/v1/api.json?rss_url=";

/* =========================
   LOAD NEWS
========================= */

async function loadNews() {

    if (!newsGrid) return;

    newsGrid.innerHTML = `
        <div class="news-card">
            <h3>Loading Entertainment News...</h3>
        </div>
    `;

    let allNews = [];

    for (const feed of feeds) {

        try {

            const response = await fetch(
                API + encodeURIComponent(feed)
            );

            const data = await response.json();

            if (data.status === "ok" && data.items) {
                allNews = allNews.concat(data.items);
            }

        } catch (error) {
            console.error("Feed Error:", error);
        }
    }

    if (allNews.length === 0) {

        newsGrid.innerHTML = `
            <div class="news-card">
                <h3>No News Available</h3>
                <p>
                    Unable to load RSS feeds.
                    Try again later.
                </p>
            </div>
        `;

        return;
    }

    displayNews(allNews.slice(0, 24));
}

/* =========================
   DISPLAY NEWS
========================= */

function displayNews(news) {

    newsGrid.innerHTML = "";

    news.forEach(article => {

        const card = document.createElement("div");

        card.className = "news-card";

        const description =
            article.description
            ? article.description
                .replace(/<[^>]*>/g, "")
                .substring(0, 150)
            : "No description available.";

        card.innerHTML = `
            <h3>${article.title}</h3>

            <p>${description}...</p>

            <a href="${article.link}"
               target="_blank"
               rel="noopener noreferrer">
               Read Full Story →
            </a>
        `;

        newsGrid.appendChild(card);
    });
}

/* =========================
   REFRESH BUTTON
========================= */

if (refreshBtn) {
    refreshBtn.addEventListener("click", loadNews);
}

/* =========================
   INITIAL LOAD
========================= */

document.addEventListener("DOMContentLoaded", () => {
    loadNews();
});
