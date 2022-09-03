import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ArticleList } from '../../components/ArticleList'
import { useRouter } from 'next/router'
import { fetchArticleDataListByTag } from '../../api/blog'
import { fetchTagData } from '../../api/tag'
import { Article } from '../../types/Article'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { HeadSeo } from '../../components/HeadSeo'
import { baseDescription, baseImage, siteName, url } from '../../utility/const'
import test from 'node:test'
type Props = {
  statsicArticleListBytag: Article[]
}
const Tag: NextPage<Props> = ({ statsicArticleListBytag }) => {
  const router = useRouter()
  const tagId = router.query.tag as string
  const fetcher = async():Promise<Article[]> =>{
    const articleListBytag = await fetchArticleDataListByTag(tagId)
    return articleListBytag.contents
  }
  const {data: articleListBytag, mutate} = useSWR(`tag/${tagId}`, fetcher,{
    fallbackData: statsicArticleListBytag
  })
  var tagName = ''

  useEffect(() => {
    mutate()
  }, [])
  if (!articleListBytag) return <></>
  if (articleListBytag.length !== 0) {
    tagName = articleListBytag[0].tag.filter((tag) => {
      return tag.id === tagId
    })[0].name
  }

  return (
    <>
      <HeadSeo title={siteName} description={baseDescription} image={baseImage} url={url + router.asPath}/>
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
  try{
    const tag = params!.tag as string
    const articleListBytag = await fetchArticleDataListByTag(tag)
    return {
      props: {
        statsicArticleListBytag: articleListBytag.contents,
      },
      revalidate:10,
    }
  }catch(err){
    return {notFound: true}
  }

}
