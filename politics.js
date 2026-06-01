const newsGrid = document.getElementById("newsGrid");
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const refreshBtn = document.getElementById("refreshBtn");

/* MENU */

menuBtn.addEventListener("click", () => {
navbar.classList.toggle("active");
});

/* RSS FEEDS */

const feeds = [

"https://feeds.bbci.co.uk/news/politics/rss.xml",

"https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml",

"https://www.aljazeera.com/xml/rss/all.xml"

];

const API =
"https://api.rss2json.com/v1/api.json?rss_url=";

async function loadNews() {

newsGrid.innerHTML =
"<div class='loading'>Loading Political News...</div>";

let articles = [];

for(const feed of feeds){

try{

const response =
await fetch(API + encodeURIComponent(feed));

const data = await response.json();

if(data.items){

articles = articles.concat(
data.items.slice(0,5)
);

}

}catch(error){

console.log(error);

}

}

displayNews(articles);

}

function displayNews(news){

newsGrid.innerHTML="";

news.sort(() => Math.random()-0.5);

news.forEach(article=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="${
article.thumbnail ||
'https://via.placeholder.com/600x400'
}" alt="News">

<div class="card-content">

<h3>${article.title}</h3>

<p>
${article.description
.replace(/<[^>]+>/g,'')
.substring(0,120)}...
</p>

<a
href="${article.link}"
target="_blank"
class="read-btn"
>
Read More
</a>

</div>

`;

newsGrid.appendChild(card);

});

}

refreshBtn.addEventListener("click",loadNews);

loadNews();
