// import fs from 'fs'
// import { createClient } from 'microcms-js-sdk'
const fs = require('fs')
const { createClient } = require('microcms-js-sdk')
require('dotenv').config();

const client = createClient({
  serviceDomain: process.env.NODE_ENV_DOMAIN,
  apiKey: process.env.NODE_ENV_APIKEY,
})
async function createJsonFile() {
  const categoryData = await client.getList({ endpoint: 'categories' })
  const tagData = await client.getList({ endpoint: 'tag' })
  const jsonCategory = JSON.stringify(categoryData, null, 2)
  const jsonTag = JSON.stringify(tagData, null, 2)
  fs.writeFileSync('./src/data/tag.json', jsonTag)
  fs.writeFileSync('./src/data/category.json', jsonCategory)
}

const test = createJsonFile
test()

createJsonFile()
