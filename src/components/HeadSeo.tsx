import { NextPage } from "next";
import Head from 'next/head';

type Props = {
  title: string,
  description: string,
  url: string,
  image: string,
}

export const HeadSeo:NextPage<Props> = ({title, description, url, image}) =>{
return (
  <>
  <Head>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="width=device-width"/>
    <title>{title}</title>
    <meta name="description" content={description}/>
    <meta property="og:locale" content="ja_JP"/>
    <meta property="og:type" content="article"/>
    <meta property="og:title" content={title}/>
    <meta property="og:site_name" content="エンジニア図書館"/>
    <meta property="og:image" content={image}/>
    <meta property="og:url" content={url}/>
  </Head>
  </>
)
}