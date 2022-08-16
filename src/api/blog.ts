import { MicroCMSListResponse } from 'microcms-js-sdk'
import { Article } from '../types/Article'
import { Category } from '../types/Category'
import { Tags } from '../types/Tag'
import { client } from '../utility/cms'

//最新の記事一覧取得
export const fetchArticleDataList = async (): Promise<
  MicroCMSListResponse<Article>
> => {
  const json = await client.getList<Article>({ endpoint: 'blogs' })
  return json
}

//最新の記事ID一覧
export const fetchArticleIdList = async (): Promise<
  MicroCMSListResponse<Article>
> => {
  const json = await client.getList<Article>({
    endpoint: 'blogs',
    queries: { fields: 'id' },
  })
  return json
}

//記事の詳細取得
export const fetchArticleData = async (contentId: string): Promise<Article> => {
  const json = await client.getListDetail<Article>({
    endpoint: 'blogs',
    contentId: contentId,
  })
  return json
}

//カテゴリー別記事取得
export const fetchArticleDataListByCategory = async (
  categoryId: string
): Promise<MicroCMSListResponse<Article>> => {
  const json = await client.getList<Article>({
    endpoint: 'blogs',
    queries: { limit: 20, filters: `category[equals]${categoryId}` },
  })
  return json
}

//タグ別記事取得
export const fetchArticleDataListByTag = async (
  tag: string
): Promise<MicroCMSListResponse<Article>> => {
  const json = await client.getList<Article>({
    endpoint: 'blogs',
    queries: { limit: 20, filters: `tag[contains]${tag}` },
  })
  return json
}
