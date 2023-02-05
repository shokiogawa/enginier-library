import { ReactElement } from 'react'
import { Footer, MeruboFooter } from '../components/Footer'
import { Header, MeruboHeader } from '../components/Header'
import { Side } from '../components/Side'
import { useRouter } from 'next/router'
type LayoutProps = Required<{
  readonly children: ReactElement
}>
//LayoutProps内のchildrenを指定。
export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()
  return (
    <>
      {router.pathname === '/merubo' || '/merubo/auth' ? (
        <MeruboHeader />
      ) : (
        <Header />
      )}
      <main className="main ">
        {children}
        {router.pathname === '/merubo' || '/merubo/auth' ? <></> : <Side />}
      </main>
      {router.pathname === '/merubo' || '/merubo/auth' ? (
        <MeruboFooter />
      ) : (
        <Footer />
      )}
    </>
  )
}
