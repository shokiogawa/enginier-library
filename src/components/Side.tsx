import { GetStaticProps, NextPage } from 'next'
import Tag from '../pages/tag/[tag]'
import { Category } from '../types/Category'
import { Tags } from '../types/Tag'
import category from '../data/category.json'
import tags from '../data/tag.json'
import Link from 'next/link'

type BlogOptionData = {
  categories: [Category]
  tags: [Tags]
}

export const Side: NextPage = () => {
  return (
    <aside className="side">
      <div className="side__prof">
        <img src="/images/DSC_3163.JPG" className="image" />
        <p className="name">管理人</p>
        <p className="job">バックエンドエンジニア</p>
        <p className="intro">
          東京自社開発企業に勤めるエンジニア図書館の管理人
          <br />
          当サイトでは、エンジニア向けのお役立ち情報を発信します。
        </p>
        <a className="link" href="https://github.com/shokiogawa" target="_blank" rel="noreferrer"><p className="prof-detail">Git Hub</p></a>
        <a className="link" href="https://twitter.com/sahoun6" target="_blank" rel="noreferrer"><p className="prof-detail">Twitter</p></a>
        {/* <p className="prof-detail">詳細プロフィール</p> */}
        {/* <div className="sns">
          <p className="sns__text">Follow me!!</p>
          <ul className="sns__item">
            <li className="c-sns">Twitter</li>
            <li className="c-sns">Instagram</li>
          </ul>
        </div> */}
      </div>

      <div className="side__category">
        <div className="title">カテゴリー</div>
        <ul className="items">
          {category.contents.map((category) => (
            <Link href={`/category/${category.id}`} key={category.id}>
              <li className="item">{category.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="side__key">
        <div className="title">キーワード</div>
        <ul className="items">
          {tags.contents.map((tag) => (
            <Link href={`/tag/${tag.id}`} key={tag.id}>
              <li className="item">{tag.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  )
}
