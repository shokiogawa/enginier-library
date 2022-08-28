import type { NextPage, GetStaticProps } from 'next'
import { Card } from '../components/Card'
import { ArticleList } from '../components/ArticleList'
import { fetchCategoryData } from '../api/category'
import { fetchTagData } from '../api/tag'
import { fetchArticleData, fetchArticleDataList } from '../api/blog'
import { Article } from '../types/Article'
import { Category } from '../types/Category'
import Link from 'next/link'
import useSWR from 'swr'
import {useEffect} from "react"

type Props = {
  staticNewArticleList: Article[]
  // categoryList: [Category]
}

const fetcher = async (): Promise<Article[]> => {
  const newArticleList = await fetchArticleDataList()
  return newArticleList.contents
}

const Home: NextPage<Props> = ({ staticNewArticleList}) => {
  const {data: articleList, mutate} = useSWR('article_fetcher', fetcher,{
    fallbackData: staticNewArticleList
  })
  useEffect(() => {
    mutate()
  }, [])
  if (!articleList) return <></>
  return (
    <section className="article-area">
      <div className="article-area__category">
      </div>
      <h2 className="article-area__title">最新記事一覧</h2>
      <ArticleList articleList={articleList} />
    </section>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const newArticleList = await fetchArticleDataList()
  // const categoryList = await fetchCategoryData()
  return {
    props: {
      staticNewArticleList: newArticleList.contents,
      // categoryList: categoryList.contents,
    },
  }
}
