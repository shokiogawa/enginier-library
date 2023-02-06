import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import Image from 'next/image'
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  TaskState,
} from 'firebase/storage'
import { Card, CardContent } from '@material-ui/core/'
import { CameraAltOutlined } from '@material-ui/icons'
import imageCompression from 'browser-image-compression'
import { firebaseStorage } from '../utility/firebase'

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
    // 保存箇所指定
    const storageRef = ref(firebaseStorage, filePath)
    // 保存場所にアップ
    const compressedImageFile = await compressImage(image)
    console.log('元画像サイズ')
    console.log(image.size)
    console.log('圧縮後画像サイズ')
    console.log(compressedImageFile.size)
    const value = await uploadBytesResumable(storageRef, compressedImageFile)
    // URL取得
    return await getDownloadURL(value.ref)
  } catch (err) {
    throw err
  }
}

type compressedImageOption = {
  initialQuality: number
}

// 画像圧縮メソッド
const compressImage = async (file: File): Promise<File> => {
  try {
    const options: compressedImageOption = {
      initialQuality: 0.6,
    }
    const compressedFile = await imageCompression(file, options)
    return compressedFile
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
      <input
        hidden
        type="file"
        accept="image/*"
        id={id}
        onChange={handleImagePreview}
      />
      {imageSrc === '' ? (
        <Card className="" style={{ height: '110px' }}>
          <CardContent className="">
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
