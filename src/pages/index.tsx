import type { NextPage, GetStaticProps } from 'next'
import { ArticleList } from '../components/ArticleList'
import {fetchArticleDataList } from '../api/blog'
import { Article } from '../types/Article'
import useSWR from 'swr'
import {useEffect} from "react"
import { HeadSeo } from '../components/HeadSeo'
import { useRouter } from 'next/router'
import { baseDescription, baseImage, siteName, url } from '../utility/const'

type Props = {
  staticNewArticleList: Article[]
}

const fetcher = async (): Promise<Article[]> => {
  const newArticleList = await fetchArticleDataList()
  return newArticleList.contents
}

const Home: NextPage<Props> = ({ staticNewArticleList}) => {
  const router = useRouter()
  const {data: articleList, mutate} = useSWR(`/index`, fetcher,{
    fallbackData: staticNewArticleList
  })
  useEffect(() => {
    mutate()
  }, [])
  if (!articleList) return <></>
  return (
    <>
    <HeadSeo title={siteName} description={baseDescription} image={baseImage} url={url + router.asPath}/>
    <section className="article-area">
      <h2 className="article-area__title">最新記事一覧</h2>
      <ArticleList articleList={articleList} />
    </section>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const newArticleList = await fetchArticleDataList()
  return {
    props: {
      staticNewArticleList: newArticleList.contents,
    },
    revalidate: 10,
  }
}
