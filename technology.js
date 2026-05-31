const newsGrid = document.getElementById("newsGrid");

document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("navMenu").classList.toggle("show");
});

/*
Reliable Technology RSS Feeds
*/

const feeds = [

"https://feeds.arstechnica.com/arstechnica/technology-lab",

"https://www.theverge.com/rss/index.xml",

"https://www.wired.com/feed/rss"

];

const API =
"https://api.rss2json.com/v1/api.json?rss_url=";

async function loadNews(){

newsGrid.innerHTML =
"<div class='loading'>Loading Technology News...</div>";

let articles = [];

for(const feed of feeds){

try{

const response =
await fetch(API + encodeURIComponent(feed));

const data =
await response.json();

if(data.items){

articles = articles.concat(
data.items.slice(0,5)
);

}

}catch(error){

console.log(error);

}

}

articles.sort(() => Math.random() - 0.5);

displayNews(articles);

}

function displayNews(articles){

newsGrid.innerHTML = "";

articles.forEach(article => {

const image =
article.thumbnail ||
"https://via.placeholder.com/800x450?text=GlobalInforTV24";

const card = document.createElement("div");

card.className = "news-card";

card.innerHTML = `

<img src="${image}" alt="Technology News">

<div class="news-content">

<h3>${article.title}</h3>

<p>
${article.description
.replace(/<[^>]*>?/gm,'')
.substring(0,150)}...
</p>

<a href="${article.link}"
target="_blank">
Read More
</a>

</div>

`;

newsGrid.appendChild(card);

});

}

loadNews();
