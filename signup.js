import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Account created successfully!");

  } catch (error) {

    alert(error.message);

  }

});
