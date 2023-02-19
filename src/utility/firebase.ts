import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { getFirestore, initializeFirestore } from 'firebase/firestore'
// firebase設定
type firebaseConfigType = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}

const getFirebaseConfig = (): firebaseConfigType => {
  if (process.env.NEXT_PUBLIC_ENV! === 'prd') {
    const firebaseConfig = {
      apiKey: 'AIzaSyBqpi2Rk-hA5-HcVEEpS1HFTulWb1V_oW4',
      authDomain: 'merubo-4e254.firebaseapp.com',
      projectId: 'merubo-4e254',
      storageBucket: 'merubo-4e254.appspot.com',
      messagingSenderId: '960154544397',
      appId: '1:960154544397:web:570fc34613b4483331a844',
      measurementId: 'G-J3HQP13Q3Z',
    }
    return firebaseConfig
  } else {
    const firebaseConfigDev = {
      apiKey: 'AIzaSyC6JeHlPEfUCl5zR1odWm2FTEME2i3UW5k',
      authDomain: 'merubo-develop.firebaseapp.com',
      projectId: 'merubo-develop',
      storageBucket: 'merubo-develop.appspot.com',
      messagingSenderId: '518497144120',
      appId: '1:518497144120:web:7e5bb0eb84a98f3103c5cd',
      measurementId: 'G-LEDNJRPTT6',
    }
    return firebaseConfigDev
  }
}

const app = initializeApp(getFirebaseConfig())
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
})
export const firebaseStorage = getStorage(app)
export const firebaseAuth = getAuth(app)
export const firebaseStore = getFirestore(app)
