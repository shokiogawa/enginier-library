import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { fetchArticleDataList } from "../api/blog";
import { fetchCategoryDataList } from "../api/category";
import { fetchTagDataList } from "../api/tag";
import { url } from "../utility/const";
//サーバーサイド側でレンダリングするようにSSRを使用。
//表示時間はCSRよりも早い(多分)→ 表示はデバイスに依存しない

const Page = () => null
export default Page;

export const getServerSideProps = async ({res}: GetServerSidePropsContext) =>{
  const xml = await generateSitemapXml(); // xmlコードを生成する処理（後で書く）

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24時間のキャッシュ
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
}

const generateSitemapXml = async():Promise<string> => {
  var xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  // 記事詳細データ
  const articles = (await fetchArticleDataList()).contents;
  articles.forEach((article)=>{
    xml += `
    <url>
      <loc>${url}/${article.id}</loc>
      <lastmod>${article.revisedAt}</lastmod>
      <priority>0.7</priority>
      <changefreq>monthly</changefreq>
    </url>
  `
  })

  //カテゴリーデータ
  const categories = (await fetchCategoryDataList()).contents;
  categories.forEach((category)=>{
    xml += `
    <url>
      <loc>${url}/${category.id}</loc>
      <lastmod>${category.revisedAt}</lastmod>
      <priority>0.7</priority>
      <changefreq>monthly</changefreq>
    </url>
  `
  })

  //タグデータ
  const tags = (await fetchTagDataList()).contents;
  tags.forEach((tag)=>{
    xml += `
    <url>
      <loc>${url}/${tag.id}</loc>
      <lastmod>${tag.revisedAt}</lastmod>
      <priority>0.7</priority>
      <changefreq>monthly</changefreq>
    </url>
  `
  })
  xml += `</urlset>`;
  return xml;
}