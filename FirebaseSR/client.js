import { initializeApp, getApps } from 'firebase/app'
import { GithubAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, getDocs, addDoc, Timestamp } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyCAWNARb370xpaExSnXyjF6FXxm2TD_ArA',
  authDomain: 'nmkzdev-f2502.firebaseapp.com',
  projectId: 'nmkzdev-f2502',
  storageBucket: 'nmkzdev-f2502.appspot.com',
  messagingSenderId: '953488714569',
  appId: '1:953488714569:web:c08cf851bfe1ae00b98898',
  measurementId: 'G-H1XJKFVSJW'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
/**
 * If the result object has a displayName property, return an object with the properties of the result
 * object, otherwise return null.
 * @param result - The result of the sign-in request.
 * @returns The result of the function.
 */

const mapUser = (result) => {
  if (result?.displayName) {
    const {
      displayName,
      email,
      phoneNumber,
      photoURL,
      uid
    } = result
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
/**
 * OnAuth is a function that takes a callback function as an argument and returns a function that takes
 * a user object as an argument and calls the callback function with a normalized user object as an
 * argument.
 * @param onChange - a callback function that will be called whenever the user's authentication state
 * changes.
 * @returns The function onAuthStateChanged
 */

export const onAuth = (onChange) => {
  const auth = getAuth()
  return onAuthStateChanged(auth, user => {
    const normalizedUser = user ? mapUser(user) : null
    onChange(normalizedUser)
  })
}
/**
 * It returns a promise that resolves to the user object if the user is successfully authenticated, or
 * rejects with an error if the user is not authenticated
 * @returns A promise that resolves to the user object.
 */

export const loginWithGithub = () => {
  const auth = getAuth()
  const githubProvider = new GithubAuthProvider()
  return signInWithPopup(auth, githubProvider).catch(err => err)
}
/**
 * It takes an object with the properties avatar, content, userId, and userName, and then it adds a
 * document to the devits collection with those properties, plus the properties createdAt, likesCount,
 * and sharedCount
 * @returns A promise that resolves to a document reference.
 */

export const addDevit = async ({ avatar, content, userId, userName }) => {
  try {
    const docRef = await addDoc(collection(db, 'devits'), {
      avatar,
      content,
      userId,
      userName,
      createdAt: Timestamp.fromDate(new Date()),
      likesCount: 0,
      sharedCount: 0
    })
    return docRef
  } catch (e) {
    return 0
  }
}

export const fetchLatestDevits = async () => {
  const querySnapshot = await getDocs(collection(db, 'devits'))
  return querySnapshot.docs.map(doc => {
    const data = doc.data()
    const { id } = doc
    const { createdAt } = data
    const date = new Date(createdAt.seconds * 1000)
    const normalizedCreatedAt = new Intl.DateTimeFormat('es-ES').format(date)
    return {
      ...data,
      id,
      createdAt: +createdAt.toDate()
    }
  })
}
