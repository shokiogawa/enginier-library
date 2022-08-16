import { ReactElement } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Side } from '../components/Side'
type LayoutProps = Required<{
  readonly children: ReactElement
}>
//LayoutProps内のchildrenを指定。
export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="main ">
        {children}
        <Side />
      </main>
      <Footer />
    </>
  )
}
