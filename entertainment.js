const newsGrid = document.querySelector(".news-grid");

/* =========================
   MOBILE MENU
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", () => {
            navbar.classList.toggle("active");
        });
    }
});

/* =========================
   API CONFIG (FIXED)
========================= */
const API_KEY = "14e954bebbf81fbd09a409f95f46a412";

const URL =
`https://gnews.io/api/v4/top-headlines?category=entertainment&lang=en&max=20&token=${API_KEY}`;

/* =========================
   FALLBACK IMAGE
========================= */
const DEFAULT_IMG =
"https://via.placeholder.com/600x350?text=Entertainment+News";

/* =========================
   LOAD NEWS
========================= */
async function loadNews() {

    try {

        const res = await fetch(URL);

        if (!res.ok) {
            throw new Error("API request failed: " + res.status);
        }

        const data = await res.json();

        newsGrid.innerHTML = "";

        if (!data.articles || data.articles.length === 0) {
            newsGrid.innerHTML = "<p>No news found.</p>";
            return;
        }

        data.articles.forEach(article => {

            const image = article.image || DEFAULT_IMG;

            const card = document.createElement("article");
            card.className = "news-card";

            card.innerHTML = `
                <img src="${image}" onerror="this.src='${DEFAULT_IMG}'" alt="">
                
                <div class="card-content">
                    <span>Entertainment</span>
                    <h3>${article.title || "No title"}</h3>
                    <p>${article.description || ""}</p>

                    <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                        <button class="card-btn">Read Story</button>
                    </a>
                </div>
            `;

            newsGrid.appendChild(card);

        });

    } catch (error) {
        console.log("API Error:", error);

        newsGrid.innerHTML = `
            <p style="color:red; font-weight:bold;">
                Failed to load news. Check API key or internet connection.
            </p>
        `;
    }
}

loadNews();
