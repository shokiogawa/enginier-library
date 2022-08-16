import { MicroCMSListResponse } from 'microcms-js-sdk'
import { Tags } from '../types/Tag'
import { client } from '../utility/cms'
export const fetchTagData = async (): Promise<MicroCMSListResponse<Tags>> => {
  const json = await client.getList<Tags>({ endpoint: 'tag' })
  return json
}
