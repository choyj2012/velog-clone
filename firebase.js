// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { and, getDoc, getFirestore, increment, limit, or, orderBy, setDoc, startAfter, updateDoc } from "firebase/firestore";
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
  collection, doc, addDoc, getDocs, deleteDoc, Timestamp, query, where,
} from "firebase/firestore";

export async function getAllPost(){
  console.log('getAllPost()');

  const postsRef = collection(db, "posts");
  const q = query(postsRef, orderBy('date', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({_id: doc.id, ...doc.data()}));
}

export async function getAllPostbyParam({pageParam, sortBy}){
  console.log('getAllPostbyParam()')
  const postsRef = collection(db, "posts");

  const q = pageParam
    ? query(postsRef, orderBy(sortBy, 'desc'), startAfter(pageParam), limit(20))
    : query(postsRef, orderBy(sortBy, "desc"), limit(20));

  const querySnapshot = await getDocs(q);
  // querySnapshot.docs.forEach((doc) => console.log(doc.data()));
  return querySnapshot;
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

export async function updatePost(id, title, content) {
  console.log('updatePost()');
  try {
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      title: title,
      content: content,
    });
  } catch (e) {
    console.error("Error edit post: ", e);
  }
}
export async function deletePost(_id){
  console.log('deletePost()');
  await deleteDoc(doc(db, "posts", _id));
}

export async function searchPost(queryText) {
  console.log('searchPost()', queryText);
  if(queryText === '') return null;

  const q = query(
    collection(db, "posts"),
    orderBy('title'),
    and(
      where("title", ">=", queryText),
      where("title", "<=", queryText + "\uf8ff")
    )
  );
  
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  return querySnapshot;
}

export async function getComments(postId) {
  console.log('getComments()');
  const commentsRef = collection(db, "posts", postId, "comments");
  const q = query(commentsRef, orderBy('date'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({_id: doc.id, ...doc.data()}));
}

export async function addComment({postId, name, comment, uid}) {
  console.log('addComment()');
  const newComment = {
    uid: uid,
    name: name,
    comment: comment,
    date: Timestamp.fromDate(new Date())
  }
  try {
    const docRef = await addDoc(collection(db, "posts", postId, "comments"), newComment);
    await updateDoc(doc(db, "posts", postId), {
      commentsCnt: increment(1)
    })
    //console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding comment: ", e);
  }
}

export async function deleteComment({postId, commentId}){
  console.log('deleteComment()');
  console.log(postId, commentId);
  try {
    await deleteDoc(doc(db, "posts", postId, "comments", commentId));
    updateDoc(doc(db, "posts", postId), {
      commentsCnt: increment(-1)
    })
  } catch (e) {
    console.error("Error: Delete Comment Error");
  }
}
// -------------------------------------- //

const post = {
  title: 'title1',
  content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, molestias.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, molestias.`,
  date: Timestamp.fromDate(new Date),
  author: 'aajnf',
  commentsCnt: 0,
  likesCnt: 2,
}

export function createPostObject(title, content, author, uid) {
  const p = {
    title: title,
    content: content,
    date: Timestamp.fromDate(new Date()),
    author: author,
    uid: uid,
    commentsCnt: 0,
    comment: [],
    likesCnt: 0,
  };
  
  return p;
}