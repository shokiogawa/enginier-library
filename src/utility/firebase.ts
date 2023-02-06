import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { getFirestore, initializeFirestore } from 'firebase/firestore'
// firebase設定
const firebaseConfig = {
  apiKey: 'AIzaSyC6JeHlPEfUCl5zR1odWm2FTEME2i3UW5k',
  authDomain: 'merubo-develop.firebaseapp.com',
  projectId: 'merubo-develop',
  storageBucket: 'merubo-develop.appspot.com',
  messagingSenderId: '518497144120',
  appId: '1:518497144120:web:7e5bb0eb84a98f3103c5cd',
  measurementId: 'G-LEDNJRPTT6',
}

const app = initializeApp(firebaseConfig)
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
})
export const firebaseStorage = getStorage(app)
export const firebaseAuth = getAuth(app)
export const firebaseStore = getFirestore(app)
