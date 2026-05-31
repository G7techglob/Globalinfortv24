// MOBILE MENU

const feeds = [
  "https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml",
  "https://www.billboard.com/feed/",
  "https://www.rollingstone.com/music/music-news/feed/",
  "https://variety.com/feed/"
];
const newsGrid = document.querySelector(".news-grid");

feeds.forEach(feed => {
  fetch(API + encodeURIComponent(feed))
    .then(res => res.json())
    .then(data => {

      data.items.slice(0, 4).forEach(item => {

        const card = document.createElement("article");
        card.className = "news-card";

        card.innerHTML = `
          <img src="${item.thumbnail || 'images/default.jpg'}" alt="">
          <div class="card-content">
            <span>Entertainment</span>
            <h3>${item.title}</h3>
            <a href="${item.link}" target="_blank">
              <button class="card-btn">Read Story</button>
            </a>
          </div>
        `;

        newsGrid.appendChild(card);

      });

    })
    .catch(err => console.log("RSS error:", err));
});

const API = "https://api.rss2json.com/v1/api.json?rss_url=";
const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// HERO BUTTON

const heroBtn = document.getElementById("hero-btn");

heroBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 700,
    behavior: "smooth"
  });
});

// SUBSCRIBE BUTTON

const subscribeBtn = document.getElementById("subscribe-btn");

subscribeBtn.addEventListener("click", () => {

  alert("Thank you for subscribing to GlobalInforTV24 Entertainment News!");

});
