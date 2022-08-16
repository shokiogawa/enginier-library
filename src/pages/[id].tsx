import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import {
  fetchArticleData,
  fetchArticleDataList,
  fetchArticleIdList,
} from '../api/blog'
import { Article } from '../types/Article'
import { useEffect, useState } from 'react'

type Outline = {
  id: string
  text: string
  tagName: string
}

type Props = {
  articleDetail: Article
}
const ArticleDetail: NextPage<Props> = ({ articleDetail }) => {
  //目次作成
  const [outLine, setOutLine] = useState<Outline[]>([])
  useEffect(() => {
    const htmlElement = new DOMParser().parseFromString(
      articleDetail.content,
      'text/html'
    )
    const headingElement = Array.from(htmlElement!.querySelectorAll('h2,h3'))
    const headObjs: Outline[] = []
    headingElement.map((head) => {
      var obj: Outline = {
        id: head.id,
        text: head.textContent!,
        tagName: head.tagName,
      }
      headObjs.push(obj)
    })
    setOutLine(headObjs)
  }, [])
  //h2とh3で目次を主に構成する。

  if (!articleDetail) return <></>
  return (
    <>
      <section className="article-area">
        <div className="article-area__outline">
          <p>目次</p>
          <ul>
            {outLine.map((e) => (
              <li key={e.id}>{e.text}</li>
            ))}
          </ul>
        </div>
        <div className="article-area__detail-first">
          <span className="categoryS">{articleDetail.category.name}</span>
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
