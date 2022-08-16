import { NextPage } from 'next'
import { Card } from '../components/Card'
import Link from 'next/link'
import { Article } from '../types/Article'

type Props = {
  articleList: [Article]
}
export const ArticleList: NextPage<Props> = ({ articleList }) => {
  return (
    <div className="article-area__content">
      <ul className="items">
        {articleList &&
          articleList.map((article) => (
            <Link href={`/${article.id}`} key={article.title}>
              <li className="item">
                <Card
                  title={article.title}
                  createdAt={article.createdAt}
                  thumnail={article.eyecatch.url}
                  category={article.category.name}
                />
              </li>
            </Link>
          ))}
      </ul>
    </div>
  )
}
