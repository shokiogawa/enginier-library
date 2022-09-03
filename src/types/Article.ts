export type Article = {
  id: string
  title: string
  createdAt: string
  content: string
  description: string,
  eyecatch: {
    url: string
    height: number
    width: number
  }
  category: {
    id: string
    name: string
  }
  tag: {
    id: string
    name: string
  }[]
}
