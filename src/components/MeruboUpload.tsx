import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { firebaseStorage } from '../pages/merubo'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  TaskState,
} from 'firebase/storage'
import { Card, CardContent } from '@material-ui/core/'
import { Camera, CameraAltOutlined } from '@material-ui/icons'

export type firebaseOnLoadProp = {
  bytesTransferred: number
  totalBytes: number
  state: TaskState
  // このほかにもmetadata,task,refがある
}

// 画像保存メソッド
const uploadImage = async (image: File): Promise<String> => {
  const fullPath = ''
  let imageURL = ''
  const storageRef = ref(firebaseStorage, fullPath)
  const uploadTask = uploadBytesResumable(storageRef, image)
  await uploadTask
    .then(async function (value) {
      imageURL = await getDownloadURL(value.ref)
    })
    .catch((error) => {
      console.log(error)
    })
  return imageURL
  // uploadTask.on(
  //   'state_changed',
  //   // 保存中メソッド
  //   (snapshot: firebaseOnLoadProp) => {
  //     const progress: number =
  //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     console.log('Upload is ' + progress + '% done')
  //     switch (snapshot.state) {
  //       case 'paused': // or 'paused'
  //         console.log('Upload is paused')
  //         break
  //       case 'running': // or 'running'
  //         console.log('Upload is running')
  //         break
  //     }
  //   },
  //   //エラー時のメソッド
  //   (error: any) => {
  //     switch (error.code) {
  //       case 'storage/unauthorized':
  //         // User doesn't have permission to access the object
  //         console.error('許可がありません')
  //         break

  //       case 'storage/canceled':
  //         console.error('アップロードがキャンセルされました　')
  //         // User canceled the upload
  //         break

  //       case 'storage/unknown':
  //         console.error('予期せぬエラーが発生しました')
  //         // Unknown error occurred, inspect error.serverResponse
  //         break
  //     }
  //   },
  //   // 成功時のメソッド
  //   () => {
  //     try {
  //       getDownloadURL(uploadTask.snapshot.ref).then((value) => {
  //         console.log(value)
  //       })
  //     } catch (error) {
  //       switch (error.code) {
  //         case 'storage/object-not-found':
  //           console.log('ファイルが存在しませんでした')
  //           break
  //         case 'storage/unauthorized':
  //           console.log('許可がありません')
  //           break
  //         case 'storage/canceled':
  //           console.log('キャンセルされました')
  //           break
  //         case 'storage/unknown':
  //           console.log('予期せぬエラーが生じました')
  //           break
  //       }
  //     }
  //   }
  // )
}

type Props = {
  id: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const MeruboUploadArea: React.FC<Props> = ({ id, onChange }) => {
  const [uploadFile, setUploadFile] = useState<File[]>()
  const [imageSrc, setSrc] = useState<string>('')

  const handleImagePreview = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target
    if (files == null) {
      return
    }
    const file = files[0]
    if (file === null) {
      return
    }
    let reader = new FileReader()
    //result属性にファイルのURLを保存してくれる。
    reader.readAsDataURL(file)
    reader.onload = () => {
      setSrc(reader.result as string)
    }
    onChange(event)
  }

  return (
    <label htmlFor={id}>
      {imageSrc === '' ? (
        <Card className="" style={{ height: '110px' }}>
          <CardContent className="">
            <input
              hidden
              type="file"
              accept="image/*"
              id={id}
              onChange={handleImagePreview}
            />
            <div className="merubo-card">
              <CameraAltOutlined
                className="camera-icon"
                style={{ height: '35px', width: '35px' }}
              />
              <p className="title">思い出の写真をアップロード</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="image-area">
          <Image
            alt={'name'}
            src={imageSrc}
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
    </label>
  )
}

export default MeruboUploadArea
