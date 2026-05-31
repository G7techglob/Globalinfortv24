const newsGrid = document.querySelector(".news-grid");

/* =========================
   ENTERTAINMENT RSS FEEDS
========================= */
const feeds = [
  // 🌍 Global / Hollywood / Entertainment
  "https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml",

  // 🎵 Music / Global entertainment
  "https://www.billboard.com/feed/",
  "https://www.rollingstone.com/music/music-news/feed/",

  // 🇳🇬 Nollywood / African entertainment
  "https://www.pulse.ng/rss/entertainment.rss",
  "https://www.pulse.ng/rss/news.rss",
  "https://guardian.ng/category/life/entertainment/feed/",
  "https://www.premiumtimesng.com/feed"
];

/* =========================
   RSS PROXY (CORS FIX)
========================= */
const API = "https://api.allorigins.win/get?url=";

/* =========================
   LOAD RSS FUNCTION
========================= */
async function loadRSS(feed) {
  try {
    const res = await fetch(API + encodeURIComponent(feed));

    if (!res.ok) {
      throw new Error("Network error: " + res.status);
    }

    const data = await res.json();

    if (!data.contents) {
      console.log("No content:", feed);
      return;
    }

    // Parse XML
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");

    const items = xml.querySelectorAll("item");

    items.forEach((item, index) => {
      if (index > 4) return; // limit per feed

      const title =
        item.querySelector("title")?.textContent || "No title";

      const link =
        item.querySelector("link")?.textContent || "#";

      const img =
        item.querySelector("enclosure")?.getAttribute("url") ||
        "https://via.placeholder.com/300x200";

      const card = document.createElement("article");
      card.className = "news-card";

      card.innerHTML = `
        <img src="${img}" alt="">
        <div class="card-content">
          <span>Entertainment</span>
          <h3>${title}</h3>
          <a href="${link}" target="_blank">
            <button class="card-btn">Read Story</button>
          </a>
        </div>
      `;

      newsGrid.appendChild(card);
    });

  } catch (err) {
    console.log("RSS Load Error:", err);
  }
}

/* =========================
   LOAD ALL FEEDS
========================= */
feeds.forEach(loadRSS);
