import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
  const books = [];
  const snapshot = await getDocs(booksCol);
  snapshot.forEach((doc) => books.push({ ...doc.data(), id: doc.id }));
  return books;
};

export const addBookToServer = async (bookObj) => {
  await addDoc(booksCol, { ...bookObj });
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
  console.log(user);
  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    console.log(cred.user);
  } catch (error) {
    console.log(error.message);
  }
};

// logout
// login
