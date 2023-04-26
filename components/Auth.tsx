"use client";

import { auth } from "@/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Log In successful: ", email);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth).then(() => {
        console.log("Logged out!", email);
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(email);

  return (
    <>
      <h1>Log In</h1>
      <input
        className="text-black"
        type="text"
        placeholder="E-Mail"
        onChange={(e) => setEmail(e.target.value)}
        required={true}
      />
      <input
        className="text-black"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required={true}
      />
      <button onClick={logIn}>Log In</button>
      <button onClick={logOut}>Log Out</button>
    </>
  );
}

export default Auth;
