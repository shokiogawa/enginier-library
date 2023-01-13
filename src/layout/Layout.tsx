import { ReactElement } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
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
      <Header />
      <main className="main ">
        {children}
        {router.pathname === '/merubo' ? <></> : <Side />}
      </main>
      <Footer />
    </>
  )
}
