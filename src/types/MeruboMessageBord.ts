import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'

export type MeruboMessageBord = {
  id: string
  receiverUserName: string
  lastMessage: string
  lastMovie: string
  lastPicture: string
  title: string
  ownerUserName: string
  categoryEnum: string
  category: string
  onlineurl: string
  templateImageUrl: string
  status: string
}

// コンバーター
export const messageBordConverter: FirestoreDataConverter<MeruboMessageBord> = {
  toFirestore(messageBord: MeruboMessageBord): DocumentData {
    return {
      id: messageBord.id,
      receiverUserName: messageBord.receiverUserName,
      lastMessage: messageBord.lastMessage,
      lastMovie: messageBord.lastMovie,
      lastPicture: messageBord.lastPicture,
      title: messageBord.title,
      ownerUserName: messageBord.ownerUserName,
      categoryEnum: messageBord.categoryEnum,
      category: messageBord.category,
      onlineurl: messageBord.onlineurl,
      templateImageUrl: messageBord.templateImageUrl,
      status: messageBord.status,
    }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): MeruboMessageBord {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      receiverUserName: data.receiverUserName,
      lastMessage: data.lastMessage,
      lastMovie: data.lastMovie,
      lastPicture: data.lastPicture,
      title: data.title,
      ownerUserName: data.ownerUserName,
      categoryEnum: data.categoryEnum,
      category: data.category,
      onlineurl: data.onlineurl,
      templateImageUrl: data.templateImageUrl,
      status: data.status,
    }
  },
}
