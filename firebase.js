// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, orderBy } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import { 
  collection, doc, addDoc, getDocs, deleteDoc, Timestamp, query
} from "firebase/firestore";

export async function getAllPost(){
  console.log('getAllPost()');

  const querySnapshot = await getDocs(collection(db, "posts"));
  return querySnapshot.docs.map((doc) => ({_id: doc.id, ...doc.data()}));
}

export async function getPost(_id) {
  console.log('getPost()');

  const docRef = doc(db, "posts", _id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error(`ID:${_id} document not exist!`);
  }
}

export async function addPost(newPost) {
  console.log('addPost()');
  try {
    const docRef = await addDoc(collection(db, "posts"), newPost);
    //console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding post: ", e);
  }
}

export async function deletePost(_id){
  console.log('deletePost()');
  await deleteDoc(doc(db, "posts", _id));
}

export async function getComments(postId) {
  console.log('getComments()');
  const commentsRef = collection(db, "test", postId, "comments");
  const q = query(commentsRef, orderBy('date'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({_id: doc.id, ...doc.data()}));
}

export async function addComment({postId, name, comment}) {
  console.log('addComment()');
  const newComment = {
    name: name,
    comment: comment,
    date: Timestamp.fromDate(new Date())
  }
  try {
    const docRef = await addDoc(collection(db, "test", postId, "comments"), newComment);
    //console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding comment: ", e);
  }
}

// -------------------------------------- //

const post = {
  title: 'title1',
  content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, molestias.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, molestias.`,
  date: Timestamp.fromDate(new Date),
  author: 'aajnf',
  commentsCnt: 1,
  comment: ['asdf'],
  likesCnt: 2,
}

export function createPostObject(title, content, author) {
  const p = {
    title: title,
    content: content,
    date: Timestamp.fromDate(new Date()),
    author: author,
    commentsCnt: 0,
    comment: [],
    likesCnt: 0,
  };
  
  return p;
}