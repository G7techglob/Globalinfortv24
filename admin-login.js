import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const ADMIN_UID =
"reE9AIOTzJaAurLXnUKh7jLa1Pb2";

document
.getElementById("loginBtn")
.addEventListener("click", async () => {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  try {

    const result =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    if (
      result.user.uid === ADMIN_UID
    ) {

      window.location.href =
        "admin-dashboard.html";

    } else {

      alert("Access denied");

    }

  } catch (error) {

    alert(error.message);

  }

});
