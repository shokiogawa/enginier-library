import { MicroCMSListResponse } from 'microcms-js-sdk'
import { Article } from '../../types/Article'
import { client } from '../../utility/cms'

export const fetchTerms = async (): Promise<Article> => {
  const json = await client.getListDetail<Article>({
    endpoint: 'blogs',
    contentId: 'zzcbhje3_w',
  })
  return json
}

export const fetchPrivacyPolicy = async (): Promise<Article> => {
  const json = await client.getListDetail<Article>({
    endpoint: 'blogs',
    contentId: 'uwbbbt6in',
  })
  return json
}
