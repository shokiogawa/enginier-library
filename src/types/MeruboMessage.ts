import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'

export type Message = {
  id: string
  userName: string
  thumbnail: String | undefined
  image: String | undefined
  content: string
}

//コンバーター
export const messageConverter: FirestoreDataConverter<Message> = {
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
