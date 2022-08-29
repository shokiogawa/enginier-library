import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ArticleList } from '../../components/ArticleList'
import { useRouter } from 'next/router'
import { fetchCategoryData } from '../../api/category'
import { fetchArticleDataListByCategory } from '../../api/blog'
import { Article } from '../../types/Article'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
type Props = {
  staticArticleListByCategory: Article[]
}
const Category: NextPage<Props> = ({ staticArticleListByCategory }) => {
  const router = useRouter()
  const categoryId = router.query.category as string

  const fecher = async ():Promise<Article[]> =>{
    const articleListByCategory = await fetchArticleDataListByCategory(categoryId)
    return articleListByCategory.contents
  }
  const {data: articleListByCategory, mutate} = useSWR(`category/${categoryId}`, fecher,{
    fallbackData: staticArticleListByCategory
  })
  useEffect(() => {
    mutate()
  }, [])

  if (!articleListByCategory) return <></>
  return (
    <>
      <section className="article-area">
        <div className="article-area__category-name">
          <p className="en">- Category -</p>
          <h2 className="jp">
            {articleListByCategory[0]
              ? articleListByCategory[0].category.name
              : 'none'}
          </h2>
        </div>
        <ArticleList articleList={articleListByCategory} />
      </section>
    </>
  )
}
export default Category

export const getStaticPaths: GetStaticPaths = async () => {
  const category = await fetchCategoryData()
  const paths = category.contents.map((category) => {
    return { params: { category: category.id } }
  })
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryId = params?.category as string
  const articleListByCategory = await fetchArticleDataListByCategory(categoryId)
  return {
    props: {
      staticArticleListByCategory: articleListByCategory.contents,
    },
    revalidate:10,
  }
}
