import { auth }
from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
}
from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const ADMIN_UID =
"reE9AIOTzJaAurLXnUKh7jLa1Pb2";

onAuthStateChanged(
  auth,
  (user) => {

    if (
      !user ||
      user.uid !== ADMIN_UID
    ) {

      window.location.href =
        "index.html";

    }

  }
);

document
.getElementById("logoutBtn")
.addEventListener(
  "click",
  async () => {

    await signOut(auth);

    window.location.href =
      "index.html";

  }
);
