import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ArticleList } from '../../components/ArticleList'
import { useRouter } from 'next/router'
import { fetchArticleDataListByTag } from '../../api/blog'
import { fetchTagData } from '../../api/tag'
import { Article } from '../../types/Article'
type Props = {
  articleListBytag: [Article]
}
const Tag: NextPage<Props> = ({ articleListBytag }) => {
  const router = useRouter()
  const tagId = router.query.tag
  if (!articleListBytag) return <></>
  var tagName = ''
  if (articleListBytag[0]) {
    tagName = articleListBytag[0].tag.filter((tag) => {
      return tag.id === tagId
    })[0].name
  }

  return (
    <>
      <section className="article-area">
        <div className="article-area__category-name">
          <p className="en">- Tag -</p>
          <h2 className="jp">{!articleListBytag[0] ? 'none' : tagName}</h2>
        </div>
        <ArticleList articleList={articleListBytag} />
      </section>
    </>
  )
}

export default Tag
export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await fetchTagData()
  const paths = tags.contents.map((tag) => {
    return { params: { tag: tag.id } }
  })
  return {
    paths,
    fallback: true,
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params!.tag as string
  const articleListBytag = await fetchArticleDataListByTag(tag)
  return {
    props: {
      articleListBytag: articleListBytag.contents,
    },
    revalidate:10,
  }
}
