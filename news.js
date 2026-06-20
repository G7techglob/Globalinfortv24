import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

/* =========================
FIREBASE CONFIG
========================= */

const firebaseConfig = {
  apiKey: "AIzaSyBANgzG2rW8QGdhTcd0ceL7PHwAk4bYfDg",
  authDomain: "globalinfortv24-3f126.firebaseapp.com",
  projectId: "globalinfortv24-3f126",
  storageBucket: "globalinfortv24-3f126.firebasestorage.app",
  messagingSenderId: "67879794253",
  appId: "1:67879794253:web:d8df22d18a553a51a90e04"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* =========================
MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {
  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

/* =========================
SUBSCRIBE FORM
========================= */

const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to GlobalInforTV24!");
  });
}

/* =========================
LOAD NEWS FROM FIRESTORE
========================= */

const newsContainer = document.getElementById("news-container");

async function loadNews() {

  if (!newsContainer) return;

  newsContainer.innerHTML = "<p>Loading news...</p>";

  try {

    const querySnapshot = await getDocs(
      collection(db, "news")
    );

    newsContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {

      const data = doc.data();

      newsContainer.innerHTML += `
        <article class="news-item">

          <div class="news-text">

            <h3>${data.title || ""}</h3>

            <p>${data.content || ""}</p>

            <small>${data.date || ""}</small>

          </div>

        </article>
      `;
    });

  } catch (error) {

    console.error(error);

    newsContainer.innerHTML =
      "<p>Unable to load news.</p>";

  }

}

loadNews();
