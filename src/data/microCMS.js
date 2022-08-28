// import fs from 'fs'
// import { createClient } from 'microcms-js-sdk'
const fs = require('fs')
const { createClient } = require('microcms-js-sdk')

const client = createClient({
  serviceDomain: '9eznr1t7g2',
  apiKey: 'ebf794c0483f4da2bd7582eccbcb65a48470',
})
async function createJsonFile() {
  const categoryData = await client.getList({ endpoint: 'categories' })
  const tagData = await client.getList({ endpoint: 'tag' })
  const jsonCategory = JSON.stringify(categoryData, null, 2)
  const jsonTag = JSON.stringify(tagData, null, 2)
  fs.writeFileSync('./src/data/tag.json', jsonTag)
  fs.writeFileSync('./src/data/category.json', jsonCategory)
}

createJsonFile()
