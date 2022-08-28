import type { NextPage, GetStaticProps } from 'next'
import { Card } from '../components/Card'
import { ArticleList } from '../components/ArticleList'
import { fetchCategoryData } from '../api/category'
import { fetchTagData } from '../api/tag'
import { fetchArticleData, fetchArticleDataList } from '../api/blog'
import { Article } from '../types/Article'
import { Category } from '../types/Category'
import Link from 'next/link'

type Props = {
  newArticleList: [Article]
  categoryList: [Category]
}
const Home: NextPage<Props> = ({ newArticleList, categoryList }) => {
  if (!newArticleList || !categoryList) return <></>
  return (
    <section className="article-area">
      <div className="article-area__category">
      </div>
      <h2 className="article-area__title">最新記事一覧</h2>
      <ArticleList articleList={newArticleList} />
    </section>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const newArticleList = await fetchArticleDataList()
  const categoryList = await fetchCategoryData()
  return {
    props: {
      newArticleList: newArticleList.contents,
      categoryList: categoryList.contents,
    },
  }
}
