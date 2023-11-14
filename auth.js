import {
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged
} from "firebase/auth";


export const signInWithGoogle = () => {
  const auth = getAuth();
  setPersistence(auth, browserSessionPersistence)
    .then(async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential_1 = GoogleAuthProvider.credentialFromError(error);
      }
  });
}

export const signOutWithGoogle = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    console.log('logout');
  }).catch((error) => {
    console.error(error);
  })
}

export const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser;
}