import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app, auth, db } from "./firebaseConfig"; // ✅ Import named exports

// 🔹 Sign Up Function with Role Assignment
export const signUpWithEmail = async (email, password, role = "user") => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 🔹 Save user role in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role, // Store role in Firestore
    });

    console.log("User signed up:", user);
    return user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// 🔹 Sign In Function
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};

// 🔹 Sign Out Function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};

export { auth, db }; // ✅ Export `db` for use in other files
