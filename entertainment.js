const newsGrid = document.querySelector(".news-grid");

/* =========================
   ENTERTAINMENT RSS FEEDS
========================= */
const feeds = [
  "https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml",
  "https://www.billboard.com/feed/",
  "https://www.rollingstone.com/music/music-news/feed/",

  // Africa / Nollywood
  "https://www.pulse.ng/rss/entertainment.rss",
  "https://guardian.ng/category/life/entertainment/feed/",
  "https://www.premiumtimesng.com/feed"
];

/* =========================
   CORS PROXY (MORE STABLE)
========================= */
const PROXY = "https://api.allorigins.win/raw?url=";

/* =========================
   SAFE IMAGE FALLBACK
========================= */
const DEFAULT_IMG = "https://via.placeholder.com/400x250?text=Entertainment+News";

/* =========================
   LOAD RSS FUNCTION
========================= */
async function loadRSS(feed) {
  try {
    const res = await fetch(PROXY + encodeURIComponent(feed));

    if (!res.ok) {
      console.log("❌ Feed failed:", feed, res.status);
      return;
    }

    const text = await res.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    const items = xml.querySelectorAll("item");

    if (!items.length) {
      console.log("⚠️ No items in feed:", feed);
      return;
    }

    items.forEach((item, index) => {
      if (index > 5) return; // limit per feed

      const title =
        item.querySelector("title")?.textContent || "No title";

      const link =
        item.querySelector("link")?.textContent || "#";

      // FIX: safer image extraction
      let img =
        item.querySelector("enclosure")?.getAttribute("url") ||
        item.querySelector("media\\:content")?.getAttribute("url") ||
        item.querySelector("mediaContent")?.getAttribute("url") ||
        DEFAULT_IMG;

      const card = document.createElement("article");
      card.className = "news-card";

      card.innerHTML = `
        <img src="${img}" onerror="this.src='${DEFAULT_IMG}'" alt="">
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
    console.log("RSS ERROR:", feed, err);
  }
}

/* =========================
   LOAD ALL FEEDS
========================= */
feeds.forEach(loadRSS);
