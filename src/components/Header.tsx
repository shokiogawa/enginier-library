import Link from 'next/link'
export const Header = () => {
  return (
    <header className="l-header">
      <div className="header-area">
        <h1 className="header-area__title">
          <Link href={'/'}>
            <a className="link">エンジニア 図書館</a>
          </Link>
        </h1>
      </div>
    </header>
  )
}
