import type { AppProps } from 'next/app'
import '../../public/scss/style.scss'
import { Layout } from '../layout/Layout'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
