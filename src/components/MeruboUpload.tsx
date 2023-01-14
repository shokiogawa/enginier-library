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
export const uploadImage = async (
  image: File,
  filePath: string
): Promise<String | undefined> => {
  try {
    let imageURL
    const storageRef = ref(firebaseStorage, filePath)
    const uploadTask = uploadBytesResumable(storageRef, image)
    const value = await uploadTask
    return await getDownloadURL(value.ref)
  } catch (err) {
    throw err
  }
}

type Props = {
  id: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const MeruboUploadArea: React.FC<Props> = ({ id, onChange }) => {
  const [imageSrc, setSrc] = useState<string>('')

  const handleImagePreview = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target
    if (files == null) {
      return
    }
    const file = files[0]
    if (file == null) {
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
