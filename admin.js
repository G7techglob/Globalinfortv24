 import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const publishBtn =
document.getElementById("publishBtn");

publishBtn.addEventListener(
  "click",
  async () => {

    const title =
      document.getElementById("title").value.trim();

    const category =
      document.getElementById("category").value.trim();

    const image =
      document.getElementById("image").value.trim();

    const content =
      document.getElementById("content").value.trim();

    if (
      !title ||
      !category ||
      !content
    ) {
      alert(
        "Please fill all required fields."
      );
      return;
    }

    try {

      await addDoc(
        collection(db, "articles"),
        {
          title,
          category,
          image,
          content,
          author: "GlobalInforTV24",
          createdAt: serverTimestamp()
        }
      );

      alert(
        "Article published successfully!"
      );

      document.getElementById("title").value = "";
      document.getElementById("category").value = "";
      document.getElementById("image").value = "";
      document.getElementById("content").value = "";

    } catch (error) {

      console.error(error);

      alert(
        "Failed to publish article."
      );

    }

  }
);
