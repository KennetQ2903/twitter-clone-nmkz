import { initializeApp, getApps } from "firebase/app";
import { GithubAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from 'firebase/auth'
import { isObject } from "util";

const firebaseConfig = {
  apiKey: "AIzaSyCAWNARb370xpaExSnXyjF6FXxm2TD_ArA",
  authDomain: "nmkzdev-f2502.firebaseapp.com",
  projectId: "nmkzdev-f2502",
  storageBucket: "nmkzdev-f2502.appspot.com",
  messagingSenderId: "953488714569",
  appId: "1:953488714569:web:c08cf851bfe1ae00b98898",
  measurementId: "G-H1XJKFVSJW"
};

const app =  getApps().length === 0 && initializeApp( firebaseConfig );

const mapUser = (result) => {
  if ( result?.displayName ) {
    const {
      displayName,
      email,
      phoneNumber,
      photoURL,
      uid
    } = result;
    return {
      username: displayName,
      email,
      phoneNumber,
      avatar: photoURL,
      uid
    }
  } else {
    return null
  }
}

export const onAuth = ( onChange ) => {
  const auth = getAuth()
  return onAuthStateChanged(auth, user => {
    const normalizedUser = mapUser(user)
    onChange(normalizedUser)
  })
}

export const loginWithGithub = () => {
    const auth = getAuth()
    const githubProvider = new GithubAuthProvider()
  return signInWithPopup( auth, githubProvider ).catch(err => err)
}