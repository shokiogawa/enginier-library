import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import React, { ChangeEvent, useState } from 'react'
import { v4 } from 'uuid'
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
  initializeFirestore,
} from 'firebase/firestore'
import { SubmitHandler, useForm } from 'react-hook-form'
import MeruboUploadArea, { uploadImage } from '../../components/MeruboUpload'
import MeruboAvaterUpload from '../../components/MeruboAvaterUpload'
import { useRouter } from 'next/router'
const Merubo: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<InputData>()
  const [uploadFile, setUploadFile] = useState<File>()
  const [avaterFile, setAvaterFile] = useState<File>()
  const router = useRouter()
  const messageBordId = router.query.messageBordId as string

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

  const handleSetAvaterImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target
    if (files == null) {
      return
    }
    const file = files[0]
    if (file === null) {
      return
    }
    setAvaterFile(file)
  }
  // メッセージ追加ボタン押下時
  const onSubmit: SubmitHandler<InputData> = async (data): Promise<void> => {
    if (messageBordId) {
      try {
        const messageId = v4()
        let thumbnail
        let image
        if (avaterFile) {
          const filePath = `message_bords/${messageBordId}/messages/${messageId}/thumbnail/${avaterFile.name}`
          console.log('start avaterFile upload')
          thumbnail = await uploadImage(avaterFile, filePath)
        }
        if (uploadFile) {
          const filePath = `message_bords/${messageBordId}/messages/${messageId}/image/${uploadFile.name}`
          console.log('start uploadFile upload')
          image = await uploadImage(uploadFile, filePath)
        }
        const message: Message = {
          id: messageId,
          userName: data.userName,
          content: data.content,
          thumbnail: thumbnail,
          image: image,
        }
        const db = getFirestore()
        const messageRef = doc(
          db,
          'message_bords',
          messageBordId,
          'messages',
          messageId
        ).withConverter(messageConverter)
        await setDoc(messageRef, message)
      } catch (err) {
        throw err
      }
    }
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
              <label htmlFor="userName">お名前</label>
              <input
                id="userName"
                {...register('userName', { required: true })}
                type="text"
                defaultValue={''}
                placeholder="小川翔生"
              />
              {errors.userName && <span>名前が入力されていません。</span>}
            </li>

            <li>
              <p>あなたの写真</p>
              <MeruboAvaterUpload
                id={'avater'}
                onChange={handleSetAvaterImage}
              />
            </li>

            <li className="item">
              <label htmlFor="content">メッセージ</label>
              <textarea
                id="content"
                {...register('content', { required: true })}
              ></textarea>
              {errors.content && <span>メッセージが入力されていません</span>}
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
  userName: string
  content: string
}

type Message = {
  id: string
  userName: string
  thumbnail: String | undefined
  image: String | undefined
  content: string
}

//コンバーター
const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore(message: Message): DocumentData {
    return {
      id: message.id,
      userName: message.userName,
      thumbnail: message.thumbnail,
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
      thumbnail: data.thumnail,
      image: data.image,
      content: data.content,
    }
  },
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
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
})
export const firebaseStorage = getStorage(app)
