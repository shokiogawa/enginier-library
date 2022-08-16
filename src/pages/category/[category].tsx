import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ArticleList } from '../../components/ArticleList'
import { useRouter } from 'next/router'
import { fetchCategoryData } from '../../api/category'
import { fetchArticleDataListByCategory } from '../../api/blog'
import { Article } from '../../types/Article'
type Props = {
  articleListByCategory: [Article]
}
const Category: NextPage<Props> = ({ articleListByCategory }) => {
  const router = useRouter()
  const categoryName = router.query.category
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
      articleListByCategory: articleListByCategory.contents,
    },
  }
}
