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

        const card = document.createElement("article");

        card.className = "news-card";

        const image =
            article.thumbnail ||
            (article.enclosure ? article.enclosure.link : "") ||
            "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200";

        const description =
            article.description
            ? article.description
                .replace(/<[^>]*>/g, "")
                .substring(0, 180)
            : "Latest entertainment news from around the world.";

        const date =
            article.pubDate
            ? new Date(article.pubDate)
                .toLocaleDateString()
            : "Latest Update";

        card.innerHTML = `

            <img
                src="${image}"
                alt="${article.title}"
                class="news-image"
            >

            <div class="news-content">

                <span class="category">
                    ENTERTAINMENT
                </span>

                <h2>
                    ${article.title}
                </h2>

                <p class="date">
                    ${date}
                </p>

                <p>
                    ${description}...
                </p>

                <a
                    href="${article.link}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="read-btn"
                >
                    Read Full Story
                </a>

            </div>

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
