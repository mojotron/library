import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDenAARvaKQzU1yfBvhisExAAfsJl3PiTI",
  authDomain: "fir-demo-64573.firebaseapp.com",
  projectId: "fir-demo-64573",
  storageBucket: "fir-demo-64573.appspot.com",
  messagingSenderId: "168741752488",
  appId: "1:168741752488:web:b0a50adaf10e2716b6bc9d",
});

const db = getFirestore(firebaseApp);
const booksCol = collection(db, "books");
const auth = getAuth(firebaseApp);

export const getBooksFromServer = async () => {
  const q = query(booksCol, where("user", "==", auth.currentUser.uid));
  const books = [];
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => books.push({ ...doc.data(), id: doc.id }));
  return books;
};

export const addBookToServer = async (bookObj) => {
  await addDoc(booksCol, { ...bookObj, user: auth.currentUser.uid });
};

export const deleteBookFromServer = async (id) => {
  const docRef = doc(db, "books", id);
  await deleteDoc(docRef);
};

export const updateBookFromServer = async (id, newBookObject) => {
  const docRef = doc(db, "books", id);
  await updateDoc(docRef, { ...newBookObject });
};

export const createNewUser = async (user) => {
  try {
    await createUserWithEmailAndPassword(auth, user.email, user.password);
    return user.email;
  } catch (error) {
    throw error;
  }
};

export const logInUser = async (user) => {
  try {
    await signInWithEmailAndPassword(auth, user.email, user.password);
    return user.email;
  } catch (error) {
    throw error;
  }
};

export const logOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error.message);
  }
};
