const newsGrid = document.getElementById("newsGrid");
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const refreshBtn = document.getElementById("refreshBtn");

/* =========================
   MOBILE MENU
========================= */

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

/* =========================
   RSS FEEDS
========================= */

const feeds = [
"https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml",
"https://www.nme.com/rss/news",
"https://rss.nytimes.com/services/xml/rss/nyt/Movies.xml"
];

const API =
"https://api.rss2json.com/v1/api.json?rss_url=";

/* =========================
   LOAD NEWS
========================= */

async function loadNews() {

newsGrid.innerHTML =
"<h2>Loading Entertainment News...</h2>";

let allNews = [];

for(const feed of feeds){

try{

const response =
await fetch(API + encodeURIComponent(feed));

const data =
await response.json();

if(data.items){

allNews = allNews.concat(data.items);

}

}catch(error){

console.error(error);

}

}

displayNews(allNews.slice(0,24));

}

/* =========================
   DISPLAY NEWS
========================= */

function displayNews(news){

newsGrid.innerHTML = "";

news.forEach(article=>{

const card =
document.createElement("div");

card.classList.add("news-card");

card.innerHTML = `
<h3>${article.title}</h3>

<p>
${article.description
.replace(/<[^>]*>/g,"")
.substring(0,120)}...
</p>

<a href="${article.link}"
target="_blank">
Read Full Story →
</a>
`;

newsGrid.appendChild(card);

});

}

/* =========================
   REFRESH BUTTON
========================= */

refreshBtn.addEventListener("click", loadNews);

/* =========================
   INITIAL LOAD
========================= */

loadNews();
