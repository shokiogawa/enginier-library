import { MicroCMSListResponse } from 'microcms-js-sdk'
import { Category } from '../types/Category'
import { Tags } from '../types/Tag'
import { client } from '../utility/cms'

export const fetchCategoryData = async (): Promise<
  MicroCMSListResponse<Category>
> => {
  const json = await client.getList<Category>({ endpoint: 'categories' })
  return json
}
