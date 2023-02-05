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
  const isMerubo =
    router.pathname === '/merubo' || router.pathname === '/merubo/auth'
  return (
    <>
      {isMerubo ? <MeruboHeader /> : <Header />}
      <main className="main ">
        {children}
        {isMerubo ? <></> : <Side />}
      </main>
      {isMerubo ? <MeruboFooter /> : <Footer />}
    </>
  )
}
