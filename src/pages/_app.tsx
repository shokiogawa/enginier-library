import type { AppProps } from 'next/app'
import '../../public/scss/style.scss'
import GoogleTagManager, { GoogleTagManagerId } from '../components/GoogleTagManeger'
import { Layout } from '../layout/Layout'
import { googleTagManagerId } from '../utility/gtm'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    {/* GoogleTagManager */}
    <GoogleTagManager  googleTagManagerId = {googleTagManagerId as GoogleTagManagerId}/>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  )
}

export default MyApp
