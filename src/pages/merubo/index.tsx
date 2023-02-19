import { NextPage } from 'next'
import React, { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import { v4 } from 'uuid'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from '@material-ui/core/'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { SubmitHandler, useForm } from 'react-hook-form'
import MeruboUploadArea, { uploadImage } from '../../components/MeruboUpload'
import MeruboAvaterUpload from '../../components/MeruboAvaterUpload'
import { useRouter } from 'next/router'
import { Message, messageConverter } from '../../types/MeruboMessage'
import { firebaseStore } from '../../utility/firebase'
import {
  MeruboMessageBord,
  messageBordConverter,
} from '../../types/MeruboMessageBord'
import useSWR from 'swr'

const Merubo: NextPage = () => {
  const router = useRouter()
  const messageBordId = router.query.messageBordId as string

  const fetchMessageBord = async (): Promise<MeruboMessageBord | undefined> => {
    const messageBordRef = doc(
      firebaseStore,
      'message_bords',
      messageBordId
    ).withConverter(messageBordConverter)
    const docSnap = await getDoc(messageBordRef)
    const data = docSnap.data()
    return data
  }
  const { data: messageBordData, error } = useSWR(
    messageBordId ? `firebaseFirestore/messageBord` : null,
    fetchMessageBord,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  // フォーム
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<InputData>()
  const [uploadFile, setUploadFile] = useState<File>()
  const [avaterFile, setAvaterFile] = useState<File>()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<String>()
  const handleReload = () => {
    window.location.reload()
  }
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

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
    setIsLoading(true)
    if (messageBordId) {
      console.log('start set data to firebase')
      setIsLoading(true)
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
        const currentDate = new Date()
        const message: Message = {
          id: messageId,
          userName: data.userName,
          content: data.content,
          thumbnail: thumbnail,
          image: image,
          createdAt: currentDate,
          updatedAt: currentDate,
        }
        const messageRef = doc(
          firebaseStore,
          'message_bords',
          messageBordId,
          'messages',
          messageId
        ).withConverter(messageConverter)
        await setDoc(messageRef, message).then(() => {
          console.log('成功')
          setMessage('メッセージを送信しました。')
          setIsLoading(false)
        })
      } catch (err) {
        setMessage(
          'メッセージの送信に失敗しました。少し時間を開け、再度送信してください。'
        )
        setIsLoading(false)
        throw err
      }
    } else {
      setMessage('URLをご確認の上再度送信してください')
      setIsLoading(false)
    }
  }
  if (!messageBordData) return <></>
  if (error)
    return (
      <section>
        寄せ書きがすでに受け取られているため、メッセージの追加ができません。寄せ書き作成者に確認をとってください。
      </section>
    )
  return (
    <>
      {messageBordData.status === 'edit' ? (
        <section className="merubo-section">
          <div className="merubo-title">
            <h2 className="title">
              {messageBordData?.receiverUserName}
              さんへ{messageBordData.category}のお祝いを送りましょう
            </h2>
            <p className="text">メッセージを追加</p>
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
                  placeholder="自分の名前を入力"
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
                  placeholder="送りたいメッセージを入力してください"
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
                <button onClick={handleSubmit(handleClickOpen)}>
                  送信する
                </button>
              </li>
              <li className="item">
                <p>
                  送信ボタンを押すと、
                  <Link href={'/merubo/terms'}>
                    <a>利用規約</a>
                  </Link>
                  と、{' '}
                  <Link href={'/merubo/privacy-policy'}>
                    <a>プライバシーポリシー</a>
                  </Link>
                  に同意したことになります。
                </p>
              </li>
            </ul>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {isLoading
                  ? '送信中'
                  : message
                  ? ''
                  : 'メッセージを送信しますか？'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {isLoading
                    ? '少々お待ちください'
                    : message
                    ? message
                    : '送信したメッセージは編集できません'}
                </DialogContentText>
              </DialogContent>
              {isLoading ? (
                <></>
              ) : message ? (
                <DialogActions>
                  <Button onClick={handleReload}>戻る</Button>
                </DialogActions>
              ) : (
                <DialogActions>
                  <Button onClick={handleClose}>キャンセル</Button>
                  <Button onClick={handleSubmit(onSubmit)} autoFocus>
                    送信
                  </Button>
                </DialogActions>
              )}
            </Dialog>
          </form>
        </section>
      ) : (
        <section>
          <div>
            寄せ書きはすでに送られています。メッセージの追加はできません。
          </div>
        </section>
      )}
    </>
  )
}

export default Merubo

type InputData = {
  userName: string
  content: string
}
