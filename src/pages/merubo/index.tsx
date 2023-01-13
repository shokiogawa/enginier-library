import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import React, { ChangeEvent, useState } from 'react'
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  setDoc,
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import { SubmitHandler, useForm } from 'react-hook-form'
import MeruboUploadArea from '../../components/MeruboUpload'
const Merubo: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<InputData>()
  const [uploadFile, setUploadFile] = useState<File>()
  const handleSetUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target
    if (files == null) {
      return
    }
    const file = files[0]
    if (file === null) {
      return
    }
    setUploadFile(file)
  }
  return (
    <>
      <section className="merubo-section">
        <div className="merubo-title">
          <h2 className="text">メッセージを追加</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="merubo-form">
          <ul className="items">
            <li className="item">
              <label htmlFor="name">お名前</label>
              <input
                id="name"
                {...register('name', { required: true })}
                type="text"
                defaultValue={''}
                placeholder="小川翔生"
              />
              {errors.name && <span>名前が入力されていません。</span>}
            </li>

            <li className="item">
              <label htmlFor="message">メッセージ</label>
              <textarea
                id="message"
                {...register('message', { required: true })}
              ></textarea>
              {errors.message && <span>メッセージが入力されていません</span>}
            </li>
            <li className="item">
              <p>写真</p>
              <p className="sub-label">思い出の写真を送りましょう</p>
              <MeruboUploadArea id="image" onChange={handleSetUploadImage} />
            </li>
            <li className="item button-item">
              <button>確認する</button>
            </li>
          </ul>
        </form>
      </section>
    </>
  )
}

export default Merubo

type InputData = {
  name: string
  message: string
}

type Message = {
  id: string
  userName: string
  thumnail: string
  image: string
  content: string
}

//コンバーター
const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore(message: Message): DocumentData {
    return {
      id: message.id,
      userName: message.userName,
      thumnail: message.thumnail,
      image: message.image,
      content: message.content,
    }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      userName: data.userName,
      thumnail: data.thumnail,
      image: data.image,
      content: data.content,
    }
  },
}

// メッセージ追加ボタン押下時
const onSubmit: SubmitHandler<InputData> = async (data): Promise<void> => {
  console.log('やあ')
  // const db = getFirestore()
  // const message = {}
  // const messageId = ''
  // const messageRef = doc(
  //   db,
  //   'message_bords',
  //   messageId,
  //   'messages',
  //   messageId
  // ).withConverter(messageConverter)
  // await setDoc(messageRef, message)
}

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
export const firebaseStorage = getStorage(app)
