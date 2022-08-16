This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Scssの設定
1. scssのインストール
```
yarn add sass --dev
```
2. .cssファイルをインポートしている部分をstyle.scssに変換。(_app.tsx内)

## Scssのディレクトリ構造
### foundation
サイト全体のデフォルトスタイルを管理するディレクトリ。

### layout
各ページを構成する、ヘッダー、メインコンテンツエリア、コンテナ、フッターなどのレイアウトに関するスタイルをエリアごとに管理。

### object
繰り返し色んな場所で使うパーツやブロックをすべてObject
#### component
最低限の機能を持ったもの（button.scssやtxt.scssなど）
#### project
プロジェクト固有の塊（about.scssやlogin.scssなど）
#### utility
細かい調整のためのスタイル

## Scssの命名規則はBEM
```
Block（１つのコンポーネント）__Element（子要素）--Modifier（バリエーション）
```

x　block__element__element
○　block__element--element

# enginier-library
