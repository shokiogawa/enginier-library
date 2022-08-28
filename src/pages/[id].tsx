import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import {
  fetchArticleData,
  fetchArticleDataList,
  fetchArticleIdList,
} from '../api/blog'
import { Article } from '../types/Article'
import { useEffect, useState } from 'react'
import { OutLine } from '../components/OutLine '


type Props = {
  articleDetail: Article
}
const ArticleDetail: NextPage<Props> = ({ articleDetail }) => {

  if (!articleDetail) return <></>
  return (
    <>
      <section className="article-area">
      <span className="categoryS">{articleDetail.category.name}</span>
        <div className="article-area__detail-first">
          <h2 className="title">{articleDetail.title}</h2>
          <p className="createdAt">{articleDetail.createdAt}</p>
          {/* <img src="/images/DSC_3163.JPG" alt="画像" className="image" /> */}
          <div className="image">
            <Image
              src={articleDetail.eyecatch.url}
              width={500}
              height={250}
              layout={'responsive'}
            />
          </div>
        </div>
        <OutLine content={articleDetail.content}/>
        <div className="article-area__detail-content">
          <div
            dangerouslySetInnerHTML={{ __html: articleDetail.content }}
          ></div>
        </div>
      </section>
    </>
  )
}
export default ArticleDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const articleList = await fetchArticleIdList()
  const paths = articleList.contents.map((article) => {
    return { params: { id: article.id } }
  })
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  const articleDetail = await fetchArticleData(id)
  return {
    props: {
      articleDetail: articleDetail,
    },
  }
}
